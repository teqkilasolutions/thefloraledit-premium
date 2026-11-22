const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || (process.platform === 'win32' ? 'msedge' : undefined), headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  try {
    await page.goto(process.env.FLORAL_TEST_URL || 'http://127.0.0.1:5184/');
    const rows = page.locator('.flower-category');
    await rows.nth(2).scrollIntoViewIfNeeded();
    await rows.nth(2).getByRole('button').focus();
    assert.equal(await rows.nth(2).evaluate(el => el.classList.contains('is-active')), true);
    await page.mouse.move(0, 0);
    await rows.nth(0).evaluate(el => scrollTo({ top: el.getBoundingClientRect().top + scrollY - innerHeight * .45, behavior: 'instant' }));
    await page.mouse.wheel(0, 1);
    await page.waitForTimeout(200);
    assert.equal(await rows.nth(0).evaluate(el => el.classList.contains('is-active')), true, 'Wheel scrolling must take over from an earlier keyboard selection');
    await rows.nth(1).getByRole('button').focus();
    assert.equal(await rows.nth(1).evaluate(el => el.classList.contains('is-active')), true, 'Keyboard selection must remain available after scrolling');
    await rows.nth(2).getByRole('button').hover();
    assert.equal(await rows.nth(2).evaluate(el => el.classList.contains('is-active')), true, 'Hover must take over from keyboard selection');
    process.stdout.write('Flower category wheel, keyboard and pointer handoffs: PASS\n');
  } finally { await browser.close(); }
})().catch(error => { process.stderr.write(String(error.stack || error) + '\n'); process.exitCode = 1; });
