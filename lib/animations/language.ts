export const EASE = {
  reveal: "power4.out", exit: "power3.inOut", morph: "power3.inOut",
  device: "power4.inOut", micro: "power2.out",
} as const;
export function phaseTiming(index: number) {
  const brief = index >= 6 && index <= 8;
  return {
    enter: .4, exit: .18,
    uiDelay: index === 9 ? .1 : brief ? 0 : index === 2 || index === 4 ? .5 : .3,
    uiExit: index === 9 ? .2 : brief ? .18 : .3,
    uiEnter: index === 9 ? .28 : brief ? .22 : .4,
    gap: brief ? .02 : .04,
  };
}
