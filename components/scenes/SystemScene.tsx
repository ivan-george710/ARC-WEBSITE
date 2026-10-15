"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Chapter } from "@/components/ui/Chapter";
import { systems } from "@/lib/constants/system";
export function SystemScene() {
    const [active, setActive] = useState(0);
    const [step, setStep] = useState(0);
    const system = systems[active];
    return <section id="system" className="section system"><Chapter number="03">One connected system</Chapter><div className="section-heading" data-reveal><h2>EVERY PART OF YOU.<br /><span className="muted">IN THE SAME DIRECTION.</span></h2><p className="body-copy">Four parts. One continuous journey.<br />Designed to move together.</p></div><div className="system-tabs" role="tablist" aria-label="ARC systems">{systems.map((item, i) => <button key={item.name} id={`system-tab-${i}`} role="tab" aria-selected={i === active} aria-controls="system-panel" tabIndex={active === i ? 0 : -1} onClick={() => { setActive(i); setStep(0); }} onKeyDown={e => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
        e.preventDefault();
        const next = e.key === "Home" ? 0 : e.key === "End" ? 3 : (active + (e.key === "ArrowRight" ? 1 : 3)) % 4;
        setActive(next);
        setStep(0);
        document.getElementById(`system-tab-${next}`)?.focus();
    } }}><span>0{i + 1}</span>{item.name}<span>↗</span></button>)}</div><div role="tabpanel" id="system-panel" aria-labelledby={`system-tab-${active}`} className="system-panel"><AnimatePresence mode="wait"><motion.div key={active} className="system-story" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .25 }}><span className="eyebrow copper">THE ARC / {system.name}</span><h3>{system.title}</h3><p className="body-copy">{system.copy}</p><div className="context-buttons" aria-label="Change your circumstances">{system.contexts.map((context, i) => <button key={context} aria-pressed={step === i} onClick={() => setStep(i)}>{context}<span>↗</span></button>)}</div></motion.div></AnimatePresence><div className={`adaptation-demo demo-${active}`}><div className="demo-top eyebrow"><span>ARC / {system.name}</span><span className="status-dot">ADAPTING TO YOU</span></div><div className="demo-graphic" aria-hidden="true">{active === 0 ? <div className={`weight weight-${step}`}><i /><i /><b /><i /><i /></div> : active === 1 ? <div className="nutrition-rings"><span>{step === 1 ? "PLANT" : "DAILY"}<strong>BALANCE</strong></span></div> : active === 2 ? <div className="recovery-symbol"><i /><span>+</span></div> : <div className="progress-bars">{[25, 40, 34, 56, 50, 70, 66, 86, 94].map((v, i) => <i key={i} style={{ height: `${v}%`, opacity: i > step * 3 ? .4 : 1 }}/>)}</div>}</div><AnimatePresence mode="wait"><motion.div className="demo-text" key={`${active}-${step}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><span className="eyebrow">{system.contexts[step]}</span><h4>{system.values[step]}</h4><p>{system.details[step]}</p></motion.div></AnimatePresence><div className="demo-bottom"><span>ILLUSTRATIVE SYSTEM CONCEPT</span><span>0{step + 1} / 03</span></div></div></div></section>;
}
