import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const qa=path.join(root,'qa/audio-score');
fs.mkdirSync(qa,{recursive:true});
const files=['ARC_CINEMATIC_INTRO_MASTER.mp4','ARC_CINEMATIC_INTRO_PREVIEW.mp4','ARC_CINEMATIC_INTRO_MASTER.mov'];
export function probe(file){return JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',file],{encoding:'utf8',maxBuffer:5e6}));}
export function videoHash(file){return execFileSync('ffmpeg',['-v','error','-i',file,'-map','0:v:0','-c:v','copy','-f','hash','-hash','sha256','-'],{encoding:'utf8',maxBuffer:5e6}).trim();}
export function sha(file){return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');}
if(process.argv[2]==='prepare'){
 if(fs.existsSync(path.join(qa,'approved-picture.json')))throw Error('Approved reference already exists; refusing to overwrite it.');
 const snapshot={status:'Approved picture reference; soundtrack update pending licensed audio replacement.',created:new Date().toISOString(),files:[],soundDesign:{path:'public/audio/ARC_SOUND_DESIGN_STEM.wav',sha256:sha(path.join(root,'public/audio/ARC_SOUND_DESIGN_STEM.wav'))}};
 for(const name of files){
  const file=path.join(root,'deliverables',name),meta=probe(file),v=meta.streams.find(s=>s.codec_type==='video');
  snapshot.files.push({name,videoHash:videoHash(file),width:v.width,height:v.height,codec:v.codec_name,pixelFormat:v.pix_fmt,frames:v.nb_frames,fps:v.r_frame_rate,videoDuration:v.duration,containerDuration:meta.format.duration});
  console.log(`Saved approved video-packet fingerprint: ${name}`);
 }
 fs.writeFileSync(path.join(qa,'approved-picture.json'),JSON.stringify(snapshot,null,2));
 console.log('Approved streams and original sound-design stem fingerprinted; no media file changed.');
}
if(process.argv[2]==='apply'){
 const baseline=JSON.parse(fs.readFileSync(path.join(qa,'approved-picture.json'),'utf8'));
 const sound=path.join(root,'public/audio/ARC_SOUND_DESIGN_STEM.wav');
 // An intentional SFX revision uses an audited reference; picture hashes never change.
 const audioReference=process.argv[3]?JSON.parse(fs.readFileSync(path.resolve(process.argv[3]),'utf8')):null;
 if(sha(sound)!==(audioReference?.soundDesign.sha256??baseline.soundDesign.sha256))throw Error('Unexpected sound-design revision.');
 if(audioReference&&sha(path.join(root,audioReference.music.path))!==audioReference.music.sha256)throw Error('Approved music stem changed.');
 const stage=path.join(root,'deliverables/.audio-update');fs.mkdirSync(stage,{recursive:true});
 const credit="'Machina' by Scott Buckley - released under CC-BY 4.0. www.scottbuckley.com.au | https://www.scottbuckley.com.au/library/machina/ | https://creativecommons.org/licenses/by/4.0/ | Edited, crossfaded, EQ, mixed with ARC sound design.";
 const report={date:new Date().toISOString(),audioOnly:true,credit,files:[],soundDesignSha256:sha(sound),subjectiveListening:'Not available to the agent; full real-time playback and signal checks are recorded separately.'};
 for(const ref of baseline.files){
  const original=path.join(root,'deliverables',ref.name),out=path.join(stage,ref.name);
  if(videoHash(original)!==ref.videoHash)throw Error(`Approved reference mismatch: ${ref.name}`);
  const mov=ref.name.endsWith('.mov');
  execFileSync('ffmpeg',['-y','-v','error','-i',original,'-i',path.join(root,'public/audio/ARC_FINAL_MIX.wav'),
   '-map','0:v:0','-map','1:a:0','-map_metadata','0','-c:v','copy','-c:a',mov?'pcm_s16le':'aac',
   ...(mov?[]:['-b:a',ref.name.includes('PREVIEW')?'192k':'320k']),'-ar','48000','-ac','2',
   '-metadata',`comment=${credit}`,'-metadata','artist=Music: Scott Buckley; sound design: ARC',
   '-metadata','copyright=Music licensed CC BY 4.0; attribution required','-movflags','+faststart',out],{stdio:'inherit'});
  const meta=probe(out),v=meta.streams.find(s=>s.codec_type==='video'),a=meta.streams.find(s=>s.codec_type==='audio');
  if(videoHash(out)!==ref.videoHash||v.nb_frames!=='1800'||v.duration!=='60.000000'||meta.format.duration!=='60.000000'||!a||a.sample_rate!=='48000')throw Error(`Validation failed: ${ref.name}`);
  execFileSync('ffmpeg',['-v','error','-threads','2','-i',out,'-f','null','-'],{stdio:'inherit'});
  report.files.push({name:ref.name,videoHash:ref.videoHash,pictureBytesIdentical:true,fullDecode:'pass',duration:meta.format.duration,video:v,audio:a});
  console.log(`Verified unchanged approved picture and 60-second audio: ${ref.name}`);
 }
 // Commit only after all staged outputs pass. The approved picture reference persists.
 for(const name of files)fs.renameSync(path.join(stage,name),path.join(root,'deliverables',name));
 for(const name of ['ARC_SOUND_DESIGN_STEM.wav','ARC_MUSIC_STEM.wav','ARC_FINAL_MIX.wav','sound-cues.json'])fs.copyFileSync(path.join(root,'public/audio',name),path.join(root,'deliverables/audio',name));
 fs.writeFileSync(path.join(qa,'score-report.json'),JSON.stringify(report,null,2));
 console.log('Published all three audio-only exports.');
}
