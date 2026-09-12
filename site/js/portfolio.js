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

// Ledger behind the Transaction History tab. Buys and sells move tokens,
// rent claims move only cash — so tokens is blank on a claim rather than 0.
const TX = [
  { date: '2026-09-11', type: 'Rent claim', sym: 'OMBAK',  tokens: null, amount: 94.42,   tx: '0x7f3a…c2e1' },
  { date: '2026-09-08', type: 'Buy',        sym: 'BALANG', tokens: 224,  amount: -2166.08, tx: '0x41b9…8d07' },
  { date: '2026-09-05', type: 'Rent claim', sym: 'TEGAL',  tokens: null, amount: 106.20,  tx: '0xa08c…14bb' },
  { date: '2026-09-01', type: 'Sell',       sym: 'KELIKI', tokens: -96,  amount: 1190.40, tx: '0x5d27…9f3a' },
  { date: '2026-08-29', type: 'Rent claim', sym: 'BINGIN', tokens: null, amount: 83.57,   tx: '0xbb14…62d8' },
  { date: '2026-08-24', type: 'Buy',        sym: 'TEGAL',  tokens: 1180, amount: -36108.00, tx: '0x2e91…a7c4' },
  { date: '2026-08-19', type: 'Buy',        sym: 'BINGIN', tokens: 412,  amount: -9952.80, tx: '0x9c43…0b16' },
  { date: '2026-08-12', type: 'Buy',        sym: 'OMBAK',  tokens: 1704, amount: -21982.40, tx: '0x6a75…e309' },
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

document.getElementById('tx').innerHTML = TX.map((t) => {
  const l = bySym(t.sym);
  const sign = t.amount >= 0 ? 'up' : '';
  return `<tr>
    <td style="color:var(--ink-3)">${t.date}</td>
    <td><span class="tx-type tx-${t.type.split(' ')[0].toLowerCase()}">${t.type}</span></td>
    <td><div class="cell">
      <img class="swatch" src="${img(t.sym)}" alt="" loading="lazy">
      <a class="name" href="property.html?sym=${t.sym}">${l.name}</a>
    </div></td>
    <td class="num">${t.tokens === null ? '—' : (t.tokens > 0 ? '+' : '') + t.tokens.toLocaleString('en-US')}</td>
    <td class="num ${sign}">${t.amount >= 0 ? '+' : ''}${money(t.amount)}</td>
    <td class="num" style="color:var(--ink-4)">${t.tx}</td>
  </tr>`;
}).join('');

// --- tabs -----------------------------------------------------------------
const TABS = {
  holdings: { tab: 'tab-holdings', panel: 'panel-holdings', sub: '5 villas · 3,648 tokens' },
  tx:       { tab: 'tab-tx',       panel: 'panel-tx',       sub: `${TX.length} transactions · last 30 days` },
};
let active = 'holdings';

function show(key) {
  active = key;
  for (const [k, t] of Object.entries(TABS)) {
    const on = k === key;
    document.getElementById(t.tab).setAttribute('aria-pressed', String(on));
    document.getElementById(t.panel).hidden = !on;
  }
  document.getElementById('tabsub').textContent = TABS[key].sub;
}
document.getElementById('tab-holdings').addEventListener('click', () => show('holdings'));
document.getElementById('tab-tx').addEventListener('click', () => show('tx'));

document.getElementById('claim').addEventListener('click', (e) => {
  document.getElementById('claimable').textContent = '$0.00';
  document.getElementById('claimsub').textContent = 'Claimed — $284.19 sent to your wallet';
  e.target.textContent = '✓ Claimed';
  e.target.classList.replace('btn-primary', 'btn-ghost');
});

document.getElementById('csv').addEventListener('click', () => {
  const rows = active === 'holdings'
    ? [['property', 'symbol', 'tokens', 'share', 'value', 'unrealized', 'rent_per_year']]
        .concat(HOLDINGS.map((h) => [bySym(h.sym).name, h.sym, h.tokens, h.share, h.value, h.pl, h.rent]))
    : [['date', 'type', 'property', 'symbol', 'tokens', 'amount', 'transaction']]
        .concat(TX.map((t) => [t.date, t.type, bySym(t.sym).name, t.sym, t.tokens ?? '', t.amount, t.tx]));
  const url = URL.createObjectURL(
    new Blob([rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv' }));
  const a = Object.assign(document.createElement('a'),
    { href: url, download: `parcel-${active === 'holdings' ? 'holdings' : 'transactions'}.csv` });
  a.click();
  URL.revokeObjectURL(url);
});
