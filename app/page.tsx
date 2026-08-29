import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Scenarios } from "@/components/landing/scenarios";
import { Plugins } from "@/components/landing/plugins";
import { Workflow } from "@/components/landing/workflow";
import { Screenshots } from "@/components/landing/screenshots";
import { Cta } from "@/components/landing/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Scenarios />
      <Plugins />
      <Workflow />
      <Screenshots />
      <Cta />
    </>
  );
}
