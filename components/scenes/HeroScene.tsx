"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArcLine } from "@/components/ui/ArcLine";
export function HeroScene() {
    const root = useRef<HTMLElement>(null);
    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(".hero-intro", { opacity: 0, y: 15, duration: 1.4, delay: .2 });
            gsap.fromTo(".hero-brand", { opacity: .13, y: 24 }, { opacity: 1, y: 0, scrollTrigger: { trigger: root.current, start: "top top", end: "55% top", scrub: .8 } });
            gsap.to(".hero-orbit", { rotation: 9, y: -60, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.5 } });
        }, root);
        return () => mm.revert();
    }, []);
    return <section ref={root} className="hero" aria-label="Every body has an arc"><div className="hero-sticky"><div className="hero-topline hero-intro"><span className="eyebrow">A lifelong adaptive wellness system</span><span className="edition">01 — THE BEGINNING</span></div><div className="hero-orbit"><div className="orbit-halo"/><ArcLine /></div><div className="hero-copy"><p className="hero-intro">EVERY BODY<br />HAS AN ARC.</p><h1 className="hero-brand">ARC</h1><div className="hero-bottom"><span className="eyebrow"><span className="copper-dot"/> Built around change.</span><a href="#philosophy" className="scroll-link">SCROLL TO FIND YOURS <span>↓</span></a></div></div><span className="hero-coordinate">THE ONLY CONSTANT IS CHANGE.</span></div></section>;
}
