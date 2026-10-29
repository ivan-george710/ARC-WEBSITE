"use client";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { openAboutFromNavigation } from "@/lib/animations/navigation-scroll";
const links = [["Philosophy", "philosophy"], ["The app", "product"], ["The long view", "personalization"], ["Vision", "vision"], ["Contact", "contact"]];
export function Navigation() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const button = useRef<HTMLButtonElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!open)
            return;
        window.dispatchEvent(new Event("arc:menu-open"));
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
    const close = () => { setOpen(false); button.current?.focus(); };
    const openAbout = (event: { preventDefault: () => void }) => {
        close();
        if (pathname === "/about") event.preventDefault();
        openAboutFromNavigation(pathname === "/about");
    };
    return <>
      <header className="navigation">
        <Link href="/" className="wordmark" aria-label="ARC home" tabIndex={open ? -1 : undefined} onClick={close}><BrandLogo /></Link>
        <div className="navigation-actions">
          <nav className="page-navigation" aria-label="Main navigation" inert={open}>
            <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
            <Link href="/about" scroll={false} onNavigate={openAbout} aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
          </nav>
          <button ref={button} className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Explore navigation"} aria-expanded={open} aria-controls="navigation-panel"><span>{open ? "Close" : "Explore"}</span><span className={`menu-glyph ${open ? "is-open" : ""}`}><i /><i /></span></button>
        </div>
      </header>
      {open && <div ref={panel} id="navigation-panel" className="nav-panel" role="dialog" aria-modal="true" aria-label="Explore ARC" data-lenis-prevent>
        <span className="eyebrow">A journey built around you.</span>
        <nav aria-label="Explore ARC">
          <Link href="/" onClick={close} aria-current={pathname === "/" ? "page" : undefined}>Home<span aria-hidden="true">&#8599;</span></Link>
          <Link href="/about" scroll={false} onNavigate={openAbout} aria-current={pathname === "/about" ? "page" : undefined}>About<span aria-hidden="true">&#8599;</span></Link>
          {links.map(([label, id]) => <Link key={id} href={pathname === "/" ? `#${id}` : `/#${id}`} onClick={close}>{label}<span aria-hidden="true">&#8599;</span></Link>)}
        </nav>
        <p>Built around change.</p>
      </div>}
    </>;
}
