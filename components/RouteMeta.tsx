import { useEffect } from "react";

interface RouteMetaProps {
  title: string;
  description: string;
  noIndex?: boolean;
}

const SITE_ORIGIN = "https://ainzigartig.vercel.app";
const SOCIAL_IMAGE = `${SITE_ORIGIN}/og-image.png`;
const SOCIAL_IMAGE_ALT = "Handgezeichnete Ainzigartig Landschaft mit einer Person am Laptop unter einem Baum";

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setOg(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

export function RouteMeta({ title, description, noIndex = false }: RouteMetaProps) {
  useEffect(() => {
    const path = window.location.pathname === "/" ? "/" : window.location.pathname.replace(/\/$/, "");
    const canonical = `${SITE_ORIGIN}${path}`;
    document.title = title;
    setMeta("description", description);
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", SOCIAL_IMAGE);
    setMeta("twitter:image:alt", SOCIAL_IMAGE_ALT);
    setOg("og:title", title);
    setOg("og:description", description);
    setOg("og:url", canonical);
    setOg("og:type", "website");
    setOg("og:image", SOCIAL_IMAGE);
    setOg("og:image:width", "1200");
    setOg("og:image:height", "630");
    setOg("og:image:alt", SOCIAL_IMAGE_ALT);
    setCanonical(canonical);
  }, [title, description, noIndex]);
  return null;
}
