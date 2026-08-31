#!/usr/bin/env python3
"""Compatibility entrypoint; use the shared Node publication/date rules."""

from pathlib import Path
import subprocess

if __name__ == "__main__":
    subprocess.run(["node", str(Path(__file__).with_name("generate_article_indexes.js")), "locale-map"], check=True)
