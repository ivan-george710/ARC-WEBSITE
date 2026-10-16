import { HeroScene } from "@/components/scenes/HeroScene";
import { ProblemScene } from "@/components/scenes/ProblemScene";
import { ProductWalkthrough } from "@/components/scenes/ProductWalkthrough";
import { PersonalizationScene } from "@/components/scenes/PersonalizationScene";
import { VisionScene } from "@/components/scenes/VisionScene";
import { FinalScene } from "@/components/scenes/FinalScene";
export default function Home() {
  return <main id="main" className="home-page"><HeroScene /><ProblemScene /><ProductWalkthrough /><PersonalizationScene /><VisionScene /><FinalScene /></main>;
}
