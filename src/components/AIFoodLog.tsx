"use client";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
      </svg>
    ),
    title: "Component-Level Breakdown",
    description: "See exactly how the AI calculated your meal — chicken, noodles, sambal, fried shallots — each item listed with its own macros. No black-box totals.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    ),
    title: "AI Reasoning Panel",
    description: "The AI explains its logic: \"Detected soto ayam with vermicelli noodles. Added sambal based on visible condiment.\" Trust through transparency.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Conversational Refinement",
    description: "\"Actually, I had extra rice\" — just type it. The AI adjusts the estimate without starting over. Iterate until it's right.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    ),
    title: "Cooking Oil Prompt",
    description: "The #1 source of under-logging. Our AI asks \"Add cooking oil?\" when it detects fried foods — catching the calories most apps miss.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    title: "Self-Validation Layer",
    description: "Before showing results, the AI checks for obviously wrong macros — like 500g protein in a salad. Catches errors before they hit your log.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    title: "Asian & Indonesian Foods",
    description: "Soto ayam, goi cuon, nasi padang, pho, rendang — recognized with cultural accuracy. Kecap manis, sambal, bawang goreng understood natively.",
  },
];

export default function AIFoodLog() {
  return (
    <section id="ai-food-log" className="section section-organic relative">
      {/* Wave divider at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-background"
          />
        </svg>
      </div>

      {/* Tribal decorative elements */}
      <div className="absolute top-32 left-8 w-20 h-20 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary animate-spin-slow">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="15,10,5,10" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10,8" />
        </svg>
      </div>

      <div className="absolute bottom-32 right-8 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-secondary animate-spin-reverse">
          <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Flowing background blobs */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-blob-delay" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            <svg className="w-5 h-5 animate-tribal-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            AI Food Logging
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 mb-6">
            Not just a calorie guess.{" "}
            <span className="relative inline-block">
              <span className="gradient-text">A conversation.</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path
                  d="M0,6 C40,2 60,10 100,6 C140,2 160,10 200,6"
                  fill="none"
                  stroke="url(#ailogUnderline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="ailogUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="50%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-lg text-foreground-muted">
            Most food AIs give you a number and call it done. Ours shows its work,
            lets you correct it, and actually understands the food you eat.
          </p>
        </div>

        {/* Main content: Example + Features */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Example Card */}
          <div className="bg-background rounded-3xl p-6 lg:p-8 border border-primary/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-2xl">
                🍜
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Soto Ayam</h3>
                <p className="text-sm text-foreground-muted">Indonesian chicken soup</p>
              </div>
            </div>

            {/* Macro summary */}
            <div className="flex gap-4 mb-6 p-4 bg-background-secondary rounded-xl">
              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-primary">485</div>
                <div className="text-xs text-foreground-muted">calories</div>
              </div>
              <div className="flex-1 text-center border-l border-primary/10">
                <div className="text-2xl font-bold text-protein">32g</div>
                <div className="text-xs text-foreground-muted">protein</div>
              </div>
              <div className="flex-1 text-center border-l border-primary/10">
                <div className="text-2xl font-bold text-carbs">45g</div>
                <div className="text-xs text-foreground-muted">carbs</div>
              </div>
              <div className="flex-1 text-center border-l border-primary/10">
                <div className="text-2xl font-bold text-fat">18g</div>
                <div className="text-xs text-foreground-muted">fat</div>
              </div>
            </div>

            {/* Component breakdown */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
                Component Breakdown
              </h4>
              <div className="space-y-2">
                {[
                  { name: "Chicken (shredded)", cal: 180, p: 25 },
                  { name: "Rice vermicelli", cal: 150, p: 3 },
                  { name: "Broth + aromatics", cal: 45, p: 2 },
                  { name: "Bean sprouts", cal: 15, p: 1 },
                  { name: "Bawang goreng (fried shallots)", cal: 55, p: 0.5 },
                  { name: "Sambal", cal: 40, p: 0.5 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-primary/5 last:border-0">
                    <span className="text-sm text-foreground">{item.name}</span>
                    <div className="flex gap-4 text-sm">
                      <span className="text-foreground-muted">{item.cal} cal</span>
                      <span className="text-protein font-medium">{item.p}g P</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Reasoning */}
            <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl mb-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <span className="text-sm font-semibold text-primary">AI Reasoning</span>
              </div>
              <p className="text-sm text-foreground-muted">
                Detected soto ayam with vermicelli noodles (not rice). Estimated standard warung serving.
                Added bawang goreng based on visible garnish. Sambal appears to be ~1 tablespoon.
              </p>
            </div>

            {/* Refine example */}
            <div className="flex items-center gap-2 p-3 bg-background-secondary rounded-xl border border-primary/10">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm text-foreground-muted italic">&quot;Actually, I skipped the noodles&quot;</span>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-6">
            {features.slice(0, 4).map((feature, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-2xl bg-background border border-primary/10 card-hover"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-primary shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-foreground-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom features row */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.slice(4).map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-2xl bg-background border border-primary/10 card-hover"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-primary shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-foreground-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contrast statement */}
        <div className="mt-16 text-center">
          <p className="text-foreground-muted max-w-2xl mx-auto">
            <span className="text-foreground font-medium">Other apps:</span> Scan barcode → get a number → hope it&apos;s right.
            <br />
            <span className="text-primary font-medium">Kamaehu:</span> Describe or photo your meal → see the breakdown → refine until it&apos;s accurate.
          </p>
        </div>
      </div>

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
