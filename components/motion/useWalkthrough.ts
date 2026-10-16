"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import { createWalkthroughController, type PlaybackStatus, type WalkthroughController } from "@/lib/animations/walkthrough";
import { attachPresentation } from "@/lib/animations/presentation";

export function useWalkthrough(root: RefObject<HTMLElement | null>, device: RefObject<HTMLDivElement | null>, progress: RefObject<HTMLDivElement | null>) {
  const controller = useRef<WalkthroughController | null>(null);
  const [moment, setMoment] = useState(0);
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const playback = createWalkthroughController({
      onMoment: setMoment,
      onStatus: setStatus,
      onProgress: value => {
        if (progress.current) progress.current.style.transform = `scaleX(${value})`;
      },
    }, query.matches);
    controller.current = playback;
    const stage = root.current;
    const body = stage?.querySelector<HTMLElement>(".walk-body");
    const cleanupPresentation = stage && device.current && body ? attachPresentation(playback.timeline, {
      copies: Array.from(stage.querySelectorAll<HTMLElement>(".walk-copy-view")),
      details: Array.from(stage.querySelectorAll<HTMLElement>(".walk-detail-view")),
      screens: Array.from(stage.querySelectorAll<HTMLElement>(".walk-screen-layer")),
      device: device.current,
      body,
      nav: Array.from(stage.querySelectorAll<HTMLElement>("[data-nav-index]")),
    }, window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) : () => {};
    const preference = () => { setReducedMotion(query.matches); playback.setReducedMotion(query.matches); };
    preference();
    const visibility = () => playback.setPageVisible(!document.hidden && document.hasFocus());
    visibility();
    const observer = new IntersectionObserver(([entry]) => {
      // Tall mobile stages cannot expose 60% of their own height at once.
      // Measure against the smaller of the stage and viewport instead.
      const capacity = Math.min(entry.boundingClientRect.height, entry.rootBounds?.height ?? window.innerHeight);
      playback.setVisibility(capacity > 0 ? Math.min(1, entry.intersectionRect.height / capacity) : 0);
    }, { threshold: Array.from({ length: 21 }, (_, index) => index / 20) });
    if (root.current) observer.observe(root.current);
    query.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", visibility);
    window.addEventListener("focus", visibility);
    // Responsive layout has no stored pixel coordinates. Settle playback while
    // the browser reflows instead of rebuilding or stacking another timeline.
    let viewportWidth = window.innerWidth;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const resize = () => {
      if (!coarse || Math.abs(window.innerWidth - viewportWidth) > 1) playback.pause();
      viewportWidth = window.innerWidth;
    };
    window.addEventListener("resize", resize);
    window.addEventListener("arc:menu-open", playback.pause);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("blur", visibility);
      window.removeEventListener("focus", visibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("arc:menu-open", playback.pause);
      playback.destroy();
      cleanupPresentation();
      controller.current = null;
    };
  }, [root, device, progress]);
  return { controller, moment, status, reducedMotion };
}

