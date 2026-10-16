import { gsap } from "gsap";
import { getMomentIndex, walkthroughMoments, WALKTHROUGH_DURATION, WALKTHROUGH_ENTER_RATIO, WALKTHROUGH_LEAVE_RATIO } from "@/lib/constants/walkthrough";
import { phaseTiming } from "./language";

export type PlaybackStatus = "idle" | "playing" | "paused" | "complete" | "manual";
export type WalkthroughController = ReturnType<typeof createWalkthroughController>;

export function createWalkthroughController(callbacks: {
  onMoment: (index: number) => void;
  onProgress: (progress: number) => void;
  onStatus: (status: PlaybackStatus) => void;
}, reducedMotion = false) {
  let status: PlaybackStatus = reducedMotion ? "manual" : "idle";
  let started = false;
  let visibleRatio = 0;
  let pageVisible = true;
  let disposed = false;
  let moment = 0;
  const clock = { time: 0 };
  const changeStatus = (next: PlaybackStatus) => {
    if (disposed || status === next) return;
    status = next;
    callbacks.onStatus(next);
  };
  const emitFrame = () => {
    if (disposed) return;
    const next = getMomentIndex(clock.time);
    if (next !== moment) { moment = next; callbacks.onMoment(next); }
    callbacks.onProgress(clock.time / WALKTHROUGH_DURATION);
  };
  const timeline = gsap.timeline({
    paused: true,
    onUpdate: emitFrame,
    onComplete: () => changeStatus("complete"),
  }).to(clock, { time: WALKTHROUGH_DURATION, duration: WALKTHROUGH_DURATION, ease: "none" });
  walkthroughMoments.forEach((item) => timeline.addLabel(item.key, item.at));
  callbacks.onStatus(status);
  callbacks.onMoment(0);
  callbacks.onProgress(0);

  const settledTime = (index: number) => {
    const timing = phaseTiming(index);
    const end = walkthroughMoments[index + 1]?.at ?? WALKTHROUGH_DURATION;
    const settled = index === 0 ? 0 : timing.uiDelay + timing.uiExit + timing.gap + timing.uiEnter + .02;
    return Math.min(end - .02, walkthroughMoments[index].at + (index === 4 ? 2.05 : settled));
  };

  const pause = () => {
    if (disposed || status !== "playing") return;
    timeline.pause();
    const nextAt = walkthroughMoments[moment + 1]?.at ?? WALKTHROUGH_DURATION;
    const stable = Math.min(nextAt - (moment >= 5 && moment <= 8 ? .02 : .22), Math.max(timeline.time(), settledTime(moment)));
    timeline.time(stable, false);
    changeStatus("paused");
  };
  const play = () => {
    if (disposed || reducedMotion || !pageVisible || status === "complete") return;
    started = true;
    changeStatus("playing");
    timeline.play();
  };
  return {
    timeline,
    getState: () => ({ status, moment, started, reducedMotion, progress: clock.time / WALKTHROUGH_DURATION }),
    play,
    pause,
    replay() {
      if (disposed || reducedMotion || !pageVisible) return;
      started = true;
      timeline.pause().time(0, true);
      emitFrame();
      changeStatus("playing");
      timeline.play();
    },
    select(index: number) {
      if (disposed || !walkthroughMoments[index]) return;
      started = true;
      timeline.pause().time(settledTime(index), true);
      emitFrame();
      changeStatus(reducedMotion ? "manual" : "paused");
    },
    setVisibility(ratio: number) {
      visibleRatio = ratio;
      if (status === "playing" && ratio < WALKTHROUGH_LEAVE_RATIO) pause();
      else if (!started && ratio >= WALKTHROUGH_ENTER_RATIO && !reducedMotion && pageVisible) play();
    },
    setPageVisible(visible: boolean) {
      pageVisible = visible;
      if (!visible) pause();
      else if (!started && !reducedMotion && visibleRatio >= WALKTHROUGH_ENTER_RATIO) play();
    },
    setReducedMotion(reduce: boolean) {
      if (reduce) pause();
      reducedMotion = reduce;
      if (reduce) { timeline.pause(); changeStatus("manual"); }
      else if (status === "manual") {
        changeStatus(started ? "paused" : "idle");
        if (!started && visibleRatio >= WALKTHROUGH_ENTER_RATIO) play();
      }
    },
    destroy() { disposed = true; timeline.kill(); },
  };
}

