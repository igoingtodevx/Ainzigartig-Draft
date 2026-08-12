"""
Ainzigartig Website Scraper Service
Extracts website content as clean markdown for KI analysis.
Deployed on VPS, called by Vercel serverless function.

The public response contract intentionally matches the pre-Run-B service.
Run-B's DNS/redirect pinning is retained internally to prevent SSRF and
DNS-rebinding without changing the website UI or API payload shape.
"""

from bs4 import BeautifulSoup
import html2text
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import time
import re
from urllib.parse import urljoin

try:
    from .pinned_http import PinnedHttpError, fetch_public_html as fetch_pinned_html
    from .security import ScraperSecurityError
except ImportError:
    from pinned_http import PinnedHttpError, fetch_public_html as fetch_pinned_html
    from security import ScraperSecurityError

app = FastAPI(title="Ainzigartig Scraper")

MAX_RESPONSE_BYTES = 2_000_000
MAX_REDIRECTS = 4

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
}


class ScrapeRequest(BaseModel):
    url: str


class ScrapeResult(BaseModel):
    url: str
    title: str
    meta_description: str
    markdown: str
    word_count: int
    links: list[dict]
    images: list[dict]
    forms: int
    technologies: list[str]
    has_contact_form: bool
    has_pricing_page: bool
    has_imprint: bool
    has_privacy_policy: bool
    response_time_ms: int
    status_code: int


def fetch_public_html(initial_url: str) -> tuple[str, int, str]:
    try:
        return fetch_pinned_html(initial_url, HEADERS, MAX_RESPONSE_BYTES, MAX_REDIRECTS)
    except ScraperSecurityError as error:
        raise HTTPException(status_code=error.status_code, detail=error.detail) from error
    except PinnedHttpError as error:
        raise HTTPException(status_code=error.status_code, detail=error.detail) from error


def detect_technologies(soup: BeautifulSoup, html: str) -> list[str]:
    techs = []
    if "wp-content" in html or "wordpress" in html.lower(): techs.append("WordPress")
    if "shopify" in html.lower(): techs.append("Shopify")
    if "wix.com" in html: techs.append("Wix")
    if "squarespace" in html.lower(): techs.append("Squarespace")
    if "webflow" in html.lower(): techs.append("Webflow")
    if "react" in html.lower() or "_next" in html: techs.append("React/Next.js")
    if "vue" in html.lower() or "nuxt" in html.lower(): techs.append("Vue/Nuxt")
    if "angular" in html.lower(): techs.append("Angular")
    if "svelte" in html.lower(): techs.append("Svelte")
    if "google-analytics" in html or "gtag" in html or "GA4" in html: techs.append("Google Analytics")
    if "gtm.js" in html or "googletagmanager" in html: techs.append("Google Tag Manager")
    if "hubspot" in html.lower(): techs.append("HubSpot")
    if "salesforce" in html.lower(): techs.append("Salesforce")
    if "cookiebot" in html.lower(): techs.append("Cookiebot")
    if "matomo" in html.lower(): techs.append("Matomo")
    if "woocommerce" in html.lower(): techs.append("WooCommerce")
    if "prestashop" in html.lower(): techs.append("PrestaShop")
    if "magento" in html.lower(): techs.append("Magento")
    return list(set(techs))


def extract_links(soup: BeautifulSoup, base_url: str) -> list[dict]:
    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        text = a.get_text(strip=True)[:100]
        if href.startswith(("http", "mailto:", "tel:", "#")):
            links.append({"url": href, "text": text})
        elif href.startswith("/"):
            links.append({"url": urljoin(base_url, href), "text": text})
    return links[:50]


def extract_images(soup: BeautifulSoup) -> list[dict]:
    images = []
    for img in soup.find_all("img"):
        src = img.get("src", "")
        alt = img.get("alt", "")
        if src:
            images.append({"src": src[:200], "alt": alt[:100]})
    return images[:30]


@app.post("/scrape")
async def scrape(req: ScrapeRequest):
    start = time.time()
    try:
        url, status_code, html = fetch_public_html(req.url)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Request failed")

    response_time_ms = int((time.time() - start) * 1000)
    soup = BeautifulSoup(html, "html.parser")

    for tag in soup.find_all(["script", "style", "noscript", "svg", "iframe"]):
        tag.decompose()

    title = ""
    title_tag = soup.find("title")
    if title_tag:
        title = title_tag.get_text(strip=True)[:200]

    meta_desc = ""
    meta_tag = soup.find("meta", attrs={"name": "description"})
    if meta_tag:
        meta_desc = meta_tag.get("content", "")[:500]

    h = html2text.HTML2Text()
    h.ignore_links = False
    h.ignore_images = False
    h.body_width = 0
    h.ignore_emphasis = False

    markdown = h.handle(html)
    markdown = re.sub(r'\n{3,}', '\n\n', markdown).strip()
    word_count = len(markdown.split())

    links = extract_links(soup, url)
    images = extract_images(soup)
    forms = len(soup.find_all("form"))
    technologies = detect_technologies(soup, html)

    link_urls = [link["url"].lower() for link in links]
    has_contact_form = forms > 0 or any("kontakt" in link or "contact" in link for link in link_urls)
    has_pricing_page = any("preis" in link or "price" in link or "pricing" in link for link in link_urls)
    has_imprint = any("impressum" in link for link in link_urls)
    has_privacy_policy = any("datenschutz" in link or "privacy" in link for link in link_urls)

    return ScrapeResult(
        url=url,
        title=title,
        meta_description=meta_desc,
        markdown=markdown[:25000],
        word_count=word_count,
        links=links,
        images=images,
        forms=forms,
        technologies=technologies,
        has_contact_form=has_contact_form,
        has_pricing_page=has_pricing_page,
        has_imprint=has_imprint,
        has_privacy_policy=has_privacy_policy,
        response_time_ms=response_time_ms,
        status_code=status_code,
    )


@app.get("/health")
async def health():
    return {"status": "ok", "service": "ainzigartig-scraper"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8501)
