"use client";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { ArcLine } from "@/components/ui/ArcLine";
import { EASE } from "@/lib/animations/language";
export function HeroScene() {
    const root = useRef<HTMLElement>(null);
    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(".hero-intro", { opacity: 0, y: 15, duration: 1.2, delay: .2, ease: EASE.reveal });
            gsap.fromTo(".hero-brand", { opacity: .13, y: 24 }, { opacity: 1, y: 0, scrollTrigger: { trigger: root.current, start: "top top", end: "55% top", scrub: .8 } });
            gsap.fromTo(".hero-device", { opacity: .08, y: 30, rotateY: -22, rotateZ: 12 }, { opacity: .45, y: -25, rotateY: -10, rotateZ: 5, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1 } });
            gsap.to(".hero-orbit", { rotation: 9, y: -60, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.5 } });
        }, root);
        return () => mm.revert();
    }, []);
    return <section ref={root} className="hero" aria-label="Every body has an arc"><div className="hero-sticky"><div className="hero-topline hero-intro"><span className="eyebrow">A lifelong system. One adaptive app.</span></div><div className="scene-art" aria-hidden="true"><div className="hero-orbit"><div className="orbit-halo"/><ArcLine /></div></div><DeviceFrame variant="silhouette" className="hero-device" /><div className="hero-copy"><p className="hero-intro">EVERY BODY<br />HAS AN ARC.</p><h1 className="hero-brand"><BrandLogo /></h1><div className="hero-bottom"><span className="eyebrow"><span className="accent-dot"/> Built around change.</span><a href="#philosophy" className="scroll-link">SCROLL TO FIND YOURS <span>↓</span></a></div></div><span className="hero-coordinate">THE ONLY CONSTANT IS CHANGE.</span></div></section>;
}
