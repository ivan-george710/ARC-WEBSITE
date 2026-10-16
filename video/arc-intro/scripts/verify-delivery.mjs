import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
process.chdir(root);
const report={created:new Date().toISOString(),durationSeconds:60,expectedFrames:1800,files:[],review:{keyframes:25,draftTimelineSamples:120,phoneTransitions:'Outgoing content fully leaves before incoming content enters; frame-driven, no asynchronous UI state.',music:'Original sound design only; silent replacement input explicitly identified.'}};
for(const name of ['ARC_CINEMATIC_INTRO_MASTER.mov','ARC_CINEMATIC_INTRO_MASTER.mp4','ARC_CINEMATIC_INTRO_PREVIEW.mp4']){
 const file=path.join('deliverables',name);
 const meta=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',file],{encoding:'utf8',maxBuffer:5e6}));
 const v=meta.streams.find(s=>s.codec_type==='video'), a=meta.streams.find(s=>s.codec_type==='audio');
 assert(v&&a,name+' must contain picture and sound');
 assert.equal(v.nb_frames,'1800');assert.equal(v.r_frame_rate,'30/1');
 assert.equal(v.width,name.includes('PREVIEW')?1280:1920);assert.equal(v.height,name.includes('PREVIEW')?720:1080);
 assert.equal(a.channels,2);assert.equal(a.sample_rate,'48000');
 assert(Math.abs(Number(meta.format.duration)-60)<.05);
 // Full media decode reports any corrupt frame/audio packet, not just headers.
 execFileSync('ffmpeg',['-v','error','-threads','2','-i',file,'-f','null','NUL'],{stdio:['ignore','pipe','pipe'],maxBuffer:5e6});
 const timing=execFileSync('ffprobe',['-v','error','-threads','2','-select_streams','v:0','-show_entries','frame=best_effort_timestamp_time','-of','csv=p=0',file],{encoding:'utf8',maxBuffer:5e6}).split(/\r?\n/).map(parseFloat).filter(Number.isFinite);
 assert.equal(timing.length,1800);
 for(let i=1;i<timing.length;i++)assert(Math.abs(timing[i]-timing[i-1]-1/30)<.000002,'Non-CFR interval');
 report.files.push({name,bytes:fs.statSync(file).size,codec:v.codec_name,profile:v.profile,pixelFormat:v.pix_fmt,width:v.width,height:v.height,frames:timing.length,fps:30,duration:Number(meta.format.duration),audioCodec:a.codec_name,audioChannels:a.channels,sampleRate:Number(a.sample_rate),fullDecode:'pass',constantFrameIntervals:'pass'});
 console.log(`Verified ${name}: full decode / 1800 CFR frames / 60 seconds / stereo.`);
}
execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-threads','2','-ss','16.5','-i','deliverables/ARC_CINEMATIC_INTRO_MASTER.mp4','-frames:v','1','deliverables/ARC_CINEMATIC_INTRO_POSTER.png']);
execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-threads','2','-i','deliverables/ARC_CINEMATIC_INTRO_MASTER.mp4','-vf','select=eq(n\\,1799)','-frames:v','1','qa/final-black.png']);
const loud=spawnSync('ffmpeg',['-hide_banner','-nostats','-i','public/audio/ARC_FINAL_MIX.wav','-af','loudnorm=I=-18:TP=-1.5:LRA=11:print_format=json','-f','null','NUL'],{encoding:'utf8',maxBuffer:5e6});
assert.equal(loud.status,0);
const values=JSON.parse(loud.stderr.match(/\{\s*"input_i"[\s\S]*?\}/)[0]);
assert(Number(values.input_tp)<=-1.4);assert(Number(values.input_i)>-20&&Number(values.input_i)<-16);
report.audio={integratedLUFS:Number(values.input_i),truePeakDBTP:Number(values.input_tp),loudnessRangeLU:Number(values.input_lra),source:'Original procedural sound design, 48kHz / 24-bit stereo; no music score supplied.'};
fs.mkdirSync('deliverables/audio',{recursive:true});
for(const name of ['ARC_SOUND_DESIGN_STEM.wav','MUSIC_INPUT_SILENT.wav','ARC_FINAL_MIX.wav'])fs.copyFileSync(path.join('public/audio',name),path.join('deliverables/audio',name));
fs.writeFileSync('deliverables/media-report.json',JSON.stringify(report,null,2));
console.log(`Final mix: ${values.input_i} LUFS, ${values.input_tp} dBTP. Poster, stems and media report saved.`);
