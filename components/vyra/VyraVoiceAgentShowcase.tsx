"use client";

import Link from "next/link";
import { useContactModal } from "@/components/ContactModal";

export default function VyraVoiceAgentShowcase() {
  const { open } = useContactModal();

  return (
    <section className="relative py-24 border-t border-white/10 bg-gradient-to-b from-black via-[#0a0614] to-black">
      <div className="container-x">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-purple-soft)]/30 bg-[var(--accent-purple-soft)]/10 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple-soft)] animate-pulse" />
            <span>Integrated Voice Intelligence</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white">
            VYRA AI VOICE AGENT
          </h2>
          <p className="mt-2 text-base font-medium text-white/90">
            Autonomous Inbound, Outbound & Callback Telephony Native to Your CRM
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Never miss a revenue conversation. Positioned directly within the VYRA ecosystem, AI Voice Agents handle incoming caller inquiries, conduct proactive prospect outreach, and recover dropped calls—automatically logging full recordings, turn-by-turn transcripts, and AI-qualified deals directly into your pipeline.
          </p>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* 1. Inbound Voice Agent */}
          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className="mt-4 font-brand text-base font-medium text-white">
              Inbound AI Voice Agent
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/65">
              24/7 call answering with natural human inflection. Resolves common FAQs, screens inbound callers, captures requirement briefs, and books calendar meetings without human receptionist overhead.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono-g text-[11px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Zero Wait Times &bull; Warm SIP Transfer</span>
            </div>
          </div>

          {/* 2. Outbound Voice Agent */}
          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </div>
            <h3 className="mt-4 font-brand text-base font-medium text-white">
              Outbound AI Voice Agent
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/65">
              Automate high-volume outbound prospecting and follow-up campaigns. Engages qualified leads from ad campaigns, verifies project timelines, answers product inquiries, and schedules discovery calls for senior sales reps.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono-g text-[11px] text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span>Automated Prospect Outreach &bull; Dynamic Dialing</span>
            </div>
          </div>

          {/* 3. AI Recall & Callback Agent */}
          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
            </div>
            <h3 className="mt-4 font-brand text-base font-medium text-white">
              AI Recall & Callback Agent
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/65">
              Triggers instant automated return calls within 15 seconds of a missed phone call or website inquiry. Handles configurable retry attempts and re-engages inactive quotes before leads explore competitors.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono-g text-[11px] text-purple-400">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span>&lt; 15s Callback Response &bull; Smart Retries</span>
            </div>
          </div>

          {/* 4. AI Call Intelligence */}
          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4" />
                <path d="m4.93 4.93 2.83 2.83" />
                <path d="M2 12h4" />
                <path d="m4.93 19.07 2.83-2.83" />
                <path d="M12 18v4" />
                <path d="m16.24 16.24 2.83 2.83" />
                <path d="M18 12h4" />
                <path d="m16.24 7.76 2.83-2.83" />
              </svg>
            </div>
            <h3 className="mt-4 font-brand text-base font-medium text-white">
              AI Call Intelligence
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/65">
              In-depth acoustic and linguistic analytics. Automatically detects caller sentiment (positive, neutral, frustrated), identifies buying signals, tracks competitor mentions, and flags high-risk churn signals.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono-g text-[11px] text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>Sentiment Scoring &bull; Objection Detection</span>
            </div>
          </div>

          {/* 5. Call Recordings & Transcripts */}
          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </div>
            <h3 className="mt-4 font-brand text-base font-medium text-white">
              Call Recordings & Transcripts
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/65">
              Every conversation is recorded and transcribed in real-time with speaker diarization. Search across past calls by keyword, listen to high-fidelity audio playback, and export transcripts for compliance audits.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono-g text-[11px] text-cyan-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>Diarized Transcripts &bull; Cloud Audio Vault</span>
            </div>
          </div>

          {/* 6. AI Summaries & Lead Qualification */}
          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3 className="mt-4 font-brand text-base font-medium text-white">
              AI Summaries & Lead Qualification
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/65">
              Within seconds of call completion, VYRA auto-generates a structured executive summary, extracts client requirements, updates the deal stage, and assigns follow-up action tasks to the relevant account owner.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono-g text-[11px] text-rose-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              <span>Instant CRM Sync &bull; Automated Pipeline Advance</span>
            </div>
          </div>
        </div>

        {/* Architecture & Telephony Transparency Callout */}
        <div className="mt-10 rounded-[22px] border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 font-mono-g text-xs text-white/60">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Telephony Integration & Deployment Protocol</span>
              </div>
              <h4 className="mt-2 font-brand text-lg text-white">
                Carrier-Grade Telephony with Enterprise Sandbox Testing
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                VYRA AI Voice Agents interface directly with verified telecom providers (Exotel, Plivo, Twilio) and neural speech engines (OpenAI Realtime, ElevenLabs). All voice agents undergo rigorous prompt calibration and sandbox simulation before live call forwarding is enabled on your business DID numbers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/products/ai-voice-agents"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono-g text-xs font-medium text-white transition-all hover:bg-white/10"
              >
                <span>Full Voice Platform Specs</span>
                <span>&rarr;</span>
              </Link>
              <button
                type="button"
                onClick={() => open("VYRA CRM - Product Demo")}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90"
              >
                Request Voice Pilot
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
