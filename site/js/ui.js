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

// Live purchase feed. The canvas shows three rows at a time, each new buy
// pushing the stack up from the bottom, so the list is duplicated once and
// stepped one row at a time by CSS.
const BUYERS = ['0x9F2A…C41D', 'hbhDct.eth', '0x41B7…9E02', 'vw3roy.eth', '0xD108…77A4',
  'casaverde.eth', '0x6C55…1B8F', 'bukitcap.eth', 'sawahdao.eth', 'atlas-ib.eth'];

export function feed() {
  const rows = LISTINGS.slice(0, 8).map((l, i) => {
    const qty = (((l.buys * 7) % 48) + 1) * 100;
    return `<div class="feed-row">
        <b>${BUYERS[i]}</b><span>bought</span><i>${qty.toLocaleString('en-US')}</i>
        <span class="feed-spacer"></span><em>${l.name}</em>
      </div>`;
  }).join('');
  return `<div class="feed-col">
      <div class="feed-head"><span class="dot"></span><span class="mono">LIVE BUYS</span></div>
      <div class="feed-wrap"><div class="feed-rail">${rows}${rows}</div></div>
    </div>`;
}

// Nav mirrors the design canvas. Trade, Insights, Earn and List a property
// have no page yet, so they render as disabled rather than dead links.
const NAV = [
  { label: 'Explore', page: 'explore', href: 'index.html' },
  { label: 'Marketplace', page: 'market', href: 'market.html', menu: [
    { label: 'All Properties', sub: 'Every open listing', href: 'market.html' },
    { label: 'Property Managers', sub: 'Operators and sponsors', href: 'market.html#sponsors' }
  ] },
  { label: 'Trade', page: 'trade' },
  { label: 'Insights', page: 'insights' },
  { label: 'Earn', page: 'earn' },
  { label: 'Portfolio', page: 'portfolio', href: 'portfolio.html' },
  { label: 'List a property', page: 'list' }
];

export function chrome(page) {
  const items = NAV.map((n) => {
    const current = n.page === page ? ' aria-current="page"' : '';
    if (!n.href) {
      return `<span class="nav-soon" aria-disabled="true" title="Not in this mockup">${n.label}</span>`;
    }
    const link = `<a href="${n.href}"${current}>${n.label}${n.menu ? ' <svg class="chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>' : ''}</a>`;
    if (!n.menu) return link;
    const menu = n.menu.map((m) => `
        <a class="navlink" href="${m.href}">
          <span class="navlink-t">${m.label}</span>
          <span class="navlink-s">${m.sub}</span>
        </a>`).join('');
    return `<div class="navitem">${link}<div class="navmenu"><div class="navmenu-card">${menu}</div></div></div>`;
  }).join('');

  return `
    <header class="topbar">
      <a class="brand" href="index.html">PARCEL<span>.</span></a>
      <nav class="nav">${items}</nav>
      <div class="spacer"></div>
      <a class="rent-chip" href="portfolio.html">
        <span class="rent-label mono">RENT</span>
        <span class="rent-v mono">$284.19</span>
        <span class="rent-claim mono">CLAIM</span>
      </a>
      <div class="wallet"><span class="dot"></span>0x9F2A…C41D</div>
    </header>`;
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
