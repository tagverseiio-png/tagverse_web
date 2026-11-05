import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CourseCatalogue from "@/components/academy/CourseCatalogue";
import AcademySecondaryNav from "@/components/academy/AcademySecondaryNav";
import AcademyFinalCta from "@/components/academy/AcademyFinalCta";

export const metadata: Metadata = {
  title: "All Courses — TAGVERSE Academy | Emerging Tech Curriculums",
  description:
    "Explore our complete catalogue of project-based courses across Generative AI, Full Stack Development, Performance Marketing, Neurotechnology, and Workflow Automation.",
  alternates: {
    canonical: "https://www.t4gverse.com/academy/courses",
  },
};

export default function AcademyCoursesPage() {
  return (
    <main className="academy-theme dark-adaptive min-h-screen bg-[#fcfcfd] text-[#0f172a] dark:bg-black dark:text-white transition-colors duration-200">
      <AcademySecondaryNav />

      <div className="container-x pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Academy", href: "/academy" },
            { label: "All Courses" },
          ]}
        />
      </div>

      <CourseCatalogue />

      <AcademyFinalCta />
    </main>
  );
}
