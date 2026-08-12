import unittest
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
    def test_loopback_and_private_literals_are_rejected(self):
        for url in ("http://127.0.0.1", "http://10.1.2.3", "http://[::1]"):
            with self.subTest(url=url), self.assertRaises(security.ScraperSecurityError):
                security.validate_public_url(url)

    def test_credentials_and_nonstandard_ports_are_rejected(self):
        for url in ("https://user:pass@example.com", "https://example.com:8443"):
            with self.subTest(url=url), self.assertRaises(security.ScraperSecurityError):
                security.validate_public_url(url)

    @patch("scraper.security.socket.getaddrinfo")
    def test_domain_must_resolve_only_to_public_addresses(self, lookup):
        lookup.return_value = [(None, None, None, None, ("192.168.1.10", 443))]
        with self.assertRaises(security.ScraperSecurityError):
            security.validate_public_url("https://example.com")
        lookup.return_value = [(None, None, None, None, ("93.184.216.34", 443))]
        self.assertEqual(security.validate_public_url("https://example.com/path#fragment"), "https://example.com/path")

    @patch("scraper.security.socket.getaddrinfo")
    def test_transport_uses_exact_validated_address(self, lookup):
        lookup.return_value = [(None, None, None, None, ("93.184.216.34", 443))]
        connections = []
        requests = []

        def factory(target, address, timeout):
            connections.append((target.hostname, address, timeout))
            return FakeConnection(FakeResponse(), requests)

        final_url, status, html = pinned_http.fetch_public_html(
            "https://example.com/path", {"User-Agent": "test"}, 10_000, 2, connection_factory=factory
        )
        self.assertEqual(lookup.call_count, 1)
        self.assertEqual(connections[0][:2], ("example.com", "93.184.216.34"))
        self.assertEqual(requests[0][1], "/path")
        self.assertEqual((final_url, status), ("https://example.com/path", 200))
        self.assertIn("<title>ok</title>", html)

    def test_redirect_target_is_revalidated(self):
        first = security.ResolvedPublicUrl("https://example.com/", "https", "example.com", 443, ("93.184.216.34",))
        resolved = []
        requests = []

        def resolver(url):
            resolved.append(url)
            if len(resolved) == 1:
                return first
            raise security.ScraperSecurityError(400, "Target is not a public address")

        def factory(_target, _address, _timeout):
            return FakeConnection(FakeResponse(302, {"location": "http://127.0.0.1/admin"}), requests)

        with self.assertRaises(security.ScraperSecurityError):
            pinned_http.fetch_public_html(first.url, {}, 10_000, 2, resolver=resolver, connection_factory=factory)
        self.assertEqual(resolved, ["https://example.com/", "http://127.0.0.1/admin"])

    def test_extract_links_keeps_existing_contract(self):
        soup = BeautifulSoup('<a href="/kontakt">Kontakt</a><a href="https://example.com">Extern</a>', "html.parser")
        links = service.extract_links(soup, "https://example.org/start")
        self.assertEqual(links[0]["url"], "https://example.org/kontakt")
        self.assertEqual(links[1]["url"], "https://example.com")


if __name__ == "__main__":
    unittest.main()
