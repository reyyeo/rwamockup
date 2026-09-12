# Media assets

Everything the canvas shows that isn't drawn in code lives here.

```
assets/
├── villas/       listing photography, one image per listing symbol
│   └── raw/      untouched originals, before any resizing
├── brand/        logo, wordmark, favicon
└── ui/           textures, patterns, non-property imagery
```

## Naming

Listing photos are named for the listing's **symbol**, not its display
name — the symbol is the key `Main.dc.html` joins on, and display names
change more often than symbols do.

```
assets/villas/OMBAK.jpg      ✓
assets/villas/villa-ombak.jpg ✗
```

The 23 symbols currently in the catalogue:

```
OMBAK    BERAWA   BABAKAN  PERER    SESEH    KEDUNGU  NYANYI   PETIT
UMALAS   BINGIN   PECATU   BALANG   BUKIT    SINDHU   SAYAN    TEGAL
PENEST   KELIKI   SIDEMEN  AMED     MUNDUK   LEMBO    TANAH
```

## Format and size

| Use | Ratio | Longest edge | Format |
| --- | --- | --- | --- |
| Card art (grid, trending, filled soon) | 3:2 | 640 px | JPEG q≈70 |
| Deed hero, featured panel | 3:2 | 1280 px | JPEG q≈72 |
| Originals | any | as generated | PNG |

Keep originals in `villas/raw/` and the web-sized version at
`villas/<SYMBOL>.jpg` — `raw/` is the source of truth, and the `.jpg`
alongside it is what gets embedded. The canvas embeds images as `data:` URIs — artifacts
block external image hosts at the CSP level, so nothing can be hotlinked —
which means file size lands directly in page weight. The published page
must stay under 16 MB. The current set runs ~34 KB per card at 640px q58
— detailed photography doesn't compress to 15 KB without visible mush —
which puts the published page at 3.7 MB.

## Provenance

Property imagery is generated, not photographed, and depicts no real
building. If that ever changes, record the source and licence for each
file here before committing it.
