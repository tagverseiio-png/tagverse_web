"use client";

import { useState } from "react";
import Link from "next/link";
import { useContactModal } from "@/components/ContactModal";

interface QuestionChip {
  label: string;
  answer: string;
  recommendedLink: { text: string; href: string };
}

const PRESET_QUERIES: QuestionChip[] = [
  {
    label: "Which course should I choose?",
    answer:
      "If you want to build intelligent agents and chatbots, choose Generative AI & Agentic AI. If you want to build websites and web apps from scratch, choose Full Stack Development. If you want to generate leads and scale marketing campaigns, choose Digital Marketing & Growth. If you want to connect tools and automate business tasks, choose AI Automation & Business Systems. If you want to explore brainwave signals and neurotechnology, choose Neurotechnology & BCI.",
    recommendedLink: { text: "Explore All Courses", href: "/academy/courses" },
  },
  {
    label: "What will I learn?",
    answer:
      "You will learn practical, industry-standard tools and workflows used by high-performing tech teams. Instead of memorising theory, you learn by doing: writing real code, building AI pipelines, designing user interfaces, running live marketing campaigns, and deploying functional products to the web.",
    recommendedLink: { text: "View Course Curriculums", href: "/academy/courses" },
  },
  {
    label: "Do I need coding experience?",
    answer:
      "Not necessarily. Full Stack Development and Digital Marketing & Growth start from foundational basics and require no prior coding experience. AI Automation uses visual workflow builders alongside simple scripts. Generative AI & Agentic AI requires basic Python familiarity (variables, loops, functions), while Neurotechnology & BCI requires intermediate Python and scientific computing curiosity.",
    recommendedLink: { text: "Find Your Best Fit", href: "#career-paths" },
  },
  {
    label: "How much does the course cost?",
    answer:
      "The starting fee for the upcoming cohort of our flagship Generative AI & Agentic AI course is ₹20,000. For our other specialised tracks (Full Stack Development, Digital Marketing, AI Automation, and Neurotechnology), please contact our admissions team for custom cohort schedules and pricing details.",
    recommendedLink: { text: "View Pricing Details", href: "#pricing" },
  },
  {
    label: "How do I enrol?",
    answer:
      "Enrolling is simple: submit a quick application through our online enrolment form or click 'Enrol Now' on any course page. Our admissions team will review your application, discuss your background and goals, and guide you through cohort dates and onboarding.",
    recommendedLink: { text: "Go to Enrolment Application", href: "/academy/enroll" },
  },
  {
    label: "Can I attend an orientation?",
    answer:
      "Yes! We host free 30-minute live orientation sessions where our lead mentors walk you through the course roadmap, demonstrate sample student projects, and answer all your questions live before you commit.",
    recommendedLink: { text: "Book a Free Orientation", href: "/academy/book-orientation" },
  },
  {
    label: "What projects will I build?",
    answer:
      "Every student builds real, functional products before graduating: AI customer support agents, voice calling bots, full-stack SaaS apps with payment gateways, automated WhatsApp lead management systems, and live marketing funnels with attribution tracking. All projects are hosted live on the web and documented on your GitHub.",
    recommendedLink: { text: "Explore Student Projects", href: "/academy/projects" },
  },
];

export default function AiLearningAdvisor() {
  const [selectedQuery, setSelectedQuery] = useState<QuestionChip>(PRESET_QUERIES[0]);
  const { open } = useContactModal();

  return (
    <section className="relative py-24 border-t border-white/10 bg-gradient-to-b from-black via-[#0b0617] to-black">
      <div className="container-x">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-purple-soft)]/30 bg-[var(--accent-purple-soft)]/10 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple-soft)] animate-pulse" />
            <span>AI Learning Assistant</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
            Ask the Academy Learning Advisor
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/60">
            Have questions about prerequisites, syllabi, or finding the right track? Select a common question or request a personal curriculum consultation.
          </p>
        </div>

        {/* Interactive Query Chips & Response Box */}
        <div className="mt-10 rounded-[28px] border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6 sm:p-8 backdrop-blur-2xl">
          <div className="text-xs font-mono-g text-white/40 uppercase tracking-wider mb-3">
            Suggested Inquiries
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            {PRESET_QUERIES.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedQuery(q)}
                className={`rounded-full px-4 py-2 font-mono-g text-xs transition-all text-left ${
                  selectedQuery.label === q.label
                    ? "bg-white text-black font-semibold shadow-md"
                    : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* AI Response Card */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/50 p-6">
            <div className="flex items-center gap-2 font-mono-g text-[11px] text-[var(--accent-purple-soft)] mb-2">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-purple-soft)]" />
              <span>Academy Advisor Response</span>
            </div>

            <p className="font-brand text-base sm:text-lg text-white font-normal leading-relaxed">
              {selectedQuery.answer}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
              <Link
                href={selectedQuery.recommendedLink.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90"
              >
                <span>{selectedQuery.recommendedLink.text}</span>
                <span>&rarr;</span>
              </Link>

              <button
                type="button"
                onClick={() => open("TAGVERSE Academy - Personal Curriculum Consultation")}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-5 py-2 font-brand text-xs font-medium text-white transition-all hover:bg-white/10"
              >
                Ask a Human Advisor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
