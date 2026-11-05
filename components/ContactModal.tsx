"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

const WHATSAPP_NUMBER = "919941968238";
const PHONE_NUMBER = "+91 99419 68238";

type ContactModalContextType = {
  open: (defaultServiceOrEvent?: string | React.MouseEvent) => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextType>({
  open: () => {},
  close: () => {},
});

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const handleOpen = useCallback((defaultServiceOrEvent?: string | React.MouseEvent) => {
    if (typeof defaultServiceOrEvent === "string") {
      setSelectedService(defaultServiceOrEvent);
    } else {
      setSelectedService(undefined);
    }
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <ContactModalContext.Provider value={{ open: handleOpen, close: handleClose }}>
      {children}
      {open && <ContactModal onClose={handleClose} initialService={selectedService} />}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  return useContext(ContactModalContext);
}

function ContactModal({ onClose, initialService }: { onClose: () => void; initialService?: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService || "AI Agents & LLM Integration Services",
    budget: "₹50k – ₹2L",
    message: "",
    hp: "", // Honeypot anti-spam
  });
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Capture UTM parameters from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const utmObj: Record<string, string> = {};
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
        const val = params.get(k);
        if (val) utmObj[k.replace("utm_", "")] = val;
      });
      setUtm(utmObj);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: form.service,
      budget: form.budget,
      message: form.message.trim(),
      hp: form.hp,
      utm,
    };

    try {
      // Primary: Post to server-side API with validation & n8n webhook integration
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("API submission failed");
      }
      setStatus("success");
    } catch {
      // Fallback: Direct Firestore write
      try {
        await addDoc(collection(db, "enquiries"), {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          service: form.service,
          budget: form.budget,
          message: form.message.trim(),
          createdAt: new Date().toISOString(),
          source: "website_contact_modal_fallback",
        });
        setStatus("success");
      } catch (err) {
        console.error("Direct Firestore write failed:", err);
        setStatus("error");
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Contact us"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div className="relative w-full max-w-lg overflow-y-auto max-h-[90vh] rounded-[24px] border border-white/10 bg-[#111] p-6 text-white shadow-2xl sm:p-8">
        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="py-10 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <h2 className="mt-5 font-brand text-xl font-medium tracking-tight">
              Message received
            </h2>
            <p className="mt-2 text-sm text-white/60">
              We&apos;ll get back to you within 24 hours with a custom strategy.
            </p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-white px-7 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="font-brand text-2xl font-medium tracking-tight">
                Let&apos;s build together.
              </h2>
              <p className="mt-2 text-sm text-white/55">
                Tell us about your project or reach us directly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {/* Spam honeypot hidden field */}
              <input
                type="text"
                name="hp"
                value={form.hp}
                onChange={(e) => setForm({ ...form, hp: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-wider text-white/50">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-wider text-white/50">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white/30"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-wider text-white/50">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-wider text-white/50">
                    Service Required
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#191919] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white/30"
                  >
                    <optgroup label="Professional Services">
                      <option value="Digital Marketing & Social Media Management">Digital Marketing & Social Media</option>
                      <option value="Performance Marketing & Paid Advertising">Performance Marketing & Paid Ads</option>
                      <option value="Branding & Creative Design">Branding & Creative Design</option>
                      <option value="Website & Application Development">Website & App Development</option>
                      <option value="AI Agents & LLM Integration Services">AI Agents & LLM Integrations</option>
                      <option value="Workflow Automation & API Integrations">Workflow Automation & n8n</option>
                      <option value="WhatsApp Chatbots & Business Automation">WhatsApp Chatbots & Automation</option>
                      <option value="SEO, AEO & GEO Optimization">SEO, AEO & GEO Optimization</option>
                      <option value="Video, Podcast & Media Production">Video, Podcast & Studio</option>
                      <option value="Influencer, Creator & Model Management">Influencer & Creator Management</option>
                    </optgroup>
                    <optgroup label="Software Products & SaaS">
                      <option value="VYRA CRM">VYRA CRM</option>
                      <option value="VYRA CRM - 30-Day Free Trial">VYRA CRM (30-Day Free Trial)</option>
                      <option value="VYRA CRM - Product Demo">VYRA CRM (Book a Demo)</option>
                      <option value="TAGVERSE AI Voice Agents">TAGVERSE AI Voice Agents</option>
                      <option value="CRM Software (VYRA CRM)">CRM Software (VYRA CRM)</option>
                      <option value="ERP Software">ERP Software</option>
                      <option value="Billing & Invoicing Software">Billing & Invoicing Software</option>
                      <option value="Learning Management Systems (LMS)">Learning Management Systems (LMS)</option>
                      <option value="Custom SaaS Platforms (Virtual Office / Neuro Forge)">Custom SaaS Platforms</option>
                    </optgroup>
                    <optgroup label="Academy & Education">
                      <option value="TAGVERSE Academy - Enrolment Enquiry">TAGVERSE Academy - Enrolment Enquiry</option>
                      <option value="TAGVERSE Academy - Book Free Orientation">TAGVERSE Academy - Book Free Orientation</option>
                      <option value="Course: Generative AI & Agentic AI">Course: Generative AI & Agentic AI</option>
                      <option value="Course: Full Stack Development">Course: Full Stack Development</option>
                      <option value="Course: Digital Marketing & Growth">Course: Digital Marketing & Growth</option>
                      <option value="Course: Neurotechnology & BCI">Course: Neurotechnology & BCI</option>
                      <option value="Course: AI Automation & Business Systems">Course: AI Automation & Business Systems</option>
                      <option value="TAGVERSE Academy Cohort">TAGVERSE Academy Cohort</option>
                    </optgroup>
                    {form.service && ![
                      "Digital Marketing & Social Media Management",
                      "Performance Marketing & Paid Advertising",
                      "Branding & Creative Design",
                      "Website & Application Development",
                      "AI Agents & LLM Integration Services",
                      "Workflow Automation & API Integrations",
                      "WhatsApp Chatbots & Business Automation",
                      "SEO, AEO & GEO Optimization",
                      "Video, Podcast & Media Production",
                      "Influencer, Creator & Model Management",
                      "CRM Software (VYRA CRM)",
                      "ERP Software",
                      "Billing & Invoicing Software",
                      "Learning Management Systems (LMS)",
                      "Custom SaaS Platforms (Virtual Office / Neuro Forge)",
                      "TAGVERSE Academy Cohort",
                      "Other / Custom Strategy"
                    ].includes(form.service) && (
                      <option value={form.service}>{form.service}</option>
                    )}
                    <option value="Other / Custom Strategy">Other / Custom Strategy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-wider text-white/50">
                  Estimated Budget
                </label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-[#191919] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white/30"
                >
                  <option value="< ₹50,000">&lt; ₹50,000</option>
                  <option value="₹50k – ₹2L">₹50,000 – ₹2,00,000</option>
                  <option value="₹2L – ₹5L">₹2,00,000 – ₹5,00,000</option>
                  <option value="₹5L+">₹5,00,000+</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-wider text-white/50">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you're building..."
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/30"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong. Please try again or use WhatsApp below.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-full bg-white py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4 text-xs text-white/20">
              <div className="h-px flex-1 bg-white/10" />
              <span>OR</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366]/10 px-4 py-2.5 text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call us
              </a>
            </div>
            
            <p className="mt-5 text-center text-[0.65rem] text-white/30">
              {PHONE_NUMBER}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
