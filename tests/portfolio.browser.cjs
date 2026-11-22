const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || (process.platform === 'win32' ? 'msedge' : undefined), headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  const page = await context.newPage();
  const root = process.env.FLORAL_TEST_URL || 'http://127.0.0.1:5184/';
  const qa = path.resolve(process.env.FLORAL_QA_DIR || path.join(__dirname, '../.qa'));
  fs.mkdirSync(qa, { recursive: true });
  const checks = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(root);
    await page.evaluate(() => { localStorage.clear(); });
    await page.reload();
    await page.locator('main').waitFor();
    assert.doesNotMatch(await page.locator('meta[name="description"]').getAttribute('content'), /Delhi|NCR/i, 'Metadata must not assert an unconfirmed service area');
    await page.evaluate(() => document.fonts.ready);
    const opener = page.getByRole('button', { name: 'Explore A room in bloom', exact: true });
    assert.equal(await opener.count(), 1, 'The real event portfolio is missing');
    assert.equal(await page.locator('.project-story').count(), 3, 'Three event stories are required');
    await opener.click();
    let dialog = page.getByRole('dialog', { name: 'A room in bloom', exact: true });
    await dialog.waitFor();
    assert.match(await dialog.locator('figcaption').innerText(), /room/i);
    await page.keyboard.press('ArrowRight');
    assert.match(await dialog.locator('figcaption').innerText(), /passage/i);
    const imageBounds = await dialog.locator('.viewer-image img').boundingBox();
    const frameBounds = await dialog.locator('.viewer-image').boundingBox();
    const captionBounds = await dialog.locator('figcaption').boundingBox();
    assert.ok(imageBounds.y + imageBounds.height <= frameBounds.y + frameBounds.height + 1, 'The full photograph must stay inside its frame');
    assert.ok(imageBounds.y + imageBounds.height <= captionBounds.y + 1, 'The photograph must not overlap its caption or controls');
    await dialog.getByRole('button', { name: 'Save photograph', exact: true }).click();
    assert.equal(await dialog.getByRole('button', { name: 'Remove saved photograph', exact: true }).getAttribute('aria-pressed'), 'true');
    await page.screenshot({ path: path.join(qa, 'project-viewer.png') });
    await page.keyboard.press('Escape');
    assert.equal(await opener.evaluate(element => document.activeElement === element), true, 'Project opener must regain focus');
    await page.reload();
    const savedButton = page.getByRole('button', { name: /^Saved inspiration, 1 photograph/ });
    assert.equal(await savedButton.count(), 1, 'Saved inspiration must survive reload');
    await savedButton.click();
    await page.screenshot({ path: path.join(qa, 'saved-inspiration.png') });
    await page.getByRole('button', { name: 'Use these in my enquiry', exact: true }).click();
    dialog = page.getByRole('dialog', { name: 'Enquire about your occasion', exact: true });
    await dialog.waitFor();
    assert.equal(await page.locator('dialog[open]').count(), 1, 'Only one modal may remain open');
    assert.equal(await dialog.getByRole('list', { name: 'Saved inspiration for this enquiry' }).locator('li').count(), 1);
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      assert.equal(await dialog.evaluate(element => element.contains(document.activeElement)), true, 'Focus escaped enquiry');
    }
    await dialog.getByLabel('Your name', { exact: true }).fill('Portfolio review');
    await dialog.getByLabel('Email address', { exact: true }).fill('review@example.com');
    await dialog.getByRole('button', { name: 'Save enquiry draft', exact: true }).click();
    assert.match(await dialog.innerText(), /not been delivered|not sent/i);
    const downloadEvent = page.waitForEvent('download');
    await dialog.getByRole('button', { name: 'Download enquiry', exact: true }).click();
    const download = await downloadEvent;
    const downloadPath = path.join(qa, 'enquiry-download.txt');
    await download.saveAs(downloadPath);
    const brief = fs.readFileSync(downloadPath, 'utf8');
    assert.match(brief, /Saved inspiration/);
    assert.match(brief, /passage/i);
    assert.match(brief, /not yet sent/i);
    assert.ok(brief.includes(root + 'assets/portfolio/'), 'Downloaded photo URLs must retain the published base path');
    await page.keyboard.press('Escape');
    checks.push('Project viewer, arrow keys, save/reload, focus return and enquiry handoff');
    checks.push('One dialog, enquiry focus trap, selected references and downloaded brief');

    await page.reload();
    await page.getByRole('button', { name: /^Saved inspiration, 1 photograph/ }).click();
    await page.getByRole('dialog', { name: 'Your inspiration', exact: true }).getByRole('button', { name: /^Remove / }).first().click();
    await page.keyboard.press('Escape');
    await page.reload();
    await page.getByRole('button', { name: 'Get in touch', exact: true }).click();
    const inline = page.getByRole('dialog', { name: 'Enquire about your occasion', exact: true }).locator('form');
    await inline.getByRole('button', { name: /Restore saved enquiry/ }).click();
    assert.equal(await inline.getByLabel('Your name', { exact: true }).inputValue(), 'Portfolio review');
    assert.equal(await page.getByRole('button', { name: /^Saved inspiration, 1 photograph/ }).count(), 1);
    checks.push('Explicit draft restoration restores text and saved photo selection');
    await page.keyboard.press('Escape');

    await page.evaluate(() => localStorage.setItem('floral-edit-enquiry-v1', JSON.stringify({ name: 'Legacy client', email: 'legacy@example.com', service: 'Event flowers', date: '', location: '', notes: 'Existing draft', phone: '' })));
    await page.reload();
    await page.getByRole('button', { name: 'Get in touch', exact: true }).click();
    await page.getByRole('dialog', { name: 'Enquire about your occasion', exact: true }).getByRole('button', { name: /Restore saved enquiry/ }).click();
    assert.equal(await page.getByRole('dialog', { name: 'Enquire about your occasion', exact: true }).getByLabel('Your name', { exact: true }).inputValue(), 'Legacy client');
    assert.equal(await page.getByRole('button', { name: /^Saved inspiration, 1 photograph/ }).count(), 1, 'Legacy draft without images must not clear the current edit');
    checks.push('Legacy drafts retain content without discarding new inspiration');
    await page.keyboard.press('Escape');

    const deniedContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const denied = await deniedContext.newPage();
    await denied.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException('Storage unavailable', 'SecurityError'); }; });
    await denied.goto(root);
    await denied.getByRole('button', { name: 'Show After dark', exact: true }).click();
    await denied.getByRole('button', { name: 'Explore After dark', exact: true }).click();
    await denied.getByRole('button', { name: 'Save photograph', exact: true }).click();
    assert.match(await denied.getByRole('dialog', { name: 'After dark', exact: true }).innerText(), /Saved for this visit/);
    await denied.keyboard.press('Escape');
    assert.equal(await denied.getByRole('button', { name: /^Saved inspiration, 1 photograph/ }).count(), 1, 'Storage denial must not prevent saving for the visit');
    await deniedContext.close();
    checks.push('Storage-denied browsers can still collect inspiration for the visit');

    await page.locator('#collections summary').click();
    await page.getByRole('button', { name: 'View Aurelia Amphora, ₹4,800', exact: true }).click();
    await page.getByRole('button', { name: 'Add to bag', exact: true }).click();
    await page.getByRole('button', { name: 'Increase Aurelia Amphora quantity', exact: true }).click();
    assert.match(await page.locator('.bag-summary strong').innerText(), /9,600/);
    await page.keyboard.press('Escape');
    checks.push('Existing vessel enquiry bag and quantity totals still work');

    await page.locator('#questions summary').click();
    await page.getByRole('button', { name: /What should I include in my enquiry/ }).click();
    assert.equal(await page.locator('.faq-item button[aria-expanded="true"]').count(), 1);
    checks.push('FAQ opens with accessible expanded state');
    const metrics = [];
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      const result = await page.evaluate(() => {
        const brand = document.querySelector('.studio-brand').getBoundingClientRect();
        const actions = document.querySelector('.menu-button').getBoundingClientRect();
        return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, brandRight: brand.right, actionsLeft: actions.left, actionsTop: actions.top, brandTop: brand.top, brandBottom: brand.bottom, script: [...document.querySelectorAll('main h1,main h2')].every(e => getComputedStyle(e).fontFamily.includes('Allura')) };
      });
      assert.ok(result.scrollWidth <= width, `Layout overflow at ${width}: ${JSON.stringify(result)}`);
      assert.equal(result.script, true, `Main heading font changed at ${width}`);
      if (width < 500) {
        await page.getByRole('button', { name: 'Show After dark', exact: true }).click();
        await page.getByRole('button', { name: 'Explore After dark', exact: true }).click();
        const mobileViewer = page.getByRole('dialog', { name: 'After dark', exact: true });
        await mobileViewer.getByRole('button', { name: 'Next photograph', exact: true }).click();
        const bounds = await mobileViewer.locator('.viewer-image img').boundingBox();
        const frame = await mobileViewer.locator('.viewer-image').boundingBox();
        const caption = await mobileViewer.locator('figcaption').boundingBox();
        assert.ok(bounds.y + bounds.height <= frame.y + frame.height + 1 && bounds.y + bounds.height <= caption.y + 1, `Portrait image overlaps its controls at ${width}`);
        await page.keyboard.press('Escape');
      }
      metrics.push(result);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('button', { name: 'Open menu', exact: true }).getAttribute('aria-expanded'), 'false');
    checks.push('Responsive layouts at 320/390/768/1024/1440 and mobile menu Escape');

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.evaluate(async () => { document.querySelectorAll('img').forEach(image => { image.loading = 'eager'; }); await Promise.all([...document.images].map(image => image.decode().catch(() => {}))); window.scrollTo({ top: 0, behavior: 'instant' }); });
    assert.deepEqual(await page.locator('img').evaluateAll(images => images.filter(i => !i.naturalWidth).map(i => i.src)), [], 'An image failed to load');
    await page.screenshot({ path: path.join(qa, 'desktop-home.png') });
    await page.screenshot({ path: path.join(qa, 'desktop-full.png'), fullPage: true });
    await page.locator('#work').screenshot({ path: path.join(qa, 'desktop-projects.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: path.join(qa, 'mobile-home.png') });
    await page.locator('#work').screenshot({ path: path.join(qa, 'mobile-projects.png') });
    assert.deepEqual(errors, [], 'Browser errors occurred');
    fs.writeFileSync(path.join(qa, 'verification.json'), JSON.stringify({ status: 'pass', checks, metrics, pageErrors: errors }, null, 2));
    process.stdout.write(JSON.stringify({ status: 'pass', checks, metrics }, null, 2) + '\n');
  } finally { await browser.close(); }
})().catch(error => { process.stderr.write(String(error.stack || error) + '\n'); process.exitCode = 1; });
