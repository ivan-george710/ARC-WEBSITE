"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Chapter } from "@/components/ui/Chapter";
export function ProblemScene() {
    const root = useRef<HTMLElement>(null);
    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.to(".same span", { y: i => i % 2 ? 14 : -10, rotation: i => i % 2 ? 9 : -5, opacity: .3, stagger: .1, scrollTrigger: { trigger: ".pressure-field", start: "top 85%", end: "top 20%", scrub: 1 } });
            gsap.from(".pressure-word", { opacity: 0, scale: .6, stagger: .12, scrollTrigger: { trigger: ".pressure-field", start: "top 80%", end: "center center", scrub: 1 } });
            gsap.to(".rigid-plan span", { x: i => (i - 1.5) * 45, rotation: i => (i - 1.5) * 12, opacity: .15, scrollTrigger: { trigger: ".pressure-field", start: "center 40%", end: "bottom 30%", scrub: 1 } });
        }, root);
        return () => mm.revert();
    }, []);
    return <section ref={root} id="philosophy" className="section problem"><Chapter number="01">The disconnect</Chapter><h2 data-reveal>FITNESS PLANS<br />ASSUME YOUR LIFE<br />STAYS THE <span className="same">{"SAME".split("").map((l, i) => <span key={i}>{l}</span>)}<span>.</span></span></h2><div className="pressure-field"><div className="pressure-caption eyebrow">Life keeps moving.</div>{["WORK", "TRAVEL", "STRESS", "INJURY", "SLEEP", "TIME", "EQUIPMENT", "MOTIVATION", "AGE", "GOALS"].map((word, i) => <span key={word} className={`pressure-word word-${i}`}>{word}</span>)}<div className="rigid-plan"><span>PUSH</span><span>PULL</span><span>LEGS</span><span>REST</span></div><span className="pressure-bottom eyebrow">The plan doesn’t.</span></div><div className="problem-resolution" data-reveal><p>Your life changes.</p><h3>Your fitness<br />should too<span className="copper">.</span></h3><span className="body-copy">You don’t have a fitness problem.<br />You have a fitness execution problem.</span></div></section>;
}
