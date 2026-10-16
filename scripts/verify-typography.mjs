import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

// Uses the same bundled font parser as next/font/local. This is glyph-metric
// validation, not a browser or screenshot test. Fixtures track the CSS bounds.
export function verifyTypography(moments) {
  const require = createRequire(import.meta.url);
  const imported = require("next/dist/compiled/@next/font/dist/fontkit").default;
  const font = (imported.default || imported)(fs.readFileSync(path.resolve(import.meta.dirname,"../public/fonts/Geist-Variable.ttf"))).getVariation({ wght: 500 });
  const clamp = (low,value,high) => Math.max(low,Math.min(value,high));
  const measure = (text,size) => font.layout(text).positions.reduce((sum,p)=>sum+p.xAdvance,0)/font.unitsPerEm*size + Math.max(0,text.length-1)*(-.065)*size;
  const fixtures = [[1920,1080],[1440,900],[1366,768],[1024,768],[768,1024],[430,932],[390,844],[375,812],[360,800],[320,568],[844,390],[568,320]];
  for (const [width,height] of fixtures) {
    const mobile = width<768;
    let gutter = mobile ? clamp(20,width*.0615,28) : clamp(24,width*.055,100);
    if(width>=1700)gutter=Math.max(gutter,(width-1500)/2);
    const inner=width-2*gutter;
    const gap=width<1024?24:clamp(24,width*.04,64);
    const column=mobile?inner:(inner-gap)*.6;
    for(const moment of moments){
      const size=moment.key==='resolve' ? mobile?clamp(110,column*.48,190):clamp(150,column*.48,320) : mobile?moment.key==='baseline'?clamp(36,column*.136,64):clamp(36,column*.152,64):clamp(52,width*.068,112);
      for(const word of moment.title.split(/\s+/))assert(measure(word,size)<=column+.5,`${width}×${height}: ${word} exceeds the walkthrough column`);
    }
    const problemColumn=mobile?inner:(inner-inner*.04)*2/3;
    const problemSize=mobile?clamp(33,inner*.117,72):width<1024?clamp(52,width*.068,70):clamp(58,width*.067,112);
    for(const line of ['FITNESS PLANS','ASSUME YOUR LIFE','STAYS THE SAME.'])assert(measure(line,problemSize)<=problemColumn+1,`${width}: problem statement creates an unintended line`);
    const checks = mobile ? [
      ['YOUR FITNESS',clamp(44,inner*.157,94)],
      ['KNOWING YOU',clamp(44,inner*.155,100)],
      ['ON DAY 200.',clamp(44,inner*.155,100)],
      ['FRAGMENTED.',clamp(44,inner*.155,90)],
      ['JOURNEY TOGETHER.',clamp(30,inner*.105,62)],
      ['THE SYSTEM',clamp(52,inner*.185,110)],
      ['YOUR ARC.',clamp(58,inner*.205,150)],
    ] : [['FRAGMENTED.',clamp(68,width*.115,188)],['YOUR ARC.',clamp(90,width*.16,260)]];
    for(const [text,size] of checks)assert(measure(text,size)<=inner+.5,`${width}×${height}: ${text} exceeds safe content width`);
  }
  console.log("Geist typography metric checks passed at 12 desktop/tablet/phone/landscape fixtures; these are not browser screenshots.");
}
