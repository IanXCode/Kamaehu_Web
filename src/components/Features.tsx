"use client";

const features = [
  {
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
      </svg>
    ),
    title: "Adaptive Metabolism Engine",
    description:
      "Not a static formula. Our two-layer system initializes with proven calculations (Mifflin-St Jeor, Katch-McArdle), then adapts to your real-world results over time.",
    citation: "Based on validated metabolic research",
    color: "from-primary to-secondary",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    title: "Research-Backed Protein Targets",
    description:
      "Phase-aware protein recommendations citing Morton et al. 2018, Helms et al. 2014, and Schoenfeld & Aragon 2018. Different targets for cutting, bulking, and maintenance.",
    citation: "Citing peer-reviewed literature",
    color: "from-secondary to-accent",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Honest, Calm Coaching",
    description:
      "No anxiety-driving streaks. No shame when you miss a day. No manipulative warnings. Just clear guidance and honest feedback about your progress.",
    color: "from-accent to-primary",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
      </svg>
    ),
    title: "Smart Workout Tracking",
    description:
      "Log sets, reps, and weight with automatic PR detection. Rest timers, warmup sets, dropsets, and unilateral tracking. Workout volume informs your calorie needs.",
    color: "from-primary to-accent",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    title: "Automatic PR Detection",
    description:
      "Hit a new personal record? We catch it and celebrate it. Track your strength journey and see your growth over time with clear visual progress.",
    color: "from-secondary to-primary",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm3-6c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
      </svg>
    ),
    title: "Plateau Detection",
    description:
      "Multi-window weight trend analysis spots real plateaus, not single-day fluctuations. Get recommendations only when they're actually warranted.",
    color: "from-accent to-secondary",
  },
];

export default function Features() {
  return (
    <section id="features" className="section relative overflow-hidden bg-background-secondary">
      {/* Tribal background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="tribalPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="#F97316" />
            <path d="M0,10 Q5,5 10,10 T20,10" fill="none" stroke="#F97316" strokeWidth="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#tribalPattern)" />
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
            Science-Backed Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 mb-6">
            Built on research,{" "}
            <span className="relative inline-block">
              <span className="gradient-text">not vibes</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path
                  d="M0,6 C40,2 60,10 100,6 C140,2 160,10 200,6"
                  fill="none"
                  stroke="url(#featureUnderline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="featureUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="50%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-lg text-foreground-muted">
            Every algorithm cites its sources. Every recommendation has a reason.
            We don&apos;t guess — we calculate, measure, and adapt.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-3xl p-6 lg:p-8 card-hover group relative border border-primary/10 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6`} style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-foreground-muted leading-relaxed mb-3">
                {feature.description}
              </p>

              {/* Citation badge if present */}
              {feature.citation && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  {feature.citation}
                </div>
              )}

              {/* Bottom wave accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            </div>
          ))}
        </div>

        {/* Research citation footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-primary/10">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span className="text-sm text-foreground-muted">
              Protein targets based on <strong className="text-foreground">Morton et al. 2018</strong>, <strong className="text-foreground">Helms et al. 2014</strong>, <strong className="text-foreground">Schoenfeld & Aragon 2018</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
