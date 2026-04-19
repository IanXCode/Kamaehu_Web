"use client";

// What the app actually does - features showcase instead of fake testimonials
const features = [
  {
    title: "Workout Tracking",
    description: "Log sets, reps, and weight with automatic PR detection and rest timers.",
    icon: "barbell",
  },
  {
    title: "Nutrition Engine",
    description: "AI-powered meal logging with adaptive calorie targets that learn from your body.",
    icon: "nutrition",
  },
  {
    title: "Social Feed",
    description: "Share workouts, celebrate PRs, and stay motivated with your gym family.",
    icon: "people",
  },
  {
    title: "Progress Tracking",
    description: "Track body measurements, weight trends, and see your journey unfold.",
    icon: "trending",
  },
];

export default function Community() {
  return (
    <section id="community" className="section relative overflow-hidden">
      {/* Wave top divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-background-secondary"
            opacity=".25"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            className="fill-background-secondary"
            opacity=".5"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-background-secondary"
          />
        </svg>
      </div>

      {/* Tribal decorative elements */}
      <div className="absolute top-40 left-5 w-28 h-28 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8,4" className="animate-spin-slow" />
          <path d="M50,15 L50,85 M15,50 L85,50" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute bottom-40 right-5 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent animate-spin-reverse">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" />
          <polygon points="50,30 75,80 25,80" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Organic blobs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-accent/10 to-primary/5 rounded-full blur-3xl animate-blob-delay" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            <svg className="w-5 h-5 animate-tribal-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            What We&apos;re Building
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 mb-6">
            Your complete{" "}
            <span className="relative inline-block">
              <span className="gradient-text">fitness platform</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path
                  d="M0,6 C30,2 70,10 100,6 C130,2 170,10 200,6"
                  fill="none"
                  stroke="url(#communityUnderline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="communityUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="50%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-lg text-foreground-muted">
            Kamaehu combines workout tracking, smart nutrition, and social features
            into one cohesive experience. Currently in beta testing.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background-secondary rounded-3xl p-6 lg:p-8 card-hover relative overflow-hidden group"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4" style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}>
                {feature.icon === "barbell" && (
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
                  </svg>
                )}
                {feature.icon === "nutrition" && (
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05l-5 2.9V4c0-1.1-.9-2-2-2h-5.5v1h4.75c.55 0 1 .45 1 1v5.64l-4.5 2.61-4.5-2.61V4c0-.55.45-1 1-1H13V2H7.5C6.12 2 5 3.12 5 4.5v.34L1 7.14V21.5c0 .83.67 1.5 1.5 1.5h13.06c.84 0 1.53-.64 1.63-1.46l.9-7.18-4.5-2.6V14l4.47 2.59z"/>
                  </svg>
                )}
                {feature.icon === "people" && (
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                )}
                {feature.icon === "trending" && (
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                  </svg>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-foreground-muted">{feature.description}</p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Beta CTA */}
        <div className="text-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 lg:p-12 border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Be part of the journey
          </h3>
          <p className="text-foreground-muted max-w-xl mx-auto mb-6">
            We&apos;re currently in beta testing on iOS. Join our early community of testers
            and help shape the future of fitness tracking.
          </p>
          <a
            href="#download"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-transform"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Join TestFlight Beta
          </a>
        </div>
      </div>
    </section>
  );
}
