import {bundle} from '@remotion/bundler';
import {renderMedia,renderStill,selectComposition,openBrowser} from '@remotion/renderer';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
const root=path.resolve(import.meta.dirname,'..');
process.chdir(root);
const mode=process.argv[2]||'master';
const edge=process.env.ARC_RENDER_BROWSER||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.tsx'),publicDir:path.join(root,'public'),outDir:path.join(root,'.cache/bundle'),onProgress:()=>{}});
const browser=await openBrowser('chrome',{browserExecutable:edge,chromiumOptions:{gl:'angle'}});
try {
 const composition=await selectComposition({port:3110,serveUrl,id:'ARCIntroMaster',browserExecutable:edge,puppeteerInstance:browser});
 if(mode==='stills'){
  fs.mkdirSync('qa',{recursive:true});
  const shots=[1,3.7,5.5,6.9,8.3,10.1,11.7,13.4,16.5,20.9,24,27.5,30.6,35,37.7,41.6,43.7,44.7,45.7,46.7,48.2,50.2,53.7,57.8,59.5];
  for(const t of shots){await renderStill({port:3110,serveUrl,composition,frame:Math.round(t*30),output:`qa/frame-${t.toFixed(1)}.png`,browserExecutable:edge,puppeteerInstance:browser,logLevel:'error'});console.log(`Still ${t}s`);}
 }else{
  const draft=mode==='draft';let last=-1;
  const outputLocation=draft?'deliverables/ARC_CINEMATIC_INTRO_DRAFT.mp4':'deliverables/ARC_CINEMATIC_INTRO_MASTER.mov';
  await renderMedia({port:3110,serveUrl,composition,outputLocation,codec:draft?'h264':'prores',...(draft?{crf:21,pixelFormat:'yuv420p',scale:.5}:{proResProfile:'hq',pixelFormat:'yuv422p10le',audioCodec:'pcm-16',scale:1}),imageFormat:'png',concurrency:4,browserExecutable:edge,puppeteerInstance:browser,chromiumOptions:{gl:'angle'},onProgress:({progress,renderedFrames})=>{const next=Math.floor(progress*100/5)*5;if(next!==last){last=next;console.log(`${mode}: ${next}% / ${renderedFrames} rendered frames`);}},logLevel:'error'});
  console.log(`Rendered ${outputLocation}`);
  if(!draft){
   const master=path.join(root,outputLocation);
   execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',master,'-c:v','libx264','-preset','slow','-crf','15','-pix_fmt','yuv420p','-c:a','aac','-b:a','320k','-movflags','+faststart','deliverables/ARC_CINEMATIC_INTRO_MASTER.mp4'],{stdio:'inherit'});
   execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',master,'-vf','scale=1280:720:flags=lanczos','-c:v','libx264','-preset','slow','-crf','23','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-movflags','+faststart','deliverables/ARC_CINEMATIC_INTRO_PREVIEW.mp4'],{stdio:'inherit'});
   console.log('Master MP4 and sharing preview encoded from the ProRes HQ master.');
  }
 }
}finally{await browser.close({silent:true});}
