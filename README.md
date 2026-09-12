# PARCEL Fund — marketplace mockup

Design mockup for a fractional Bali villa marketplace, authored as a
Claude Design canvas and published as a Claude artifact.

Live canvas: https://claude.ai/code/artifact/8faf9699-c44c-401f-bd89-8439bc0978fa

## Layout

- `canvas/` — the editable source. Four `.dc.html` artboards plus
  `canvas.json`, which positions them and carries the design brief notes.
  This is what the canvas editor reads and writes.
- `dist/index.html` — the published page: the canvas editor and the
  artboard sources bundled into one self-contained file. Generated on
  publish, not hand-edited.
- `assets/villas/` — property photography, one file per listing symbol.
  Empty until the generated set is committed.

## Artboards

| File | Screen | Size |
| --- | --- | --- |
| `Main.dc.html` | Explore & Marketplace | 1440 × 2700 |
| `Detail.dc.html` | Deed detail & buy | 1440 × 1180 |
| `Portfolio.dc.html` | Portfolio & rent vault | 1440 × 960 |
| `Mobile.dc.html` | Mobile — explore | 390 × 900 |

## Catalogue

`Main.dc.html` holds one `catalog` array of 23 listings. Trending, Movers,
Filled soon, the marketplace grid and the status table all derive from it,
so a new property is a single entry. Each carries price, net yield, funded
percentage, tokens remaining, 24h buyers, watchers, price change, volume,
holders and a sponsor.

Property imagery is generated (not photographed) exteriors, one per
listing, embedded as `data:` URIs — artifacts block external image hosts,
so nothing can be hotlinked. Originals live in `assets/villas/raw/`. The
seeded elevation generator that stood in for photography has been
removed.

## On the data

Locations are real Bali micro-locations. Villa names, sponsors, wallet
addresses and every price, yield, occupancy and funding figure are sample
data for feeling out the flow — nothing here maps to a property that
exists or an offering anyone can buy. The PT PMA / leasehold structure on
the deed page is a placeholder; Indonesian foreign-ownership structuring is
a question for local counsel, not a design decision.
