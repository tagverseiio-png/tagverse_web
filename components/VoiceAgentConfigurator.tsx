"use client";

import { useState } from "react";

interface AgentProfile {
  id: string;
  name: string;
  role: string;
  personality: string;
  voice: string;
  language: string;
  stability: number;
  speed: number;
  objective: string;
  workingHours: string;
  escalation: string;
  knowledgeFiles: string[];
  inboundAllowed: boolean;
  outboundAllowed: boolean;
}

const DEFAULT_AGENTS: AgentProfile[] = [
  {
    id: "agent-1",
    name: "Sophia",
    role: "Inbound Concierge & Lead Qualifier",
    personality: "Warm, Consultative, Empathetic",
    voice: "ElevenLabs Nova (Natural Indian English)",
    language: "English (India) + Hindi Auto-Switch",
    stability: 85,
    speed: 1.05,
    objective: "Qualify inbound prospect budget (>₹1L), capture business requirements, book technical demo.",
    workingHours: "24/7/365 (Uninterrupted)",
    escalation: "Live SIP Transfer to Sales Desk if deal size > ₹5L; else send instant WhatsApp recap.",
    knowledgeFiles: ["Tagverse_Services_Catalog_2026.pdf", "Pricing_Tiers_FAQ.docx", "Agency_Portfolio_Links.xlsx"],
    inboundAllowed: true,
    outboundAllowed: false,
  },
  {
    id: "agent-2",
    name: "Marcus",
    role: "Outbound SDR & Deal Follow-Up",
    personality: "Crisp, Professional, Direct",
    voice: "ElevenLabs Adam (Executive Tone)",
    language: "English (Global Business)",
    stability: 92,
    speed: 1.1,
    objective: "Engage warm leads who downloaded case studies, answer product questions, book calendar calls.",
    workingHours: "Mon-Sat: 09:30 AM – 07:00 PM IST",
    escalation: "Immediate notification in #sales-alerts Slack channel upon meeting confirmation.",
    knowledgeFiles: ["VYRA_CRM_Product_Specs.pdf", "NeuroForge_ROI_Framework.pdf"],
    inboundAllowed: false,
    outboundAllowed: true,
  },
  {
    id: "agent-3",
    name: "Elena",
    role: "Smart Callback & Missed Call Recovery",
    personality: "Helpful, Rapid-Response, Reassuring",
    voice: "OpenAI Alloy Neural (Adaptive)",
    language: "Multi-Lingual (English, Hindi, Tamil)",
    stability: 88,
    speed: 1.0,
    objective: "Dial back dropped calls within 15 seconds. Reconnect with lost callers and offer callback choices.",
    workingHours: "Mon-Sun: 08:00 AM – 10:00 PM IST",
    escalation: "If caller requests human, trigger round-robin ring to 3 on-call sales executives.",
    knowledgeFiles: ["Support_Directory.pdf", "Studio_Booking_Schedule.csv"],
    inboundAllowed: true,
    outboundAllowed: true,
  },
];

export default function VoiceAgentConfigurator() {
  const [selectedAgent, setSelectedAgent] = useState<AgentProfile>(DEFAULT_AGENTS[0]);
  const [activeStep, setActiveStep] = useState<"personality" | "knowledge" | "rules">("personality");

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/15 bg-black/95 text-white shadow-2xl backdrop-blur-2xl">
      {/* Top Banner */}
      <div className="border-b border-white/10 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono-g text-[10px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
              Interactive Management Console
            </span>
            <h3 className="mt-1 font-brand text-xl font-medium tracking-tight text-white">
              AI Voice Agent Configuration Studio
            </h3>
          </div>

          {/* Agent Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {DEFAULT_AGENTS.map((agent) => {
              const active = agent.id === selectedAgent.id;

              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => setSelectedAgent(agent)}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono-g text-xs transition-all ${
                    active
                      ? "border border-white/30 bg-white/20 text-white font-semibold shadow-sm"
                      : "border border-white/10 bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{agent.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex border-b border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setActiveStep("personality")}
            className={`border-b-2 px-4 py-2 font-medium transition-colors ${
              activeStep === "personality"
                ? "border-white text-white"
                : "border-transparent text-white/50 hover:text-white/80"
            }`}
          >
            1. Personality, Voice & Language
          </button>
          <button
            type="button"
            onClick={() => setActiveStep("knowledge")}
            className={`border-b-2 px-4 py-2 font-medium transition-colors ${
              activeStep === "knowledge"
                ? "border-white text-white"
                : "border-transparent text-white/50 hover:text-white/80"
            }`}
          >
            2. Business Knowledge & Objectives
          </button>
          <button
            type="button"
            onClick={() => setActiveStep("rules")}
            className={`border-b-2 px-4 py-2 font-medium transition-colors ${
              activeStep === "rules"
                ? "border-white text-white"
                : "border-transparent text-white/50 hover:text-white/80"
            }`}
          >
            3. Working Hours & Escalation Rules
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-6 sm:p-8">
        {activeStep === "personality" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
                  Agent Identity & Role
                </label>
                <div className="mt-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white">
                  {selectedAgent.name} • {selectedAgent.role}
                </div>
              </div>

              <div>
                <label className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
                  Selected Neural Voice Model
                </label>
                <div className="mt-1.5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white">
                  <span>{selectedAgent.voice}</span>
                  <span className="rounded bg-purple-500/20 px-2 py-0.5 font-mono-g text-[10px] text-purple-300">
                    &lt; 380ms Latency
                  </span>
                </div>
              </div>

              <div>
                <label className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
                  Primary Language & Dialect
                </label>
                <div className="mt-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white">
                  {selectedAgent.language}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
                  Agent Personality Profile
                </label>
                <div className="mt-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white">
                  {selectedAgent.personality}
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono-g text-[10px] uppercase tracking-wider text-white/50">
                  <span>Voice Stability & Emotion</span>
                  <span>{selectedAgent.stability}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-[var(--accent-purple-soft)]"
                    style={{ width: `${selectedAgent.stability}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono-g text-[10px] uppercase tracking-wider text-white/50">
                  <span>Speaking Rate & Cadence</span>
                  <span>{selectedAgent.speed}x</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-emerald-400"
                    style={{ width: `${(selectedAgent.speed / 1.5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <span className="font-mono-g text-[11px] text-white/60">
                  Calling Permissions:
                </span>
                <span
                  className={`rounded px-2 py-0.5 font-mono-g text-[10px] ${
                    selectedAgent.inboundAllowed
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  Inbound Calls: {selectedAgent.inboundAllowed ? "Enabled" : "Disabled"}
                </span>
                <span
                  className={`rounded px-2 py-0.5 font-mono-g text-[10px] ${
                    selectedAgent.outboundAllowed
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  Outbound Calls: {selectedAgent.outboundAllowed ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeStep === "knowledge" && (
          <div className="space-y-6">
            <div>
              <label className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
                Core Conversation Objective
              </label>
              <div className="mt-1.5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white">
                {selectedAgent.objective}
              </div>
            </div>

            <div>
              <label className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
                Uploaded Business Knowledge Documents (RAG Vector Grounding)
              </label>
              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                {selectedAgent.knowledgeFiles.map((file, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="truncate font-mono-g">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeStep === "rules" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
                Business Working Hours & Active Schedule
              </label>
              <div className="mt-1.5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white">
                {selectedAgent.workingHours}
              </div>
              <p className="mt-2 font-mono-g text-[10px] text-white/40">
                Calls outside active hours automatically enter smart voicemail or callback booking queue.
              </p>
            </div>

            <div>
              <label className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
                Human Handoff & Escalation Protocol
              </label>
              <div className="mt-1.5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white">
                {selectedAgent.escalation}
              </div>
              <p className="mt-2 font-mono-g text-[10px] text-white/40">
                SIP direct transfer preserves full real-time transcript on the receiving rep&apos;s screen.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
