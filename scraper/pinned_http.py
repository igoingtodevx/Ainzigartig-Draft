"""Small HTTP client that connects only to IPs approved by scraper.security."""

from __future__ import annotations

import http.client
import ipaddress
import socket
import ssl
from dataclasses import dataclass
from typing import Callable
from urllib.parse import urljoin

try:
    from .security import ResolvedPublicUrl, resolve_public_url
except ImportError:  # Direct execution from the scraper directory.
    from security import ResolvedPublicUrl, resolve_public_url


REDIRECT_STATUSES = {301, 302, 303, 307, 308}


class PinnedHttpError(RuntimeError):
    def __init__(self, status_code: int, detail: str):
        super().__init__(detail)
        self.status_code = status_code
        self.detail = detail


@dataclass(frozen=True)
class PinnedResponse:
    status: int
    headers: dict[str, str]
    body: bytes


def _dial_ip(address: str, port: int, timeout: float) -> socket.socket:
    """Dial a numeric address directly so NSS/DNS cannot run a second time."""
    parsed = ipaddress.ip_address(address)
    family = socket.AF_INET6 if parsed.version == 6 else socket.AF_INET
    sock = socket.socket(family, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    try:
        endpoint = (parsed.compressed, port, 0, 0) if parsed.version == 6 else (parsed.compressed, port)
        sock.connect(endpoint)
        peer = ipaddress.ip_address(sock.getpeername()[0].split("%", 1)[0])
        if peer != parsed:
            raise OSError("Connected peer does not match pinned address")
        return sock
    except Exception:
        sock.close()
        raise


class _PinnedHTTPConnection(http.client.HTTPConnection):
    def __init__(self, target: ResolvedPublicUrl, address: str, timeout: float):
        super().__init__(target.hostname, target.port, timeout=timeout)
        self._pinned_address = address

    def connect(self) -> None:
        self.sock = _dial_ip(self._pinned_address, self.port, self.timeout)


class _PinnedHTTPSConnection(http.client.HTTPSConnection):
    def __init__(self, target: ResolvedPublicUrl, address: str, timeout: float):
        super().__init__(
            target.hostname,
            target.port,
            timeout=timeout,
            context=ssl.create_default_context(),
        )
        self._pinned_address = address

    def connect(self) -> None:
        raw = _dial_ip(self._pinned_address, self.port, self.timeout)
        try:
            # Keep the original hostname for SNI and certificate validation.
            self.sock = self._context.wrap_socket(raw, server_hostname=self.host)
        except Exception:
            raw.close()
            raise


def _connection_for(target: ResolvedPublicUrl, address: str, timeout: float):
    cls = _PinnedHTTPSConnection if target.scheme == "https" else _PinnedHTTPConnection
    return cls(target, address, timeout)


def request_pinned(
    target: ResolvedPublicUrl,
    headers: dict[str, str],
    max_response_bytes: int,
    timeout: float = 8,
    connection_factory: Callable | None = None,
) -> PinnedResponse:
    """Fetch one hop through a numeric-IP connection; never resolve in transport."""
    factory = connection_factory or _connection_for
    last_error: Exception | None = None

    for address in target.addresses:
        connection = factory(target, address, timeout)
        try:
            request_headers = {**headers, "Host": target.authority, "Connection": "close", "Accept-Encoding": "identity"}
            connection.request("GET", target.request_target, headers=request_headers)
            response = connection.getresponse()
            response_headers = {key.lower(): value for key, value in response.getheaders()}
            if response.status in REDIRECT_STATUSES:
                return PinnedResponse(response.status, response_headers, b"")
            body = response.read(max_response_bytes + 1)
            if len(body) > max_response_bytes:
                raise PinnedHttpError(413, "Website response is too large")
            return PinnedResponse(response.status, response_headers, body)
        except PinnedHttpError:
            raise
        except (TimeoutError, socket.timeout) as exc:
            last_error = PinnedHttpError(504, "Website timed out")
            last_error.__cause__ = exc
        except (OSError, ssl.SSLError, http.client.HTTPException) as exc:
            last_error = exc
        finally:
            connection.close()

    if isinstance(last_error, PinnedHttpError):
        raise last_error
    raise PinnedHttpError(502, "Could not connect to website") from last_error


def fetch_public_html(
    initial_url: str,
    headers: dict[str, str],
    max_response_bytes: int,
    max_redirects: int,
    resolver: Callable[[str], ResolvedPublicUrl] = resolve_public_url,
    connection_factory: Callable | None = None,
) -> tuple[str, int, str]:
    """Resolve once per hop, pin transport to that result, and bound redirects/body."""
    target = resolver(initial_url)

    for redirect_count in range(max_redirects + 1):
        response = request_pinned(
            target,
            headers,
            max_response_bytes,
            connection_factory=connection_factory,
        )
        if response.status in REDIRECT_STATUSES:
            location = response.headers.get("location")
            if not location or redirect_count >= max_redirects:
                raise PinnedHttpError(502, "Too many or invalid redirects")
            # The next target gets its own one-time validation and pinned IPs.
            target = resolver(urljoin(target.url, location))
            continue

        if response.status >= 400:
            raise PinnedHttpError(502, f"Website returned status {response.status}")
        content_type = response.headers.get("content-type", "").lower()
        if content_type and not any(kind in content_type for kind in ("text/html", "application/xhtml+xml")):
            raise PinnedHttpError(415, "Target did not return HTML")
        charset = "utf-8"
        for part in content_type.split(";")[1:]:
            key, _, value = part.strip().partition("=")
            if key == "charset" and value.strip(" \"'"):
                charset = value.strip(" \"'")
                break
        try:
            html = response.body.decode(charset, errors="replace")
        except LookupError:
            html = response.body.decode("utf-8", errors="replace")
        return target.url, response.status, html

    raise PinnedHttpError(502, "Redirect handling failed")
