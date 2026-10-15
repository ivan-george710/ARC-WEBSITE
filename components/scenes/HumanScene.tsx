"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Chapter } from "@/components/ui/Chapter";
import { ArcLine } from "@/components/ui/ArcLine";
import { gsap } from "@/lib/gsap";
const HumanExperience = dynamic(() => import("@/components/three/HumanExperience"), { ssr: false, loading: () => <div className="body-fallback"/> });
const labels = ["Strength changes.", "Mobility changes.", "Recovery changes.", "Goals change."];
export function HumanScene() {
    const root = useRef<HTMLElement>(null);
    const [ready, setReady] = useState(false);
    const [active, setActive] = useState(0);
    useEffect(() => {
        const query = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
        let visible = false;
        const update = () => setReady(visible && query.matches);
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            update();
        }, { rootMargin: "200px" });
        query.addEventListener("change", update);
        if (root.current)
            observer.observe(root.current);
        return () => {
            observer.disconnect();
            query.removeEventListener("change", update);
        };
    }, []);
    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
            gsap.to({}, { scrollTrigger: { trigger: root.current, start: "top 35%", end: "bottom 60%", onUpdate: self => setActive(Math.min(3, Math.floor(self.progress * 4))) } });
        });
        return () => mm.revert();
    }, []);
    return <section ref={root} className="human section"><Chapter number="02">Built around a human</Chapter><div className="human-layout"><div className="human-copy"><h2 data-reveal>YOUR BODY<br />ISN’T STATIC.</h2><p className="body-copy">Neither is the way you move through life.</p><div className="body-controls" aria-label="Explore how your body changes">{labels.map((label, i) => <button key={label} onClick={() => setActive(i)} aria-pressed={active === i}><span>0{i + 1}</span>{label}<i /></button>)}</div></div><div className="human-stage" role="img" aria-label={`Sculptural human study. ${labels[active]}`}>{ready ? <HumanExperience active={active}/> : <div className={`body-fallback part-${active}`}/>}<span className="study-label eyebrow">HUMAN STUDY / {String(active + 1).padStart(2, "0")}</span><span className="study-note">An evolving body.<br />An evolving system.</span></div></div><h3 className="human-end" data-reveal>ARC ADAPTS<br /><span className="muted">WITH YOU.</span></h3><ArcLine variant="wave"/></section>;
}
