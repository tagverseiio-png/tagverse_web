import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import AcademySecondaryNav from "@/components/academy/AcademySecondaryNav";
import BuildBeforeGraduateSection from "@/components/academy/BuildBeforeGraduateSection";
import BuildathonsSection from "@/components/academy/BuildathonsSection";
import StudentProjectWall from "@/components/academy/StudentProjectWall";
import AcademyFinalCta from "@/components/academy/AcademyFinalCta";

export const metadata: Metadata = {
  title: "Student Projects & Buildathons — TAGVERSE Academy",
  description:
    "Explore practical engineering systems, autonomous agent prototypes, and full-stack applications built by students. Join monthly TAGVERSE Buildathons.",
  alternates: {
    canonical: "https://www.t4gverse.com/academy/projects",
  },
};

export default function AcademyProjectsPage() {
  return (
    <main className="academy-theme dark-adaptive min-h-screen bg-[#fcfcfd] text-[#0f172a] dark:bg-black dark:text-white transition-colors duration-200">
      <AcademySecondaryNav />

      <div className="container-x pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Academy", href: "/academy" },
            { label: "Projects & Buildathons" },
          ]}
        />
      </div>

      <BuildBeforeGraduateSection />
      <BuildathonsSection />
      <StudentProjectWall />
      <AcademyFinalCta />
    </main>
  );
}
