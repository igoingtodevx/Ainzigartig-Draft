"""Dependency-free request validation for the website scraper."""

import hmac
import ipaddress
import re
import socket
from dataclasses import dataclass
from urllib.parse import urlparse, urlunparse


class ScraperSecurityError(ValueError):
    def __init__(self, status_code: int, detail: str):
        super().__init__(detail)
        self.status_code = status_code
        self.detail = detail


@dataclass(frozen=True)
class ResolvedPublicUrl:
    """A validated URL plus the exact public IPs approved for its next hop."""

    url: str
    scheme: str
    hostname: str
    port: int
    addresses: tuple[str, ...]

    @property
    def authority(self) -> str:
        host = f"[{self.hostname}]" if ":" in self.hostname else self.hostname
        default_port = 443 if self.scheme == "https" else 80
        return host if self.port == default_port else f"{host}:{self.port}"

    @property
    def request_target(self) -> str:
        parsed = urlparse(self.url)
        path = parsed.path or "/"
        return f"{path}?{parsed.query}" if parsed.query else path


def require_token(configured_token: str, authorization: str | None) -> None:
    if not configured_token:
        raise ScraperSecurityError(503, "Scraper is not configured")
    supplied = (authorization or "").removeprefix("Bearer ").strip()
    if not supplied or not hmac.compare_digest(supplied, configured_token):
        raise ScraperSecurityError(401, "Unauthorized")


def resolve_public_url(value: str) -> ResolvedPublicUrl:
    """Validate and resolve one HTTP(S) hop without discarding the approved IPs."""
    candidate = value.strip()
    if not candidate or len(candidate) > 2048:
        raise ScraperSecurityError(400, "Invalid URL")
    if re.search(r"[\x00-\x20\x7f\\]", candidate):
        raise ScraperSecurityError(400, "Invalid URL")
    if not re.match(r"^[a-z][a-z0-9+.-]*://", candidate, re.IGNORECASE):
        candidate = "https://" + candidate

    try:
        parsed = urlparse(candidate)
        raw_hostname = parsed.hostname
        port = parsed.port or (443 if parsed.scheme == "https" else 80)
    except ValueError as exc:
        # urllib raises for malformed IPv6 brackets and invalid ports while
        # accessing hostname/port, not necessarily while parsing the URL.
        raise ScraperSecurityError(400, "Invalid URL") from exc

    if parsed.scheme not in {"http", "https"} or not raw_hostname:
        raise ScraperSecurityError(400, "Only public HTTP(S) URLs are supported")
    if parsed.username or parsed.password:
        raise ScraperSecurityError(400, "Credentials in URLs are not supported")
    if port not in {80, 443}:
        raise ScraperSecurityError(400, "Non-standard ports are not supported")

    hostname = raw_hostname.rstrip(".").lower()
    if hostname == "localhost" or hostname.endswith((".local", ".localhost", ".internal", ".home", ".lan")):
        raise ScraperSecurityError(400, "Local targets are not supported")

    try:
        literal = ipaddress.ip_address(hostname)
        hostname = literal.compressed
        addresses = (literal.compressed,)
    except ValueError:
        try:
            hostname = hostname.encode("idna").decode("ascii")
            records = socket.getaddrinfo(
                hostname,
                port,
                family=socket.AF_UNSPEC,
                type=socket.SOCK_STREAM,
                proto=socket.IPPROTO_TCP,
            )
            ordered = []
            for record in records:
                address = ipaddress.ip_address(record[4][0].split("%", 1)[0])
                if address.compressed not in ordered:
                    ordered.append(address.compressed)
            addresses = tuple(ordered)
        except (UnicodeError, socket.gaierror, ValueError) as exc:
            raise ScraperSecurityError(400, "Domain could not be resolved") from exc

    if not addresses or any(not ipaddress.ip_address(address).is_global for address in addresses):
        raise ScraperSecurityError(400, "Target is not a public address")

    host_for_url = f"[{hostname}]" if ":" in hostname else hostname
    default_port = 443 if parsed.scheme == "https" else 80
    netloc = host_for_url if port == default_port else f"{host_for_url}:{port}"
    normalized = urlunparse((parsed.scheme, netloc, parsed.path, parsed.params, parsed.query, ""))
    return ResolvedPublicUrl(normalized, parsed.scheme, hostname, port, addresses)


def validate_public_url(value: str) -> str:
    """Compatibility helper for callers that only need the normalized URL."""
    return resolve_public_url(value).url
