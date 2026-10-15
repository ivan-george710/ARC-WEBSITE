"use client";
import { useEffect, useRef, useState } from "react";
const links = [["Philosophy", "philosophy"], ["System", "system"], ["Product", "product"], ["Vision", "vision"], ["Contact", "contact"]];
export function Navigation() {
    const [open, setOpen] = useState(false);
    const button = useRef<HTMLButtonElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!open)
            return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
        const key = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                button.current?.focus();
            }
            if (event.key === "Tab") {
                const items = [button.current, ...Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])].filter((el): el is HTMLButtonElement | HTMLAnchorElement => !!el);
                const index = items.indexOf(document.activeElement as HTMLAnchorElement);
                if (event.shiftKey && index === 0) {
                    event.preventDefault();
                    items.at(-1)?.focus();
                }
                else if (!event.shiftKey && index === items.length - 1) {
                    event.preventDefault();
                    items[0]?.focus();
                }
            }
        };
        window.addEventListener("keydown", key);
        return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", key); };
    }, [open]);
    return <><header className="navigation"><a href="#" className="wordmark" aria-label="ARC home">ARC<span className="logo-period"/></a><button ref={button} className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="navigation-panel"><span>{open ? "Close" : "Explore"}</span><span className={`menu-glyph ${open ? "is-open" : ""}`}><i /><i /></span></button></header>{open && <div ref={panel} id="navigation-panel" className="nav-panel" role="dialog" aria-modal="true" aria-label="Explore ARC" data-lenis-prevent><span className="eyebrow">A journey built around you.</span><nav>{links.map(([label, id], i) => <a key={id} href={`#${id}`} onClick={() => { setOpen(false); button.current?.focus(); }}><sup>0{i + 1}</sup>{label}<span>↗</span></a>)}</nav><p>Built around change.</p></div>}</>;
}
