async (page) => {
  const root = 'http://127.0.0.1:5177/';
  const assert = (v, m) => { if (!v) throw Error(m); };
  await page.goto(root);
  assert(await page.locator('.presentation-bar').count() === 0, 'Concept presentation toolbar must be removed');
  for (const query of ['', '?concept=garden', '?concept=atelier', '?preview=garden']) {
    await page.goto(root + query);
    assert(await page.locator('.theme-celebration').count() === 1, 'Only Celebration should be available');
    assert(await page.locator('.signature-line').count() === 0, 'Competing signature line must be removed');
  }
  const checks = [];
  for (const width of [320, 360, 390, 768, 1024, 1051, 1100, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    const metrics = await page.evaluate(() => {
      const brand = document.querySelector('.studio-nav .studio-brand').getBoundingClientRect();
      const logo = document.querySelector('.studio-nav .studio-brand img').getBoundingClientRect();
      const actions = document.querySelector('.nav-actions').getBoundingClientRect();
      const navLinks = document.querySelector('.nav-links').getBoundingClientRect();
      const headings = [...document.querySelectorAll('main h1,main h2')];
      return {
        scroll: document.documentElement.scrollWidth, brandLeft:brand.left, brandRight:brand.right, actionsLeft:actions.left, linksRight:navLinks.right,
        logo:logo.width, wordmark:parseFloat(getComputedStyle(document.querySelector('.studio-nav .studio-brand > span')).fontSize),
        scriptHeadings:headings.every(el=>getComputedStyle(el).fontFamily.includes('Allura')),
        headingSpans:[...document.querySelectorAll('h1 > span')].every(el=>getComputedStyle(el).fontFamily.includes('Allura')),
        tracking:headings.every(el=>{const v=getComputedStyle(el).letterSpacing;return v==='normal'||parseFloat(v)>=0;}),
        insideViewport:headings.every(el=>{const range=document.createRange();range.selectNodeContents(el);return [...range.getClientRects()].every(r=>r.left>=0&&r.right<=innerWidth);}),
        subheadingFont:getComputedStyle(document.querySelector('.signature-event-card h3')).fontFamily,
        bodyFont:getComputedStyle(document.querySelector('.reference-hero-content p')).fontFamily,
        fonts:[...new Set([...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family))].sort(),
      };
    });
    assert(metrics.scroll <= width && metrics.brandRight <= metrics.actionsLeft && metrics.linksRight <= metrics.brandLeft, `Layout/brand collision at ${width}`);
    assert(metrics.logo >= (width < 768 ? 58 : 76) && metrics.wordmark <= 25, `Logo/name proportions wrong at ${width}`);
    assert(metrics.scriptHeadings && metrics.headingSpans && metrics.insideViewport, `Script headlines clipped or incorrect at ${width}`);
    assert(metrics.subheadingFont.includes('Lora') && metrics.bodyFont.includes('Manrope'), 'Formal font roles incorrect');
    assert(metrics.fonts.join(',')==='Allura,Lora,Manrope', 'Expected exactly three loaded font families');
    assert(metrics.tracking, 'Heading tracking must not be squeezed');
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
