"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Chapter } from "@/components/ui/Chapter";
const nodes = ["TRAINING", "NUTRITION", "RECOVERY", "COACHING", "PHYSIOTHERAPY", "GYMS", "WELLNESS"];
export function VisionScene() {
    const root = useRef<HTMLElement>(null);
    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(".vision-node", { x: i => Math.cos(i / 7 * Math.PI * 2) * 90, y: i => Math.sin(i / 7 * Math.PI * 2) * 80, opacity: .2, scrollTrigger: { trigger: root.current, start: "top 65%", end: "center center", scrub: 1 } });
            gsap.from(".network-connections", { opacity: 0, scrollTrigger: { trigger: root.current, start: "top 40%", end: "center center", scrub: 1 } });
        }, root);
        return () => mm.revert();
    }, []);
    return <section ref={root} id="vision" className="section vision"><Chapter number="06">The bigger arc</Chapter><div className="vision-heading" data-reveal><h2>FITNESS IS<br /><span className="muted">FRAGMENTED.</span></h2><p className="body-copy">Your body doesn’t live in separate categories.<br />Your wellbeing shouldn’t either.</p></div><div className="network"><div className="network-orbit orbit-one"/><div className="network-orbit orbit-two"/><svg className="network-connections" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">{nodes.map((_, i) => { const a = i / 7 * Math.PI * 2 - Math.PI / 2; return <line key={i} x1="500" y1="300" x2={500 + Math.cos(a) * 390} y2={300 + Math.sin(a) * 240} stroke="#4a555b" strokeWidth=".6"/>; })}</svg><span className="network-center">ARC<span className="copper-dot"/></span>{nodes.map((node, i) => { const a = i / 7 * Math.PI * 2 - Math.PI / 2; return <span key={node} className="vision-node" style={{ left: `${50 + Math.cos(a) * 39}%`, top: `${50 + Math.sin(a) * 40}%` }}><i />{node}</span>; })}</div><h3 data-reveal>ARC BRINGS THE<br />JOURNEY TOGETHER.</h3><p className="vision-note">Our vision: a lifelong adaptive wellness system.<br />Connecting the journey, and the people who support it.</p></section>;
}
