import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(process.env.PLAYWRIGHT_MODULE).href:'playwright');
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
const base=process.env.ARC_QA_URL||'http://localhost:3003';
await fs.mkdir('qa/about',{recursive:true});
try {
  for(const [width,height,reduced] of [[1440,900,false],[390,844,false],[320,568,true]]) {
    const page=await browser.newPage({viewport:{width,height},reducedMotion:reduced?'reduce':'no-preference'});
    const errors=[]; page.on('pageerror',e=>errors.push(e.message));
    await page.addInitScript(()=>{
      window.aboutFrames=[];window.recordAbout=false;
      document.addEventListener('click',event=>{
        if(event.target.closest('a[href="/about"]')) {window.aboutFrames=[];window.recordAbout=true;}
      },true);
      const frame=()=>{
        if(window.recordAbout&&location.pathname==='/about'&&document.querySelector('.about-page')) window.aboutFrames.push(scrollY);
        requestAnimationFrame(frame);
      };requestAnimationFrame(frame);
    });
    async function scrollPart(part) {
      await page.evaluate(p=>window.scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*p,behavior:'instant'}),part);
      await page.waitForTimeout(250);
    }
    async function about(menu=false) {
      const restoration=await page.evaluate(()=>history.scrollRestoration);
      if(menu) {
        await page.getByRole('button',{name:'Explore navigation'}).click();
        await page.locator('[role="dialog"]').getByRole('link',{name:'About',exact:false}).click();
      }else await page.locator('.page-navigation').getByRole('link',{name:'About',exact:true}).click();
      await page.waitForURL(`${base}/about`);
      await page.waitForTimeout(600);
      assert.equal(await page.evaluate(()=>scrollY),0,'About must settle exactly at zero');
      const frames=await page.evaluate(()=>window.aboutFrames);
      assert(frames.length>0&&frames.every(y=>y===0),`Old-position flash: ${frames}`);
      assert.equal(await page.locator('.page-navigation [aria-current="page"]').innerText(),'About');
      assert.equal(await page.evaluate(()=>history.scrollRestoration),restoration);
      assert(!/aditya|ivan|kiran|saarthak/i.test(await page.locator('body').innerText()));
      assert.equal(await page.locator('.about-origin-moment').count(),1);
      assert.equal(await page.locator('.about-founders, .about-origin-moment li').count(),0);
      await page.evaluate(()=>{window.recordAbout=false});
    }
    async function home() {
      await page.locator('.page-navigation').getByRole('link',{name:'Home',exact:true}).click();
      await page.waitForURL(`${base}/`);
      await page.waitForTimeout(300);
      assert(!/aditya|ivan|kiran|saarthak/i.test(await page.locator('body').innerText()));
    }
    await page.goto(base);
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(500);
    for(const part of [0,.5,1]) {
      if((await page.url())!==`${base}/`) await home();
      await scrollPart(part);
      await about(width<768);
      await scrollPart(.5); // Previously visited About must not retain this position.
    }
    await about(); // Same route, persistent header link.
    await scrollPart(1);
    await about(true); // Same route, Explore menu.
    await page.mouse.wheel(0,600);
    await page.waitForTimeout(reduced?250:100);
    assert((await page.evaluate(()=>scrollY))>0,'Scrolling must work after reset');
    await about(); // Also cancels a wheel interpolation already in flight.
    await page.screenshot({path:`qa/about/${width}-top-reset.png`});
    await scrollPart(.45);
    const saved=await page.evaluate(()=>scrollY);
    await home();
    await page.goBack();
    await page.waitForURL(`${base}/about`);
    await page.waitForTimeout(800);
    const restored=await page.evaluate(()=>scrollY);
    assert(Math.abs(restored-saved)<3,`Back should restore About's sensible history position: ${restored} vs ${saved}`);
    await page.goForward();
    await page.waitForURL(`${base}/`);
    await page.waitForTimeout(300);
    await about(width<768); // Explicit action overrides the history-restored visit.
    await page.locator('.about-origin-moment').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({path:`qa/about/${width}-anonymous-origin.png`});
    assert((await page.evaluate(()=>document.documentElement.scrollWidth))<=width);
    assert.deepEqual(errors,[]);
    console.log(`${width}x${height}${reduced?' reduced motion':''}: Home top/middle/bottom, repeat About, both menus, in-flight scrolling, zero-offset paint frames, history back/forward and anonymous UI passed.`);
    await page.close();
  }
} finally {await browser.close();}
