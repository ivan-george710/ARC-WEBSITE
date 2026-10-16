import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const browser = await chromium.launch({headless:true, channel:process.env.BROWSER_CHANNEL || 'msedge'});
const base=process.env.ARC_QA_URL || 'http://localhost:3003';
await fs.mkdir('qa/about',{recursive:true});
const errors=[];
try {
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  page.on('pageerror',e=>errors.push(e.message));
  assert.equal((await page.goto(`${base}/about`)).status(),200);
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(650);
  await page.locator('.page-navigation a[href="/about"][aria-current="page"]').waitFor();
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('.about-origin-moment').count(),1);
  assert(!/aditya|ivan|kiran|saarthak/i.test(await page.locator('body').innerText()));
  assert((await page.locator('.about-origin-moment').innerText()).includes('ONE IDEA.'));
  assert((await page.locator('main').innerText()).includes('It’s still understanding you on day two hundred.'));
  const before=await page.locator('.about-arc-rise path').evaluate(el=>getComputedStyle(el).strokeDashoffset);
  await page.waitForTimeout(1200);
  const after=await page.locator('.about-arc-rise path').evaluate(el=>getComputedStyle(el).strokeDashoffset);
  assert.notEqual(before,after,'ARC must animate with no scrolling');
  assert.equal(await page.evaluate(()=>scrollY),0);
  const loops=await page.locator('.about-background').evaluate(el=>el.getAnimations({subtree:true}).map(a=>a.effect.getTiming().iterations));
  assert(loops.length>=2&&loops.every(n=>n===Infinity));
  await page.screenshot({path:'qa/about/desktop-opening.png'});
  for(const [selector,name] of [['.about-origin-moment','origin'],['.about-belief','manifesto'],['.about-closing','closing']]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({path:`qa/about/desktop-${name}.png`});
  }
  await page.locator('.page-navigation').getByRole('link',{name:'Home',exact:true}).click();
  await page.waitForURL(`${base}/`);
  await page.locator('.page-navigation a[href="/"][aria-current="page"]').waitFor();
  assert.equal(await page.locator('#product').count(),1);
  assert.equal(await page.locator('.about-editorial').count(),0);
  await page.locator('#product').evaluate(el=>window.scrollTo(0,el.offsetTop));
  await page.waitForFunction(()=>document.querySelector('#product').dataset.playback==='playing');
  await page.getByRole('button',{name:/PAUSE/}).click();
  await page.locator('.page-navigation').getByRole('link',{name:'About',exact:true}).click();
  await page.waitForURL(`${base}/about`);
  await page.getByRole('button',{name:'Explore navigation'}).click();
  await page.locator('[role="dialog"]').getByRole('link',{name:'The app'}).click();
  await page.waitForURL(`${base}/#product`);
  await page.waitForFunction(()=>document.querySelector('#product').dataset.playback==='playing');
  assert.equal(await page.locator('[role="dialog"]').count(),0);
  assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
  await page.locator('.page-navigation').getByRole('link',{name:'About',exact:true}).click();
  await page.waitForURL(`${base}/about`);
  await page.locator('.about-explore').click();
  await page.waitForURL(`${base}/`);
  console.log('Production routes, active links, menu cross-route anchor, closing CTA and remounted Home autoplay passed.');
  await page.close();

  for(const [width,height] of [[320,568],[360,800],[375,667],[375,812],[390,844],[430,932],[768,1024],[1024,768],[1440,900],[1920,1080]]) {
    const p=await browser.newPage({viewport:{width,height}});
    p.on('pageerror',e=>errors.push(e.message));
    await p.goto(`${base}/about`);
    await p.evaluate(()=>document.fonts.ready);
    await p.waitForTimeout(600);
    const fit=await p.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('h1,h2,.about-origin-question,.page-navigation,.navigation-actions')].filter(el=>el.getBoundingClientRect().right>innerWidth+.5||el.getBoundingClientRect().left<-.5||el.scrollWidth>el.clientWidth+1).map(el=>el.className||el.tagName)}));
    assert(fit.document<=width,JSON.stringify(fit));
    assert.deepEqual(fit.overflow,[],`${width}x${height}: ${JSON.stringify(fit)}`);
    if(width===390||width===320) {
      await p.screenshot({path:`qa/about/${width}-opening.png`});
      for(const [selector,name] of [['.about-origin-moment','origin'],['.about-belief','manifesto'],['.about-closing','closing']]) {
        await p.locator(selector).scrollIntoViewIfNeeded();
        await p.waitForTimeout(300);
        await p.screenshot({path:`qa/about/${width}-${name}.png`});
      }
      await p.getByRole('button',{name:'Explore navigation'}).click();
      await p.keyboard.press('Escape');
      assert.equal(await p.locator('[role="dialog"]').count(),0);
      assert.equal(await p.getByRole('button',{name:'Explore navigation'}).evaluate(el=>document.activeElement===el),true);
    }
    await p.emulateMedia({reducedMotion:'reduce'});
    const still=await p.locator('.about-background').evaluate(el=>({animations:el.getAnimations({subtree:true}).length,offset:getComputedStyle(el.querySelector('path')).strokeDashoffset,opacity:getComputedStyle(el.querySelector('path')).opacity}));
    assert.equal(still.animations,0);
    assert.equal(still.offset,'0px');
    assert.equal(still.opacity,'1');
    assert.equal(await p.locator('.route-content').evaluate(el=>getComputedStyle(el).opacity),'1');
    await p.close();
    console.log(`${width}x${height}: no overflow, readable content, static reduced-motion ARC passed.`);
  }
  assert.deepEqual(errors,[]);
} finally { await browser.close(); }
