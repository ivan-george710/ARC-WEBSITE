import { gsap } from "gsap";
import { EASE, phaseTiming } from "./language";
import { walkthroughMoments } from "@/lib/constants/walkthrough";
export type WalkthroughElements = {
  copies: HTMLElement[]; details: HTMLElement[]; screens: HTMLElement[];
  device: HTMLElement; body: HTMLElement; nav: HTMLElement[];
};
// Outgoing content leaves completely before the next screen enters.
// Every visual track belongs to the controller's one master timeline.
export function attachPresentation(timeline: gsap.core.Timeline, elements: WalkthroughElements, compact: boolean) {
  const { copies, details, screens, device, body, nav } = elements;
  const context = gsap.context(() => {
    gsap.set([...copies, ...details, ...screens], { autoAlpha: 0, y: 0, scale: 1, filter: "blur(0px)" });
    gsap.set([copies[0], details[0], screens[0]], { autoAlpha: 1 });
    gsap.set(body, { autoAlpha: 0, y: 8 });
    gsap.set(device, { xPercent: 0 });
    for (let index = 0; index < walkthroughMoments.length; index++) {
      const moment = walkthroughMoments[index];
      const timing = phaseTiming(index);
      const sharedHeadline = index >= 6 && index <= 8;
      if (!sharedHeadline && index > 0) {
        const previous = index === 9 ? 5 : index - 1;
        timeline.to([copies[previous], details[previous]], { autoAlpha: 0, y: -16, filter: "blur(8px)", duration: timing.exit, ease: EASE.exit }, moment.at - timing.exit);
        timeline.fromTo(copies[index], { autoAlpha: 0, y: 24, filter: "blur(10px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: timing.enter, ease: EASE.reveal }, moment.at);
        timeline.fromTo(details[index], { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: timing.enter, ease: EASE.reveal }, moment.at + .06);
      }
      if (index === 2 || index === 4) {
        const lines = copies[index].querySelectorAll(".walk-headline-line");
        if (lines.length > 1) timeline.fromTo(Array.from(lines).slice(1), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .3, stagger: .06, ease: EASE.reveal }, moment.at + .2);
      }
      const screenAt = moment.at + timing.uiDelay;
      const incomingAt = screenAt + timing.uiExit + timing.gap;
      if (index > 0) {
        timeline.to(screens[index - 1], { autoAlpha: 0, y: -18, scale: .985, filter: "blur(8px)", duration: timing.uiExit, ease: EASE.morph }, screenAt);
        timeline.fromTo(screens[index], { autoAlpha: 0, y: 18, scale: 1.015, filter: "blur(8px)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: timing.uiEnter, ease: EASE.morph, immediateRender: false }, incomingAt);
      }
      const selected = ["TRAIN", "NOURISH", "RECOVER", "PROGRESS"].indexOf(moment.module);
      nav.forEach((item, i) => timeline.set(item, { attr: { "data-selected": String(i === selected) } }, index ? incomingAt : 0));
    }
    const bodyAt = walkthroughMoments[3].at;
    const goalAt = walkthroughMoments[4].at;
    timeline.to(body, { autoAlpha: 1, y: 0, duration: .4, ease: EASE.reveal }, bodyAt + .64);
    timeline.to(device, { xPercent: compact ? 0 : 10, duration: .6, ease: EASE.device }, bodyAt + .3);
    timeline.to(body, { autoAlpha: 0, y: -8, duration: .25, ease: EASE.exit }, goalAt - .25);
    timeline.to(device, { xPercent: 0, duration: .6, ease: EASE.device }, goalAt);
    const oldGoal = screens[4].querySelector(".demo-old-goal");
    const newGoal = screens[4].querySelector(".demo-new-goal");
    if (oldGoal && newGoal) {
      gsap.set(newGoal, { autoAlpha: 0, y: 10 });
      timeline.to(oldGoal, { autoAlpha: 0, y: -10, duration: .2, ease: EASE.exit }, goalAt + 1.45);
      timeline.to(newGoal, { autoAlpha: 1, y: 0, duration: .35, ease: EASE.reveal }, goalAt + 1.67);
    }
  });
  return () => context.revert();
}
