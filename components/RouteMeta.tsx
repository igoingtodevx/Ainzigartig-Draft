import { useEffect } from "react";

interface RouteMetaProps {
  title: string;
  description: string;
}

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

export function RouteMeta({ title, description }: RouteMetaProps) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setOg("og:title", title);
    setOg("og:description", description);
    setOg("og:url", window.location.href);
    setOg("og:type", "website");
    setCanonical(window.location.origin + window.location.pathname);
  }, [title, description]);
  return null;
}
