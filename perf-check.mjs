// perf-check.mjs — mobiele performance-check voor webapps (Next.js e.d.)
//
// Gebruik:
//   npm i -D playwright
//   npx playwright install chromium webkit
//   node perf-check.mjs http://localhost:5173   (Vite dev server)
//
// Output: perf-report/<datum>/report.md + results.json + screenshots/ + traces/
// Trace bekijken:  npx playwright show-trace perf-report/<datum>/traces/<naam>.zip

import { chromium, webkit, devices } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

// ───────────── INSTELLINGEN (pas aan per project) ─────────────
const BASE_URL = process.argv[2] ?? 'http://localhost:5173';

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'mobiel', path: '/mobiel.html' },
];

// Lat: iPhone 12/13-generatie en de Android-tegenhanger (2021-2022).
const PROFILES = [
  { name: 'iphone12-safari', engine: 'webkit', device: devices['iPhone 12'] },
  { name: 'pixel7-chrome', engine: 'chromium', device: devices['Pixel 7'], cpuThrottle: 2 },
];

// Extra schermbreedtes enkel voor screenshots + horizontale-scroll-check (Chromium).
const SCREENSHOT_WIDTHS = [360, 390, 768, 1440];

// Drempels: hierboven = rood.
const LIMITS = {
  droppedFramesPct: 5,   // % frames gemist tijdens scrollen
  longestTaskMs: 100,    // langste taak tijdens scroll
  cls: 0.1,
  lcpMs: 2500,
  domLoadMs: 3000,
};
// ──────────────────────────────────────────────────────────────

const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
const OUT = path.join('perf-report', stamp);
for (const d of ['screenshots', 'traces']) fs.mkdirSync(path.join(OUT, d), { recursive: true });

// Meetcode die in de pagina draait: observers opzetten vóór navigatie.
const INIT_OBSERVERS = `
  window.__perf = { cls: 0, lcp: 0, longTasks: [] };
  try {
    new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__perf.cls += e.value; })
      .observe({ type: 'layout-shift', buffered: true });
  } catch {}
  try {
    new PerformanceObserver(l => { const e = l.getEntries().pop(); if (e) window.__perf.lcp = e.startTime; })
      .observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {}
  try {
    new PerformanceObserver(l => { for (const e of l.getEntries()) window.__perf.longTasks.push(e.duration); })
      .observe({ type: 'longtask', buffered: true });
  } catch {}
`;

// Traag naar beneden scrollen en frames tellen (werkt in Chromium én WebKit).
async function scrollAndMeasure(page) {
  return page.evaluate(async () => {
    const frameTimes = [];
    let last = performance.now();
    let running = true;
    const tick = () => {
      const now = performance.now();
      frameTimes.push(now - last);
      last = now;
      if (running) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const tasksBefore = window.__perf.longTasks.length;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const step = 24; // px per frame ≈ rustig duimscrollen
    for (let y = 0; y <= total; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => requestAnimationFrame(r));
    }
    await new Promise(r => setTimeout(r, 300));
    running = false;

    const budget = 1000 / 60;
    const dropped = frameTimes.filter(t => t > budget * 1.5).length;
    const tasks = window.__perf.longTasks.slice(tasksBefore);
    return {
      frames: frameTimes.length,
      droppedFramesPct: +((dropped / frameTimes.length) * 100).toFixed(1),
      worstFrameMs: +Math.max(...frameTimes).toFixed(0),
      longestTaskMs: tasks.length ? +Math.max(...tasks).toFixed(0) : 0,
      longTaskCount: tasks.length,
      cls: +window.__perf.cls.toFixed(3),
      lcpMs: +window.__perf.lcp.toFixed(0),
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });
}

async function runProfile(profile) {
  const browserType = profile.engine === 'webkit' ? webkit : chromium;
  const browser = await browserType.launch();
  const rows = [];

  for (const route of ROUTES) {
    const context = await browser.newContext({ ...profile.device });
    await context.addInitScript(INIT_OBSERVERS);
    await context.tracing.start({ screenshots: true, snapshots: true });
    const page = await context.newPage();

    if (profile.engine === 'chromium') {
      const cdp = await context.newCDPSession(page);
      if (profile.cpuThrottle) await cdp.send('Emulation.setCPUThrottlingRate', { rate: profile.cpuThrottle });
      // "fast 4G"
      await cdp.send('Network.emulateNetworkConditions', {
        offline: false, latency: 40, downloadThroughput: (4 * 1024 * 1024) / 8, uploadThroughput: (3 * 1024 * 1024) / 8,
      });
    }

    const name = `${route.name}--${profile.name}`;
    let row = { page: route.name, profile: profile.name };
    try {
      const t0 = Date.now();
      await page.goto(BASE_URL + route.path, { waitUntil: 'networkidle', timeout: 45000 });
      row.domLoadMs = Date.now() - t0;
      await page.waitForTimeout(500);
      Object.assign(row, await scrollAndMeasure(page));
      await page.screenshot({ path: path.join(OUT, 'screenshots', `${name}.png`), fullPage: true });
    } catch (e) {
      row.error = String(e.message).split('\n')[0];
    }
    await context.tracing.stop({ path: path.join(OUT, 'traces', `${name}.zip`) });
    await context.close();
    rows.push(row);
    console.log(`  ${name}: ${row.error ?? `dropped ${row.droppedFramesPct}% · task ${row.longestTaskMs}ms · CLS ${row.cls} · LCP ${row.lcpMs}ms`}`);
  }
  await browser.close();
  return rows;
}

// Screenshots + overflow-check op extra breedtes (snel, Chromium, geen throttling).
async function screenshotWidths() {
  const browser = await chromium.launch();
  const overflow = [];
  for (const route of ROUTES) {
    for (const width of SCREENSHOT_WIDTHS) {
      const page = await browser.newPage({ viewport: { width, height: Math.round(width * 1.8) } });
      try {
        await page.goto(BASE_URL + route.path, { waitUntil: 'networkidle', timeout: 45000 });
        const over = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        if (over) overflow.push(`${route.name} @ ${width}px`);
        await page.screenshot({ path: path.join(OUT, 'screenshots', `${route.name}--${width}.png`), fullPage: true });
      } catch (e) {
        overflow.push(`${route.name} @ ${width}px: ${String(e.message).split('\n')[0]}`);
      }
      await page.close();
    }
  }
  await browser.close();
  return overflow;
}

function flag(v, limit, invert = false) {
  if (v === undefined) return '—';
  const bad = invert ? v < limit : v > limit;
  return bad ? `**${v}** 🔴` : `${v}`;
}

function writeReport(rows, overflow) {
  const lines = [
    `# Perf-check ${stamp}`,
    ``,
    `Base: ${BASE_URL}  ·  Lat: iPhone 12/13-generatie, CPU-throttle 2× (Chromium), fast 4G`,
    ``,
    `| Pagina | Profiel | Dropped frames % | Langste task (ms) | Long tasks | CLS | LCP (ms) | Load (ms) | H-scroll |`,
    `|---|---|---|---|---|---|---|---|---|`,
  ];
  for (const r of rows) {
    if (r.error) { lines.push(`| ${r.page} | ${r.profile} | ERROR: ${r.error} | | | | | | |`); continue; }
    lines.push(`| ${r.page} | ${r.profile} | ${flag(r.droppedFramesPct, LIMITS.droppedFramesPct)} | ${flag(r.longestTaskMs, LIMITS.longestTaskMs)} | ${r.longTaskCount} | ${flag(r.cls, LIMITS.cls)} | ${flag(r.lcpMs, LIMITS.lcpMs)} | ${flag(r.domLoadMs, LIMITS.domLoadMs)} | ${r.horizontalOverflow ? '**ja** 🔴' : 'nee'} |`);
  }
  lines.push(``, `## Horizontale scroll op extra breedtes`, ``);
  lines.push(overflow.length ? overflow.map(o => `- 🔴 ${o}`).join('\n') : `- geen`);
  lines.push(``, `## Drempels`, ``, '```json', JSON.stringify(LIMITS, null, 2), '```');
  lines.push(``, `## Traces`, ``, `\`npx playwright show-trace ${path.join(OUT, 'traces', '<naam>.zip')}\``, ``,
    `Rood in de tabel → open de trace van die pagina/profiel en kijk in de tijdlijn welke sectie de lange frames veroorzaakt.`);
  fs.writeFileSync(path.join(OUT, 'report.md'), lines.join('\n'));
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify({ rows, overflow, limits: LIMITS }, null, 2));
}

console.log(`Perf-check tegen ${BASE_URL}`);
const allRows = [];
for (const p of PROFILES) {
  console.log(`\n${p.name}`);
  allRows.push(...(await runProfile(p)));
}
console.log(`\nScreenshots op ${SCREENSHOT_WIDTHS.join('/')}px`);
const overflow = await screenshotWidths();
writeReport(allRows, overflow);
console.log(`\nRapport: ${path.join(OUT, 'report.md')}`);
