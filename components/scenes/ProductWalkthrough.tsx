"use client";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useRef } from "react";
import { PhoneShell, WalkthroughScreen } from "@/components/ui/WalkthroughScreens";

import { BodyAvatar } from "@/components/ui/BodyAvatar";
import { useWalkthrough } from "@/components/motion/useWalkthrough";
import { walkthroughMoments, walkthroughModules } from "@/lib/constants/walkthrough";

export function ProductWalkthrough() {
  const root = useRef<HTMLElement>(null);
  const device = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const { controller, moment: index, status, reducedMotion } = useWalkthrough(root, device, progress);
  const moment = walkthroughMoments[index];
  const complete = status === "complete";
  return <section ref={root} id="product" className="walkthrough section" data-moment={moment.key} data-playback={status} data-reduced-motion={reducedMotion} aria-label="Watch the ARC app adapt">
    <div className="walk-topline"><span className="eyebrow">THE ARC APP</span></div>
    <div className="walk-stage">
      <div className="walk-narrative">
      <div className="walk-copy-stack">{walkthroughMoments.map((item, i) => <div className="walk-copy-view" key={item.key} data-copy-key={item.key} data-active={i === index} aria-hidden={i !== index}><h2 className={item.key === "complete" ? "walk-complete-title" : ""}>{item.key === "complete" ? <BrandLogo /> : item.title.split("\n").map((line, lineIndex) => <span className="walk-headline-line" key={lineIndex}>{line}</span>)}</h2></div>)}</div>
      <div className="walk-detail-stack">{walkthroughMoments.map((item,i) => <p className="walk-detail-view" key={item.key} data-active={i === index} aria-hidden={i !== index}>{item.detail}</p>)}</div>
      </div>
      <div className="walk-device-space">
        <div className="walk-body" aria-hidden={moment.key !== "body"}>
          <BodyAvatar area="shoulder" /><span>SHOULDER / CHECK-IN</span>
        </div>
        <div ref={device} className="walk-device-motion"><PhoneShell>{walkthroughMoments.map((item,i) => <div className="walk-screen-layer" data-screen-key={item.key} key={item.key} data-active={i === index} aria-hidden={i !== index} inert={i !== index}><WalkthroughScreen state={item.key} /></div>)}</PhoneShell></div>
      </div>
    </div>
    <div className="walk-bottom">
      <div className="walk-modules" aria-label="Explore the ARC app modules">{walkthroughModules.map(item => <button key={item.label} aria-pressed={moment.module === item.label} onClick={() => controller.current?.select(item.index)}>{item.label}</button>)}</div>
      <div className="walk-controls">
        {reducedMotion ? <><button onClick={() => controller.current?.select(Math.max(0, index - 1))} disabled={index === 0}>← Previous</button><button onClick={() => controller.current?.select(Math.min(walkthroughMoments.length - 1, index + 1))} disabled={index === walkthroughMoments.length - 1}>Next →</button></> : <button onClick={() => complete ? controller.current?.replay() : status === "playing" ? controller.current?.pause() : controller.current?.play()}>{complete ? "REPLAY ↺" : status === "playing" ? "PAUSE Ⅱ" : status === "paused" ? "RESUME →" : "WATCH →"}</button>}
      </div>
    </div>
    <div className="walk-progress" aria-hidden="true"><div ref={progress} /></div>
    <p className="walk-accessible-state sr-only" role="status">{status === "playing" ? "Walkthrough playing. Pause or scroll away at any time." : complete ? "Walkthrough complete. Replay or explore the modules." : status === "manual" ? "Reduced motion. Use Previous, Next or the module controls to explore." : status === "paused" ? "Walkthrough paused. Resume when ready." : "Walkthrough starts when it enters view."}</p>
  </section>;
}


