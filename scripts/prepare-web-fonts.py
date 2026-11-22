"""Requires fonttools[woff]. Preserve the approved static font weights and licences."""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parent.parent / 'public/assets/fonts'
# English copy, Latin accents, typographic punctuation, currency and UI symbols.
unicodes = list(range(0x0000, 0x0250)) + list(range(0x2000, 0x2070)) + list(range(0x20A0, 0x20D0)) + [0x2122, 0x2192, 0x2197, 0x2212]
for name in ['allura-400', 'lora-400', 'lora-500', 'manrope-400', 'manrope-500', 'manrope-600']:
    font = TTFont(root / (name + '.ttf'))
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']  # Keep Allura's ligatures and contextual shaping.
    sub = subset.Subsetter(options=options)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    font.flavor = 'woff2'
    target = root / (name + '-latin.woff2')
    font.save(target)
    print(name, target.stat().st_size)
