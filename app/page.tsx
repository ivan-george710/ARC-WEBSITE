import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { HeroScene } from "@/components/scenes/HeroScene";
import { ProblemScene } from "@/components/scenes/ProblemScene";
import { HumanScene } from "@/components/scenes/HumanScene";
import { SystemScene } from "@/components/scenes/SystemScene";
import { LifeScene } from "@/components/scenes/LifeScene";
import { ProductScene } from "@/components/scenes/ProductScene";
import { VisionScene } from "@/components/scenes/VisionScene";
import { FinalScene } from "@/components/scenes/FinalScene";
export default function Home() { return <><Navigation /><main id="main"><HeroScene /><ProblemScene /><HumanScene /><SystemScene /><LifeScene /><ProductScene /><VisionScene /><FinalScene /></main><Footer /></>; }
