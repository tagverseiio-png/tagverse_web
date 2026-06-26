import Hero from "@/components/Hero";
import Hallucination from "@/components/Hallucination";
import LogoMarquee from "@/components/LogoMarquee";
import Stats from "@/components/Stats";
import Complexity from "@/components/Complexity";
import AgentCanvas from "@/components/AgentCanvas";
import Insights from "@/components/Insights";
import Spotlight from "@/components/Spotlight";
import CTA from "@/components/CTA";
import Compliance from "@/components/Compliance";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Hallucination />
      <LogoMarquee />
      <Stats />
      <Complexity />
      <AgentCanvas />
      <Insights />
      <Spotlight />
      <CTA />
      <Compliance />
    </main>
  );
}
