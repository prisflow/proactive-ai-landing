import { Hero } from "@/components/landing/hero";
import { Aurora } from "@/components/landing/aurora";
import { SmoothScroll } from "@/components/landing/smooth-scroll";
import { Features } from "@/components/landing/features";
import { Plugins } from "@/components/landing/plugins";
import { Workflow } from "@/components/landing/workflow";
import { Scenarios } from "@/components/landing/scenarios";
import { Screenshots } from "@/components/landing/screenshots";
import { Cta } from "@/components/landing/cta";

export default function Home() {
  return (
    <div className="relative bg-[#05060a] text-white">
      <SmoothScroll />
      <Aurora />
      <div className="relative">
        <Hero />
        <Features />
        <Plugins />
        <Workflow />
        <Scenarios />
        <Screenshots />
        <Cta />
      </div>
    </div>
  );
}
