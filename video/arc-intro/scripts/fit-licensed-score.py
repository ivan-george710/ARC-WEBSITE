"""Audio-only adaptation of Scott Buckley's CC BY 4.0 Machina.
Requires the licensed source and notices in ../music. Never renders picture.
"""
from pathlib import Path
import subprocess, json
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SR = 48000
OUT = ROOT / 'public/audio'
QA = ROOT / 'qa/audio-score'
QA.mkdir(parents=True, exist_ok=True)

def decode(file, filters='anull'):
    return np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(file),
        '-af',filters,'-ar',str(SR),'-ac','2','-f','f32le','-']),dtype='<f4').reshape(-1,2).copy()

def write(file, samples):
    subprocess.run(['ffmpeg','-y','-v','error','-f','f32le','-ar',str(SR),'-ac','2',
        '-i','-','-c:a','pcm_s24le',str(file)],input=samples.astype('<f4').tobytes(),check=True)

source = decode(ROOT/'music/sb_machina.mp3','highpass=f=45,equalizer=f=240:t=q:w=0.8:g=-1.5')
music = np.zeros((60*SR,2),dtype=np.float32)
weights = np.zeros(60*SR,dtype=np.float32)
# Timeline in/out, original recording in. Overlapping ambient phrases use
# complementary cosine fades; no time stretching or pitch changes.
edits = [(0,14.8,0),(13.6,21,120),(19.6,36.8,178),
         (35.6,43.8,78),(42.6,58.9,198),(57.6,60,278)]
for i,(start,end,original) in enumerate(edits):
    a,b,c=[round(x*SR) for x in (start,end,original)]
    w=np.ones(b-a,dtype=np.float32)
    if i:
        n=round((edits[i-1][1]-start)*SR)
        w[:n]=0.5-0.5*np.cos(np.linspace(0,np.pi,n))
    if i<len(edits)-1:
        n=round((end-edits[i+1][0])*SR)
        w[-n:]=0.5+0.5*np.cos(np.linspace(0,np.pi,n))
    music[a:b]+=source[c:c+b-a]*w[:,None]
    weights[a:b]+=w
assert weights.min()>0.999
t=np.arange(60*SR)/SR
# Restrained opening; product identity, montage, breathing room, final rise.
points=[(0,-24),(2,-20),(6,-13),(13.5,-10),(14.5,-5),(20,-4),
        (33,-3),(35.5,-5),(36.5,-12),(41.5,-12),(43.5,-5),
        (50.5,-4),(52,-3),(57.8,-3),(58.5,-7),(59.6,-25),(60,-90)]
gain=np.interp(t,*zip(*points))
music*=10**(gain[:,None]/20)
music[:int(.9*SR)]*=np.linspace(0,1,int(.9*SR))[:,None]
music[-int(.7*SR):]*=np.linspace(1,0,int(.7*SR))[:,None]
write(OUT/'ARC_MUSIC_STEM.wav',music)
(QA/'music-edit.json').write_text(json.dumps({'source':'Machina - Scott Buckley',
    'sourceIntervals':edits,'gainAutomationDb':points,'sampleRate':SR,
    'changes':'Audio excerpts, cosine crossfades, EQ, level automation and ending fade; no picture changes.'},indent=2))

# SFX +5 dB; modest sidechain attenuation protects individual cues.
# Keep the supplied raw sound-design stem byte-identical.
graph=('[0:a]volume=5dB,asplit=2[sfx][key];'
       '[1:a][key]sidechaincompress=threshold=0.055:ratio=2.5:attack=12:release=220:makeup=1[duck];'
       '[sfx][duck]amix=inputs=2:duration=first:normalize=0,'
       'loudnorm=I=-18:TP=-1.8:LRA=11,aresample=48000,'
       'afade=t=out:st=59:d=1,atrim=duration=60[a]')
subprocess.run(['ffmpeg','-y','-v','error','-i',str(OUT/'ARC_SOUND_DESIGN_STEM.wav'),
    '-i',str(OUT/'ARC_MUSIC_STEM.wav'),'-filter_complex',graph,'-map','[a]',
    '-c:a','pcm_s24le',str(OUT/'ARC_FINAL_MIX.wav')],check=True)
print('Wrote 60-second music stem and final mix. Original SFX unchanged.')
