import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'..');
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(process.env.PLAYWRIGHT_MODULE).href:'playwright');
await fs.mkdir(path.join(root,'qa'),{recursive:true});
const html=path.join(root,'qa/playback.html');
await fs.writeFile(html,'<html><body style="margin:0;background:#000"><video id="film" style="width:100vw;height:100vh;object-fit:contain" preload="auto" src="../deliverables/ARC_CINEMATIC_INTRO_PREVIEW.mp4"></video></body></html>');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--autoplay-policy=no-user-gesture-required']});
try{
 const page=await browser.newPage({viewport:{width:1280,height:720}});
 await page.goto(pathToFileURL(html).href);
 await page.waitForFunction(()=>document.querySelector('video').readyState>=3);
 const report=[];
 for(const rate of [1,2]){
  await page.evaluate(rate=>{const v=document.querySelector('video');v.currentTime=0;v.playbackRate=rate;v.play();},rate);
  const times=rate===1?[2.8,6.8,9.4,16.5,23.8,27,30.5,34.8,37.5,41.5,44.5,48.8,53.5,57.7]:[];
  for(const t of times){await page.waitForFunction(t=>document.querySelector('video').currentTime>=t,t,{timeout:15000});await page.screenshot({path:path.join(root,`qa/playback-${t.toFixed(1)}.png`)});console.log(`Playback ${rate}x: reviewed ${t}s`);}
  await page.waitForFunction(()=>document.querySelector('video').ended,null,{timeout:45000});
  const sample=await page.evaluate(()=>{const v=document.querySelector('video'),q=v.getVideoPlaybackQuality();return {rate:v.playbackRate,duration:v.duration,currentTime:v.currentTime,width:v.videoWidth,height:v.videoHeight,error:v.error?.message??null,totalPresentedFrames:q.totalVideoFrames,droppedPlaybackFrames:q.droppedVideoFrames};});
  if(sample.error)throw Error(sample.error);
  report.push(sample);console.log(`Full playback pass ${rate}x completed.`);
 }
 await fs.writeFile(path.join(root,'qa/playback-report.json'),JSON.stringify(report,null,2));
}catch(e){console.error(e);process.exitCode=1;}finally{await browser.close();}
