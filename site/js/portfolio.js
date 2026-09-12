import { bySym } from './data.js';
import { img, mount } from './ui.js';

mount('portfolio');

const HOLDINGS = [
  { sym: 'OMBAK', tokens: 1704, share: '1.099%', value: 24196.80, pl: 2214.40, rent: 2266.32 },
  { sym: 'BINGIN', tokens: 412, share: '0.294%', value: 11041.60, pl: 1088.80, rent: 1020.94 },
  { sym: 'TEGAL', tokens: 1180, share: '0.612%', value: 37052.00, pl: 944.00, rent: 2548.80 },
  { sym: 'BALANG', tokens: 224, share: '0.058%', value: 2374.40, pl: 208.32, rent: 258.80 },
  { sym: 'KELIKI', tokens: 128, share: '0.019%', value: 1587.20, pl: -30.72, rent: 123.80 },
];

const money = (n) => (n < 0 ? '−$' : '$') +
  Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

document.getElementById('holdings').innerHTML = HOLDINGS.map((h) => {
  const l = bySym(h.sym);
  return `<tr>
    <td><div class="cell">
      <img class="swatch" src="${img(h.sym)}" alt="" loading="lazy">
      <span><a class="name" href="property.html?sym=${h.sym}">${l.name}</a>
        <span style="color:var(--ink-4);margin-left:8px">${h.sym}</span></span>
    </div></td>
    <td class="num">${h.tokens.toLocaleString('en-US')}</td>
    <td class="num">${h.share}</td>
    <td class="num">${money(h.value)}</td>
    <td class="num ${h.pl >= 0 ? 'up' : 'down'}">${h.pl >= 0 ? '+' : ''}${money(h.pl)}</td>
    <td class="num">${money(h.rent)}</td>
  </tr>`;
}).join('');

document.getElementById('claim').addEventListener('click', (e) => {
  document.getElementById('claimable').textContent = '$0.00';
  document.getElementById('claimsub').textContent = 'Claimed — $284.19 sent to your wallet';
  e.target.textContent = '✓ Claimed';
  e.target.classList.replace('btn-primary', 'btn-ghost');
});

document.getElementById('csv').addEventListener('click', () => {
  const rows = [['property', 'symbol', 'tokens', 'share', 'value', 'unrealized', 'rent_per_year']]
    .concat(HOLDINGS.map((h) => [bySym(h.sym).name, h.sym, h.tokens, h.share, h.value, h.pl, h.rent]));
  const url = URL.createObjectURL(
    new Blob([rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: 'parcel-holdings.csv' });
  a.click();
  URL.revokeObjectURL(url);
});
