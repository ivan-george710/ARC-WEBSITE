import { ArcLine } from "@/components/ui/ArcLine";

export function PersonalizationScene() {
  return <section id="personalization" className="personalization section" aria-label="Personalization over time">
    <div className="scene-art" aria-hidden="true"><ArcLine variant="wave" /></div>
    <p className="personalization-opening" data-reveal>PERSONALIZATION ISN’T<br />KNOWING YOU ON DAY ONE.</p>
    <div className="context-trace" aria-label="Context grows from day 1 to day 200"><span>DAY 1</span><i /><span>DAY 30</span><i /><span>DAY 100</span><i /><span>DAY 200</span></div>
    <h2 data-reveal>IT’S STILL<br />KNOWING YOU<br />ON DAY <span className="accent">200.</span></h2>
  </section>;
}
