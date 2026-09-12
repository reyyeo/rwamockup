import { LISTINGS, bySym } from './data.js';
import { mount } from './ui.js';

mount('market');

const sym = new URLSearchParams(location.search).get('sym') || 'OMBAK';
const l = bySym(sym) || LISTINGS[0];
document.title = `${l.name} — PARCEL Fund`;

const supply = 155000;
const rent = [12, 14, 13, 15, 14, 16, 15, 13, 17, 16, 18, 17];
const months = ['S', 'O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A'];

document.getElementById('page').innerHTML = `
  <div class="crumb">Explore / ${l.type} / ${l.sym}</div>

  <div class="hero">
    <div class="hero-tags">
      <span class="tag mono" style="position:static">${l.sym}</span>
      <span class="tag mono" style="position:static">TITLE VERIFIED · BADUNG REGENCY</span>
    </div>
    <img src="img/${l.sym}-lg.jpg" alt="${l.name}">
  </div>

  <div class="sec">
    <div>
      <h2 style="font-size:32px">${l.name}</h2>
      <div class="sub" style="padding-top:8px">${l.city} · ${l.spec}</div>
    </div>
    <div class="spacer"></div>
    <div class="sub">sponsor: ${l.sponsor}</div>
  </div>

  <div class="facts">
    <div class="fact"><div class="label">Token price</div><div class="v">${l.price}</div></div>
    <div class="fact"><div class="label">Net yield</div><div class="v">${l.apy}</div></div>
    <div class="fact"><div class="label">Funded</div><div class="v">${l.pct}</div></div>
    <div class="fact"><div class="label">24h change</div>
      <div class="v ${l.chg >= 0 ? 'up' : 'down'}">${l.chg >= 0 ? '+' : ''}${l.chg.toFixed(1)}%</div></div>
  </div>

  <div class="detail">
    <div>
      <div class="panel">
        <div class="prose">${l.blurb}
          The freehold title is held in a PT PMA; ${supply.toLocaleString('en-US')} ${l.sym}
          tokens map 1:1 to shares in it, and net rental income after management and tax is
          swept to the rent vault every Friday at 00:00 UTC.</div>
        <div class="specs">
          <div class="spec-row"><span>Ownership</span><span>Freehold via PT PMA</span></div>
          <div class="spec-row"><span>Token supply</span><span>${supply.toLocaleString('en-US')}</span></div>
          <div class="spec-row"><span>Tokens left</span><span>${l.left}</span></div>
          <div class="spec-row"><span>Holders</span><span>${l.holders}</span></div>
          <div class="spec-row"><span>24h volume</span><span>${l.vol}</span></div>
          <div class="spec-row"><span>Settlement</span><span>USDC on Base</span></div>
        </div>
      </div>

      <div class="panel" style="margin-top:20px">
        <div class="sec" style="padding:20px 24px 0"><h2 style="font-size:17px">Rent history</h2>
          <div class="sub">net rent per token, weekly sweep</div></div>
        <div class="chart">${rent.map((v) =>
          `<div style="height:${(v / 18) * 100}%"></div>`).join('')}</div>
        <div class="specs" style="grid-template-columns:1fr;padding-top:0">
          <div class="bar-row" style="margin:0">
            ${months.map((m) => `<span>${m}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="panel buy">
      <div class="label">Last price</div>
      <div class="stat-row" style="margin-top:8px;align-items:baseline">
        <div class="v mono" style="font-size:30px">${l.price}</div>
        <div class="${l.chg >= 0 ? 'up' : 'down'} mono" style="font-size:13px">
          ${l.chg >= 0 ? '+' : ''}${l.chg.toFixed(1)}% 24h</div>
      </div>

      <div class="label" style="margin-top:22px">Tokens</div>
      <div class="qty">
        <button class="step" id="dec" aria-label="fewer tokens">–</button>
        <input id="qty" type="number" min="1" value="620" inputmode="numeric">
        <button class="step" id="inc" aria-label="more tokens">+</button>
      </div>

      <div class="specs" style="grid-template-columns:1fr;padding:18px 0 0">
        <div class="spec-row"><span>Ownership</span><span id="own"></span></div>
        <div class="spec-row"><span>Est. rent / yr</span><span id="yr"></span></div>
        <div class="spec-row"><span>Fee (0.75%)</span><span id="fee"></span></div>
      </div>

      <div class="total"><span class="label">You pay</span><span class="v" id="total"></span></div>
      <button class="btn btn-primary" style="width:100%;margin-top:18px" id="cta">Review purchase</button>
      <div class="fineprint">Offshore offering · accredited wallets only ·
        transfers locked 12 months from mint</div>
    </div>
  </div>

  <section>
    <div class="sec"><h2>More in ${l.city.split(' · ')[0]}</h2></div>
    <div class="grid" id="more"></div>
  </section>`;

// --- buy panel maths ------------------------------------------------------
const qty = document.getElementById('qty');
const money = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function recalc() {
  const n = Math.max(1, parseInt(qty.value, 10) || 1);
  const gross = n * l.priceNum;
  const fee = gross * 0.0075;
  document.getElementById('own').textContent = ((n / supply) * 100).toFixed(3) + '%';
  document.getElementById('yr').textContent = money(gross * (parseFloat(l.apy) / 100 || 0));
  document.getElementById('fee').textContent = money(fee);
  document.getElementById('total').textContent = money(gross + fee);
}
qty.addEventListener('input', recalc);
document.getElementById('inc').addEventListener('click', () => {
  qty.value = (parseInt(qty.value, 10) || 0) + 10; recalc();
});
document.getElementById('dec').addEventListener('click', () => {
  qty.value = Math.max(1, (parseInt(qty.value, 10) || 0) - 10); recalc();
});
document.getElementById('cta').addEventListener('click', (e) => {
  e.target.textContent = '✓ Signed — settling on Base';
  e.target.classList.replace('btn-primary', 'btn-ghost');
});
recalc();

// --- nearby ---------------------------------------------------------------
const area = l.city.split(' · ')[0];
const near = LISTINGS.filter((x) => x.sym !== l.sym)
  .sort((a, b) => (b.city.startsWith(area) ? 1 : 0) - (a.city.startsWith(area) ? 1 : 0))
  .slice(0, 3);
import('./ui.js').then(({ card }) => {
  document.getElementById('more').innerHTML = near.map(card).join('');
});
