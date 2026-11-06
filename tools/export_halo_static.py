"""Export published Halo pages and their same-origin assets to a static site."""
from __future__ import annotations

import argparse
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import deque
from html.parser import HTMLParser
from pathlib import Path

BASE = "http://127.0.0.1:8090"
PUBLIC = "https://xiaowu-creator-lab.onrender.com"
PAGE_PREFIXES = ("/archives", "/categories", "/tags")
PAGE_NAMES = {"/", "/works", "/cases", "/notes", "/services", "/methods", "/about", "/contact", "/experiment", "/privacy-policy", "/user-agreement"}
LEGACY_REDIRECTS = {"enterprise.html": "/services.html", "products.html": "/categories/works.html", "system.html": "/methods.html"}
ASSET_PREFIXES = ("/themes/theme-wulaoshi/assets/", "/upload/", "/plugins/")
SKIP_PREFIXES = ("/console", "/apis/", "/api/", "/actuator", "/plugins/")
ASSET_EXTENSIONS = {".css", ".js", ".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".woff", ".woff2", ".mp4", ".webm", ".pdf", ".avif"}
ATTR_RE = re.compile(r'(?P<attr>\b(?:href|src|poster|srcset|content)=)(?P<q>["\'])(?P<value>.*?)(?P=q)', re.I | re.S)
CSS_URL_RE = re.compile(r'url\(\s*["\']?(.*?)["\']?\s*\)', re.I)


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls: list[str] = []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if not value:
                continue
            if key in {"href", "src", "poster"}:
                self.urls.append(value)
            elif key == "srcset":
                self.urls.extend(part.strip().split()[0] for part in value.split(",") if part.strip())


def request(url: str) -> bytes:
    with urllib.request.urlopen(url, timeout=35) as response:
        return response.read()


def local_url(raw: str, current: str) -> str | None:
    if not raw or raw.startswith(("data:", "mailto:", "tel:", "javascript:", "#")):
        return None
    joined = urllib.parse.urljoin(current, raw)
    parsed = urllib.parse.urlparse(joined)
    if parsed.netloc not in {"127.0.0.1:8090", "localhost:8090"}:
        return None
    return parsed.path or "/"


def page_path(path: str) -> bool:
    if any(path.startswith(prefix) for prefix in SKIP_PREFIXES):
        return False
    return path in PAGE_NAMES or path.startswith(PAGE_PREFIXES) and Path(path).suffix == ""


def output_page(path: str) -> Path:
    return Path("index.html") if path == "/" else Path(path.lstrip("/") + ".html")


def remove_halo_plugins(html: str) -> str:
    html = re.sub(r'<!--\s*plugin-[\s\S]*?<!--\s*plugin-[^>]*?end\s*-->', "", html, flags=re.I)
    html = re.sub(r'<!--\s*PluginSearchWidget[\s\S]*?<!--\s*PluginSearchWidget end\s*-->', "", html, flags=re.I)
    html = re.sub(r'<(?:link|script)\b[^>]*(?:href|src)=["\']/plugins/[^>]*?(?:</script>|>)', "", html, flags=re.I)
    html = re.sub(r'<script\b[^>]*src=["\']/halo-tracker\.js[^>]*>\s*</script>', "", html, flags=re.I)
    html = html.replace("<halo:head />", "")
    return html


def rewrite(html: str, current: str) -> str:
    html = remove_halo_plugins(html)
    def swap(match: re.Match) -> str:
        attr, quote, value = match.group("attr", "q", "value")
        if attr.lower().startswith("srcset="):
            parts = []
            for part in value.split(","):
                words = part.strip().split()
                if words:
                    path = local_url(words[0], current)
                    if path:
                        words[0] = path
                    parts.append(" ".join(words))
            value = ", ".join(parts)
        else:
            path = local_url(value, current)
            if path:
                if page_path(path) and attr.lower().startswith("href="):
                    value = "/" + output_page(path).as_posix()
                elif path.startswith(ASSET_PREFIXES):
                    value = path
                elif value.startswith(BASE):
                    value = path
        return attr + quote + value + quote
    html = ATTR_RE.sub(swap, html)
    html = html.replace(BASE, "")
    for marker in ('<link rel="canonical" href="/', '<meta property="og:url" content="/', '<meta property="og:image" content="/'):
        html = html.replace(marker, marker.replace('"/', '"' + PUBLIC + '/'))
    page_url = PUBLIC + "/" + output_page(urllib.parse.urlparse(current).path or "/").as_posix()
    html = re.sub(r'<meta property="og:url" content="[^"]*"', f'<meta property="og:url" content="{page_url}"', html)
    html = html.replace("由 Halo 驱动", "内容定期更新")
    return html


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("output", type=Path)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--replace-home", action="store_true", help="Also replace the custom public homepage with Halo's homepage")
    args = parser.parse_args()
    xml = ET.fromstring(request(BASE + "/sitemap.xml"))
    seeds = {urllib.parse.urlparse(node.text or "").path or "/" for node in xml.findall(".//{*}loc")}
    pending = deque(sorted(seeds | {"/"}))
    pages: dict[str, str] = {}
    assets: set[str] = set()
    while pending:
        path = pending.popleft()
        if path in pages or not page_path(path):
            continue
        try:
            html = request(BASE + path).decode("utf-8")
        except Exception as error:
            print(f"PAGE ERROR {path}: {error}")
            continue
        pages[path] = html
        links = Links()
        links.feed(html)
        for raw in links.urls + CSS_URL_RE.findall(html):
            resolved = local_url(raw, BASE + path)
            if not resolved:
                continue
            if page_path(resolved) and resolved not in pages:
                pending.append(resolved)
            elif resolved.startswith(ASSET_PREFIXES) and not resolved.startswith("/plugins/"):
                assets.add(resolved)
    print(f"Published pages: {len(pages)}; referenced assets: {len(assets)}")
    if args.dry_run:
        print("Pages:", *sorted(pages), sep="\n")
        print("Assets:", *sorted(assets), sep="\n")
        return
    args.output.mkdir(parents=True, exist_ok=True)
    for path, html in pages.items():
        target = args.output / output_page(path)
        if path == "/" and target.exists() and not args.replace_home:
            print("Preserved custom homepage: index.html")
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        normalized = rewrite(html, BASE + path).replace("\r\n", "\n").replace("\r", "\n")
        normalized = re.sub(r"[ \t]+(?=\n|$)", "", normalized)
        normalized = normalized.rstrip("\n") + "\n"
        target.write_text(normalized, encoding="utf-8", newline="\n")
    urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    for path in sorted(pages):
        ET.SubElement(ET.SubElement(urlset, "url"), "loc").text = PUBLIC + ("/" if path == "/" else "/" + output_page(path).as_posix())
    (args.output / "sitemap.xml").write_bytes(ET.tostring(urlset, encoding="utf-8", xml_declaration=True))
    (args.output / "robots.txt").write_text("User-agent: *\nAllow: /\nSitemap: " + PUBLIC + "/sitemap.xml\n", encoding="utf-8")
    for old, new in LEGACY_REDIRECTS.items():
        (args.output / old).write_text(
            '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">'
            f'<meta http-equiv="refresh" content="0;url={new}"><link rel="canonical" href="{PUBLIC}{new}">'
            '<title>页面已更新｜伍老师</title></head><body>'
            f'<p>页面已更新。<a href="{new}">点击进入新版页面</a></p></body></html>',
            encoding="utf-8",
        )
    queue = deque(sorted(assets))
    done: set[str] = set()
    while queue:
        path = queue.popleft()
        if path in done or not path.startswith(ASSET_PREFIXES) or path.startswith("/plugins/"):
            continue
        done.add(path)
        target = args.output / urllib.parse.unquote(path.lstrip("/"))
        target.parent.mkdir(parents=True, exist_ok=True)
        try:
            data = request(BASE + path)
        except Exception as error:
            print(f"ASSET ERROR {path}: {error}")
            continue
        target.write_bytes(data)
        if target.suffix == ".css":
            css = data.decode("utf-8")
            for raw in CSS_URL_RE.findall(css):
                resolved = local_url(raw, BASE + path)
                if resolved and resolved.startswith(ASSET_PREFIXES):
                    queue.append(resolved)
    print(f"Exported {len(pages)} pages and {len(done)} assets to {args.output}")


if __name__ == "__main__":
    main()
