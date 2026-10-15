"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
export function Experience({ children }: {
    children: React.ReactNode;
}) {
    const cursor = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
            const lenis = new Lenis({ duration: 1.1, anchors: { offset: -80 } });
            lenis.on("scroll", ScrollTrigger.update);
            const tick = (time: number) => lenis.raf(time * 1000);
            gsap.ticker.add(tick);
            gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
                gsap.from(el, { y: 44, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
            });
            gsap.utils.toArray<SVGPathElement>(".arc-line path").forEach(path => {
                const length = path.getTotalLength();
                const hero = path.closest(".hero");
                gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: path.closest("section"), start: hero ? "top top" : "top 85%", end: hero ? "bottom bottom" : "bottom 45%", scrub: 1 } });
            });
            return () => { gsap.ticker.remove(tick); lenis.destroy(); };
        });
        const refresh = () => ScrollTrigger.refresh();
        document.fonts.ready.then(refresh);
        return () => media.revert();
    }, []);
    useEffect(() => {
        if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches)
            return;
        const move = (e: PointerEvent) => {
            if (!cursor.current)
                return;
            cursor.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px,0)`;
            cursor.current.classList.toggle("active", !!(e.target as Element).closest("a,button"));
            cursor.current.style.opacity = "1";
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
    }, []);
    return <MotionConfig reducedMotion="user">{children}<div ref={cursor} className="cursor" aria-hidden="true"/></MotionConfig>;
}
