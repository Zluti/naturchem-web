#!/usr/bin/env python3
"""Generate static WebP variants for raster client logos used on the homepage."""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
LOGO_DIR = ROOT / "public" / "loga-referenci"
LOGOS = {
    "swietelsky.png": (320, 88),
    "letiste-cb.png": (240, 80),
    "teplarnatucb.png": (320, 88),
    "teplarnapisek.png": (320, 88),
    "teplarnastrakonice.png": (320, 88),
}


def generate_logo(source_name: str, max_size: tuple[int, int]) -> None:
    source = LOGO_DIR / source_name
    target = source.with_suffix(".webp")

    with Image.open(source) as image:
        converted = image.convert("RGBA")
        converted.thumbnail(max_size, Image.Resampling.LANCZOS)
        converted.save(target, "WEBP", lossless=True, method=6, exact=True)
        print(f"{target.name}: {converted.width}x{converted.height}, {target.stat().st_size} bytes")


def main() -> None:
    for source_name, max_size in LOGOS.items():
        generate_logo(source_name, max_size)


if __name__ == "__main__":
    main()
