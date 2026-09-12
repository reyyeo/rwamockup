// Shared rendering helpers. Every screen builds from the same LISTINGS
// array, so a new property is one entry in data.js and nothing else.
import { LISTINGS } from './data.js';

export const el = (html) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};

export const img = (sym, large) => `img/${sym}${large ? '-lg' : ''}.jpg`;

export function card(l) {
  return `
    <a class="card" href="property.html?sym=${l.sym}">
      <div class="art">
        <span class="tag tag-l mono">${l.sym}</span>
        <span class="tag tag-r mono">${l.type}</span>
        <span class="tag tag-apy mono">${l.apy} APY</span>
        <img src="${img(l.sym)}" alt="${l.name}" loading="lazy" width="800" height="533">
      </div>
      <div class="card-body">
        <div class="card-name">${l.name}</div>
        <div class="card-city">${l.city}</div>
        <div class="kv">
          <div><div class="label">Price / token</div><div class="v">${l.price}</div></div>
        </div>
        <div class="bar-row"><span>${l.pct} funded</span><span>${l.left} left</span></div>
        <div class="bar"><i style="width:${l.pct}"></i></div>
        <div class="card-actions">
          <span class="btn btn-primary">BUY TOKENS</span>
          <span class="btn btn-ghost btn-sm">Trade</span>
        </div>
      </div>
    </a>`;
}

// Rolling purchase feed under the top bar. Duplicated once so the CSS
// translateX(-50%) loop is seamless.
const BUYERS = ['0x9F2A…C41D', 'hbhDct.eth', '0x41B7…9E02', 'vw3roy.eth', '0xD108…77A4',
  'casaverde.eth', '0x6C55…1B8F', 'bukitcap.eth', 'sawahdao.eth', 'atlas-ib.eth'];

export function ticker() {
  const rows = LISTINGS.slice(0, 10).map((l, i) => {
    const qty = (((l.buys * 7) % 48) + 1) * 100;
    return `<span><b>${BUYERS[i]}</b> bought ${qty.toLocaleString('en-US')} ${l.name}</span>`;
  }).join('');
  return `<div class="ticker"><div class="ticker-rail">${rows}${rows}</div></div>`;
}

export function chrome(page) {
  const on = (p) => (p === page ? ' aria-current="page"' : '');
  return `
    <header class="topbar">
      <a class="brand" href="index.html">PARCEL<span>.</span></a>
      <nav class="nav">
        <a href="index.html"${on('explore')}>Explore</a>
        <a href="market.html"${on('market')}>Marketplace</a>
        <a href="portfolio.html"${on('portfolio')}>Portfolio</a>
      </nav>
      <div class="spacer"></div>
      <div class="wallet"><span class="dot"></span>0x9F2A…C41D</div>
    </header>
    ${ticker()}`;
}

export function footer() {
  return `<footer>
    PARCEL FUND — DESIGN MOCKUP · NOT AN OFFERING<br>
    Locations are real Bali areas. Villa names, sponsors, wallets and every price,
    yield and funding figure are sample data. Nothing here maps to a property that
    exists or an offering anyone can buy.
  </footer>`;
}

export function mount(page) {
  document.body.insertAdjacentHTML('afterbegin', chrome(page));
  document.body.insertAdjacentHTML('beforeend', footer());
}
