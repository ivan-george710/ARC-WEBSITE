"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Chapter } from "@/components/ui/Chapter";
const days = [
    { day: "MONDAY", title: "Room to go all in.", where: "AT THE GYM", time: "60", unit: "MINUTES", plan: "Full-body strength", detail: "Your usual rhythm. A full session, built for today." },
    { day: "TUESDAY", title: "The meeting ran late.", where: "BETWEEN EVERYTHING", time: "10", unit: "MINUTES", plan: "A focused movement session", detail: "Less time. A smaller session that still moves you forward." },
    { day: "WEDNESDAY", title: "A different kind of room.", where: "AWAY FROM HOME", time: "0", unit: "MACHINES", plan: "Bodyweight, anywhere", detail: "New surroundings. Same direction. No gym required." },
    { day: "THURSDAY", title: "Your shoulder needs a pause.", where: "LISTENING TO YOUR BODY", time: "01", unit: "BODY TO LISTEN TO", plan: "Adapted movement + recovery", detail: "Pressing steps back. Recovery gets the space it needs." },
    { day: "SIX WEEKS LATER", title: "A little stronger. A little further.", where: "BUILDING MOMENTUM", time: "06", unit: "WEEKS OF SHOWING UP", plan: "A stronger foundation", detail: "The next step grows with your progress, at your pace." },
    { day: "SIX MONTHS LATER", title: "A new finish line.", where: "A DIFFERENT DIRECTION", time: "10", unit: "KILOMETRES AHEAD", plan: "Build muscle → Run a 10K", detail: "Your goal changes. Your whole plan finds a new direction." },
];
export function LifeScene() {
    const root = useRef<HTMLElement>(null);
    const [active, setActive] = useState(0);
    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
            gsap.to({}, { scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", onUpdate: self => setActive(Math.min(5, Math.floor(self.progress * 6))) } });
        });
        return () => mm.revert();
    }, []);
    const day = days[active];
    const selectDay = (index: number) => {
        setActive(index);
        if (root.current && window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) {
            const top = root.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: top + (root.current.offsetHeight - window.innerHeight) * ((index + .2) / 6), behavior: "instant" });
        }
    };
    return <><section ref={root} className="life" aria-label="One plan through a changing life"><div className="life-sticky section"><Chapter number="04">Life doesn’t stand still</Chapter><div className="life-heading"><h2>ONE PLAN.<br /><span className="muted">A LIFE IN MOTION.</span></h2><span className="eyebrow">AN ILLUSTRATIVE JOURNEY</span></div><div className="life-timeline" aria-label="Journey chapters">{days.map((d, i) => <button key={d.day} aria-pressed={active === i} onClick={() => selectDay(i)}><span className="timeline-line"/><span>{d.day}</span></button>)}</div><div className="life-content" aria-live="polite"><div key={day.day} className="life-detail"><span className="eyebrow copper">{day.where}</span><h3>{day.title}</h3><p className="body-copy">{day.detail}</p><div className="adapted-label"><span>ARC ADAPTS</span><p>{day.plan}</p><span>↗</span></div></div><div key={day.time + day.unit} className="life-number"><strong>{day.time}</strong><span className="eyebrow">{day.unit}</span><svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="95"/><circle className="clock-active" cx="100" cy="100" r="95" strokeDasharray={`${80 + active * 90} 600`}/></svg></div></div></div></section><section className="day200 section"><p data-reveal>PERSONALIZATION ISN’T<br />KNOWING YOU ON DAY ONE.</p><h2 data-reveal>IT’S STILL<br />KNOWING YOU<br />ON DAY <span className="copper">200.</span></h2><span className="eyebrow">The longer the journey, the deeper the understanding.</span></section></>;
}
