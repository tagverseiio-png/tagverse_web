export default function VoiceArchitectureDiagram() {
  const steps = [
    {
      num: "01",
      title: "Customer Call",
      desc: "Incoming telephony call or outbound campaign trigger via Exotel / Plivo / Twilio.",
      tag: "Telephony SIP Trunk",
    },
    {
      num: "02",
      title: "AI Voice Agent",
      desc: "Instant pickup in < 2 seconds. Assigns persona, language dialect, and active session state.",
      tag: "Agent Dispatcher",
    },
    {
      num: "03",
      title: "Speech Processing",
      desc: "Neural Speech-to-Text with voice activity detection (VAD) and human interruption handling.",
      tag: "< 120ms FastRTC",
    },
    {
      num: "04",
      title: "AI Conversation Engine",
      desc: "Multi-turn LLM reasoning (OpenAI Realtime / Claude) with emotional cadence and natural tone.",
      tag: "Realtime Duplex",
    },
    {
      num: "05",
      title: "Business Knowledge",
      desc: "Real-time RAG query into company guidelines, pricing, availability, and FAQs with zero hallucination.",
      tag: "Vector Grounding",
    },
    {
      num: "06",
      title: "Action Execution",
      desc: "Calls external tools to book Google Calendar, send Razorpay links, or trigger SIP human transfers.",
      tag: "Tool Calling",
    },
    {
      num: "07",
      title: "VYRA CRM Sync",
      desc: "Auto-creates contact, logs duration, attaches call audio recording, transcript, and deal score.",
      tag: "Bi-directional Sync",
    },
    {
      num: "08",
      title: "Analytics & Follow-up",
      desc: "Instant WhatsApp recap dispatched to customer; executive metrics logged in company dashboard.",
      tag: "Omnichannel Loop",
    },
  ];

  return (
    <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-black p-6 sm:p-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-black/60 p-5 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono-g text-xs font-semibold text-[var(--accent-purple-soft)]">
                  {step.num}
                </span>
                <span className="rounded bg-white/10 px-2 py-0.5 font-mono-g text-[9px] text-white/70">
                  {step.tag}
                </span>
              </div>

              <h4 className="mt-3 font-brand text-base font-medium tracking-tight text-white">
                {step.title}
              </h4>
              <p className="mt-2 text-xs leading-5 text-white/60">
                {step.desc}
              </p>
            </div>

            {idx < steps.length - 1 && (
              <div className="mt-4 flex items-center justify-end text-white/30 hidden lg:flex">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono-g text-[11px] text-white/60">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Full Pipeline End-to-End Latency: &lt; 380ms (Speech-to-Speech)</span>
        </div>
        <div className="text-white/40">
          Carrier-Grade SIP Telecom & BullMQ Distributed Task Queues
        </div>
      </div>
    </div>
  );
}
