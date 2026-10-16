import type { Metadata } from "next";
import Link from "next/link";
import { ArcLine } from "@/components/ui/ArcLine";
import "./about.css";

export const metadata: Metadata = {
  title: "About ARC — Built around real life.",
  description: "Four people. One question. The story behind ARC, and why we’re building fitness around life.",
};

export default function About() {
  return <main id="main" className="about-page">
    <div className="about-background" aria-hidden="true"><ArcLine className="about-arc about-arc-rise" /><ArcLine variant="wave" className="about-arc about-arc-wave" /></div>
    <article className="about-editorial" aria-label="The story behind ARC">
      <header className="about-opening">
        <p className="eyebrow">ABOUT ARC / OUR BEGINNING</p>
        <h1>WE DIDN’T START ARC<br />BECAUSE THE WORLD<br />NEEDED ANOTHER<br />FITNESS APP.</h1>
        <p className="about-opening-answer">WE STARTED IT BECAUSE<br />FITNESS WASN’T<br />KEEPING UP<br />WITH REAL LIFE<span className="accent">.</span></p>
      </header>

      <div className="about-story">
        <p>ARC began with four of us asking a question that sounded simple:</p>
        <h2 className="about-question">Why does fitness become harder the moment life becomes complicated?</h2>
        <p>We were surrounded by people who wanted to train. People who joined gyms. People who tried diets. People who downloaded apps. People who started plans with every intention of following them.</p>
        <p>And yet the same thing kept happening.</p>
        <p>Work got busy. A workout was missed. Travel interrupted the routine. An injury changed what someone could do. The available equipment changed. A goal changed.</p>
        <p className="about-story-pivot">Life moved.<br /><span>But the plan didn’t.</span></p>
        <p>Most fitness products seemed to treat personalization as something that happened once.</p>
        <p>Answer some questions. Choose a goal. Get a plan.<br />Then try to force your life around it.</p>
        <p>That never made sense to us.</p>
        <p>Because a person isn’t the same person every day. Their time changes. Their energy changes. Their body changes. Their priorities change. Their goals change.</p>
        <p className="about-paragraph-break">So four of us started imagining something different.</p>
        <p>Not another workout library.<br />Not another calorie counter.<br />Not another app that hands you a program and disappears.</p>
        <p>We wanted to build something that could understand the journey.</p>
        <p>Something that could know when sixty minutes became ten. When a gym became a hotel room. When progress meant pushing harder. And when progress meant knowing when not to.</p>
        <p>Something that could connect training, nutrition, recovery and progress instead of treating them like separate problems.</p>
        <p className="about-origin">That idea became <span>ARC.</span></p>
      </div>

      <section className="about-origin-moment" aria-labelledby="origin-heading">
        <h2 id="origin-heading">FOUR PEOPLE.<br />ONE QUESTION.</h2>
        <p className="about-origin-question">WHY DOES FITNESS STOP WORKING<br />WHEN LIFE STOPS BEING PREDICTABLE?</p>
        <p className="eyebrow about-one-idea">ONE IDEA.</p>
        <p className="about-shared-idea">BUILD FITNESS AROUND LIFE.<br /><span>NOT LIFE AROUND FITNESS.</span></p>
      </section>

      <div className="about-story about-philosophy-story">
        <p>We call it ARC because fitness is not a straight line.</p>
        <p>There are good weeks. Bad weeks. Injuries. Breakthroughs. Plateaus. New goals. Different versions of you.</p>
        <p className="about-story-pivot">The journey bends.<br /><span>The system should bend with it.</span></p>
        <p>Today, ARC begins as an app. But we’re building toward something larger: a wellness system that stays with you as your life changes.</p>
        <p>Because personalization isn’t knowing who you are on day one.</p>
        <p className="about-understanding"><strong>It’s still understanding you on day two hundred.</strong></p>
        <p>And that is the ARC we’re building.</p>
      </div>

      <section className="about-belief" aria-labelledby="belief-heading">
        <h2 id="belief-heading">WE BELIEVE<br />FITNESS SHOULD ADAPT.</h2>
        <p>TO YOUR TIME.<br />TO YOUR BODY.<br />TO YOUR ENVIRONMENT.<br />TO YOUR GOALS.<br /><span>TO YOUR LIFE.</span></p>
        <p className="about-that-is">THAT IS ARC.</p>
      </section>

      <div className="about-closing">
        <h2>WE’RE JUST<br />GETTING STARTED.</h2>
        <p>Find your ARC.</p>
        <Link href="/" className="about-explore">EXPLORE ARC <span aria-hidden="true">&#8594;</span></Link>
      </div>
    </article>
  </main>;
}
