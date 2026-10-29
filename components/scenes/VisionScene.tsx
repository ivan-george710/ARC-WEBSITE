"use client";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
const nodes = ["TRAINING", "NUTRITION", "RECOVERY", "COACHING", "PHYSIOTHERAPY", "GYMS", "WELLNESS"];
export function VisionScene() {
    const root = useRef<HTMLElement>(null);
    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(".vision-node", { y: 12, opacity: .5, scrollTrigger: { trigger: root.current, start: "top 65%", end: "center center", scrub: 1 } });
            gsap.from(".network-connections", { opacity: 0, scrollTrigger: { trigger: root.current, start: "top 40%", end: "center center", scrub: 1 } });
        }, root);
        return () => mm.revert();
    }, []);
    return <section ref={root} id="vision" className="section vision"><div className="vision-heading" data-reveal><h2>FITNESS IS<br /><span className="muted">FRAGMENTED.</span></h2><p className="body-copy">Your body doesn’t live in separate categories.<br />Your wellbeing shouldn’t either.</p></div><div className="network"><div className="network-orbit orbit-one"/><div className="network-orbit orbit-two"/><svg className="network-connections" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">{nodes.map((_, i) => { const a = i / 7 * Math.PI * 2 - Math.PI / 2; return <line key={i} x1="500" y1="300" x2={500 + Math.cos(a) * 390} y2={300 + Math.sin(a) * 240} stroke="var(--line)" strokeWidth=".6"/>; })}</svg><svg className="network-mobile-connections" viewBox="0 0 100 410" preserveAspectRatio="none" aria-hidden="true"><path d="M50 58V365"/>{nodes.map((_,i)=><path key={i} d={`M50 ${100+i*44}H${i%2===0?25:75}`}/>)}</svg><span className="network-center"><BrandLogo /></span>{nodes.map((node, i) => { const a = i / 7 * Math.PI * 2 - Math.PI / 2; return <span key={node} className="vision-node" style={{ "--node-x": `${50 + Math.cos(a) * 39}%`, "--node-y": `${50 + Math.sin(a) * 40}%`, "--mobile-y": `${100+i*44}px`, "--mobile-x": i%2===0?"25%":"75%" } as CSSProperties}><i />{node}</span>; })}</div><h3 data-reveal>ARC BRINGS THE<br />JOURNEY TOGETHER.</h3><div className="vision-system" data-reveal><p>THE APP IS THE INTERFACE.</p><h3>THE SYSTEM<br />IS ARC<span className="accent">.</span></h3></div></section>;
}
