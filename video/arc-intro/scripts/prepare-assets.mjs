import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const here=path.resolve(import.meta.dirname,'..');
const liveRoot=process.env.ARC_WEBSITE_ROOT?path.resolve(process.env.ARC_WEBSITE_ROOT):path.resolve(here,'../..');
const root=fs.existsSync(path.join(liveRoot,'components/ui/WalkthroughScreens.tsx'))?liveRoot:path.join(here,'references/website');
const require=createRequire(path.join(root,'package.json'));
const ts=require('typescript');
const modules=new Map();
function load(filename){
  const file=[filename,filename+'.tsx',filename+'.ts'].find(f=>fs.existsSync(f)&&fs.statSync(f).isFile());
  if(!file)throw Error(filename);
  if(modules.has(file))return modules.get(file).exports;
  const mod={exports:{}};modules.set(file,mod);
  const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText;
  const local=s=>s.startsWith('@/')?load(path.join(root,s.slice(2))):s.startsWith('.')?load(path.resolve(path.dirname(file),s)):require(s);
  new Function('require','module','exports',js)(local,mod,mod.exports);return mod.exports;
}
// Use the same React instance as the website components in the static exporter.
const React=require('react');
const render=require('react-dom/server').renderToStaticMarkup;
const {PhoneShell,WalkthroughScreen}=load(path.join(root,'components/ui/WalkthroughScreens'));
const {BodyAvatar}=load(path.join(root,'components/ui/BodyAvatar'));
const out=path.join(here,'public/assets');fs.mkdirSync(out,{recursive:true});
fs.copyFileSync(path.join(root,'public/fonts/Geist-Variable.ttf'),path.join(out,'Geist-Variable.ttf'));
fs.copyFileSync(path.join(root,'public/fonts/OFL.txt'),path.join(out,'OFL.txt'));
const css=['globals.css','product.css','walkthrough.css'].map(f=>fs.readFileSync(path.join(root,'app',f),'utf8')).join('\n').replace('@import "tailwindcss";','');
const font=fs.readFileSync(path.join(out,'Geist-Variable.ttf')).toString('base64');
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(process.env.PLAYWRIGHT_MODULE).href:'playwright');
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
const page=await browser.newPage({viewport:{width:1200,height:1250},deviceScaleFactor:2});
const overrides=`@font-face{font-family:Geist;src:url(data:font/ttf;base64,${font});font-weight:100 900} :root{--font-geist:Geist;--accent:#5B8BEF}body{background:transparent!important;margin:0;padding:70px;overflow:hidden}body::after{display:none}*{animation:none!important;transition:none!important}.device.walkthrough-device{--device-width:460px!important;width:460px!important;height:1002.8px!important;transform:none!important}.walk-screen-layer{position:absolute;inset:0;opacity:1!important;visibility:visible!important}.demo-nav>span{color:#a0b3c3!important}.demo-app .walk-screens{height:auto}.demo-old-goal{opacity:0!important;visibility:hidden!important}.demo-new-goal{opacity:1!important;visibility:visible!important}`;
async function set(content,extra=''){
 await page.setContent(`<style>${css}\n${overrides}\n${extra}</style>${content}`);
 await page.evaluate(()=>document.fonts.ready);
}
const shell=child=>render(React.createElement(PhoneShell,null,child));
await set(shell(null));
await page.locator('.device').screenshot({path:path.join(out,'phone-chrome.png'),omitBackground:true});
await page.locator('.phone-header .wordmark').evaluate(el=>el.textContent='PLAN');
await page.locator('.device').screenshot({path:path.join(out,'phone-rigid-chrome.png'),omitBackground:true});
const device=await page.locator('.device').boundingBox();
const viewport=await page.locator('.walk-screens').boundingBox();
const nav=await page.locator('.demo-nav').boundingBox();
fs.writeFileSync(path.join(out,'geometry.json'),JSON.stringify({device,viewport:{x:viewport.x-device.x,y:viewport.y-device.y,width:viewport.width,height:viewport.height},nav:{x:nav.x-device.x,y:nav.y-device.y,width:nav.width,height:nav.height}},null,2));
for(const state of ['baseline','time','travel','body','goal','system','nourish','recover','progress']){
 const content=React.createElement('div',{className:'walk-screen-layer','data-active':true},React.createElement(WalkthroughScreen,{state}));
 await set(shell(content));
 await page.locator('.walk-screens').screenshot({path:path.join(out,`ui-${state}.png`)});
 console.log(`Captured ${state}: native ARC UI at 2x`);
}
const legacy=load(path.join(root,'components/ui/PhoneScreen')).PhoneScreen;
await set(shell(React.createElement('div',{className:'walk-screen-layer'},React.createElement(legacy,{legacy:true}))),'.walk-screens .phone-screen-legacy{padding:8px 12px}.walk-screens .phone-header,.walk-screens .phone-status,.walk-screens .phone-home-indicator{display:none}.legacy-screen{margin-top:0}.legacy-screen h4{font-size:42px}.legacy-plan-row{padding:27px 0}.legacy-plan-row strong{font-size:26px}.legacy-plan-row>span{font-size:13px}.phone-kicker{font-size:13px}.legacy-warning{font-size:19px}.legacy-caption{font-size:13px}');
await page.locator('.walk-screens').screenshot({path:path.join(out,'ui-rigid.png')});
const body=render(React.createElement(BodyAvatar,{area:'shoulder'})).replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"').replace('</svg>','<style>.body-avatar{fill:#263947;stroke:#A5B9C9;stroke-width:.7}.selected-area{fill:#5B8BEF66;stroke:#5B8BEF;stroke-width:1.2}</style></svg>');
fs.writeFileSync(path.join(out,'body-shoulder.svg'),body);
await browser.close();
console.log('Exported physical phone, isolated app viewports, original 2D body and Geist.');
