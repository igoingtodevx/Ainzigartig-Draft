"""
Ainzigartig Website Scraper Service
Extracts website content as clean markdown for KI analysis.
Deployed on VPS, called by Vercel serverless function.
"""

import requests
from bs4 import BeautifulSoup
import html2text
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import time
import re
from urllib.parse import urljoin, urlparse

app = FastAPI(title="Ainzigartig Scraper")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

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


def detect_technologies(soup: BeautifulSoup, html: str) -> list[str]:
    """Detect technologies used by the website."""
    techs = []

    # CMS detection
    if "wp-content" in html or "wordpress" in html.lower():
        techs.append("WordPress")
    if "shopify" in html.lower():
        techs.append("Shopify")
    if "wix.com" in html:
        techs.append("Wix")
    if "squarespace" in html.lower():
        techs.append("Squarespace")
    if "webflow" in html.lower():
        techs.append("Webflow")

    # Framework detection
    if "react" in html.lower() or "_next" in html:
        techs.append("React/Next.js")
    if "vue" in html.lower() or "nuxt" in html.lower():
        techs.append("Vue/Nuxt")
    if "angular" in html.lower():
        techs.append("Angular")
    if "svelte" in html.lower():
        techs.append("Svelte")

    # Analytics & Tools
    if "google-analytics" in html or "gtag" in html or "GA4" in html:
        techs.append("Google Analytics")
    if "gtm.js" in html or "googletagmanager" in html:
        techs.append("Google Tag Manager")
    if "hubspot" in html.lower():
        techs.append("HubSpot")
    if "salesforce" in html.lower():
        techs.append("Salesforce")
    if "cookiebot" in html.lower():
        techs.append("Cookiebot")
    if "matomo" in html.lower():
        techs.append("Matomo")

    # E-Commerce
    if "woocommerce" in html.lower():
        techs.append("WooCommerce")
    if "prestashop" in html.lower():
        techs.append("PrestaShop")
    if "magento" in html.lower():
        techs.append("Magento")

    return list(set(techs))


def extract_links(soup: BeautifulSoup, base_url: str) -> list[dict]:
    """Extract all links with their text."""
    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        text = a.get_text(strip=True)[:100]
        if href.startswith(("http", "mailto:", "tel:", "#")):
            links.append({"url": href, "text": text})
        elif href.startswith("/"):
            links.append({"url": urljoin(base_url, href), "text": text})
    return links[:50]  # Limit


def extract_images(soup: BeautifulSoup) -> list[dict]:
    """Extract images with alt text."""
    images = []
    for img in soup.find_all("img"):
        src = img.get("src", "")
        alt = img.get("alt", "")
        if src:
            images.append({"src": src[:200], "alt": alt[:100]})
    return images[:30]


@app.post("/scrape")
async def scrape(req: ScrapeRequest):
    url = req.url.strip()
    if not url.startswith("http"):
        url = "https://" + url

    # Validate URL
    parsed = urlparse(url)
    if not parsed.netloc:
        raise HTTPException(status_code=400, detail="Invalid URL")

    start = time.time()

    try:
        resp = requests.get(url, headers=HEADERS, timeout=15, allow_redirects=True)
        status_code = resp.status_code
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="Website timed out after 15s")
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=502, detail="Could not connect to website")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Request failed: {str(e)[:100]}")

    if status_code >= 400:
        raise HTTPException(status_code=502, detail=f"Website returned status {status_code}")

    response_time_ms = int((time.time() - start) * 1000)

    html = resp.text
    soup = BeautifulSoup(html, "html.parser")

    # Remove script, style, nav, footer elements
    for tag in soup.find_all(["script", "style", "noscript", "svg", "iframe"]):
        tag.decompose()

    # Extract metadata
    title = ""
    title_tag = soup.find("title")
    if title_tag:
        title = title_tag.get_text(strip=True)[:200]

    meta_desc = ""
    meta_tag = soup.find("meta", attrs={"name": "description"})
    if meta_tag:
        meta_desc = meta_tag.get("content", "")[:500]

    # Convert to markdown
    h = html2text.HTML2Text()
    h.ignore_links = False
    h.ignore_images = False
    h.body_width = 0  # Don't wrap
    h.ignore_emphasis = False

    markdown = h.handle(html)
    # Clean up excessive whitespace
    markdown = re.sub(r'\n{3,}', '\n\n', markdown)
    markdown = markdown.strip()

    word_count = len(markdown.split())

    # Detect features
    links = extract_links(soup, url)
    images = extract_images(soup)
    forms = len(soup.find_all("form"))
    technologies = detect_technologies(soup, html)

    # Check for specific pages
    link_urls = [l["url"].lower() for l in links]
    has_contact_form = forms > 0 or any("kontakt" in l or "contact" in l for l in link_urls)
    has_pricing_page = any("preis" in l or "price" in l or "pricing" in l for l in link_urls)
    has_imprint = any("impressum" in l for l in link_urls)
    has_privacy_policy = any("datenschutz" in l or "privacy" in l for l in link_urls)

    return ScrapeResult(
        url=url,
        title=title,
        meta_description=meta_desc,
        markdown=markdown[:25000],  # Limit for LLM context
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
