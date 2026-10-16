import {execFileSync} from 'node:child_process';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const music=path.resolve(process.argv[2]||path.join(root,'public/audio/ARC_MUSIC_STEM.wav'));
// The optional music input must be an original or appropriately licensed track.
// Match the approved score mix chain; read the existing music without rewriting it.
const graph='[0:a]volume=5dB,asplit=2[sfx][key];'+
 '[1:a][key]sidechaincompress=threshold=0.055:ratio=2.5:attack=12:release=220:makeup=1[duck];'+
 '[sfx][duck]amix=inputs=2:duration=first:normalize=0,'+
 'loudnorm=I=-18:TP=-1.8:LRA=11,aresample=48000,'+
 'afade=t=out:st=59:d=1,atrim=duration=60[a]';
execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',path.join(root,'public/audio/ARC_SOUND_DESIGN_STEM.wav'),'-i',music,'-filter_complex',graph,'-map','[a]','-ar','48000','-c:a','pcm_s24le',path.join(root,'public/audio/ARC_FINAL_MIX.wav')],{stdio:'inherit'});
console.log(`Final mix rebuilt with the existing music input: ${music}`);
