"use client";

const comparisons = [
  {
    feature: "Asian & Indonesian food recognition",
    kamaehu: true,
    others: false,
    detail: "Soto ayam, nasi padang, pho, goi cuon",
  },
  {
    feature: "Component-level meal breakdown",
    kamaehu: true,
    others: false,
    detail: "See each ingredient separately",
  },
  {
    feature: "AI explains its reasoning",
    kamaehu: true,
    others: false,
    detail: "Transparency you can trust",
  },
  {
    feature: "Conversational refinement",
    kamaehu: true,
    others: false,
    detail: "\"Actually, I had less rice\"",
  },
  {
    feature: "Catches cooking oil",
    kamaehu: true,
    others: false,
    detail: "The #1 source of under-logging",
  },
  {
    feature: "Adaptive TDEE (learns your metabolism)",
    kamaehu: true,
    others: "partial",
    detail: "Not just a formula",
  },
  {
    feature: "Research-cited protein targets",
    kamaehu: true,
    others: false,
    detail: "Morton, Helms, Schoenfeld",
  },
  {
    feature: "No anxiety-driving streaks",
    kamaehu: true,
    others: false,
    detail: "Calm, honest feedback",
  },
  {
    feature: "Workout + nutrition integrated",
    kamaehu: true,
    others: "partial",
    detail: "One app, full picture",
  },
  {
    feature: "Built by a lifter who uses it daily",
    kamaehu: true,
    others: false,
    detail: "Dogfooded, not outsourced",
  },
];

export default function ComparisonTable() {
  return (
    <section id="comparison" className="section relative overflow-hidden">
      {/* Wave top divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-background-secondary"
          />
        </svg>
      </div>

      {/* Tribal decorative elements */}
      <div className="absolute top-40 right-10 w-28 h-28 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary animate-spin-slow">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8,4" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,3" />
        </svg>
      </div>

      {/* Organic blobs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-blob-delay" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
            </svg>
            How We Compare
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 mb-6">
            What makes Kamaehu{" "}
            <span className="relative inline-block">
              <span className="gradient-text">different</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path
                  d="M0,6 Q50,12 100,6 T200,6"
                  fill="none"
                  stroke="url(#compareUnderline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="compareUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-lg text-foreground-muted">
            We built the app we couldn&apos;t find. Here&apos;s what that means.
          </p>
        </div>

        {/* Comparison table */}
        <div className="bg-background rounded-3xl border border-primary/10 overflow-hidden shadow-xl">
          {/* Header */}
          <div className="grid grid-cols-[1fr,100px,100px] sm:grid-cols-[1fr,120px,120px] bg-background-secondary border-b border-primary/10">
            <div className="p-4 lg:p-6 font-semibold text-foreground">Feature</div>
            <div className="p-4 lg:p-6 text-center">
              <div className="font-bold text-primary">Kamaehu</div>
            </div>
            <div className="p-4 lg:p-6 text-center">
              <div className="font-medium text-foreground-muted text-sm">Generic Apps</div>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-[1fr,100px,100px] sm:grid-cols-[1fr,120px,120px] ${
                index % 2 === 0 ? "bg-background" : "bg-background-secondary/50"
              } ${index !== comparisons.length - 1 ? "border-b border-primary/5" : ""}`}
            >
              <div className="p-4 lg:p-5">
                <div className="font-medium text-foreground text-sm sm:text-base">{row.feature}</div>
                <div className="text-xs text-foreground-muted mt-0.5 hidden sm:block">{row.detail}</div>
              </div>
              <div className="p-4 lg:p-5 flex items-center justify-center">
                {row.kamaehu === true && (
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4 lg:p-5 flex items-center justify-center">
                {row.others === false && (
                  <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </div>
                )}
                {row.others === "partial" && (
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-500 text-sm font-medium">~</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-foreground-muted">
            Comparison based on publicly available features of popular fitness and nutrition apps.
            <br className="hidden sm:block" />
            We don&apos;t name names — we just built what they don&apos;t do.
          </p>
        </div>
      </div>

      {/* Wave bottom divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-background-secondary"
          />
        </svg>
      </div>
    </section>
  );
}
