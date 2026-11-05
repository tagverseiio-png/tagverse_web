import type { Metadata } from "next";
import AcademySecondaryNav from "@/components/academy/AcademySecondaryNav";
import AcademyHero from "@/components/academy/AcademyHero";
import WhyAcademySection from "@/components/academy/WhyAcademySection";
import CourseCatalogue from "@/components/academy/CourseCatalogue";
import BuildBeforeGraduateSection from "@/components/academy/BuildBeforeGraduateSection";
import BuildathonsSection from "@/components/academy/BuildathonsSection";
import IndustryMentorshipSection from "@/components/academy/IndustryMentorshipSection";
import PortfolioDevelopmentSection from "@/components/academy/PortfolioDevelopmentSection";
import StudentToBuilderSection from "@/components/academy/StudentToBuilderSection";
import CareerPathFinder from "@/components/academy/CareerPathFinder";
import LiveLearningCalendar from "@/components/academy/LiveLearningCalendar";
import StudentDashboardPreview from "@/components/academy/StudentDashboardPreview";
import AiLearningAdvisor from "@/components/academy/AiLearningAdvisor";
import AcademyPricingSection from "@/components/academy/AcademyPricingSection";
import AcademyFaqSection from "@/components/academy/AcademyFaqSection";
import AcademyFinalCta from "@/components/academy/AcademyFinalCta";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "TAGVERSE Academy — Learn Skills. Build Products. Become Industry Ready.",
  description:
    "From Learner to Builder. A new-age learning ecosystem for AI, technology, automation and digital innovation. Learn from practitioners, build real-world projects and turn your knowledge into demonstrable skills.",
  keywords: [
    "TAGVERSE Academy",
    "Generative AI Course",
    "Agentic AI Swarms Training",
    "Full Stack Development Course",
    "Next.js PostgreSQL Boot Camp",
    "AI Automation n8n Training",
    "Digital Marketing Performance Ads",
    "Neurotechnology BCI Course",
    "Project-Based Tech Learning",
    "From Learner to Builder",
  ],
  openGraph: {
    title: "TAGVERSE Academy — Learn Skills. Build Products. Become Industry Ready.",
    description:
      "A new-age learning ecosystem for AI, technology, automation and digital innovation. Don't Just Learn AI. Build With It.",
    url: "https://www.t4gverse.com/academy",
    siteName: "Tagverse",
    images: [
      {
        url: "/assets/images/insights/smart-suggestion-layer-3.webp",
        width: 1200,
        height: 630,
        alt: "TAGVERSE Academy — From Learner to Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TAGVERSE Academy — Learn Skills. Build Products. Become Industry Ready.",
    description: "Don't Just Learn AI. Build With It. Practical industry training on AI, software, and automation.",
    images: ["/assets/images/insights/smart-suggestion-layer-3.webp"],
  },
  alternates: {
    canonical: "https://www.t4gverse.com/academy",
  },
};

export default function AcademyPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOccupationalProgram",
        name: "TAGVERSE Academy",
        description:
          "Practical industry-oriented learning ecosystem for Generative AI, Agentic AI, Full Stack Development, Automation, and Neurotechnology.",
        provider: {
          "@type": "Organization",
          name: "TAGVERSE",
          url: "https://www.t4gverse.com",
        },
        educationalProgramMode: "hybrid",
        programPrerequisites: "Varies by course. Basic Python or web fundamentals recommended.",
        offers: {
          "@type": "Offer",
          category: "Technology Education",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.t4gverse.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Academy",
            item: "https://www.t4gverse.com/academy",
          },
        ],
      },
    ],
  };

  return (
    <main className="academy-theme dark-adaptive min-h-screen bg-[#fcfcfd] text-[#0f172a] dark:bg-black dark:text-white selection:bg-purple-500/20 transition-colors duration-200">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Academy Sticky Secondary Nav */}
      <AcademySecondaryNav />

      {/* Hero Section */}
      <AcademyHero />

      {/* Why TAGVERSE Academy? (6 Pillars) */}
      <Reveal>
        <WhyAcademySection />
      </Reveal>

      {/* Course Catalogue (Search & Filterable Grid) */}
      <Reveal>
        <CourseCatalogue />
      </Reveal>

      {/* Build Before You Graduate & 6-Stage Journey */}
      <Reveal>
        <BuildBeforeGraduateSection />
      </Reveal>

      {/* TAGVERSE Buildathons */}
      <Reveal>
        <BuildathonsSection />
      </Reveal>

      {/* Industry Mentorship */}
      <Reveal>
        <IndustryMentorshipSection />
      </Reveal>

      {/* Portfolio Development & Startup Simulation */}
      <Reveal>
        <PortfolioDevelopmentSection />
      </Reveal>

      {/* Student-to-Builder Programme */}
      <Reveal>
        <StudentToBuilderSection />
      </Reveal>

      {/* Interactive Career Path Finder */}
      <Reveal>
        <CareerPathFinder />
      </Reveal>

      {/* Live Learning Calendar */}
      <Reveal>
        <LiveLearningCalendar />
      </Reveal>

      {/* Student Dashboard Preview */}
      <Reveal>
        <StudentDashboardPreview />
      </Reveal>

      {/* AI Learning Advisor */}
      <Reveal>
        <AiLearningAdvisor />
      </Reveal>

      {/* Centrally Configured Pricing */}
      <Reveal>
        <AcademyPricingSection />
      </Reveal>

      {/* Global Academy FAQs */}
      <Reveal>
        <AcademyFaqSection />
      </Reveal>

      {/* Final Conversion CTA Banner */}
      <Reveal>
        <AcademyFinalCta />
      </Reveal>
    </main>
  );
}
