const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || (process.platform === 'win32' ? 'msedge' : undefined), headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const root = process.env.FLORAL_TEST_URL || 'http://127.0.0.1:5184/';
  const qa = path.resolve(process.env.FLORAL_QA_DIR || '.qa/motion');
  fs.mkdirSync(qa, { recursive: true });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(root);
    await page.locator('html[data-studio-ready="true"]').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.hero-track[data-ready="true"]').waitFor();
    assert.equal(await page.locator('.hero-track').count(), 1, 'The running multi-photo hero is missing');
    const movement = await page.locator('.hero-track').evaluate(el => { const animation = el.getAnimations()[0]; animation.pause(); animation.currentTime = 0; const start = new DOMMatrix(getComputedStyle(el).transform).m41; animation.currentTime = 2000; const end = new DOMMatrix(getComputedStyle(el).transform).m41; animation.play(); return { start, end }; });
    assert.ok(movement.end > movement.start, 'Hero photos must move from left to right');
    assert.ok(new Set(await page.locator('.hero-track img').evaluateAll(images => images.map(i => i.currentSrc))).size >= 4, 'The hero needs multiple different event photographs');
    await page.getByRole('button', { name: 'Pause slideshow', exact: true }).click();
    assert.equal(await page.locator('.hero-track').evaluate(el => getComputedStyle(el).animationPlayState), 'paused');
    await page.getByRole('button', { name: 'Play slideshow', exact: true }).click();
    assert.equal(await page.locator('.hero-track').evaluate(el => getComputedStyle(el).animationPlayState), 'running');
    assert.match(await page.locator('.house-flower img').getAttribute('src'), /hero-flowers.webp/);
    const fan = page.locator('.botanical-fan');
    const fanTop = await fan.evaluate(e => e.getBoundingClientRect().top + scrollY);
    await page.evaluate(y => scrollTo({ top: y - innerHeight * .95, behavior: 'instant' }), fanTop);
    await page.waitForTimeout(100);
    const closed = await page.locator('.fan-left').boundingBox();
    const centreClosed = await page.locator('.fan-centre').boundingBox();
    assert.ok(Math.abs(closed.x - centreClosed.x) < 5, 'Side panels must begin behind the centre');
    await page.evaluate(y => scrollTo({ top: y - innerHeight * .2, behavior: 'instant' }), fanTop);
    await page.waitForTimeout(100);
    const left = await page.locator('.fan-left').boundingBox();
    const right = await page.locator('.fan-right').boundingBox();
    const centre = await page.locator('.fan-centre').boundingBox();
    assert.ok(left.x < centre.x - 150 && right.x > centre.x + 150, 'Panels must spread to both sides on scroll');
    assert.equal(await page.locator('.botanical-fan img').count(), 3);
    await page.locator('.forms-section').screenshot({ path: path.join(qa, 'fan-desktop.png') });
    for (let i = 0; i < 3; i++) {
      const row = page.locator('.flower-category').nth(i);
      await row.evaluate(el => scrollTo({ top: el.getBoundingClientRect().top + scrollY - innerHeight * .45, behavior: 'instant' }));
      await row.getByRole('button').hover();
      await page.waitForTimeout(450);
      assert.equal(await row.locator('img').evaluate(el => Number(getComputedStyle(el.parentElement).opacity)), 1, 'The matching flower must appear beside the category');
      await row.getByRole('button').focus();
      assert.equal(await row.evaluate(el => el.classList.contains('is-active')), true);
    }
    await page.locator('.botanical-types').screenshot({ path: path.join(qa, 'flowers-desktop.png') });
    assert.match(await page.locator('.listening-photo').getAttribute('src'), /roses-background.webp/);
    assert.match(await page.locator('.listening-sketch').getAttribute('src'), /botanical-sketch.svg/);
    assert.equal(await page.locator('.scale-photo-rail img').count(), 4);
    await page.locator('.studio-scale').screenshot({ path: path.join(qa, 'post-founder-desktop.png') });
    const metrics = [];
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      const geometry = await page.evaluate(() => { const hero = document.querySelector('.opening-hero').getBoundingClientRect(); const title = document.querySelector('.opening-hero h1').getBoundingClientRect(); return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, header: document.querySelector('.reference-nav').offsetHeight, hero: hero.height, titleOffset: title.y + title.height / 2 - hero.y - hero.height / 2 }; });
      assert.ok(geometry.scrollWidth <= width && Math.abs(geometry.titleOffset) < 24, 'Brand layout must not overflow or shift');
      metrics.push(geometry);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Show botanical panel 2', exact: true }).click();
    await page.waitForTimeout(600);
    const mobileCentre = await page.locator('.mobile-fan-panel').nth(1).boundingBox();
    assert.ok(mobileCentre.x >= 0 && mobileCentre.x + mobileCentre.width <= 395, 'Mobile botanical carousel must reveal the selected artwork');
    await page.locator('.forms-section').screenshot({ path: path.join(qa, 'fan-mobile.png') });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(100);
    assert.equal(await page.locator('.hero-track').evaluate(el => getComputedStyle(el).animationName), 'none');
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.locator('.forms-section').scrollIntoViewIfNeeded();
    const stillLeft = await page.locator('.fan-left').boundingBox();
    const stillCentre = await page.locator('.fan-centre').boundingBox();
    assert.ok(stillLeft.x < stillCentre.x - 150, 'Reduced-motion fan should be fully open without animation');
    assert.equal(await page.locator('.project-story').count(), 3, 'Real celebration stories must remain available');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      await page.evaluate(async () => { document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }); await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); scrollTo({ top: 0, behavior: 'instant' }); });
      await page.screenshot({ path: path.join(qa, `hero-${width}.png`) });
      for (const [selector, name] of [['.immersive-story','expansion'],['.house-intro','house'],['.studio-listening','listening'],['.studio-scale','scale']]) await page.locator(selector).screenshot({ path: path.join(qa, `${name}-${width}.png`) });
      assert.deepEqual(await page.locator('img').evaluateAll(images => images.filter(i => !i.naturalWidth).map(i => i.src)), []);
    }
    assert.deepEqual(errors, []);
    fs.writeFileSync(path.join(qa, 'motion-verification.json'), JSON.stringify({ status: 'pass', movement, metrics, pageErrors: errors }, null, 2));
    process.stdout.write('Hero motion, botanical fan, flower pop-ins, exact artwork and responsive checks: PASS\n');
  } finally { await browser.close(); }
})().catch(error => { process.stderr.write(String(error.stack || error) + '\n'); process.exitCode = 1; });
