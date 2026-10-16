"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { EASE } from "@/lib/animations/language";
import { commitNavigationScroll, registerNavigationLenis } from "@/lib/animations/navigation-scroll";
export function Experience({ children }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const cursor = useRef<HTMLDivElement>(null);
    const fromHistory = useRef(false);
    useEffect(() => {
        const popstate = () => { fromHistory.current = true; };
        window.addEventListener("popstate", popstate);
        return () => window.removeEventListener("popstate", popstate);
    }, []);
    useLayoutEffect(() => {
        commitNavigationScroll(pathname, fromHistory.current);
    }, [pathname]);
    useEffect(() => {
        const restoringHistory = fromHistory.current;
        fromHistory.current = false;
        let routeLenis: Lenis | null = null;
        let disposed = false;
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
            const lenis = new Lenis({ duration: 1.1, anchors: { offset: -80 } });
            routeLenis = lenis;
            const unregisterLenis = registerNavigationLenis(lenis);
            lenis.on("scroll", ScrollTrigger.update);
            const tick = (time: number) => lenis.raf(time * 1000);
            gsap.ticker.add(tick);
            gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
                gsap.from(el, { y: 24, opacity: 0, duration: .85, ease: EASE.reveal, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
            });
            gsap.utils.toArray<SVGPathElement>(".arc-line:not(.about-arc) path").forEach(path => {
                const length = path.getTotalLength();
                const hero = path.closest(".hero");
                gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: path.closest("section"), start: hero ? "top top" : "top 85%", end: hero ? "bottom bottom" : "bottom 45%", scrub: 1 } });
            });
            return () => { routeLenis = null; unregisterLenis(); gsap.ticker.remove(tick); lenis.destroy(); };
        });
        const refresh = () => {
            if (disposed) return;
            ScrollTrigger.refresh();
            // Refresh temporarily resets native scrolling for measurement.
            // Let Lenis complete a cross-route Home anchor after that work,
            // rather than interrupting the browser's in-flight smooth scroll.
            if (pathname === "/" && location.hash && !restoringHistory) {
                const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
                if (target) {
                    if (routeLenis) routeLenis.scrollTo(target, { offset: -80 });
                    else target.scrollIntoView({ behavior: "instant" });
                }
            }
        };
        document.fonts.ready.then(refresh);
        return () => { disposed = true; media.revert(); };
    }, [pathname]);
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
    return <>{children}<div ref={cursor} className="cursor" aria-hidden="true"/></>;
}
