# PARCEL Fund — local site

The mockup as an actual website: four pages, real image files, no build
step and no dependencies.

## Run it

```sh
cd site
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server works — `npx serve`, `php -S localhost:8000`, whatever
you have. **It must be served over http**: the pages use ES modules, and
browsers block `import` over `file://`, so double-clicking `index.html`
gives you a blank page.

## Pages

| Path | Screen |
| --- | --- |
| `index.html` | Explore — stats header, live buy ticker, trending rail, filled-soon, movers table, early-bird feature |
| `market.html` | Marketplace — type filters, live search, cycling sort, card grid and status table |
| `property.html?sym=OMBAK` | Deed detail — hero, facts, rent history, working buy panel. Any of the 23 symbols |
| `portfolio.html` | Portfolio — value, rent vault, allocation, holdings, CSV export |

## Layout

```
site/
├── index.html · market.html · property.html · portfolio.html
├── css/app.css      one stylesheet, CSS custom properties for the palette
├── js/data.js       the 23 listings — generated from the design canvas
├── js/ui.js         shared chrome, card and ticker rendering
├── js/{explore,market,property,portfolio}.js
└── img/             <SYMBOL>.jpg (800px cards) · <SYMBOL>-lg.jpg (1600px heroes)
```

`js/data.js` is the single source of truth. Every screen — trending,
movers, filled-soon, the grid, the table, the detail page, nearby
properties — derives from that one array, so adding a property is one
entry plus two images.

## What works

Filters, search and sort are live. The buy panel does real arithmetic
(ownership share, estimated annual rent, 0.75% fee, total). The detail
page is driven by the `sym` query parameter. Claim buttons and CSV export
work. Nothing talks to a server, and there is no wallet connection — the
addresses and balances are sample data.

## Differences from the canvas

The canvas embeds its imagery as `data:` URIs because published artifacts
block external image hosts. A real site has no such limit, so images are
ordinary files here: larger and sharper (800px cards against 640px), lazily
loaded, and cached by the browser between pages.
