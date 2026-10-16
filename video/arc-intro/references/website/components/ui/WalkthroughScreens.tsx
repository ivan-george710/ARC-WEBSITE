"use client";
import type { ReactNode } from "react";
import { DeviceFrame } from "./DeviceFrame";
import { AppIcon } from "./PhoneScreen";
import type { WalkthroughKey } from "@/lib/constants/walkthrough";

// Chrome is outside the transition buffer: exactly one status/header/nav tree.
export function PhoneShell({ children }: { children: ReactNode }) {
  return <DeviceFrame className="walkthrough-device" label="ARC adapting to your life"><div className="phone-screen demo-app">
    <div className="phone-status"><span>9:41</span><span aria-hidden="true">&#9646;&#9646;&#9646; &#9648;</span></div>
    <div className="phone-header"><span className="wordmark">ARC</span><span className="avatar">A</span></div>
    <div className="walk-screens">{children}</div>
    <div className="phone-nav demo-nav" aria-label="App navigation">{["Workout", "Nutrition", "Recovery", "Progress"].map((name, i) => <span key={name} data-nav-index={i} data-selected={i === 0}><AppIcon index={i + 1} />{name}</span>)}</div>
    <div className="phone-home-indicator" aria-hidden="true" />
  </div></DeviceFrame>;
}
function Heading({ kicker, children }: { kicker: string; children: ReactNode }) {
  return <header className="demo-heading"><span className="phone-kicker">{kicker}</span><h4>{children}</h4></header>;
}
function Rows({ items }: { items: readonly (readonly [string, string])[] }) {
  return <div className="demo-rows">{items.map(([label, value]) => <div className="demo-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>;
}
function Note({ children }: { children: ReactNode }) { return <p className="demo-note">{children}</p>; }
export function BaselineTrainingScreen() {
  return <><Heading kicker="TODAY’S TRAINING">CHEST +<br />TRICEPS</Heading><div className="demo-session"><strong>60 <small>MIN</small></strong><span>GYM</span></div><Rows items={[["Bench Press", "3 × 8"], ["Incline Dumbbell Press", "3 × 10"], ["Cable Fly", "3 × 12"], ["Tricep Extension", "3 × 12"]]} /><Note>Your plan. Ready for today.</Note></>;
}
export function TimeAdaptationScreen() {
  return <><Heading kicker="TODAY’S TRAINING">A little time.<br />Still your session.</Heading><div className="demo-express"><span className="phone-kicker">EXPRESS / GYM</span><strong>10 <small>MIN</small></strong><span className="demo-badge">PLAN ADJUSTED</span></div><Rows items={[["Incline Dumbbell Press", "2 × 10"], ["Push-Ups", "2 × 12"], ["Tricep Extensions", "2 × 12"]]} /><Note>Built for the time you have.</Note></>;
}
export function TravelAdaptationScreen() {
  return <><Heading kicker="TODAY’S TRAINING">HOTEL / HOME</Heading><div className="demo-location"><span className="demo-location-icon"><AppIcon index={0} /></span><div><strong>Your anywhere session</strong><p>Dumbbells + bodyweight</p></div></div><Rows items={[["Dumbbell Floor Press", "3 × 10"], ["Push-Up Variation", "3 × 10"], ["Dumbbell Lateral Raise", "3 × 12"], ["Bodyweight Tricep Extension", "3 × 12"]]} /><Note>Different surroundings. Same momentum.</Note></>;
}
export function BodyAdaptationScreen() {
  return <><Heading kicker="BODY CHECK-IN">SHOULDER</Heading><div className="demo-body-card"><span className="demo-badge">TRAINING ADAPTED</span><h5>Give pressing<br />a pause.</h5><p>Make room for comfortable movement.</p></div><Rows items={[["Pressing movements", "PAUSED"], ["Comfortable movement", "AVAILABLE"], ["Recovery guidance", "VIEW"]]} /><Note>Persistent discomfort? Seek qualified support.</Note></>;
}
export function GoalAdaptationScreen() {
  return <><Heading kicker="YOUR NEXT CHAPTER"><span className="demo-goal-morph"><span className="demo-old-goal">BUILD MUSCLE</span><span className="demo-new-goal">RUN A 10K</span></span></Heading><div className="demo-plan"><span className="phone-kicker">WEEK 1 / YOUR NEW PLAN</span><h5>RUN + STRENGTH</h5><div className="demo-week">{["RUN", "STR", "RUN", "REST", "STR", "RUN", "REST"].map((day, i) => <span key={i} data-rest={day === "REST"}>{day}</span>)}</div></div><Rows items={[["Easy runs + intervals", "3 RUNS"], ["Supporting strength", "2 SESSIONS"], ["Mobility / recovery", "2 DAYS"]]} /><Note>A new goal reshapes the whole week.</Note></>;
}
export function ArcSystemScreen({ module }: { module: "train" | "nourish" | "recover" | "progress" }) {
  if (module === "train") return <><Heading kicker="TRAIN">Your week.<br />In motion.</Heading><div className="demo-summary"><strong>3 <small>RUNS</small></strong><span>+ 2 STRENGTH SESSIONS</span></div><Rows items={[["Today", "Easy run · 25 min"], ["Tomorrow", "Strength · 35 min"], ["Your focus", "Build endurance"]]} /><Note>One plan, built around your context.</Note></>;
  if (module === "nourish") return <><Heading kicker="NOURISH">Fuel your<br />next step.</Heading><div className="demo-nutrition"><strong>1,640<small>OF 2,200 KCAL</small></strong></div><Rows items={[["Protein", "112 / 140 g"], ["Next meal", "Rice bowl + greens"], ["Training day", "Fuel for your run"]]} /><Note>Real food. A flexible rhythm.</Note></>;
  if (module === "recover") return <><Heading kicker="RECOVER">Room to<br />recharge.</Heading><div className="demo-recovery"><span className="demo-badge">RECOVERY DAY</span><div className="demo-recovery-bars">{[40, 65, 50, 85, 70, 95, 80].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div><p>Balance effort with recovery.</p></div><Rows items={[["Gentle mobility", "10 MIN"], ["Sleep rhythm", "CONSISTENT"], ["Next session", "READY TOMORROW"]]} /></>;
  return <><Heading kicker="PROGRESS">Every week<br />adds up.</Heading><div className="demo-progress-metric"><strong>18</strong><span>SESSIONS / 6 WEEKS</span></div><svg className="demo-chart" viewBox="0 0 260 110" role="img" aria-label="Consistency increases over six weeks"><path d="M0 25H260M0 60H260M0 95H260" stroke="#354653" fill="none" /><path d="M2 90 45 76 85 80 130 50 175 57 215 30 257 10" stroke="var(--accent)" strokeWidth="3" fill="none" /><circle cx="257" cy="10" r="3" fill="var(--accent)" /></svg><Rows items={[["Consistency", "3 SESSIONS / WEEK"], ["Strength progression", "+12%"]]} /><Note>Progress that includes the days life changed.</Note></>;
}
export function WalkthroughScreen({ state }: { state: WalkthroughKey }) {
  switch (state) {
    case "baseline": return <BaselineTrainingScreen />;
    case "time": return <TimeAdaptationScreen />;
    case "travel": return <TravelAdaptationScreen />;
    case "body": return <BodyAdaptationScreen />;
    case "goal": return <GoalAdaptationScreen />;
    case "system": return <ArcSystemScreen module="train" />;
    case "nourish": return <ArcSystemScreen module="nourish" />;
    case "recover": return <ArcSystemScreen module="recover" />;
    case "progress": return <ArcSystemScreen module="progress" />;
    case "complete": return <div className="demo-complete"><span>ARC</span><p>BUILT AROUND YOU.</p></div>;
  }
}

