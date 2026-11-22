const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge', headless: true });
  const root = process.env.FLORAL_TEST_URL || 'http://127.0.0.1:5184/';
  const qa = path.resolve(process.env.FLORAL_QA_DIR || '.qa/performance');
  fs.mkdirSync(qa, { recursive: true });
  const measurements = [];
  try {
    const staticContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const staticPage = await staticContext.newPage();
    await staticPage.goto(root);
    assert.equal(await staticPage.getByRole('heading', { level: 1 }).count(), 1, 'The opening must arrive as ready-to-display HTML before app code runs');
    assert.equal(await staticPage.locator('.reference-nav .identity-monogram').evaluate(el => el.complete && el.naturalWidth === 320), true);
    await staticContext.close();
    for (const width of [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 }, deviceScaleFactor: width === 390 ? 2 : 1 });
      const page = await context.newPage();
      const requests = [];
      const errors = [];
      page.on('request', request => requests.push(request.url()));
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(root);
      await page.locator('.hero-track[data-ready="true"]').waitFor();
      await page.locator('html[data-studio-ready="true"]').waitFor();
    await page.evaluate(() => document.fonts.ready);
      assert.ok(!requests.some(url => /master-logo\.jpg/.test(url)), 'The original 3.6 MB logo must not be downloaded to display the identity');
      assert.ok(!requests.some(url => /\.ttf(?:\?|$)/.test(url)), 'The page must use compressed fonts');
      const opening = width === 390 ? 'day-lounge' : 'day-room';
      const hidden = width === 390 ? 'day-room' : 'day-lounge';
      const resources = await page.evaluate(() => performance.getEntriesByType('resource').map(item => ({ name: item.name, start: item.startTime, end: item.responseEnd, bytes: item.encodedBodySize, initiator: item.initiatorType })));
      const first = resources.find(item => item.name.includes(`/optimized/${opening}-`) && item.name.endsWith('.avif'));
      assert.equal(first?.initiator, 'link', 'The opening photograph must be discovered directly from HTML');
      // The same day-room photograph is also a legitimate WebP project cover;
      // only the art-directed AVIF resource identifies the hero download here.
      assert.ok(!requests.some(url => url.includes(`/optimized/${hidden}-`) && url.endsWith('.avif')), 'The hidden desktop/phone opening must not download');
      assert.match(await page.locator('.hero-slide').last().locator('img').evaluate(el => el.currentSrc), new RegExp(`/optimized/${opening}-`));
      assert.equal(resources.filter(item => item.name === first.name).length, 1, 'Preloading must not duplicate the opening image request');
      const followups = resources.filter(item => /\/optimized\/(night-|heritage-)/.test(item.name));
      assert.ok(followups.every(item => item.start >= first.end - 1), 'Remaining slides must wait for the opening photo');
      assert.equal(await page.locator('.identity-monogram').first().evaluate(el => el.complete && el.naturalWidth === 320), true);
      const footer = await page.locator('.reference-footer').boundingBox();
      assert.ok(width === 390 ? footer.height < 600 : Math.abs(footer.height - 390) < 1, 'Footer sizing must preserve desktop and compact mobile');
      await page.screenshot({ path: path.join(qa, `opening-${width}.png`) });
      await page.locator('.reference-footer').scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      assert.equal(await page.locator('.hero-track').evaluate(el => getComputedStyle(el).animationPlayState), 'paused', 'The offscreen slideshow must pause');
      await page.locator('.reference-footer').screenshot({ path: path.join(qa, `footer-${width}.png`) });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.deepEqual(errors, []);
      measurements.push({ width, footerHeight: footer.height, opening: first, initialBytes: resources.reduce((sum, item) => sum + item.bytes, 0), errors });
      await context.close();
    }
    const failureContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const failurePage = await failureContext.newPage();
    await failurePage.route(/\/assets\/PortfolioOverlays-[^/]+\.js$/, route => route.abort('failed'));
    await failurePage.goto(root);
    await failurePage.locator('html[data-studio-ready="true"]').waitFor();
    await failurePage.getByRole('button', { name: /^Saved inspiration,/ }).click();
    await failurePage.getByRole('alert').waitFor();
    assert.equal(await failurePage.getByRole('heading', { level: 1 }).count(), 1, 'A failed dialog download must not remove the homepage');
    await failurePage.getByRole('button', { name: 'Close', exact: true }).click();
    assert.equal(await failurePage.getByRole('alert').count(), 0, 'Dialog recovery must be dismissible');
    await failureContext.close();
    fs.writeFileSync(path.join(qa, 'loading-checks.json'), JSON.stringify(measurements, null, 2));
    console.log('Loading order, responsive images, logo, fonts, offscreen pause and mobile/desktop footer passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
