#!/usr/bin/env python3
"""Compatibility entrypoint; never expose draft/future article URLs to crawlers."""

from pathlib import Path
import subprocess

if __name__ == "__main__":
    subprocess.run(["node", str(Path(__file__).with_name("generate_article_indexes.js")), "llms"], check=True)
