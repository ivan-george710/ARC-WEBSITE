"use client";
import type Lenis from "lenis";

let lenis: Lenis | null = null;
let explicitAbout = false;
let restoration: ScrollRestoration | null = null;
let releaseFrame = 0;

export function registerNavigationLenis(instance: Lenis) {
  lenis = instance;
  return () => { if (lenis === instance) lenis = null; };
}

function resetToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  // Stop any in-flight interpolation and synchronize even if targetScroll is
  // already zero (scrollTo alone can short-circuit for an unchanged target).
  if (lenis) {
    const wasStopped = lenis.isStopped;
    lenis.stop();
    lenis.scrollTo(0, { immediate: true, force: true });
    if (!wasStopped) lenis.start();
  }
}

function releaseRestoration() {
  cancelAnimationFrame(releaseFrame);
  releaseFrame = requestAnimationFrame(() => {
    if (restoration !== null) history.scrollRestoration = restoration;
    restoration = null;
  });
}

export function openAboutFromNavigation(sameRoute: boolean) {
  cancelAnimationFrame(releaseFrame);
  if (restoration === null) restoration = history.scrollRestoration;
  history.scrollRestoration = "manual";
  explicitAbout = !sameRoute;
  // Cross-route resets happen in the commit's layout effect, never on Home.
  if (sameRoute) { resetToTop(); releaseRestoration(); }
}

export function commitNavigationScroll(pathname: string, fromHistory: boolean) {
  if (pathname === "/about" && (explicitAbout || !fromHistory)) resetToTop();
  explicitAbout = false;
  // No delayed scrolling: only restore the browser's normal history policy
  // after this navigation has painted. Back/forward keep Next's restoration.
  releaseRestoration();
}
