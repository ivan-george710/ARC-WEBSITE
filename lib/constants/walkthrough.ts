export type WalkthroughKey = "baseline" | "time" | "travel" | "body" | "goal" | "system" | "nourish" | "recover" | "progress" | "complete";
export type WalkthroughMoment = {
  key: WalkthroughKey;
  at: number;
  title: string;
  detail: string;
  module: "TRAIN" | "NOURISH" | "RECOVER" | "PROGRESS";
};
// One clock: circumstance first, app response second, then a readable hold.
export const WALKTHROUGH_DURATION = 22;
export const WALKTHROUGH_ENTER_RATIO = .6;
export const WALKTHROUGH_LEAVE_RATIO = .2;
export const walkthroughMoments: readonly WalkthroughMoment[] = [
  { key: "baseline", at: 0, title: "YOUR PLAN.", detail: "A session built around your day.", module: "TRAIN" },
  { key: "time", at: 2.3, title: "MEETING\nRAN LATE.", detail: "Built for the time you have.", module: "TRAIN" },
  { key: "travel", at: 5.7, title: "TRAVELLING.\nNO GYM.", detail: "Same intention. A different session.", module: "TRAIN" },
  { key: "body", at: 9.1, title: "SHOULDER\nDOESN’T FEEL\nRIGHT.", detail: "Give pressing a pause.", module: "TRAIN" },
  { key: "goal", at: 12.6, title: "SIX MONTHS LATER.\nYOUR GOAL\nCHANGED.", detail: "A new direction. A whole new plan.", module: "TRAIN" },
  { key: "system", at: 16.5, title: "ONE CONTEXT.\nONE SYSTEM.", detail: "Training, nourishment, recovery and progress. Connected.", module: "TRAIN" },
  { key: "nourish", at: 17.7, title: "ONE CONTEXT.\nONE SYSTEM.", detail: "Training, nourishment, recovery and progress. Connected.", module: "NOURISH" },
  { key: "recover", at: 18.7, title: "ONE CONTEXT.\nONE SYSTEM.", detail: "Training, nourishment, recovery and progress. Connected.", module: "RECOVER" },
  { key: "progress", at: 19.7, title: "ONE CONTEXT.\nONE SYSTEM.", detail: "Training, nourishment, recovery and progress. Connected.", module: "PROGRESS" },
  { key: "complete", at: 20.9, title: "ARC.", detail: "BUILT AROUND YOU.", module: "PROGRESS" },
];
export const walkthroughModules = [
  { label: "TRAIN", index: 5 }, { label: "NOURISH", index: 6 },
  { label: "RECOVER", index: 7 }, { label: "PROGRESS", index: 8 },
] as const;
export function getMomentIndex(time: number) {
  for (let index = walkthroughMoments.length - 1; index >= 0; index--) {
    if (time >= walkthroughMoments[index].at) return index;
  }
  return 0;
}
