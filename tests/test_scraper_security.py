import unittest
from pathlib import Path
from unittest.mock import patch

from bs4 import BeautifulSoup

from scraper import pinned_http, security, service


class FakeResponse:
    def __init__(self, status=200, headers=None, body=b"<html><title>ok</title></html>"):
        self.status = status
        self._headers = headers or {"content-type": "text/html; charset=utf-8"}
        self._body = body

    def getheaders(self):
        return list(self._headers.items())

    def read(self, _limit):
        return self._body


class FakeConnection:
    def __init__(self, response, requests):
        self.response = response
        self.requests = requests

    def request(self, method, target, headers):
        self.requests.append((method, target, headers))

    def getresponse(self):
        return self.response

    def close(self):
        pass


class ScraperSecurityTests(unittest.TestCase):
    def test_bearer_token_is_required_and_compared(self):
        with self.assertRaises(security.ScraperSecurityError) as missing:
            security.require_token("test-secret", None)
        self.assertEqual(missing.exception.status_code, 401)
        security.require_token("test-secret", "Bearer test-secret")

    def test_loopback_and_private_literals_are_rejected(self):
        for url in ("http://127.0.0.1", "http://10.1.2.3", "http://[::1]"):
            with self.subTest(url=url), self.assertRaises(security.ScraperSecurityError) as rejected:
                security.validate_public_url(url)
            self.assertEqual(rejected.exception.status_code, 400)

    def test_credentials_and_nonstandard_ports_are_rejected(self):
        for url in ("https://user:pass@example.com", "https://example.com:8443"):
            with self.subTest(url=url), self.assertRaises(security.ScraperSecurityError) as rejected:
                security.validate_public_url(url)
            self.assertEqual(rejected.exception.status_code, 400)

    def test_malformed_ipv6_is_a_validation_error(self):
        for url in ("https://[::1", "https://[2001:db8::1", "https://example.com:invalid"):
            with self.subTest(url=url), self.assertRaises(security.ScraperSecurityError) as rejected:
                security.resolve_public_url(url)
            self.assertEqual(rejected.exception.status_code, 400)

    @patch("scraper.security.socket.getaddrinfo")
    def test_domain_must_resolve_only_to_public_addresses(self, lookup):
        lookup.return_value = [(None, None, None, None, ("192.168.1.10", 443))]
        with self.assertRaises(security.ScraperSecurityError):
            security.validate_public_url("https://example.com")

        lookup.return_value = [(None, None, None, None, ("93.184.216.34", 443))]
        self.assertEqual(security.validate_public_url("https://example.com/path#fragment"), "https://example.com/path")

    @patch("scraper.security.socket.getaddrinfo")
    def test_transport_uses_the_exact_address_from_validation(self, lookup):
        lookup.return_value = [(None, None, None, None, ("93.184.216.34", 443))]
        connections = []
        requests = []

        def factory(target, address, timeout):
            connections.append((target.hostname, address, timeout))
            return FakeConnection(FakeResponse(), requests)

        final_url, status, html = pinned_http.fetch_public_html(
            "https://example.com/path",
            {"User-Agent": "test"},
            max_response_bytes=10_000,
            max_redirects=2,
            connection_factory=factory,
        )

        self.assertEqual(lookup.call_count, 1)
        self.assertEqual(connections[0][:2], ("example.com", "93.184.216.34"))
        self.assertEqual(requests[0][1], "/path")
        self.assertEqual(requests[0][2]["Host"], "example.com")
        self.assertEqual((final_url, status), ("https://example.com/path", 200))
        self.assertIn("<title>ok</title>", html)

    def test_every_redirect_is_resolved_before_its_connection(self):
        first = security.ResolvedPublicUrl(
            "https://example.com/",
            "https",
            "example.com",
            443,
            ("93.184.216.34",),
        )
        resolved = []
        requests = []

        def resolver(url):
            resolved.append(url)
            if len(resolved) == 1:
                return first
            raise security.ScraperSecurityError(400, "Target is not a public address")

        def factory(_target, _address, _timeout):
            return FakeConnection(FakeResponse(302, {"location": "http://127.0.0.1/admin"}), requests)

        with self.assertRaises(security.ScraperSecurityError) as rejected:
            pinned_http.fetch_public_html(
                first.url,
                {},
                max_response_bytes=10_000,
                max_redirects=2,
                resolver=resolver,
                connection_factory=factory,
            )
        self.assertEqual(rejected.exception.status_code, 400)
        self.assertEqual(resolved, ["https://example.com/", "http://127.0.0.1/admin"])

    def test_extract_links_resolves_relative_links_without_server_error(self):
        soup = BeautifulSoup('<a href="/kontakt">Kontakt</a><a href="https://example.com">Extern</a>', "html.parser")

        links = service.extract_links(soup, "https://example.org/start")

        self.assertEqual(links[0]["url"], "https://example.org/kontakt")
        self.assertEqual(links[1]["url"], "https://example.com")

    def test_systemd_unit_uses_the_documented_checkout_and_virtualenv(self):
        unit = Path("scraper/ainzigartig-scraper.service").read_text(encoding="utf-8")
        self.assertNotIn("/home/deploy/workspace/ainzigartig", unit)
        self.assertIn("WorkingDirectory=/home/deploy/Ainzigartig-Draft-foundation", unit)
        self.assertIn("/home/deploy/Ainzigartig-Draft-foundation/.venv/bin/python -m uvicorn", unit)
        self.assertIn("EnvironmentFile=/etc/ainzigartig-scraper.env", unit)


if __name__ == "__main__":
    unittest.main()
