async (page) => {
  const root = 'http://127.0.0.1:5176/';
  const assert = (v, m) => { if (!v) throw Error(m); };
  await page.goto(root);
  assert(await page.locator('.presentation-bar').count() === 0, 'Concept presentation toolbar must be removed');
  for (const query of ['', '?concept=garden', '?concept=atelier', '?preview=garden']) {
    await page.goto(root + query);
    assert(await page.locator('.theme-celebration').count() === 1, 'Only Celebration should be available');
    assert(await page.locator('.signature-line').count() === 1, 'Cursive must appear in one signature line only');
  }
  const checks = [];
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    const metrics = await page.evaluate(() => {
      const brand = document.querySelector('.studio-nav .studio-brand').getBoundingClientRect();
      const bag = document.querySelector('.bag-button').getBoundingClientRect();
      const signature = document.querySelector('.signature-line');
      const range = document.createRange(); range.selectNodeContents(signature);
      return { scroll: document.documentElement.scrollWidth, brandRight: brand.right, bagLeft: bag.left, signatureLines: range.getClientRects().length, signatureRight: range.getBoundingClientRect().right, signatureFont: getComputedStyle(signature).fontFamily, headingFont: getComputedStyle(document.querySelector('h1')).fontFamily, bodyFont: getComputedStyle(document.querySelector('.reference-hero-content p')).fontFamily, tracking: getComputedStyle(document.querySelector('h1')).letterSpacing };
    });
    assert(metrics.scroll <= width && metrics.brandRight < metrics.bagLeft, `Layout/brand collision at ${width}`);
    assert(metrics.signatureLines === 1 && metrics.signatureRight < width, `Signature wraps or clips at ${width}`);
    assert(metrics.signatureFont.includes('Allura') && metrics.headingFont.includes('Lora') && metrics.bodyFont.includes('Manrope'), 'Three font roles are incorrect');
    assert(parseFloat(metrics.tracking) >= 0 || metrics.tracking === 'normal', 'Heading tracking must not be squeezed');
    checks.push(`Typography and brand at ${width}px`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  assert(await page.locator('#studio-mobile-menu a').evaluateAll(els => els.every(el => {const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));})), 'Menu links obscured');
  await page.keyboard.press('Escape');
  await page.locator('.signature-event-card').first().click();
  const modal = page.getByRole('dialog');
  assert((await modal.getByLabel("I'm interested in").inputValue()).includes('Bridal'), 'Service context lost');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'View Aurelia Amphora, ₹4,800' }).focus();
  await page.keyboard.press('Enter');
  await page.getByRole('dialog', { name: 'A closer look' }).waitFor();
  for(let i=0;i<8;i++){await page.keyboard.press('Tab');assert(await page.getByRole('dialog').evaluate(el=>el.contains(document.activeElement)), 'Focus escaped product dialog');}
  await page.keyboard.press('Escape');
  const original = await page.evaluate(() => ({ bag:localStorage.getItem('floral-edit-bag-v1'),draft:localStorage.getItem('floral-edit-enquiry-v1') }));
  try {
    await page.evaluate(() => {localStorage.removeItem('floral-edit-bag-v1');localStorage.removeItem('floral-edit-enquiry-v1');});
    await page.reload();
    await page.getByRole('button', { name: 'View Aurelia Amphora, ₹4,800' }).click();
    await page.getByRole('button', { name:'Add to bag', exact:true }).click();
    await page.getByRole('button', { name:'Increase Aurelia Amphora quantity' }).click();
    assert(await page.locator('.bag-summary strong').innerText()==='₹9,600','Incorrect bag subtotal');
    await page.keyboard.press('Escape');await page.reload();
    await page.getByRole('button', {name:'Shopping bag, 2 items'}).click();
    await page.getByRole('button', {name:'Prepare an order enquiry'}).click();
    const enquiry=page.getByRole('dialog');
    await enquiry.getByLabel('Your name',{exact:true}).fill('Client review');
    await enquiry.getByLabel('Email address',{exact:true}).fill('review@example.com');
    await enquiry.getByRole('button',{name:'Save enquiry draft'}).click();
    assert((await enquiry.getByRole('status').innerText()).includes('has not been delivered'), 'Misleading enquiry confirmation');
    const download=page.waitForEvent('download');await enquiry.getByRole('button',{name:'Download enquiry'}).click();
    assert((await download).suggestedFilename()==='the-floral-edit-enquiry.txt','Download failed');
    await page.keyboard.press('Escape');
  } finally {
    await page.evaluate(saved=>{for(const [key,value] of [['floral-edit-bag-v1',saved.bag],['floral-edit-enquiry-v1',saved.draft]])value===null?localStorage.removeItem(key):localStorage.setItem(key,value);},original);
    await page.reload();
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  assert(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)==='auto','Reduced motion ignored');
  await page.emulateMedia({reducedMotion:'no-preference'});
  return {checks, singleSite:true, threeFontRoles:true, mobileMenu:true, serviceEnquiry:true, keyboardDialog:true, bagPersistence:true, orderDraftDownload:true, reducedMotion:true};
}

