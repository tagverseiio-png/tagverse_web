"use client";

import FAQAccordion from "@/components/FAQAccordion";

const ACADEMY_GLOBAL_FAQS = [
  {
    question: "What is TAGVERSE Academy?",
    answer:
      "TAGVERSE Academy is a modern, industry-oriented learning ecosystem created by TAGVERSE. Rather than delivering passive video lectures, we train students through hands-on coding, live architectural reviews, practical project sprints, and 1-on-1 practitioner mentorship across Generative AI, Full Stack Development, Automation, Performance Marketing, and Neurotechnology.",
  },
  {
    question: "Who can enrol in TAGVERSE Academy programs?",
    answer:
      "Our programs are open to university students, aspiring software engineers, working professionals seeking to transition into AI or full-stack engineering, and agency operators wanting to automate business workflows. Specific technical prerequisites vary by course.",
  },
  {
    question: "Do I need prior coding experience?",
    answer:
      "It depends on the track. Digital Marketing and AI Automation do not require prior programming. Full Stack Development starts from web fundamentals. Generative AI requires basic Python familiarity, and Neurotechnology requires intermediate Python and linear algebra basics.",
  },
  {
    question: "Are the courses project-based?",
    answer:
      "Yes, 100%. Our core motto is 'From Learner to Builder'. Every student works on real briefs, writes production code, and builds an end-to-end capstone application that is deployed to the cloud and published on GitHub.",
  },
  {
    question: "Is mentorship included with every course?",
    answer:
      "Yes. Every enrolled student receives weekly architectural office hours, 1-on-1 scheduled mentor check-ins, and line-by-line GitHub pull request code reviews by practicing engineers.",
  },
  {
    question: "Will I receive a verifiable certificate?",
    answer:
      "Yes. Upon successful completion and evaluation of your capstone deliverables, you receive a cryptographically verifiable TAGVERSE Academy digital credential linked directly to your GitHub repository and live project demo.",
  },
  {
    question: "Are internships guaranteed?",
    answer:
      "No. Internships, internal project participation, and employment are strictly merit-based and dependent on evaluation, code quality, and project availability. We do not make false guarantees of placements.",
  },
  {
    question: "Can I book a free orientation before enrolling?",
    answer:
      "Yes! You can book a free 1-on-1 or group orientation session to walk through the curriculum, inspect sample projects, and ask questions before making an enrolment decision.",
  },
  {
    question: "Can working professionals enrol?",
    answer:
      "Yes. Cohorts are scheduled on weekends with evening office hours and asynchronous lab support, making them fully compatible with full-time work or university studies.",
  },
  {
    question: "What payment options are supported?",
    answer:
      "We support one-time upfront payments, flexible installment plans, and corporate sponsorships. Contact our admissions team for payment plans.",
  },
  {
    question: "How do I choose the right course?",
    answer:
      "Use our interactive Career Path Finder on the website, ask the AI Learning Advisor, or book a free orientation call to discuss your background and goals with our team.",
  },
];

export default function AcademyFaqSection() {
  return (
    <section id="faqs" className="relative scroll-mt-24 py-24 border-t border-white/10 bg-black">
      <div className="container-x max-w-4xl">
        <FAQAccordion
          faqs={ACADEMY_GLOBAL_FAQS}
          title="Frequently Asked Questions about TAGVERSE Academy"
          subtitle="Everything you need to know about our learning approach, prerequisites, projects, mentorship, and enrolment."
        />
      </div>
    </section>
  );
}
