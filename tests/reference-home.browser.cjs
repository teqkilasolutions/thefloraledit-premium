const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || (process.platform === 'win32' ? 'msedge' : undefined), headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const root = process.env.FLORAL_TEST_URL || 'http://127.0.0.1:5184/';
  const qa = path.resolve(process.env.FLORAL_QA_DIR || '.qa/reference-home');
  fs.mkdirSync(qa, { recursive: true });
  const errors = [];
  const metrics = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(root);
    await page.locator('html[data-studio-ready="true"]').waitFor();
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('.scroll-gallery').count(), 1, 'The post-hero expanding image section is missing');
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(100);
      const geometry = await page.evaluate(() => {
        const rect = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
        return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, header: rect('.reference-nav'), hero: rect('.opening-hero'), heroTitle: rect('.opening-hero h1'), logo: rect('.studio-brand'), footer: rect('.reference-footer'), mainHeadings: [...document.querySelectorAll('main h1,main h2')].every(e => getComputedStyle(e).fontFamily.includes('Allura')) };
      });
      assert.ok(geometry.scrollWidth <= width, `Horizontal overflow at ${width}`);
      assert.equal(geometry.mainHeadings, true);
      assert.ok(Math.abs(geometry.heroTitle.y + geometry.heroTitle.height / 2 - geometry.hero.y - geometry.hero.height / 2) < 24, 'The hero title must remain centred over its photograph');
      assert.ok(geometry.logo.x >= 0 && geometry.logo.right <= width, 'Logo is clipped');
      if (width === 1440) {
        assert.ok(Math.abs(geometry.header.height - 101) < 1, 'Desktop header proportion');
        assert.ok(Math.abs(geometry.hero.height - 692) < 2, 'Desktop hero proportion');
        assert.ok(Math.abs(geometry.footer.height - 390) < 2, 'Desktop footer proportion');
      }
      if (width === 390) {
        assert.ok(Math.abs(geometry.header.height - 137.1) < 2, 'Mobile header proportion');
        assert.ok(Math.abs(geometry.hero.height - 594.14) < 2, 'Mobile hero proportion');
        assert.ok(geometry.footer.height < 600, 'Mobile footer must fit its content without the old fixed-height blank space');
      }
      const range = await page.locator('.scroll-gallery').evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, height: el.offsetHeight, viewport: innerHeight }));
      await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), range.top);
      await page.waitForFunction(() => document.querySelector('.scroll-gallery').style.getPropertyValue('--gallery-progress') !== '');
      const initial = await page.locator('.scroll-gallery-focus').boundingBox();
      await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), range.top + range.height - range.viewport - 2);
      await page.waitForFunction(() => Number(document.querySelector('.scroll-gallery').style.getPropertyValue('--gallery-progress')) > .98);
      const expanded = await page.locator('.scroll-gallery-focus').boundingBox();
      assert.ok(expanded.width >= width - 10 && expanded.height >= range.viewport - 10, 'The photograph must cover the viewport');
      await page.screenshot({ path: path.join(qa, `expanded-${width}.png`) });
      await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), range.top);
      await page.waitForTimeout(100);
      const reversed = await page.locator('.scroll-gallery-focus').boundingBox();
      assert.ok(Math.abs(reversed.width - initial.width) < 2, 'Scroll reversal must restore the inset image');
      metrics.push({ ...geometry, initial, expanded });
    }
    // Reproduce mobile browser chrome: CSS 100vh can be larger than the
    // visible viewport. The expanded image must cover that measured viewport.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => { window.originalHeightDescriptor = Object.getOwnPropertyDescriptor(window, 'innerHeight'); Object.defineProperty(window, 'innerHeight', { configurable: true, value: 700 }); dispatchEvent(new Event('resize')); });
    const rangeWithChrome = await page.locator('.scroll-gallery').evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, height: el.offsetHeight }));
    await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), rangeWithChrome.top + rangeWithChrome.height - 700 + 1);
    await page.waitForTimeout(150);
    const phoneExpanded = await page.locator('.scroll-gallery-focus').boundingBox();
    assert.ok(Math.abs(phoneExpanded.height - 700) < 2, 'Expansion must match the visible mobile viewport');
    const expandedTransform = await page.locator('.scroll-gallery-focus').evaluate(el => getComputedStyle(el).transform);
    // Change dimensions while already fully expanded; the scale is unchanged,
    // but the underlying photo still needs its new cover dimensions.
    await page.setViewportSize({ width: 700, height: 900 });
    await page.evaluate(() => { Object.defineProperty(window, 'innerHeight', window.originalHeightDescriptor); delete window.originalHeightDescriptor; dispatchEvent(new Event('resize')); });
    const resizedRange = await page.locator('.scroll-gallery').evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, height: el.offsetHeight }));
    await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), resizedRange.top + resizedRange.height - 900 + 1);
    await page.waitForTimeout(150);
    const resizedCover = await page.locator('.scroll-gallery-focus').evaluate(el => ({ frame: el.getBoundingClientRect().toJSON(), photo: el.querySelector('img').getBoundingClientRect().toJSON() }));
    assert.equal(await page.locator('.scroll-gallery-focus').evaluate(el => getComputedStyle(el).transform), expandedTransform, 'This regression must exercise an unchanged fully expanded transform');
    assert.ok(resizedCover.photo.width >= resizedCover.frame.width - 1 && resizedCover.photo.height >= resizedCover.frame.height - 1, 'Viewport enlargement must never expose the gallery background');
    await page.setViewportSize({ width: 390, height: 844 });
    assert.match(await page.locator('.scale-copy h2').textContent(), /stem\s+to/, 'The mobile scale heading must keep a word boundary');
    assert.match(await page.locator('.forms-note p').textContent(), /arrangements\.\s+Flowers/, 'Hidden line breaks must preserve sentence spacing');
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      assert.equal(await page.locator('.reference-nav').evaluate(el => el.contains(document.activeElement)), true, 'Menu keyboard focus escaped');
    }
    await page.getByRole('button', { name: /^Saved inspiration,/ }).click();
    await page.getByRole('dialog', { name: 'Your inspiration', exact: true }).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Open menu', exact: true }).count(), 1, 'Opening inspiration must close the mobile menu');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog[open]').count(), 0);
    assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden', 'Closing inspiration must unlock page scrolling');
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('button', { name: 'Open menu', exact: true }).getAttribute('aria-expanded'), 'false');
    await page.getByRole('button', { name: 'Show botanical panel 2', exact: true }).click();
    await page.waitForTimeout(600);
    await page.getByRole('button', { name: 'Explore After dark', exact: true }).scrollIntoViewIfNeeded();
    const night = await page.getByRole('button', { name: 'Explore After dark', exact: true }).boundingBox();
    assert.ok(night.x >= 0 && night.x + night.width <= 395, 'Mobile carousel control must reveal its target');
    await page.getByRole('button', { name: 'Explore After dark', exact: true }).click();
    await page.getByRole('dialog', { name: 'After dark', exact: true }).waitFor();
    await page.keyboard.press('Escape');
    await page.getByLabel('Your email for studio notes').fill('design-review@example.com');
    await page.getByRole('button', { name: 'Ask about studio notes', exact: true }).click();
    const enquiry = page.getByRole('dialog', { name: 'Enquire about your occasion', exact: true });
    assert.equal(await enquiry.getByLabel('Email address', { exact: true }).inputValue(), 'design-review@example.com');
    assert.match(await enquiry.getByLabel("I'm interested in", { exact: true }).inputValue(), /studio notes/i);
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Get in touch', exact: true }).click();
    await enquiry.waitFor();
    await page.keyboard.press('Escape');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(150);
    const reduced = await page.locator('.scroll-gallery').boundingBox();
    assert.ok(reduced.height < 1600, 'Reduced motion must remove the long pinned scroll');
    assert.equal(await page.locator('.contact-ticker-track').evaluate(el => getComputedStyle(el).animationName), 'none');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      await page.evaluate(async () => { document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }); await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); scrollTo({ top: 0, behavior: 'instant' }); });
      await page.screenshot({ path: path.join(qa, `home-${width}.png`) });
      await page.locator('.reference-footer').screenshot({ path: path.join(qa, `footer-${width}.png`) });
      for (const [selector, label] of [['.house-intro','house'],['.forms-section','forms'],['.botanical-types','flowers'],['.studio-listening','approach'],['.studio-scale','scale'],['.studio-notes','notes'],['.contact-panel','contact']]) {
        await page.locator(selector).screenshot({ path: path.join(qa, `${label}-${width}.png`) });
      }
      await page.screenshot({ path: path.join(qa, `full-${width}.png`), fullPage: true });
      assert.deepEqual(await page.locator('img').evaluateAll(images => images.filter(i => !i.naturalWidth).map(i => i.src)), []);
    }
    assert.deepEqual(errors, []);
    fs.writeFileSync(path.join(qa, 'reference-verification.json'), JSON.stringify({ status: 'pass', metrics, pageErrors: errors }, null, 2));
    process.stdout.write('Reference layout, scrolling, mobile carousel, menu, contact and reduced motion: PASS\n');
  } catch (error) {
    await page.screenshot({ path: path.join(qa, 'failure.png') }).catch(() => {});
    process.stderr.write(JSON.stringify(await page.locator('.menu-button').evaluate(el => ({ width: innerWidth, scrollY, display: getComputedStyle(el).display, visibility: getComputedStyle(el).visibility, bounds: el.getBoundingClientRect().toJSON() })).catch(() => ({}))) + '\n');
    throw error;
  } finally { await browser.close(); }
})().catch(error => { process.stderr.write(String(error.stack || error) + '\n'); process.exitCode = 1; });
