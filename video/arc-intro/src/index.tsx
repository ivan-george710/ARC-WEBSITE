import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, Composition, Img, Sequence, cancelRender, continueRender, delayRender, registerRoot, staticFile, useCurrentFrame } from 'remotion';
import './style.css';
const FPS = 30;
const BLUE = '#5B8BEF', WHITE = '#E8ECEE', STEEL = '#A5B5C2';
const clamp = (x: number) => Math.max(0, Math.min(1, x));
const p = (t: number, a: number, d: number) => clamp((t - a) / d);
const out = (x: number) => 1 - (1 - x) ** 4;
const smooth = (x: number) => x * x * (3 - 2 * x);
const asset = (name: string) => staticFile(`assets/${name}`);
const rise = 'M-120 720 C 280 770, 285 140, 690 120 C 1090 100, 1060 610, 1510 540';
const wave = 'M-80 350 C 300 -80, 500 790, 810 350 S 1260 40, 1490 400';
type Screen = 'rigid' | 'baseline' | 'time' | 'travel' | 'body' | 'goal' | 'system' | 'nourish' | 'recover' | 'progress';
// Cut points are editorial beats, not website scroll positions.
export const EDIT = { opening: 0, problem: 6, arrival: 14, adaptation: 20, core: 36, system: 43, final: 51, end: 60 };
export const FORMATS = { master: { width: 1920, height: 1080, fps: FPS }, portrait: { width: 1080, height: 1920, fps: FPS } };
function Arc({ t, variant = 'rise', opacity = .5, draw = 1, y = 0 }: {
    t: number;
    variant?: 'rise' | 'wave';
    opacity?: number;
    draw?: number;
    y?: number;
}) {
    return <svg className="film-arc" viewBox="0 0 1400 700" style={{ opacity, transform: `translateY(${y + Math.sin(t * .12) * 8}px) scale(1.12)` }}><defs><linearGradient id={`arc-${variant}`}><stop stopColor="#26313B"/><stop offset=".45" stopColor="#C2CFD8"/><stop offset=".65" stopColor={BLUE}/><stop offset="1" stopColor="#26313B"/></linearGradient></defs><path d={variant === 'rise' ? rise : wave} pathLength="1" stroke={`url(#arc-${variant})`} strokeWidth="1.2" fill="none" strokeDasharray="1" strokeDashoffset={1 - clamp(draw)}/></svg>;
}
function Backdrop({ t, dark = false }: {
    t: number;
    dark?: boolean;
}) {
    return <AbsoluteFill style={{ background: dark ? '#020304' : '#060A0D' }}><div className="atmosphere" style={{ opacity: dark ? .28 : .7, transform: `translateX(${Math.sin(t * .08) * 35}px)` }}/><div className="vignette"/></AbsoluteFill>;
}
function Reveal({ t, at = 0, duration = .7, children, style = {} }: {
    t: number;
    at?: number;
    duration?: number;
    children: React.ReactNode;
    style?: React.CSSProperties;
}) {
    const k = out(p(t, at, duration));
    return <div style={{ ...style, opacity: k * (typeof style.opacity === 'number' ? style.opacity : 1), transform: `translateY(${(1 - k) * 32}px) scale(${.985 + .015 * k})`, filter: k < .999 ? `blur(${(1 - k) * 12}px)` : 'none' }}>{children}</div>;
}
function Title({ children, size = 130, style = {} }: {
    children: React.ReactNode;
    size?: number;
    style?: React.CSSProperties;
}) { return <div className="title" style={{ fontSize: size, ...style }}>{children}</div>; }
function Phone({ t, screen = 'baseline', previous, change = 0, x = 1295, y = 90, width = 405, opacity = 1, drift = true }: {
    t: number;
    screen?: Screen;
    previous?: Screen;
    change?: number;
    x?: number;
    y?: number;
    width?: number;
    opacity?: number;
    drift?: boolean;
}) {
    const scale = width / 460;
    const transition = p(t, change, .68);
    const old = smooth(p(t, change, .28)), incoming = out(p(t, change + .31, .37));
    const nav = screen === 'nourish' ? 1 : screen === 'recover' ? 2 : screen === 'progress' ? 3 : 0;
    const contentStyle: React.CSSProperties = { position: 'absolute', left: 34.1875, top: 154.78125, width: 391.625, height: 740.453125, overflow: 'hidden' };
    const screenImg = (s: Screen, o: number, dy: number, b: number) => <Img src={asset(`ui-${s}.png`)} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, opacity: o, transform: `translateY(${dy}px) scale(${1 + b * .001})`, filter: b > .01 ? `blur(${b}px)` : 'none' }}/>;
    return <div className="phone-object" style={{ left: x, top: y, width: 460, height: 1002.796875, opacity, transform: `perspective(1800px) rotateY(${drift ? -3 + Math.sin(t * .16) * 1.5 : 0}deg) translateY(${drift ? Math.sin(t * .19) * -4 : 0}px) scale(${scale})`, transformOrigin: 'top left' }}>
  <Img src={asset(screen === 'rigid' ? 'phone-rigid-chrome.png' : 'phone-chrome.png')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}/>
  <div style={contentStyle}>{previous && transition < 1 ? screenImg(previous, 1 - old, -18 * old, old * 8) : null}{screenImg(screen, previous ? incoming : 1, previous ? 18 * (1 - incoming) : 0, previous ? (1 - incoming) * 8 : 0)}</div>
  <div style={{ position: 'absolute', left: nav === 0 ? 34.2 : 34.2 + nav * 97.9, top: 895.2, width: 97.9, height: 1.6, background: BLUE, opacity: previous && transition < .45 ? 0 : .8 }}/>
  <div className="phone-light" style={{ opacity: .08 + Math.sin(t * .6) * .025 }}/>
 </div>;
}
function Opening() {
    const t = useCurrentFrame() / FPS;
    const word = (text: string, at: number) => <span style={{ display: 'inline-block', opacity: out(p(t, at, .8)), filter: `blur(${(1 - out(p(t, at, .8))) * 14}px)`, transform: `translateY(${(1 - out(p(t, at, .8))) * 25}px)` }}>{text}</span>;
    const exit = 1 - smooth(p(t, 4.7, .5));
    return <AbsoluteFill><Backdrop t={t} dark/><Arc t={t} opacity={.48 * out(p(t, .6, 2))} draw={p(t, .6, 4.7)} y={30}/><div style={{ position: 'absolute', left: 140, top: 290, opacity: exit }}><Title size={176} style={{ letterSpacing: `${-.055 - (1 - p(t, 1.6, 2)) * .015}em` }}>{word('EVERY', 1.45)} {word('BODY', 1.92)}<br />{word('HAS', 2.55)} {word('AN', 2.85)} {word('ARC.', 3.15)}</Title></div><div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: out(p(t, 5.05, .25)) * (1 - p(t, 5.72, .25)) }}><Title size={410}>ARC</Title></div></AbsoluteFill>;
}
function Problem() {
    const t = useCurrentFrame() / FPS;
    const words = ['WORK', 'TRAVEL', 'TIME', 'INJURY', 'EQUIPMENT', 'GOALS'];
    return <AbsoluteFill><Backdrop t={t + 6}/><Arc t={t} variant="wave" opacity={.1} draw={1}/>
 {t < 2.1 && <Reveal t={t} at={.05}><Title size={126} style={{ position: 'absolute', left: 130, top: 250 }}>FITNESS PLANS ASSUME<br /><span style={{ color: STEEL }}>YOUR LIFE STAYS THE SAME.</span></Title></Reveal>}
 {t >= 1.9 && t < 5.12 && <><Phone t={t} screen="rigid" x={1240} y={130} width={360} opacity={out(p(t, 1.9, .5))}/>{words.map((w, i) => { const s = t - 2.05 - i * .45; const o = out(p(s, 0, .14)) * (1 - smooth(p(s, .34, .16))); return <div key={w} className="title" style={{ position: 'absolute', left: 130, top: 385, fontSize: w === 'EQUIPMENT' ? 128 : 184, opacity: o, transform: `translateX(${(1 - out(p(s, 0, .2))) * -200 + smooth(p(s, .34, .16)) * 100}px)`, filter: `blur(${(1 - o) * 5}px)` }}>{w}</div>; })}<div className="small-label" style={{ left: 140, top: 800, color: STEEL }}>THE CIRCUMSTANCES MOVE.<br />THE PLAN DOESN’T.</div></>}
 {t >= 5.1 && t < 6.45 && <Reveal t={t} at={5.1} duration={.35}><Title size={158} style={{ position: 'absolute', left: 130, top: 350 }}>YOUR LIFE<br />CHANGES.</Title></Reveal>}
 {t >= 6.45 && <Reveal t={t} at={6.45} duration={.45}><Title size={144} style={{ position: 'absolute', left: 130, top: 350 }}>YOUR FITNESS<br />SHOULD TOO<span style={{ color: BLUE }}>.</span></Title></Reveal>}
 </AbsoluteFill>;
}
function Arrival() {
    const t = useCurrentFrame() / FPS;
    const k = out(p(t, 0, 1.3));
    return <AbsoluteFill><Backdrop t={14 + t}/><Arc t={t} opacity={.7} draw={p(t, 0, 3.5)}/><div className="product-pool" style={{ opacity: k }}/><Phone t={t} x={1285 + (1 - k) * 70} y={90} width={405} opacity={k}/><Reveal t={t} at={.3} duration={1.2} style={{ position: 'absolute', left: 125, top: 275 }}><Title size={350}>ARC<span className="brand-period"/></Title></Reveal><Reveal t={t} at={1.25} style={{ position: 'absolute', left: 145, top: 670 }}><div className="spaced" style={{ fontSize: 33, color: STEEL }}>BUILT AROUND CHANGE.</div></Reveal><div className="energy-line" style={{ width: 750 * out(p(t, 2, 2)), left: 145, top: 752 }}/></AbsoluteFill>;
}
function Adaptation() {
    const t = useCurrentFrame() / FPS;
    let screen: Screen = 'baseline', prev: Screen | undefined, change = 0;
    if (t >= 2.7 && t < 6.05) {
        screen = 'time';
        prev = 'baseline';
        change = 2.7;
    }
    if (t >= 6.05 && t < 9.3) {
        screen = 'travel';
        prev = 'time';
        change = 6.05;
    }
    if (t >= 9.3 && t < 12.1) {
        screen = 'body';
        prev = 'travel';
        change = 9.3;
    }
    if (t >= 12.1 && t < 13.45) {
        screen = 'baseline';
        prev = 'body';
        change = 12.1;
    }
    if (t >= 13.45) {
        screen = 'goal';
        prev = 'baseline';
        change = 13.45;
    }
    return <AbsoluteFill><Backdrop t={t + 20}/><Arc t={t} opacity={.16} draw={1}/><div className="product-pool" style={{ opacity: .5 }}/><Phone t={t} screen={screen} previous={prev} change={change} x={t < 1.9 ? 1295 - out(p(t, 0, 1.9)) * 25 : t < 5.25 ? 1295 : t < 8.5 ? 1255 : t < 12.1 ? 1320 : 1265} y={t < 1.9 ? 90 - out(p(t, 0, 1.9)) * 20 : t < 5.25 ? 90 : t < 8.5 ? 65 : t < 12.1 ? 110 : 65} width={t < 1.9 ? 405 + out(p(t, 0, 1.9)) * 30 : t < 5.25 ? 405 : t < 8.5 ? 435 : t < 12.1 ? 385 : 435}/>
 {t < 1.9 && <Reveal t={t} at={.1}><div style={{ position: 'absolute', left: 140, top: 285 }}><div className="spaced" style={{ color: STEEL, fontSize: 25 }}>TODAY’S TRAINING</div><Title size={240}>60 <span style={{ fontSize: 70, color: STEEL }}>MIN</span></Title><div className="spaced" style={{ fontSize: 43, color: BLUE }}>GYM</div></div></Reveal>}
 {t >= 1.9 && t < 5.25 && <><Reveal t={t} at={1.9} duration={.45} style={{ position: 'absolute', left: 140, top: 180 }}><Title size={110}>MEETING<br />RAN LATE.</Title></Reveal><div style={{ position: 'absolute', left: 140, top: 550 }}><Title size={228}>{Math.round(60 - 50 * smooth(p(t, 2.7, .65)))} <span style={{ fontSize: 60, color: STEEL }}>MIN</span></Title><Reveal t={t} at={3.4}><div className="spaced" style={{ fontSize: 24, color: BLUE }}>PLAN ADJUSTED.</div></Reveal></div></>}
 {t >= 5.25 && t < 8.5 && <><Reveal t={t} at={5.25} style={{ position: 'absolute', left: 140, top: 220 }}><Title size={108}>TRAVELLING.<br /><span style={{ color: STEEL }}>NO GYM.</span></Title></Reveal><Reveal t={t} at={6.2} style={{ position: 'absolute', left: 145, top: 640 }}><Title size={77} style={{ color: BLUE }}>HOTEL / HOME</Title></Reveal></>}
 {t >= 8.5 && t < 12.1 && <><Reveal t={t} at={8.5} style={{ position: 'absolute', left: 125, top: 150 }}><Title size={99}>SHOULDER<br />DOESN’T FEEL<br />RIGHT.</Title></Reveal><Reveal t={t} at={9.55} style={{ position: 'absolute', left: 900, top: 450 }}><Img src={asset('body-shoulder.svg')} style={{ height: 405, width: 243 }}/><svg style={{ position: 'absolute', inset: 0, width: 243, height: 405 }} viewBox="0 0 72 120"><circle cx="47" cy="30" r={8 + Math.sin(t * 3) * 1.2} fill="none" stroke={BLUE} strokeWidth=".3"/></svg></Reveal><Reveal t={t} at={9.75} style={{ position: 'absolute', left: 140, top: 720 }}><div className="spaced" style={{ fontSize: 32, color: BLUE }}>GIVE PRESSING<br />A PAUSE.</div></Reveal></>}
 {t >= 12.1 && <><Reveal t={t} at={12.1} style={{ position: 'absolute', left: 140, top: 230 }}><div className="spaced" style={{ color: STEEL, fontSize: 30 }}>SIX MONTHS LATER.</div></Reveal><div style={{ position: 'absolute', left: 130, top: 380 }}>{t < 13.55 ? <Reveal t={t} at={12.4}><Title size={108} style={{ color: STEEL, opacity: 1 - smooth(p(t, 13.25, .3)) }}>BUILD MUSCLE</Title></Reveal> : <Reveal t={t} at={13.55}><Title size={145}>RUN A 10K<span style={{ color: BLUE }}>.</span></Title></Reveal>}</div><Reveal t={t} at={14.15} style={{ position: 'absolute', left: 145, top: 650 }}><div className="spaced" style={{ fontSize: 26, color: BLUE }}>A NEW GOAL.<br />A WHOLE NEW PLAN.</div></Reveal></>}
 </AbsoluteFill>;
}
function Core() { const t = useCurrentFrame() / FPS; return <AbsoluteFill><Backdrop t={36 + t} dark/><Arc t={t} variant="wave" opacity={.16} draw={1}/>{t < 3.55 ? <Reveal t={t} at={.25} duration={.9} style={{ position: 'absolute', left: 130, top: 260, opacity: 1 - smooth(p(t, 3.15, .4)) }}><Title size={113} style={{ color: STEEL }}>PERSONALIZATION ISN’T<br />KNOWING YOU<br />ON DAY ONE.</Title></Reveal> : <Reveal t={t} at={3.6} duration={.8} style={{ position: 'absolute', left: 130, top: 300 }}><Title size={106}>IT’S STILL KNOWING YOU</Title><Title size={198} style={{ color: BLUE, marginTop: 15 }}>ON DAY 200.</Title></Reveal>}</AbsoluteFill>; }
function Network({ t }: {
    t: number;
}) { const nodes = ['TRAINING', 'NUTRITION', 'RECOVERY', 'COACHING', 'PHYSIOTHERAPY', 'GYMS', 'WELLNESS']; const connect = smooth(p(t, 1, 1.1)); return <AbsoluteFill><svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>{nodes.map((n, i) => { const a = i / 7 * Math.PI * 2 - Math.PI / 2; const x = 960 + Math.cos(a) * 650, y = 420 + Math.sin(a) * 250; return <g key={n}><line x1={x} y1={y} x2={x + (960 - x) * connect} y2={y + (420 - y) * connect} stroke={BLUE} opacity={.4 * connect} strokeWidth={1}/><circle cx={x} cy={y} r={3.5} fill={connect > .5 ? BLUE : STEEL}/></g>; })}</svg>{nodes.map((n, i) => { const a = i / 7 * Math.PI * 2 - Math.PI / 2; const x = 960 + Math.cos(a) * 650, y = 420 + Math.sin(a) * 250; return <div key={n} className="spaced" style={{ position: 'absolute', left: x - 180, top: y - 22, width: 360, textAlign: 'center', fontSize: 28, textShadow: '0 0 12px #060A0D,0 0 24px #060A0D', padding: '7px 0', opacity: out(p(t, .08 + i * .07, .3)), transform: `translateY(${(1 - out(p(t, 0, .7))) * 20}px)` }}>{n}</div>; })}<div style={{ position: 'absolute', left: 720, top: 310, width: 480, textAlign: 'center', opacity: out(p(t, 1.1, .7)) }}><Title size={180}>ARC</Title></div><div style={{ position: 'absolute', left: 130, top: 790 }}><Reveal t={t} at={1.2}><div className="spaced" style={{ fontSize: 25, color: STEEL }}>THE APP IS THE INTERFACE.</div></Reveal><Reveal t={t} at={2.05}><Title size={114} style={{ marginTop: 20 }}>ARC IS THE SYSTEM<span style={{ color: BLUE }}>.</span></Title></Reveal></div></AbsoluteFill>; }
function System() { const t = useCurrentFrame() / FPS; const modules: Screen[] = ['system', 'nourish', 'recover', 'progress']; const labels = ['TRAIN', 'NOURISH', 'RECOVER', 'PROGRESS']; const i = Math.min(3, Math.floor(t)); return <AbsoluteFill><Backdrop t={43 + t}/>{t < 4 ? <><Arc t={t} opacity={.22} draw={1}/><Phone t={t} screen={modules[i]} previous={i ? modules[i - 1] : undefined} change={i} width={405}/><Reveal key={i} t={t} at={i} duration={.36} style={{ position: 'absolute', left: 130, top: 350 }}><div className="spaced" style={{ fontSize: 26, color: STEEL, marginBottom: 35 }}>ONE CONTEXT. ONE SYSTEM.</div><Title size={i === 3 ? 140 : 175}>{labels[i]}<span style={{ color: BLUE }}>.</span></Title></Reveal></> : <><Network t={t - 4}/>{t < 5.2 && <div style={{ position: 'absolute', left: 130, top: 65, opacity: 1 - smooth(p(t, 4.8, .4)) }}><Title size={67} style={{ color: STEEL }}>FITNESS IS FRAGMENTED.</Title></div>}</>}</AbsoluteFill>; }
function Final() { const t = useCurrentFrame() / FPS; const lockup = out(p(t, 5.35, .8)); const first = 1 - smooth(p(t, 4.65, .55)); return <AbsoluteFill><Backdrop t={51 + t} dark/><Arc t={t} draw={p(t, .3, 6.8)} opacity={.5} y={-20}/><div style={{ opacity: first }}><Reveal t={t} at={.8} duration={1} style={{ position: 'absolute', left: 130, top: 260 }}><Title size={183}>FIND<br />YOUR ARC<span style={{ color: BLUE }}>.</span></Title></Reveal><Reveal t={t} at={1.65} duration={.8} style={{ position: 'absolute', left: 1300, top: 355 }}><div style={{ fontSize: 36, lineHeight: 1.65, color: STEEL, letterSpacing: '-.025em' }}>Your body changes.<br />Your life changes.<br />Your goals change.<br /><span style={{ color: WHITE }}>ARC changes with you.</span></div></Reveal></div><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: lockup, filter: lockup < .999 ? `blur(${(1 - lockup) * 12}px)` : 'none', transform: `scale(${.96 + .04 * lockup})` }}><Title size={420}>ARC<span className="brand-period"/></Title><div className="spaced" style={{ fontSize: 27, color: STEEL, marginTop: 18 }}>BUILT AROUND CHANGE.</div></div><AbsoluteFill style={{ background: '#000', opacity: smooth(p(t, 7.9, 1.05)) }}/></AbsoluteFill>; }
export function Film() { const frame = useCurrentFrame(); const [handle] = useState(() => delayRender('Load original ARC Geist font')); useEffect(() => { const face = new FontFace('Geist', `url(${asset('Geist-Variable.ttf')})`, { weight: '100 900' }); face.load().then(font => { (document.fonts as unknown as {
    add: (font: FontFace) => void;
}).add(font); continueRender(handle); }).catch(e => cancelRender(e)); }, [handle]); return <AbsoluteFill className="arc-film" style={{ opacity: Math.min(1, frame / 15) }}><Sequence name="Opening" from={EDIT.opening * FPS} durationInFrames={(EDIT.problem - EDIT.opening) * FPS}><Opening /></Sequence><Sequence name="The problem" from={EDIT.problem * FPS} durationInFrames={(EDIT.arrival - EDIT.problem) * FPS}><Problem /></Sequence><Sequence name="ARC arrives" from={EDIT.arrival * FPS} durationInFrames={(EDIT.adaptation - EDIT.arrival) * FPS}><Arrival /></Sequence><Sequence name="Adaptation montage" from={EDIT.adaptation * FPS} durationInFrames={(EDIT.core - EDIT.adaptation) * FPS}><Adaptation /></Sequence><Sequence name="Day 200" from={EDIT.core * FPS} durationInFrames={(EDIT.system - EDIT.core) * FPS}><Core /></Sequence><Sequence name="One system" from={EDIT.system * FPS} durationInFrames={(EDIT.final - EDIT.system) * FPS}><System /></Sequence><Sequence name="Find your ARC" from={EDIT.final * FPS} durationInFrames={(EDIT.end - EDIT.final) * FPS}><Final /></Sequence><AbsoluteFill className="film-grain" style={{ opacity: .025 * (1 - smooth(p(frame / FPS, 58.9, 1.05))) }}/><Audio src={staticFile('audio/ARC_FINAL_MIX.wav')}/></AbsoluteFill>; }
const Root = () => <Composition id="ARCIntroMaster" component={Film} durationInFrames={EDIT.end * FPS} width={FORMATS.master.width} height={FORMATS.master.height} fps={FORMATS.master.fps}/>;
registerRoot(Root);
