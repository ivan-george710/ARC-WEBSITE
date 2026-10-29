import { pathToFileURL } from 'node:url';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const browser = await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'msedge'});
const base=process.env.ARC_QA_URL || 'http://localhost:3005';
const before=process.env.ARC_QA_BEFORE_URL;
const directory='qa/brand';
await fs.mkdir(directory,{recursive:true});
const report=[];
try {
  for(const [width,height] of [[320,568],[360,800],[375,667],[390,844],[430,932],[768,1024],[1024,768],[1440,900],[1920,1080]]) {
    const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    if(before && [390,1440].includes(width)) {
      await page.goto(before); await page.evaluate(()=>document.fonts.ready);
      await page.screenshot({path:`${directory}/before-${width}-hero.png`});
      await page.locator('#product').scrollIntoViewIfNeeded();
      await page.screenshot({path:`${directory}/before-${width}-product.png`});
    }
    await page.goto(base); await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('.navigation .brand-logo').count(),1);
    assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().toLowerCase()),'#ff8a1f');
    for(const [selector,name] of [['.hero','hero'],['#product','product'],['#vision','network'],['#contact','final']]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      const bounds=await page.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth,logo:[...document.querySelectorAll('.brand-logo')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0 && (r.left<-.5||r.right>innerWidth+.5)}).map(el=>el.className)}));
      assert(bounds.document<=width,`${width} ${name}: page overflow ${JSON.stringify(bounds)}`);
      assert.deepEqual(bounds.logo,[],`${width} ${name}: logo cropped`);
      if([320,390,768,1440].includes(width)) await page.screenshot({path:`${directory}/after-${width}-${name}.png`});
    }
    await page.goto(`${base}/about`); await page.evaluate(()=>document.fonts.ready);
    assert(await page.locator('.about-closing .brand-logo').count());
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    if([320,390,1440].includes(width)) await page.screenshot({path:`${directory}/after-${width}-about.png`});
    assert.deepEqual(errors,[]);
    report.push({width,height,overflow:false,logos:'pass',consoleErrors:errors});
    await page.close();
    console.log(`${width}x${height}: Home/About, all story sections and official logo bounds passed`);
  }
  await fs.writeFile(`${directory}/report.json`,JSON.stringify(report,null,2));
} finally { await browser.close(); }
