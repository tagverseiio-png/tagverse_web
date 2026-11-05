import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import AcademySecondaryNav from "@/components/academy/AcademySecondaryNav";
import IndustryMentorshipSection from "@/components/academy/IndustryMentorshipSection";
import CareerPathFinder from "@/components/academy/CareerPathFinder";
import StudentToBuilderSection from "@/components/academy/StudentToBuilderSection";
import PortfolioDevelopmentSection from "@/components/academy/PortfolioDevelopmentSection";
import AcademyFinalCta from "@/components/academy/AcademyFinalCta";

export const metadata: Metadata = {
  title: "Industry Mentorship & Career Paths — TAGVERSE Academy",
  description:
    "Learn from practicing AI systems architects, full-stack software leads, and growth practitioners. Develop portfolio proof and career readiness.",
  alternates: {
    canonical: "https://www.t4gverse.com/academy/mentorship",
  },
};

export default function AcademyMentorshipPage() {
  return (
    <main className="academy-theme dark-adaptive min-h-screen bg-[#fcfcfd] text-[#0f172a] dark:bg-black dark:text-white transition-colors duration-200">
      <AcademySecondaryNav />

      <div className="container-x pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Academy", href: "/academy" },
            { label: "Mentorship & Careers" },
          ]}
        />
      </div>

      <IndustryMentorshipSection />
      <CareerPathFinder />
      <PortfolioDevelopmentSection />
      <StudentToBuilderSection />
      <AcademyFinalCta />
    </main>
  );
}
