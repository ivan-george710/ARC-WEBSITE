"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Chapter } from "@/components/ui/Chapter";
import { PhoneScreen, screenNames } from "@/components/ui/PhoneScreen";
export function ProductScene() {
    const root = useRef<HTMLElement>(null);
    const [screen, setScreen] = useState(0);
    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(".device", { rotateY: -14, rotateZ: -5, y: 35 }, { rotateY: 9, rotateZ: 3, y: -25, scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: 1 } });
            gsap.to({}, { scrollTrigger: { trigger: ".product-stage", start: "top 25%", end: "bottom 30%", onUpdate: self => setScreen(Math.min(4, Math.floor(self.progress * 5))) } });
            gsap.to(".floating-data", { x: 80, y: -30, scrollTrigger: { trigger: ".product-stage", start: "top 50%", end: "bottom top", scrub: 1 } });
            gsap.to(".device", { opacity: 0, scrollTrigger: { trigger: ".product-conclusion", start: "top 90%", end: "top 50%", scrub: 1 } });
        }, root);
        return () => mm.revert();
    }, []);
    return <section ref={root} id="product" className="section product"><Chapter number="05">A window into your system</Chapter><div className="product-stage"><div className="product-copy"><span className="eyebrow">THE ARC EXPERIENCE</span><h2>YOUR LIFE.<br />IN CONTEXT.</h2><p className="body-copy">A clear view of the things that move you.<br />And the way they move together.</p><div className="screen-selector" aria-label="Preview concept screens">{screenNames.map((name, i) => <button key={name} onClick={() => setScreen(i)} aria-pressed={screen === i}><span>0{i + 1}</span>{name}<span>↗</span></button>)}</div><p className="concept-note">INTERFACE CONCEPT / NOT A LIVE PRODUCT</p></div><div className="device-space"><div className="device"><div className="device-island"/><PhoneScreen screen={screen}/></div><div className="floating-data"><span className="eyebrow">A BIGGER PICTURE</span><svg viewBox="0 0 220 75" aria-hidden="true"><path d="M0 65L25 55L45 59L75 30L100 40L130 21L160 26L190 5L220 0" fill="none" stroke="#c7823a" strokeWidth="1.5"/></svg><span>Training + nourishment + recovery</span></div></div></div><div className="product-conclusion" data-reveal><p>THE APP IS JUST THE INTERFACE.</p><h3>THE SYSTEM<br />IS ARC<span className="copper">.</span></h3></div></section>;
}
