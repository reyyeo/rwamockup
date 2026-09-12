import { LISTINGS } from './data.js';
import { card, feed, img, mount } from './ui.js';

mount('explore');

// the live feed lives inside the stats cluster, not as a banner
document.getElementById('feed').outerHTML = feed();

// --- trending: most 24h buyers -------------------------------------------
const trending = [...LISTINGS].sort((a, b) => b.buys - a.buys).slice(0, 10);
document.getElementById('trending').innerHTML = trending.map((l, i) => `
  <a class="card" href="property.html?sym=${l.sym}">
    <div class="art">
      <span class="tag tag-l mono" ${i === 0 ? 'style="background:var(--accent);color:var(--accent-ink);font-weight:600"' : ''}>#${i + 1}</span>
      <span class="tag tag-r mono">${l.sym}</span>
      <span class="tag tag-apy mono">${l.apy} APY</span>
      <img src="${img(l.sym)}" alt="${l.name}" loading="lazy">
    </div>
    <div class="card-body">
      <div class="card-name" style="font-size:14.5px">${l.name}</div>
      <div class="card-city">${l.city}</div>
      <div class="bar-row" style="margin-top:12px">
        <span class="up">+${l.buys.toLocaleString('en-US')} buyers</span>
        <span class="looking">
          <svg class="eye" width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="var(--accent-text)" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true">
            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/>
            <circle cx="12" cy="12" r="2.6" fill="var(--accent-text)" stroke="none"/>
          </svg>
          ${l.watchers.toLocaleString('en-US')} looking now
        </span>
      </div>
    </div>
  </a>`).join('');

// --- closest to fully funded ---------------------------------------------
document.getElementById('filled').innerHTML =
  [...LISTINGS].sort((a, b) => b.pctNum - a.pctNum).slice(0, 4).map((l) => `
    <a class="card card-compact" href="property.html?sym=${l.sym}">
      <img class="compact-art" src="${img(l.sym)}" alt="${l.name}" loading="lazy">
      <div class="compact-body">
        <div class="card-name" style="font-size:14px">${l.name}</div>
        <div class="card-city">${l.city}</div>
        <span class="apy-inline mono">${l.apy} APY</span>
        <div class="compact-foot">
          <div class="bar-row" style="align-items:baseline">
            <span><b class="pct">${l.pct}</b> funded</span>
            <span>${l.left} left</span>
          </div>
          <div class="bar"><i style="width:${l.pct}"></i></div>
        </div>
      </div>
    </a>`).join('');

// --- movers ---------------------------------------------------------------
document.getElementById('movers').innerHTML =
  [...LISTINGS].sort((a, b) => b.chg - a.chg).slice(0, 8).map((l, i) => `
    <tr>
      <td style="color:var(--ink-5)">${String(i + 1).padStart(2, '0')}</td>
      <td><div class="cell">
        <img class="swatch" src="${img(l.sym)}" alt="" loading="lazy">
        <span><span class="name">${l.name}</span>
          <span style="color:var(--ink-4);margin-left:8px">${l.sym}</span></span>
      </div></td>
      <td class="num">${l.price}</td>
      <td class="num ${l.chg >= 0 ? 'up' : 'down'}">${l.chg >= 0 ? '+' : ''}${l.chg.toFixed(1)}%</td>
      <td class="num">${l.vol}</td>
      <td class="num">${l.holders}</td>
    </tr>`).join('');

// --- early bird feature ---------------------------------------------------
const f = LISTINGS[0];
document.getElementById('feature').innerHTML = `
  <div class="feature-art"><img src="img/${f.sym}-lg.jpg" alt="${f.name}"></div>
  <div class="feature-body">
    <div class="pill">OPEN RAISE · ${f.apy} NET YIELD</div>
    <h2 style="margin:18px 0 6px;font-size:30px;letter-spacing:-.03em">${f.name}</h2>
    <div class="card-city">SPONSOR: ${f.sponsor.toUpperCase()} · ${f.city} · ${f.spec}</div>
    <p style="color:var(--ink-3);line-height:1.7">${f.blurb}</p>
    <div class="stat-row">
      <div><div class="label">Token price</div><div class="v">${f.price}</div></div>
      <div><div class="label">Funded</div><div class="v">${f.pct}</div></div>
    </div>
    <div class="bar" style="margin-top:18px"><i style="width:${f.pct}"></i></div>
    <a class="btn btn-primary" style="margin-top:24px;width:100%" href="property.html?sym=${f.sym}">
      BUY TOKENS</a>
  </div>`;

// --- headline figures step with the feed ----------------------------------
let amount = 86.21;
let investors = 34939;
setInterval(() => {
  amount = +(amount + 0.01).toFixed(2);
  if (amount > 86.32) amount = 86.21;
  investors = investors >= 34946 ? 34939 : investors + 1;
  document.getElementById('invest').textContent = `$${amount.toFixed(2)}M`;
  document.getElementById('investors').textContent = investors.toLocaleString('en-US');
}, 2600);

document.getElementById('claim').addEventListener('click', (e) => {
  e.target.textContent = '✓ CLAIMED';
  e.target.classList.replace('btn-primary', 'btn-ghost');
});
