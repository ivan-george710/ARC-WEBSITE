"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
export function ProblemScene() {
    const root = useRef<HTMLElement>(null);
    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.to(".same span", { y: i => i % 2 ? 14 : -10, rotation: i => i % 2 ? 9 : -5, opacity: .68, stagger: .1, scrollTrigger: { trigger: ".pressure-field", start: "top 85%", end: "top 20%", scrub: 1 } });
            gsap.from(".pressure-word", { opacity: 0, scale: .6, stagger: .12, scrollTrigger: { trigger: ".pressure-field", start: "top 80%", end: "center center", scrub: 1 } });
            gsap.to(".legacy-plan-row", { x: i => (i - 1.5) * 13, rotation: i => (i - 1.5) * 5, opacity: .35, scrollTrigger: { trigger: ".pressure-field", start: "center 40%", end: "bottom 30%", scrub: 1 } });
            gsap.from(".legacy-warning", { opacity: 0, y: 10, scrollTrigger: { trigger: ".pressure-field", start: "center 50%", end: "bottom 50%", scrub: 1 } });
        }, root);
        return () => mm.revert();
    }, []);
    return <section ref={root} id="philosophy" className="section problem"><div className="problem-argument"><h2 data-reveal>FITNESS PLANS<br />ASSUME YOUR LIFE<br />STAYS THE <span className="same">{"SAME".split("").map((l, i) => <span key={i}>{l}</span>)}<span>.</span></span></h2><div className="pressure-field"><div className="pressure-context">{["WORK", "TRAVEL", "TIME", "INJURY", "EQUIPMENT", "GOALS"].map(word => <span key={word} className="pressure-word">{word}</span>)}</div><div className="problem-device"><DeviceFrame variant="legacy" label="A rigid fitness app: the same Push, Pull, Legs, Rest plan despite a changing life" /></div></div></div><div className="problem-resolution"><h3 data-reveal>YOUR LIFE<br />CHANGES.</h3><h3 data-reveal>YOUR FITNESS<br />SHOULD TOO<span className="accent">.</span></h3></div></section>;
}
