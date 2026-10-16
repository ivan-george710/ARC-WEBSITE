"""Original procedural sound design. No sampled recordings and no generated/licensed song."""
from pathlib import Path
import wave, json
import numpy as np
SR=48000
DURATION=60
rng=np.random.default_rng(2706)
mix=np.zeros((SR*DURATION,2),dtype=np.float64)
cues=[]
def add(at,mono,gain=.1,pan=0,label=''):
    start=int(at*SR); end=min(len(mix),start+len(mono))
    if end<=start:return
    mono=mono[:end-start]*gain
    l=np.sqrt((1-pan)/2);r=np.sqrt((1+pan)/2)
    mix[start:end,0]+=mono*l;mix[start:end,1]+=mono*r
    if label:cues.append(dict(at=at,duration=round(len(mono)/SR,3),label=label,gain=gain,pan=pan))
def sine(duration,freq,decay=2):
    t=np.arange(int(duration*SR))/SR
    env=(1-np.exp(-t*80))*np.exp(-t*decay)*np.minimum(1,(duration-t)*5)
    return np.sin(2*np.pi*freq*t)*env

def impact(at,gain=.25,label='low impact'):
    dur=2.5;t=np.arange(int(dur*SR))/SR
    phase=2*np.pi*(36*t+19*(1-np.exp(-t*6))/6)
    sig=np.sin(phase)*(1-np.exp(-t*180))*np.exp(-t*3)+.13*np.sin(2*np.pi*84*t)*np.exp(-t*6)
    add(at,sig,gain,0,label)

def confirm(at,pan=0):
    add(at,sine(.7,660,8)+.35*sine(.7,990,10),.035,pan,'soft UI confirmation')
# Near-silent physical room tone opens into a restrained electronic sound bed.
for at,dur,gain,pan in [(0,6,.022,-.25),(13.2,7,.035,.3),(35.8,7.2,.022,-.2),(50.5,8.8,.028,.2)]:
    n=int(dur*SR);f=np.fft.rfftfreq(n,1/SR)
    s=np.fft.irfft(np.fft.rfft(rng.normal(0,1,n))*np.exp(-f/260),n)
    s/=np.max(np.abs(s));env=np.sin(np.linspace(0,np.pi,n))**1.7
    add(at,s*env,gain,pan,'low atmospheric texture')
# Drawn-line tones: sparse, non-melodic textures; not a replacement musical score.
for at,freq,dur,gain,pan in [(1,110,4,.035,-.4),(3.15,165,2.4,.028,.3),(14,110,5,.04,-.2),(19,220,1.4,.02,.4),(39.6,165,3.3,.04,0),(51.2,110,5.2,.045,-.4),(56.4,55,3.5,.075,0)]:
    add(at,sine(dur,freq,.35)*np.sin(np.linspace(0,np.pi,int(dur*SR))),gain,pan,'ARC line tonal swell')
for at,gain in [(5.9,.22),(8,.15),(11.1,.19),(12.45,.2),(14,.3),(20,.2),(22.7,.18),(26.05,.2),(29.3,.14),(33.45,.24),(36,.12),(39.6,.2),(43,.22),(47,.26),(49.1,.28),(51,.17),(56.4,.3)]: impact(at,gain)
# Transition air passes and circumstance movement noises intentionally removed.
# Keep the deterministic low impacts, UI cues, pulses and ARC line tones below.
for i,at in enumerate([23.1,26.5,29.7,33.9,43.25,44.35,45.35,46.35,48.7]):confirm(at,(-.25 if i%2 else .25))
# Measured pulse supplies editorial intent; no borrowed rhythm or recordings.
for at in np.arange(14.5,35.9,1.5):add(float(at),sine(.65,48,7),.075,0,'slow sub pulse')
for at in [43.5,44.5,45.5,46.5,47.5,48.5,49.5,50.5]:add(at,sine(.5,58,8),.085,0,'system pulse')
# Quiet resolved tail with a long fade. No abrupt audio boundary.
t=np.arange(len(mix))/SR
mix*=np.minimum(1,t/.7)[:,None]*np.clip((60-t)/1.8,0,1)[:,None]
# Gentle saturation, with fixed headroom and no sample clipping.
mix=np.tanh(mix*1.45)
peak=float(np.max(np.abs(mix)))
if peak>.79:mix*=.79/peak
out=Path(__file__).resolve().parents[1]/'public/audio';out.mkdir(parents=True,exist_ok=True)
def wav24(file,a):
    integers=np.round(np.clip(a,-.999,.999)*8388607).astype(np.int32)
    packed=np.empty((integers.size,3),dtype=np.uint8)
    flat=integers.ravel()
    for i in range(3):packed[:,i]=(flat>>(8*i))&255
    with wave.open(str(file),'wb') as w:
        w.setnchannels(2);w.setsampwidth(3);w.setframerate(SR);w.writeframes(packed.tobytes())
wav24(out/'ARC_SOUND_DESIGN_STEM.wav',mix)
(out/'sound-cues.json').write_text(json.dumps(sorted(cues,key=lambda x:x['at']),indent=2))
print(f'Restrained sound design: {len(cues)} cues, {SR}Hz / stereo / 24-bit / {DURATION}s; peak {20*np.log10(np.max(np.abs(mix))):.2f} dBFS. No transition air passes; music and final mix are not overwritten.')
