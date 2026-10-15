"use client";
import { useState } from "react";
import { ArcLine } from "@/components/ui/ArcLine";
export function FinalScene() {
    const [expanded, setExpanded] = useState(false);
    return <section id="contact" className="final section"><ArcLine /><span className="eyebrow" data-reveal>EVERY BODY HAS AN ARC. THIS IS YOURS.</span><h2 data-reveal>FIND<br />YOUR ARC<span className="copper">.</span></h2><div className="final-bottom"><p>Your body changes.<br />Your life changes.<br />Your goals change.<br /><span>ARC changes with you.</span></p><div><button className="follow-button" aria-expanded={expanded} aria-controls="follow-details" onClick={() => setExpanded(!expanded)}>FOLLOW OUR ARC <span>{expanded ? "−" : "↗"}</span></button>{expanded && <div id="follow-details" className="follow-details" role="status">Our story is just beginning.<br />Official contact and social channels will be shared here.</div>}<span className="eyebrow final-tagline">BUILT AROUND CHANGE.</span></div></div></section>;
}
