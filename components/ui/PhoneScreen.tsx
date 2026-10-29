"use client";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { BodyAvatar } from "./BodyAvatar";
import { useId } from "react";
import { productScreens, screenNames, type PhoneScenario, type ScreenIndex } from "@/lib/constants/product";
export { screenNames } from "@/lib/constants/product";

export function AppIcon({ index }: { index: number }) {
  const paths = ["M3 10 12 3l9 7v10h-6v-6H9v6H3Z", "M4 9v6m3-9v12m10-12v12m3-9v6M7 12h10", "M5 3v7m3-7v7M3 3v7c0 3 7 3 7 0V3M6.5 13v8M17 3c-3 3-3 7 0 9h3V3Zm3 9v9", "M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z", "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2"];
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[index]} /></svg>;
}
function ProgressChart({ id }: { id: string }) {
  return <svg viewBox="0 0 260 95" className="phone-chart" aria-label="Illustrative training progress over six weeks" role="img"><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--accent)" stopOpacity=".22" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></linearGradient></defs>{[25, 50, 75].map(y => <line key={y} x1="0" x2="260" y1={y} y2={y} stroke="var(--line)" strokeWidth=".5" />)}<path d="M0 80 Q20 85 35 66 T70 64 T110 42 T150 48 T195 20 T255 8 L255 95 L0 95Z" fill={`url(#${id})`} /><path d="M0 80 Q20 85 35 66 T70 64 T110 42 T150 48 T195 20 T255 8" fill="none" stroke="var(--accent)" strokeWidth="2" /><circle cx="255" cy="8" r="3" fill="var(--accent)" /></svg>;
}
export function PhoneScreen({ screen = 0, scenario, legacy = false }: { screen?: ScreenIndex; scenario?: PhoneScenario; legacy?: boolean }) {
  const chartId = useId();
  const data = scenario ?? productScreens[screen];
  const area = data.area ?? "shoulder";
  return <div className={`phone-screen ${legacy ? "phone-screen-legacy" : ""}`}>
    <div className="phone-status"><span>9:41</span><span aria-hidden="true">▮▮▮ ▰</span></div>
    <div className="phone-header"><span className="wordmark">{legacy ? "PLAN" : <BrandLogo />}</span><span className="avatar">{legacy ? "—" : "A"}</span></div>
    {legacy ? <div className="legacy-screen"><span className="phone-kicker">YOUR FIXED ROUTINE</span><h4>The same plan.<br />Every week.</h4><div className="rigid-plan">{["PUSH", "PULL", "LEGS", "REST"].map(name => <div className="legacy-plan-row" key={name}><strong>{name}</strong><span>60 MIN</span></div>)}</div><div className="legacy-warning"><span>!</span>Life changed.<br />The plan didn’t.</div></div> : <>
      <div key={`${data.context}-${data.title}`} className="phone-story">
        <div className="phone-greeting"><span className="phone-kicker">{data.context}</span><h4>{data.greeting}</h4></div>
        <div className={`phone-feature screen-kind-${data.screen}`}>
          <span className="phone-kicker">{data.focus}</span>{data.location && <div className="phone-session-meta"><span>{data.location}</span><span>PLAN SYNCED</span></div>}
          {data.screen === 2 ? <div className="phone-ring"><strong>{data.metric?.value}<span>{data.metric?.label}</span></strong></div> : (data.screen === 3 || data.area) ? <div className="phone-anatomy"><BodyAvatar area={area} /><span>{area}<i />CHECK-IN NOTED</span></div> : data.screen === 4 ? <><div className="phone-metric progress-metric"><strong>{data.metric?.value}</strong><span>{data.metric?.label}</span></div><ProgressChart id={chartId} /></> : <div className="phone-metric"><strong>{data.metric?.value}</strong><span>{data.metric?.label}</span><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="34" /><path d="M40 6a34 34 0 1 1-32 45" /></svg></div>}
          <h5>{data.title}</h5><p className="phone-feature-detail">{data.detail}</p>
          {data.screen === 3 && <div className="recovery-steps">{["Check in", "Adapt", "Support"].map((label,i) => <span className={i === (data.recoveryStep ?? 1) ? "selected" : ""} key={label}>{label}</span>)}</div>}
        </div>
        <div className="phone-rows">{data.rows.map(row => <div className="phone-row" key={row.label}><span>{row.label}</span><strong>{row.value}</strong></div>)}</div>
        <div className="phone-note"><i /><span>{data.note}</span></div>
      </div>
      <div className="phone-nav" aria-hidden="true">{screenNames.map((name, i) => <span className={data.screen === i ? "selected" : ""} key={name}><AppIcon index={i} />{name}</span>)}</div>
    </>}
    <div className="phone-home-indicator" aria-hidden="true" />
  </div>;
}
