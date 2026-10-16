import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Exercise the actual typed scenario data and React screens without a browser dependency.
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const modules = new Map();
function load(filename) {
  const file = [filename, `${filename}.tsx`, `${filename}.ts`].find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!file) throw new Error(`Module not found: ${filename}`);
  if (modules.has(file)) return modules.get(file).exports;
  const loadedModule = { exports: {} };
  modules.set(file, loadedModule);
  const compiled = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const localRequire = spec => spec.startsWith("@/") ? load(path.join(root, spec.slice(2))) : spec.startsWith(".") ? load(path.resolve(path.dirname(file), spec)) : require(spec);
  new Function("require", "module", "exports", compiled)(localRequire, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}

const { walkthroughMoments, WALKTHROUGH_DURATION } = load(path.join(root, "lib/constants/walkthrough"));
const { createWalkthroughController } = load(path.join(root, "lib/animations/walkthrough"));
const { attachPresentation } = load(path.join(root, "lib/animations/presentation"));
const { ProductWalkthrough } = load(path.join(root, "components/scenes/ProductWalkthrough"));
const { WalkthroughScreen } = load(path.join(root, "components/ui/WalkthroughScreens"));
assert.equal(WALKTHROUGH_DURATION, 22);
const renderScreen = state => renderToStaticMarkup(React.createElement(WalkthroughScreen, { state }));
const baseline = renderScreen("baseline");
assert(baseline.includes("60"));
assert(baseline.includes("Bench Press"));
const short = renderScreen("time");
assert(short.includes("10"));
assert(!short.includes("Bench Press"));
const travel = renderScreen("travel");
assert(travel.includes("HOTEL / HOME"));
assert(!travel.includes("SHOULDER"));
const body = renderScreen("body");
for (const stale of ["HOTEL", "PLAN SYNCED", "Floor Press", "MIN"]) assert(!body.includes(stale));
assert(body.includes("PAUSED"));
assert(!body.includes("body-avatar"), "Body check-in must not duplicate the external avatar");
const goal = renderScreen("goal");
assert(goal.includes("RUN A 10K") && goal.includes("2 SESSIONS"));
assert(!goal.includes("SHOULDER"));
const stage = renderToStaticMarkup(React.createElement(ProductWalkthrough));
for (const className of ["device ", "phone-status", "phone-header", "phone-nav ", "phone-home-indicator"]) {
  assert.equal((stage.match(new RegExp('class="'+className, 'g')) ?? []).length, 1, `Persistent ${className}`);
}
assert.equal((stage.match(/class="body-avatar /g) ?? []).length, 1);
assert(stage.includes('data-playback="idle"'));
const callbacks = { onMoment() {}, onProgress() {}, onStatus() {} };
const playback = createWalkthroughController(callbacks);
playback.setVisibility(.59);
assert.equal(playback.getState().status, "idle");
playback.setVisibility(.61);
assert.equal(playback.getState().status, "playing");
playback.timeline.time(11, false);
playback.setVisibility(.1);
assert.equal(playback.getState().status, "paused");
playback.setVisibility(.8);
assert.equal(playback.getState().status, "paused");
playback.play();
playback.setPageVisible(false);
assert.equal(playback.getState().status, "paused");
playback.setPageVisible(true);
assert.equal(playback.getState().status, "paused");
playback.setReducedMotion(true);
playback.play(); playback.replay();
assert.equal(playback.getState().status, "manual");
playback.select(4);
assert.equal(playback.getState().moment, 4);
playback.setReducedMotion(false);
assert.equal(playback.getState().status, "paused");
playback.destroy();
const reduced = createWalkthroughController(callbacks, true);
reduced.setVisibility(1); reduced.play(); reduced.replay();
assert.equal(reduced.getState().started, false);
reduced.destroy();
const target = () => ({ autoAlpha: 0, y: 0, scale: 1, filter: "none", xPercent: 0 });
const copies = walkthroughMoments.map(() => ({ ...target(), querySelectorAll: () => [] }));
const details = walkthroughMoments.map(target);
const screens = walkthroughMoments.map(() => ({ ...target(), querySelector: () => null }));
const actor = target(), avatar = target();
const movie = createWalkthroughController(callbacks);
const clean = attachPresentation(movie.timeline, { copies, details, screens, device: actor, body: avatar, nav: [] }, false);
assert.equal(movie.timeline.duration(), 22);
for (const moment of walkthroughMoments) assert(moment.key in movie.timeline.labels);
for (let cycle = 0; cycle < 3; cycle++) {
  movie.replay();
  for (let frame = 0; frame <= 1320; frame++) {
    const time = frame/60;
    movie.timeline.time(time, false);
    assert(copies.filter(c => c.autoAlpha > .001).length <= 1, `Overlapping headlines at ${time}`);
    assert(screens.filter(c => c.autoAlpha > .001).length <= 1, `Overlapping screens at ${time}`);
    if (time < 9.74 || time >= 12.6) assert(avatar.autoAlpha < .001, `Body outside its scene at ${time}`);
    if (avatar.autoAlpha > .001) assert(screens[2].autoAlpha < .001, "Body cannot enter over travel content");
  }
  assert.equal(movie.getState().status, "complete");
  movie.setVisibility(.1); movie.setVisibility(.8);
  assert.equal(movie.getState().status, "complete");
  for (let index = 1; index < walkthroughMoments.length; index++) {
    movie.replay();
    movie.timeline.time(walkthroughMoments[index].at + .02, false);
    movie.pause();
    assert(screens[index].autoAlpha > .999, `Pause settles screen ${index}`);
    assert(copies[index >= 6 && index <= 8 ? 5 : index].autoAlpha > .999, `Pause settles headline ${index}`);
  }
}
movie.replay();
assert.equal(screens[0].autoAlpha, 1);
assert(screens.slice(1).every(s => s.autoAlpha === 0));
assert.equal(avatar.autoAlpha, 0);
assert.equal(actor.xPercent, 0);
movie.destroy(); clean();
require("gsap").gsap.ticker.sleep();
console.log("Walkthrough checks passed: isolated content, persistent chrome, 3 complete replays / 3,963 frames without overlapping screens or headlines, settled interruptions, reduced motion and clean baseline reset.");
