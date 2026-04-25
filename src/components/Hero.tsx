"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Tribal Wave Background */}
      <div className="absolute inset-0 z-0">
        {/* Warm gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF7ED] via-white to-[#FFF7ED] dark:from-[#0B1622] dark:via-[#0F1D2E] dark:to-[#0B1622]" />

        {/* Flowing wave shapes */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[400px] opacity-20"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 C320,200 420,0 740,100 C1060,200 1200,50 1440,100 L1440,400 L0,400 Z"
            fill="url(#waveGradient1)"
            className="animate-wave-slow"
          />
          <path
            d="M0,150 C280,250 520,50 800,150 C1080,250 1280,100 1440,150 L1440,400 L0,400 Z"
            fill="url(#waveGradient1)"
            opacity="0.5"
            className="animate-wave-medium"
          />
          <path
            d="M0,200 C360,300 600,100 900,200 C1200,300 1340,150 1440,200 L1440,400 L0,400 Z"
            fill="url(#waveGradient1)"
            opacity="0.3"
            className="animate-wave-fast"
          />
        </svg>

        {/* Tribal pattern overlay */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary animate-spin-slow">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10,5" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8,4" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6,3" />
          </svg>
        </div>

        <div className="absolute top-40 right-20 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-secondary animate-spin-reverse">
            <polygon points="50,5 95,75 5,75" fill="none" stroke="currentColor" strokeWidth="2" />
            <polygon points="50,20 80,65 20,65" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="50,35 65,55 35,55" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Organic flowing blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl animate-blob-delay" />

        {/* Palm tree silhouettes */}
        <svg className="absolute left-0 bottom-0 w-32 h-64 text-green-800/10 animate-sway origin-bottom" viewBox="0 0 100 200">
          <path d="M50,200 Q45,140 50,80" stroke="currentColor" strokeWidth="6" fill="none" />
          <g transform="translate(50,75)">
            <ellipse cx="-25" cy="-8" rx="35" ry="8" fill="currentColor" transform="rotate(-35)" />
            <ellipse cx="25" cy="-8" rx="35" ry="8" fill="currentColor" transform="rotate(35)" />
            <ellipse cx="0" cy="-15" rx="30" ry="7" fill="currentColor" transform="rotate(-5)" />
            <ellipse cx="-15" cy="-10" rx="32" ry="7" fill="currentColor" transform="rotate(-55)" />
            <ellipse cx="15" cy="-10" rx="32" ry="7" fill="currentColor" transform="rotate(55)" />
            <ellipse cx="0" cy="-5" rx="28" ry="6" fill="currentColor" transform="rotate(15)" />
          </g>
        </svg>

        <svg className="absolute right-0 bottom-0 w-28 h-56 text-green-800/10 animate-sway origin-bottom" style={{ animationDelay: "0.5s" }} viewBox="0 0 100 200">
          <path d="M50,200 Q55,150 50,90" stroke="currentColor" strokeWidth="5" fill="none" />
          <g transform="translate(50,85)">
            <ellipse cx="-20" cy="-6" rx="30" ry="7" fill="currentColor" transform="rotate(-30)" />
            <ellipse cx="20" cy="-6" rx="30" ry="7" fill="currentColor" transform="rotate(30)" />
            <ellipse cx="0" cy="-12" rx="25" ry="6" fill="currentColor" transform="rotate(-10)" />
            <ellipse cx="-12" cy="-8" rx="28" ry="6" fill="currentColor" transform="rotate(-50)" />
            <ellipse cx="12" cy="-8" rx="28" ry="6" fill="currentColor" transform="rotate(50)" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="stagger-children text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              AI-Powered Nutrition Tracking
            </div>

            {/* Headline with flowing text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Finally, an AI that{" "}
              <span className="relative">
                <span className="gradient-text">understands your food</span>
                {/* Tribal underline */}
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path
                    d="M0,6 Q50,0 100,6 T200,6"
                    fill="none"
                    stroke="url(#underlineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-foreground-muted max-w-xl mx-auto lg:mx-0 mb-4">
              Log soto ayam, nasi padang, or pho — and get accurate macros with{" "}
              <strong className="text-foreground">component-level breakdowns</strong>.
              Not guesses. Real understanding.
            </p>

            <p className="text-base text-foreground-muted max-w-xl mx-auto lg:mx-0 mb-8">
              Plus adaptive metabolism tracking, research-backed protein targets,
              and workout logging — all in one app built by a lifter, for lifters.
            </p>

            {/* CTA Buttons with organic shape */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="#download" className="btn-primary text-lg px-8 py-4 rounded-2xl">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Try Free on iOS
              </Link>
              <Link href="#ai-food-log" className="btn-secondary text-lg px-8 py-4 rounded-2xl">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                See How It Works
              </Link>
            </div>

            {/* Key differentiators summary */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start mt-10 pt-10 border-t border-primary/10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-secondary border border-primary/10">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L4 9v12h16V9l-8-6zm0 2.5l6 4.5v9H6v-9l6-4.5zM9 14h6v2H9v-2z"/>
                </svg>
                <span className="text-sm font-medium">Asian Cuisine AI</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-secondary border border-primary/10">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                <span className="text-sm font-medium">Shows Its Reasoning</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-secondary border border-primary/10">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
                <span className="text-sm font-medium">Learns Your Metabolism</span>
              </div>
            </div>
          </div>

          {/* Phone Mockup - AI Food Logging Screen */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Background glow with organic shape */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 rounded-full blur-3xl animate-pulse-glow" />
            </div>

            {/* Phone frame */}
            <div className="relative animate-float">
              <div className="relative w-[300px] sm:w-[340px] h-[620px] sm:h-[700px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-[#0B1622] rounded-[2.5rem] overflow-hidden relative">
                  {/* Status bar */}
                  <div className="h-7 flex items-center justify-between px-6 bg-[#0F1D2E]">
                    <span className="text-[10px] text-white/80">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-1.5 bg-white/50 rounded-sm" />
                      <div className="w-3 h-1.5 bg-white/50 rounded-sm" />
                      <div className="w-5 h-1.5 bg-green-500 rounded-sm" />
                    </div>
                  </div>

                  {/* AI Food Log Header */}
                  <div className="px-4 py-3 flex items-center justify-between bg-[#0F1D2E] border-b border-white/5">
                    <button className="text-white/60 text-xs">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm">AI Food Log</p>
                      <p className="text-primary text-xs">Lunch</p>
                    </div>
                    <button className="text-primary text-xs font-medium">Save</button>
                  </div>

                  {/* Meal Image Placeholder */}
                  <div className="mx-3 mt-3 h-28 bg-gradient-to-br from-[#132A3E] to-[#1A3A4F] rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="text-4xl">🍜</div>
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded-lg">
                      <span className="text-[10px] text-white/80">Soto Ayam</span>
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <span className="text-[10px] text-green-400">AI Detected</span>
                    </div>
                  </div>

                  {/* Total Macros */}
                  <div className="mx-3 mt-3 p-3 bg-[#132A3E] rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold text-sm">Total Estimate</span>
                      <span className="text-primary font-bold">485 cal</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 text-center">
                        <div className="text-xs text-blue-400 font-medium">32g</div>
                        <div className="text-[10px] text-white/50">Protein</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-xs text-green-400 font-medium">45g</div>
                        <div className="text-[10px] text-white/50">Carbs</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-xs text-yellow-400 font-medium">18g</div>
                        <div className="text-[10px] text-white/50">Fat</div>
                      </div>
                    </div>
                  </div>

                  {/* Component Breakdown */}
                  <div className="mx-3 mt-3 p-3 bg-[#132A3E] rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                      </svg>
                      <span className="text-white/80 text-xs font-medium">Component Breakdown</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { name: "Chicken (shredded)", cal: "180", protein: "25g" },
                        { name: "Rice noodles", cal: "150", protein: "3g" },
                        { name: "Broth + aromatics", cal: "45", protein: "2g" },
                        { name: "Bean sprouts", cal: "15", protein: "1g" },
                        { name: "Fried shallots", cal: "55", protein: "0.5g" },
                        { name: "Sambal (1 tbsp)", cal: "40", protein: "0.5g" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-[10px] py-1 border-b border-white/5 last:border-0">
                          <span className="text-white/70">{item.name}</span>
                          <div className="flex gap-3">
                            <span className="text-white/50">{item.cal} cal</span>
                            <span className="text-blue-400/70">{item.protein} P</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Reasoning Panel */}
                  <div className="mx-3 mt-3 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                      </svg>
                      <span className="text-primary text-[10px] font-semibold">AI Reasoning</span>
                    </div>
                    <p className="text-[9px] text-white/60 leading-relaxed">
                      Detected soto ayam with vermicelli noodles. Estimated standard serving with moderate fried shallots. Added sambal based on visible condiment.
                    </p>
                  </div>

                  {/* Refine Input */}
                  <div className="absolute bottom-4 left-3 right-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#1A3A4F] rounded-xl border border-white/10">
                      <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-[11px] text-white/40">Refine the estimate...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating "Add Cooking Oil?" prompt */}
              <div className="absolute -right-4 top-48 bg-[#0F1D2E] rounded-2xl p-3 shadow-xl border border-yellow-500/30 animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm">🫒</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-yellow-400">Add Cooking Oil?</p>
                    <p className="text-[9px] text-white/60">+120 cal typical</p>
                  </div>
                </div>
              </div>

              {/* Floating accuracy indicator */}
              <div className="absolute -left-6 bottom-48 bg-[#0F1D2E] rounded-2xl p-3 shadow-xl border border-green-500/30 animate-slide-up" style={{ animationDelay: "0.8s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-green-400">Validated</p>
                    <p className="text-[9px] text-white/60">Macros look right</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
