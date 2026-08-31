#!/usr/bin/env python3
"""Compatibility entrypoint; use the shared YAML parser and publication rules."""

from pathlib import Path
import subprocess

if __name__ == "__main__":
    subprocess.run(["node", str(Path(__file__).with_name("generate_article_indexes.js")), "search"], check=True)
