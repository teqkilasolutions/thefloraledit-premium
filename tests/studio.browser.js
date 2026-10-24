// Run with the Playwright browser_run_code tool against the local Vite server.
async (page) => {
  const origin = 'http://127.0.0.1:5174/';
  const checks = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const check = (name) => checks.push(name);
  await page.goto(origin);
  const original = await page.evaluate(() => ({ bag: localStorage.getItem('floral-edit-bag-v1'), draft: localStorage.getItem('floral-edit-enquiry-v1') }));
  try {
    await page.evaluate(() => { localStorage.removeItem('floral-edit-bag-v1'); localStorage.removeItem('floral-edit-enquiry-v1'); });
    for (const concept of ['garden', 'atelier', 'celebration']) {
      await page.goto(`${origin}?concept=${concept}`);
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 844 });
        const metrics = await page.evaluate(() => {
          const heading = document.querySelector('h1');
          const range = document.createRange(); range.selectNodeContents(heading);
          return { width: innerWidth, scroll: document.documentElement.scrollWidth, textRight: Math.max(...[...range.getClientRects()].map(r => r.right)), actionBottom: document.querySelector('.hero-actions > .studio-button, .celebration-hero-copy .studio-button').getBoundingClientRect().bottom };
        });
        assert(metrics.scroll <= width + 1 && metrics.textRight <= width, `${concept} overflows at ${width}`);
        if (width === 390) assert(metrics.actionBottom < 844, `${concept} hides primary action below the first mobile screen`);
        check(`${concept}: layout at ${width}px`);
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      const linksVisible = await page.locator('#studio-mobile-menu a').evaluateAll(els => els.every(el => {
        const r = el.getBoundingClientRect(); return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
      }));
      assert(linksVisible, `${concept}: menu links are obscured`);
      await page.keyboard.press('Escape');
      assert(await page.locator('#studio-mobile-menu').count() === 0, `${concept}: Escape does not close the menu`);
      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      await page.locator('#studio-mobile-menu a').first().click();
      assert(await page.locator('#studio-mobile-menu').count() === 0, `${concept}: menu remains open after navigation`);
      check(`${concept}: mobile menu visibility, Escape and link navigation`);
      await page.evaluate(async () => {
        for (const img of document.images) img.loading = 'eager';
        await Promise.all([...document.images].map(img => img.decode()));
      });
      assert(await page.locator('img[src*="photo-1563245372"]').count() === 0, 'Incorrect dumpling photograph is still active');
      check(`${concept}: all active images decode and incorrect image is absent`);
    }

    await page.goto(origin);
    await page.setViewportSize({ width: 1440, height: 1000 });
    assert(await page.getByRole('button', { name: 'Shopping bag, 0 items' }).count() === 1, 'New bags must start empty');
    const product = page.getByRole('button', { name: 'View Aurelia Amphora, ₹4,800', exact: true });
    await product.focus(); await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'A closer look' });
    await dialog.waitFor();
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      assert(await dialog.evaluate(el => el.contains(document.activeElement)), 'Keyboard focus escapes the dialog');
    }
    await page.keyboard.press('Escape');
    assert(await product.evaluate(el => el === document.activeElement), 'Dialog does not restore focus to the product');
    check('Keyboard product activation, native focus containment, Escape and focus restoration');
    await product.click(); await page.getByRole('button', { name: 'Add to bag', exact: true }).click();
    await page.getByRole('dialog', { name: 'Your bag (1)' }).waitFor();
    await page.getByRole('button', { name: 'Increase Aurelia Amphora quantity' }).click();
    await page.getByRole('dialog', { name: 'Your bag (2)' }).waitFor();
    assert(await page.locator('.bag-summary strong').innerText() === '₹9,600', 'Quantity does not update subtotal');
    await page.keyboard.press('Escape'); await page.reload();
    await page.getByRole('button', { name: 'Shopping bag, 2 items' }).waitFor();
    check('Add to bag, accurate quantity badge, subtotal and reload persistence');

    await page.getByRole('button', { name: 'Shopping bag, 2 items' }).click();
    await page.getByRole('button', { name: 'Prepare an order enquiry' }).click();
    await page.getByRole('dialog', { name: 'Let’s talk flowers' }).waitFor();
    assert((await page.getByLabel("I'm interested in").inputValue()).includes('2 × Aurelia Amphora'), 'Order context is missing from enquiry');
    const unlabelled = await page.getByRole('dialog').evaluate(el => [...el.querySelectorAll('input,textarea,select')].filter(i => !i.labels?.length && !i.getAttribute('aria-label')).length);
    assert(unlabelled === 0, 'Enquiry has unlabelled fields');
    await page.getByLabel('Your name', { exact: true }).fill('Design review');
    await page.getByLabel('Email address', { exact: true }).fill('design-review@example.com');
    await page.getByLabel('A little about your vision').fill('Seasonal ivory flowers for an intimate dinner.');
    await page.getByRole('button', { name: 'Save enquiry draft' }).click();
    await page.getByRole('status').waitFor();
    assert((await page.getByRole('status').innerText()).includes('has not been delivered'), 'Draft incorrectly implies delivery');
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download enquiry' }).click();
    assert((await downloadEvent).suggestedFilename() === 'the-floral-edit-enquiry.txt', 'Enquiry download failed');
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Let’s talk flowers', exact: true }).click();
    assert(await page.getByLabel('Your name', { exact: true }).inputValue() === 'Design review', 'Saved draft is not restored');
    assert(await page.getByLabel("I'm interested in").inputValue() === 'Event flowers & celebrations', 'Previous service leaks into a new enquiry');
    await page.getByRole('button', { name: 'Restore saved enquiry' }).click();
    assert((await page.getByLabel("I'm interested in").inputValue()).includes('2 × Aurelia Amphora'), 'Restoring a draft loses order details');
    assert(await page.getByLabel('A little about your vision').inputValue() === 'Seasonal ivory flowers for an intimate dinner.', 'Restoring a draft loses notes');
    await page.keyboard.press('Escape');
    check('Order context, form labels, honest draft status, actual download, recovery and service reset');

    await page.getByRole('button', { name: 'Mobile preview', exact: true }).click();
    const frame = page.frameLocator('iframe');
    await frame.getByRole('button', { name: 'Open menu', exact: true }).waitFor();
    assert(await frame.locator('html').evaluate(el => innerWidth === 390 && el.scrollWidth <= 390), 'Phone preview is not a true mobile viewport');
    assert(await frame.locator('.nav-links').isHidden(), 'Desktop navigation is visible in the phone preview');
    await frame.getByRole('button', { name: 'View Wren Bud Vase, ₹1,450', exact: true }).click();
    await frame.getByRole('button', { name: 'Add to bag', exact: true }).click();
    await frame.getByRole('dialog', { name: 'Your bag (3)' }).waitFor();
    await page.getByRole('button', { name: 'Desktop view', exact: true }).click();
    await page.getByRole('button', { name: 'Shopping bag, 3 items' }).waitFor();
    check('True phone viewport, mobile navigation and cart synchronization back to desktop');

    await page.getByRole('button', { name: 'Compare', exact: true }).click();
    await page.getByRole('button', { name: 'Explore Atelier', exact: true }).click();
    assert(new URL(page.url()).searchParams.get('concept') === 'atelier', 'Comparison does not switch concept');
    await page.getByRole('button', { name: 'Design notes', exact: true }).click();
    await page.getByRole('dialog', { name: 'Behind the design' }).waitFor();
    await page.keyboard.press('Escape');
    check('Comparison switching, shareable concept URL and accessible design notes');

    for (const invalid of ['{bad json', '{}', '[{"id":"unknown","quantity":1}]', '[{"id":"aurelia-amphora","quantity":-1}]']) {
      await page.evaluate(value => localStorage.setItem('floral-edit-bag-v1', value), invalid);
      await page.reload(); await page.getByRole('button', { name: 'Shopping bag, 0 items' }).waitFor();
    }
    await page.evaluate(() => localStorage.setItem('floral-edit-bag-v1', '[{"id":"aurelia-amphora","quantity":99},{"id":"aurelia-amphora","quantity":2}]'));
    await page.reload();
    await page.getByRole('button', { name: 'Shopping bag, 99 items' }).click();
    assert(await page.getByRole('button', { name: 'Increase Aurelia Amphora quantity' }).isDisabled(), 'Quantity limit is not enforced');
    await page.getByRole('button', { name: 'Remove Aurelia Amphora', exact: true }).click();
    await page.getByRole('dialog', { name: 'Your bag (0)' }).waitFor();
    await page.keyboard.press('Escape');
    check('Malformed storage recovery, unknown products, invalid quantities, duplicate protection and removal');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior) === 'auto', 'Reduced motion preference ignored');
    check('Reduced motion');
    return { passed: checks.length, checks };
  } finally {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.evaluate(saved => {
      for (const [key, value] of [['floral-edit-bag-v1', saved.bag], ['floral-edit-enquiry-v1', saved.draft]]) value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value);
    }, original);
    await page.goto(origin);
  }
}
