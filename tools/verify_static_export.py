"""Check a Halo static snapshot for missing local links and assets."""
from __future__ import annotations

import argparse
import re
import urllib.parse
from html.parser import HTMLParser
from pathlib import Path


class URLs(HTMLParser):
    def __init__(self):
        super().__init__()
        self.values = []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if not value:
                continue
            if key in {"href", "src", "poster"}:
                self.values.append(value)
            elif key == "srcset":
                self.values.extend(part.strip().split()[0] for part in value.split(",") if part.strip())


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("root", type=Path)
    args = parser.parse_args()
    root = args.root.resolve()
    errors = []
    pages = list(root.rglob("*.html"))
    for file in pages:
        html = file.read_text(encoding="utf-8")
        if re.search(r"(?:127\.0\.0\.1:8090|localhost:8090|/plugins/)", html):
            errors.append(f"{file.relative_to(root)}: local Halo or plugin URL remains")
        urls = URLs()
        urls.feed(html)
        for value in urls.values:
            if value.startswith(("#", "mailto:", "tel:", "data:")):
                continue
            parsed = urllib.parse.urlparse(urllib.parse.urljoin("https://example.com/" + file.relative_to(root).as_posix(), value))
            if parsed.netloc != "example.com":
                continue
            target = root / urllib.parse.unquote(parsed.path.lstrip("/"))
            if parsed.path == "/":
                target = root / "index.html"
            if not target.exists():
                errors.append(f"{file.relative_to(root)} -> {parsed.path}")
    for file in root.rglob("*.css"):
        css = file.read_text(encoding="utf-8")
        for value in re.findall(r'url\(\s*["\']?(.*?)["\']?\s*\)', css):
            if value.startswith(("data:", "http:", "https:")):
                continue
            parsed = urllib.parse.urlparse(urllib.parse.urljoin("https://example.com/" + file.relative_to(root).as_posix(), value))
            target = root / urllib.parse.unquote(parsed.path.lstrip("/"))
            if not target.exists():
                errors.append(f"{file.relative_to(root)} -> {parsed.path}")
    print(f"Checked {len(pages)} HTML pages; missing or invalid references: {len(errors)}")
    for error in errors[:40]:
        print(error)
    raise SystemExit(1 if errors else 0)


if __name__ == "__main__":
    main()
