const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || (process.platform === 'win32' ? 'msedge' : undefined), headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const root = process.env.FLORAL_TEST_URL || 'http://127.0.0.1:5184/';
  const issues = [];
  const heroRequests = [];
  page.on('request', request => { if (/assets\/portfolio\/day-(room|lounge)(-small)?\.webp(?:\?|$)/.test(request.url())) heroRequests.push(request.url()); });
  try {
    await page.goto(root);
    await page.evaluate(() => document.fonts.ready);
    if (heroRequests.some(url => /day-room(?:-small)?\.webp/.test(url))) issues.push('A phone downloads the hidden desktop hero');
    if (!/stem\s+to/.test(await page.locator('.scale-copy h2').innerText())) issues.push('Mobile scale heading joins stem and to');
    if (!/arrangements\.\s+Flowers/.test(await page.locator('.forms-note p').innerText())) issues.push('Mobile story copy joins two sentences');
    const titleOffset = await page.evaluate(() => { const hero = document.querySelector('.opening-hero').getBoundingClientRect(); const title = document.querySelector('.opening-hero h1').getBoundingClientRect(); return title.top + title.height / 2 - hero.top - hero.height / 2; });
    if (Math.abs(titleOffset) > 24) issues.push('The responsive picture shifts the hero title off centre');
    await page.getByRole('button', { name: 'Open menu', exact: true }).tap();
    await page.getByRole('button', { name: /^Saved inspiration,/ }).tap();
    await page.getByRole('dialog', { name: 'Your inspiration', exact: true }).waitFor();
    if (await page.getByRole('button', { name: 'Close menu', exact: true }).count()) issues.push('Menu remains open behind inspiration');
    await page.keyboard.press('Escape');
    if (await page.evaluate(() => document.body.style.overflow === 'hidden')) issues.push('Escape leaves page scrolling locked');
    await page.reload();
    if (await page.locator('[id="questions"]').count() !== 1) issues.push('Duplicate FAQ fragment IDs');
    await page.locator('.footer-links-right a[href="#questions"]').click();
    if (!await page.locator('details#questions').evaluate(el => el.open)) issues.push('Footer FAQ link leaves its content hidden');
    process.stdout.write(JSON.stringify({ issues, initialHeroRequests: heroRequests }, null, 2) + '\n');
    assert.deepEqual(issues, [], 'Final review regressions must be resolved');
  } finally { await browser.close(); }
})().catch(error => { process.stderr.write(String(error.stack || error) + '\n'); process.exitCode = 1; });
