import { LISTINGS } from './data.js';
import { card, img, mount } from './ui.js';

mount('market');

const KINDS = [
  { id: 'all', label: 'All' }, { id: 'villa', label: 'Villas' },
  { id: 'resort', label: 'Resorts' }, { id: 'estate', label: 'Estates' },
];
const SORTS = [
  { label: 'Net yield', fn: (a, b) => parseFloat(b.apy) - parseFloat(a.apy) },
  { label: 'Price', fn: (a, b) => a.priceNum - b.priceNum },
  { label: 'Funded %', fn: (a, b) => b.pctNum - a.pctNum },
  { label: '24h change', fn: (a, b) => b.chg - a.chg },
];

let kind = 'all';
let sort = 0;
let query = '';

const filters = document.getElementById('filters');
filters.innerHTML = KINDS.map((k) =>
  `<button class="chip" data-kind="${k.id}" aria-pressed="${k.id === kind}">${k.label}</button>`).join('');

function matching() {
  const q = query.trim().toLowerCase();
  return LISTINGS
    .filter((l) => kind === 'all' || l.kind === kind)
    .filter((l) => !q || [l.name, l.sym, l.city, l.sponsor].join(' ').toLowerCase().includes(q))
    .sort(SORTS[sort].fn);
}

function render() {
  const list = matching();
  document.getElementById('grid').innerHTML = list.map(card).join('');
  document.getElementById('empty').style.display = list.length ? 'none' : 'block';
  document.getElementById('count').textContent = `${list.length} listed`;
  document.getElementById('sort').textContent = `Sort · ${SORTS[sort].label}`;
  document.getElementById('rows').innerHTML = list.map((l) => `
    <tr>
      <td><div class="cell">
        <img class="swatch" src="${img(l.sym)}" alt="" loading="lazy">
        <a class="name" href="property.html?sym=${l.sym}">${l.name}</a>
        <span style="color:var(--ink-4)">${l.sym}</span>
      </div></td>
      <td>${l.type[0] + l.type.slice(1).toLowerCase()}</td>
      <td>${l.sponsor}</td>
      <td class="num">${l.price}</td>
      <td class="num ${l.pctNum >= 90 ? 'up' : ''}">
        ${l.pctNum >= 90 ? 'CLOSING' : 'OPEN'} · ${l.pct} FUNDED</td>
    </tr>`).join('');
  filters.querySelectorAll('.chip').forEach((c) =>
    c.setAttribute('aria-pressed', c.dataset.kind === kind));
}

filters.addEventListener('click', (e) => {
  const b = e.target.closest('[data-kind]');
  if (b) { kind = b.dataset.kind; render(); }
});
document.getElementById('sort').addEventListener('click', () => {
  sort = (sort + 1) % SORTS.length; render();
});
document.getElementById('search').addEventListener('input', (e) => {
  query = e.target.value; render();
});
render();
