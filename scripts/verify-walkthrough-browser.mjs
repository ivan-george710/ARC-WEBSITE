import { pathToFileURL } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
await fs.mkdir('qa/walkthrough',{recursive:true});
const browser = await chromium.launch({headless:true, channel:process.env.BROWSER_CHANNEL || 'msedge'});
const errors=[];
async function watch(width,height,name) {
  const page=await browser.newPage({viewport:{width,height}});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.ARC_QA_URL || 'http://localhost:3000');
  await page.bringToFront();
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(300);
  await page.locator('#product').evaluate(el=>window.scrollTo(0,el.offsetTop));
  await page.waitForFunction(()=>document.querySelector('#product').dataset.playback==='playing');
  const captured=new Set();
  for(let i=0;i<260;i++) {
    const state=await page.locator('#product').evaluate(el=>{
      const visible=sel=>[...el.querySelectorAll(sel)].filter(n=>{const s=getComputedStyle(n);return +s.opacity>.01&&s.visibility!=='hidden'});
      const screens=visible('.walk-screen-layer');
      const copy=visible('.walk-copy-view');
      return {key:el.dataset.moment,status:el.dataset.playback,screens:screens.length,copy:copy.length,steady:screens.length===1&&+getComputedStyle(screens[0]).opacity>.999, text:screens[0]?.innerText};
    });
    assert(state.screens<=1,`Screen overlap: ${JSON.stringify(state)}`);
    assert(state.copy<=1,`Headline overlap: ${JSON.stringify(state)}`);
    if(state.steady&&!captured.has(state.key)) {
      // Wait until the incoming screen actually belongs to the active state.
      const active=await page.locator('.walk-screen-layer[data-active="true"]').evaluate(el=>+getComputedStyle(el).opacity>.999);
      if(active && (state.key !== 'goal' || await page.locator('.demo-new-goal').evaluate(el=>+getComputedStyle(el).opacity>.999))) {
        captured.add(state.key);
        if(state.key==='body') assert(!state.text.includes('HOTEL')&&!state.text.includes('Floor Press'));
        if(state.key==='travel') assert(!state.text.includes('SHOULDER')&&!state.text.includes('10 MIN'));
        if(state.key==='goal') assert(!state.text.includes('SHOULDER')&&!state.text.includes('HOTEL'));
        await page.screenshot({path:`qa/walkthrough/${name}-${state.key}.png`});
      }
    }
    if(state.status==='complete')break;
    await page.waitForTimeout(100);
  }
  assert.equal(captured.size,10,`${name}: missed ${10-captured.size} states`);
  await page.getByRole('button',{name:/REPLAY/}).click();
  await page.waitForTimeout(150);
  assert.equal(await page.locator('#product').getAttribute('data-moment'),'baseline');
  await page.getByRole('button',{name:/PAUSE/}).click();
  assert.equal(await page.locator('#product').getAttribute('data-playback'),'paused');
  await page.getByRole('button',{name:/RESUME/}).click();
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.waitForTimeout(1200);
  assert.equal(await page.locator('#product').getAttribute('data-playback'),'paused');
  await page.bringToFront();
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(300);
  await page.locator('#product').evaluate(el=>window.scrollTo(0,el.offsetTop));
  await page.waitForTimeout(500);
  assert.equal(await page.locator('#product').getAttribute('data-playback'),'paused');
  console.log(`${name}: full 22s autoplay, 10 state captures, no competing screens/headlines, replay and pause passed`);
  await page.close();
}


if (!process.env.ARC_QA_MOBILE_ONLY) await watch(1440,900,'desktop');
await watch(390,844,'mobile');
for(const [width,height] of [[320,568],[360,800],[375,667],[375,812],[390,844],[430,932]]) {
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  await page.goto(process.env.ARC_QA_URL || 'http://localhost:3000');
  await page.bringToFront();
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(300);
  await page.locator('#product').evaluate(el=>window.scrollTo(0,el.offsetTop));
  await page.waitForTimeout(300);
  for(let i=0;i<10;i++) {
    const fit=await page.locator('#product').evaluate(el=>{
      const device=el.querySelector('.device').getBoundingClientRect();
      const screen=el.querySelector('.walk-screen-layer[data-active="true"]');
      const bounds=screen.getBoundingClientRect();
      const content=[...screen.querySelectorAll('h4,h5,.demo-row,.demo-note,.demo-chart,.demo-nutrition')].map(n=>n.getBoundingClientRect());
      const nav=el.querySelector('.demo-nav').getBoundingClientRect();
      const island=el.querySelector('.device-island').getBoundingClientRect();
      const header=el.querySelector('.phone-header').getBoundingClientRect();
      const copy=el.querySelector('.walk-copy-stack').getBoundingClientRect();
      const brand=el.querySelector('.walk-copy-view[data-active="true"] .brand-logo')?.getBoundingClientRect();
      const selected=[...el.querySelectorAll('[data-nav-index][data-selected="true"]')].map(n=>Number(n.dataset.navIndex));
      return {key:el.dataset.moment,selected,chromeClear:header.top>=island.bottom,brandFits:!brand||brand.right<=copy.right+1,device:{x:device.x,y:device.y,right:device.right,bottom:device.bottom},navBottom:nav.bottom,overflow:content.some(b=>b.bottom>bounds.bottom+1||b.right>bounds.right+1),body:el.querySelector('.walk-body').getBoundingClientRect().toJSON(),viewport:[innerWidth,innerHeight]};
    });
    assert(fit.device.x>=0&&fit.device.right<=width&&fit.device.y>=65&&fit.device.bottom<=height,JSON.stringify(fit));
    assert.deepEqual(fit.selected,[i===6?1:i===7?2:i>=8?3:0]);
    assert(fit.navBottom<=height,JSON.stringify(fit));
    assert(!fit.overflow,`Content clipped: ${JSON.stringify(fit)}`);
    assert(fit.chromeClear,`Camera island overlaps the app header: ${JSON.stringify(fit)}`);
    assert(fit.brandFits,`Brand reveal exceeds its column: ${JSON.stringify(fit)}`);
    if([0,3,4,8].includes(i)) await page.screenshot({path:`qa/walkthrough/${width}x${height}-${fit.key}.png`});
    if(i<9)await page.locator('#product').getByRole('button',{name:/Next/}).click();
  }
  console.log(`${width}x${height}: all 10 screens fit, navigation visible, reduced motion manual controls passed`);
  await page.close();
}
assert.deepEqual(errors,[]);
await browser.close();
