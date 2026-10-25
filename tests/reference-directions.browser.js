async (page) => {
  const base = 'http://127.0.0.1:5174/';
  const results = [];
  const assert = (value, message) => { if (!value) throw Error(message); };
  for (const [concept, paper, accent] of [['garden', '#f8f6ef', '#536336'], ['atelier', '#243b2c', '#d0b981'], ['celebration', '#faf7f1', '#74634f']]) {
    await page.goto(`${base}?concept=${concept}`);
    await page.setViewportSize({ width: 1440, height: 1000 });
    assert(await page.locator(`.reference-hero-${concept}`).count() === 1, `${concept}: reference-led hero missing`);
    const palette = await page.locator('.floral-site').evaluate(el => ({ paper: getComputedStyle(el).getPropertyValue('--paper').trim(), accent: getComputedStyle(el).getPropertyValue('--accent').trim() }));
    assert(palette.paper === paper && palette.accent === accent, `${concept}: existing palette changed`);
    if (concept !== 'celebration') {
      assert(await page.locator('.seasonal-card').count() === 3, 'Seasonal edit must show three arrangements');
      await page.getByRole('button', { name: 'Sculptural stems', exact: true }).click();
      assert(await page.locator('.seasonal-card').count() === 1, 'Floral filter does not narrow arrangements');
      await page.locator('.seasonal-card button').first().click();
      assert((await page.getByRole('dialog').getByLabel("I'm interested in").inputValue()).includes('The sculptural study'), 'Selected arrangement is missing from enquiry');
      await page.keyboard.press('Escape');
      await page.getByRole('button', { name: 'All flowers', exact: true }).click();
      if (concept === 'atelier') {
        const unfocused = await page.locator('.seasonal-photo-button').first().evaluate(el => ({ width: parseFloat(getComputedStyle(el).outlineWidth), color: getComputedStyle(el).outlineColor }));
        await page.keyboard.press('Tab');
        await page.locator('.seasonal-photo-button').first().focus();
        const focus = await page.locator('.seasonal-photo-button').first().evaluate(el => ({ visible: el.matches(':focus-visible'), width: parseFloat(getComputedStyle(el).outlineWidth), color: getComputedStyle(el).outlineColor }));
        assert(focus.visible && focus.width > unfocused.width && focus.color !== unfocused.color, 'Atelier arrangement photos need a distinct keyboard focus indicator');
      }
    } else {
      assert(await page.locator('.signature-event-card').count() === 4, 'Celebration needs four signature services');
      await page.locator('.signature-event-card').nth(2).click();
      assert((await page.getByRole('dialog').getByLabel("I'm interested in").inputValue()).includes('Ceremony flowers'), 'Ceremony service enquiry context missing');
      await page.keyboard.press('Escape');
    }
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${concept} overflows at ${width}px`);
    }
    results.push(`${concept}: preserved palette, distinct hero, functional floral/service selection, responsive`);
  }
  await page.goto(base);
  return results;
}
