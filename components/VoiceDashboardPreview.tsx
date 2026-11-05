"use client";

import { useState } from "react";

interface CallLog {
  id: string;
  caller: string;
  number: string;
  type: "Inbound" | "Outbound" | "Callback";
  duration: string;
  time: string;
  outcome: string;
  sentiment: "Positive" | "Neutral" | "Interested";
  transcript: {
    speaker: "Caller" | "AI Voice Agent";
    text: string;
    time: string;
  }[];
  summary: string;
  crmSynced: boolean;
}

const SAMPLE_CALL_LOGS: CallLog[] = [
  {
    id: "CALL-9821",
    caller: "Vikram Mehta (Chief Architect)",
    number: "+91 98401 •••••",
    type: "Inbound",
    duration: "2m 45s",
    time: "2 mins ago",
    outcome: "Demo Booked",
    sentiment: "Interested",
    summary:
      "Customer enquired about enterprise CRM & AI workflow automation for 50-person agency. Confirmed budget > ₹1.5L. Booked technical demo for Thursday 3:00 PM IST.",
    crmSynced: true,
    transcript: [
      {
        speaker: "AI Voice Agent",
        time: "0:02",
        text: "Thank you for calling TAGVERSE. My name is Sophia. How can I help power your business today?",
      },
      {
        speaker: "Caller",
        time: "0:08",
        text: "Hi Sophia, we run a design and engineering firm in Chennai and we need an automated voice system and CRM for our inbound leads.",
      },
      {
        speaker: "AI Voice Agent",
        time: "0:16",
        text: "Understood! Our platform unifies 24/7 inbound voice handling with VYRA CRM and instant WhatsApp follow-ups. Would you like me to schedule a live sandbox demonstration with our solutions director this week?",
      },
      {
        speaker: "Caller",
        time: "0:28",
        text: "Yes, Thursday afternoon works great for me.",
      },
      {
        speaker: "AI Voice Agent",
        time: "0:33",
        text: "Perfect. I've locked in Thursday at 3:00 PM IST. A calendar invite and WhatsApp confirmation has been dispatched to your mobile. Is there anything else I can clarify for you?",
      },
      {
        speaker: "Caller",
        time: "0:44",
        text: "That was super fast. That's all, thank you!",
      },
    ],
  },
  {
    id: "CALL-9820",
    caller: "Ananya Roy (Marketing Director)",
    number: "+91 91760 •••••",
    type: "Callback",
    duration: "3m 12s",
    time: "18 mins ago",
    outcome: "Lead Qualified",
    sentiment: "Positive",
    summary:
      "Automated recall triggered 12 seconds after website enquiry form was submitted. Discussed podcast studio rental and social video editing retainer. Sent brochure via WhatsApp.",
    crmSynced: true,
    transcript: [
      {
        speaker: "AI Voice Agent",
        time: "0:01",
        text: "Hello Ananya, this is Marcus calling from TAGVERSE. You just requested information about our 4K video and podcast studio in Chennai. Do you have two minutes?",
      },
      {
        speaker: "Caller",
        time: "0:09",
        text: "Oh wow, you called back in 10 seconds! Yes, I was looking for multi-cam recording rates.",
      },
      {
        speaker: "AI Voice Agent",
        time: "0:17",
        text: "Our physical studio includes 3 Blackmagic 4K cameras, broadcast audio, cinema lighting, and full post-production line cuts. I've sent the complete rate card directly to your WhatsApp. Would you like a studio walkthrough?",
      },
    ],
  },
  {
    id: "CALL-9819",
    caller: "Karan Singhania (VP Sales)",
    number: "+91 99620 •••••",
    type: "Outbound",
    duration: "1m 58s",
    time: "42 mins ago",
    outcome: "Proposal Follow-up",
    sentiment: "Interested",
    summary:
      "Automated follow-up on sent proposal. Lead confirmed executive board review on Friday. Scheduled callback alert for sales director.",
    crmSynced: true,
    transcript: [
      {
        speaker: "AI Voice Agent",
        time: "0:02",
        text: "Good afternoon Karan. Calling from TAGVERSE to follow up on the custom SaaS architecture proposal we shared yesterday. Did your technical team have any questions on the SLA?",
      },
      {
        speaker: "Caller",
        time: "0:14",
        text: "We reviewed it this morning, it looks solid. We're presenting it to the board on Friday.",
      },
      {
        speaker: "AI Voice Agent",
        time: "0:21",
        text: "Fantastic! I'll note that in your file and have our director reach out Friday afternoon. Have a productive week!",
      },
    ],
  },
];

export default function VoiceDashboardPreview() {
  const [activeTab, setActiveTab] = useState<"All" | "Inbound" | "Outbound" | "Callback">("All");
  const [selectedCall, setSelectedCall] = useState<CallLog>(SAMPLE_CALL_LOGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredCalls =
    activeTab === "All"
      ? SAMPLE_CALL_LOGS
      : SAMPLE_CALL_LOGS.filter((c) => c.type === activeTab);

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/15 bg-black/95 text-white shadow-2xl backdrop-blur-2xl">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          </div>
          <div>
            <div className="font-brand text-sm font-semibold tracking-tight text-white">
              TAGVERSE AI Voice Workforce Dashboard
            </div>
            <div className="font-mono-g text-[10px] text-white/50">
              Live Telephony Trunk • Exotel / Twilio Gateway Active
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono-g text-[10px] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Voice Core: Online
          </span>
          <span className="font-mono-g text-[11px] text-white/40 hidden sm:inline">
            Latency: 380ms
          </span>
        </div>
      </div>

      {/* 11 Metric Counters Showcase */}
      <div className="grid grid-cols-2 gap-px border-b border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
        <div className="bg-black/90 p-4">
          <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
            Total Calls
          </span>
          <div className="mt-1 font-brand text-xl font-semibold text-white">14,820</div>
          <span className="text-[10px] text-emerald-400">+24% this month</span>
        </div>

        <div className="bg-black/90 p-4">
          <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
            Inbound Calls
          </span>
          <div className="mt-1 font-brand text-xl font-semibold text-white">8,410</div>
          <span className="text-[10px] text-white/40">56.7% share</span>
        </div>

        <div className="bg-black/90 p-4">
          <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
            Outbound Calls
          </span>
          <div className="mt-1 font-brand text-xl font-semibold text-white">5,120</div>
          <span className="text-[10px] text-white/40">34.5% share</span>
        </div>

        <div className="bg-black/90 p-4">
          <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
            Callback Requests
          </span>
          <div className="mt-1 font-brand text-xl font-semibold text-white">1,290</div>
          <span className="text-[10px] text-purple-300">Avg &lt; 15s dial</span>
        </div>

        <div className="bg-black/90 p-4">
          <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
            Answered Rate
          </span>
          <div className="mt-1 font-brand text-xl font-semibold text-emerald-400">94.2%</div>
          <span className="text-[10px] text-white/40">Missed &lt; 0.5%</span>
        </div>

        <div className="bg-black/90 p-4">
          <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
            Successful Convs
          </span>
          <div className="mt-1 font-brand text-xl font-semibold text-white">88.7%</div>
          <span className="text-[10px] text-white/40">99.4% intent accuracy</span>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-2 gap-px border-b border-white/10 bg-white/10 sm:grid-cols-4">
        <div className="bg-black/80 px-6 py-3">
          <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
            Leads Generated
          </span>
          <div className="font-brand text-lg font-semibold text-white">3,410 Verified</div>
        </div>
        <div className="bg-black/80 px-6 py-3">
          <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
            Appointments Booked
          </span>
          <div className="font-brand text-lg font-semibold text-[var(--accent-purple-soft)]">
            982 Meetings
          </div>
        </div>
        <div className="bg-black/80 px-6 py-3">
          <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
            Avg Call Duration
          </span>
          <div className="font-brand text-lg font-semibold text-white">2m 45s</div>
        </div>
        <div className="bg-black/80 px-6 py-3">
          <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
            AI Agent Performance
          </span>
          <div className="font-brand text-lg font-semibold text-emerald-400">99.4% CSAT</div>
        </div>
      </div>

      {/* Main Interactive Call History & Transcript Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Call History List */}
        <div className="border-r border-white/10 p-6 lg:col-span-5">
          <div className="flex items-center justify-between">
            <h4 className="font-brand text-sm font-medium text-white">Recent Call Sessions</h4>
            <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
              {(["All", "Inbound", "Outbound", "Callback"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded px-2 py-0.5 font-mono-g text-[10px] transition-colors ${
                    activeTab === tab ? "bg-white text-black font-semibold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {filteredCalls.map((call) => {
              const isSelected = selectedCall.id === call.id;

              return (
                <button
                  key={call.id}
                  type="button"
                  onClick={() => {
                    setSelectedCall(call);
                    setIsPlaying(false);
                  }}
                  className={`w-full rounded-2xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? "border-white/30 bg-white/[0.08] shadow-md"
                      : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-brand text-xs font-medium text-white">
                      {call.caller}
                    </span>
                    <span className="font-mono-g text-[10px] text-white/40">
                      {call.time}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[11px] text-white/60">
                    <span className="font-mono-g">{call.number}</span>
                    <span className="font-mono-g">{call.duration}</span>
                  </div>

                  <div className="mt-2.5 flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono-g text-[9px] ${
                        call.type === "Inbound"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : call.type === "Callback"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {call.type}
                    </span>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono-g text-[9px] text-white/80">
                      {call.outcome}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Audio Playback, Transcript & Lead Summary */}
        <div className="p-6 lg:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono-g text-[10px] text-[var(--accent-purple-soft)]">
                  Session ID: {selectedCall.id}
                </span>
                <h3 className="font-brand text-base font-semibold text-white">
                  {selectedCall.caller}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono-g text-[10px] text-emerald-400 border border-emerald-500/30">
                  ✓ VYRA CRM Synced
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono-g text-[10px] text-white/80">
                  Sentiment: {selectedCall.sentiment}
                </span>
              </div>
            </div>

            {/* Audio Waveform Simulator */}
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-white/10 bg-black/60 p-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105"
              >
                {isPlaying ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center justify-between font-mono-g text-[10px] text-white/50">
                  <span>{isPlaying ? "0:18" : "0:00"}</span>
                  <span className="text-white/40">Recording • {selectedCall.duration}</span>
                </div>
                {/* Visual Audio Bars */}
                <div className="mt-1.5 flex h-4 items-center gap-1">
                  {[20, 60, 45, 90, 75, 30, 85, 100, 65, 40, 70, 95, 50, 80, 60, 40, 75, 90, 30, 85, 45, 60].map(
                    (height, i) => (
                      <span
                        key={i}
                        className={`w-1 rounded-full transition-all duration-300 ${
                          isPlaying && i < 8 ? "bg-[var(--accent-purple-soft)]" : "bg-white/20"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* AI Call Summary */}
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3.5">
              <div className="flex items-center gap-2">
                <span className="font-mono-g text-[10px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
                  AI Automated Summary
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-white/80">
                {selectedCall.summary}
              </p>
            </div>

            {/* Live Conversation Transcript */}
            <div className="mt-4">
              <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/50">
                Live Speech Transcript
              </span>
              <div className="mt-2.5 max-h-56 space-y-3 overflow-y-auto pr-2">
                {selectedCall.transcript.map((turn, tIdx) => (
                  <div
                    key={tIdx}
                    className={`rounded-xl p-3 text-xs leading-5 ${
                      turn.speaker === "AI Voice Agent"
                        ? "border border-purple-500/20 bg-purple-500/10 text-white"
                        : "border border-white/10 bg-white/5 text-white/90"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-white/50">
                      <span className="font-semibold text-white/80">
                        {turn.speaker}
                      </span>
                      <span className="font-mono-g">{turn.time}</span>
                    </div>
                    <p className="mt-1 text-white/90">{turn.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
