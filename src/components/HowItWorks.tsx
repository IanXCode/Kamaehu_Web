"use client";

const steps = [
  {
    number: "01",
    title: "Set Your Goals",
    description:
      "Tell us about yourself, your fitness goals, and your preferences. Our adaptive engine creates personalized calorie and macro targets just for you.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Track Daily",
    description:
      "Log your workouts, food, and weight. Our AI helps estimate meals, and workout templates make logging fast and easy.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Adapt & Improve",
    description:
      "Watch as our engine learns your metabolism. Get smarter recommendations and celebrate your progress with the community.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section relative overflow-hidden bg-background-secondary">
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

      {/* Flowing decorative elements */}
      <div className="absolute top-20 right-10 w-40 h-40 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent animate-sway">
          <path d="M50,10 C30,30 30,70 50,90 C70,70 70,30 50,10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M30,50 C50,30 50,70 70,50" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute bottom-20 left-10 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary animate-spin-slow">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      {/* Organic blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-blob-delay" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 mb-6">
            Simple steps to{" "}
            <span className="relative inline-block">
              <span className="gradient-text">transform your fitness</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path
                  d="M0,6 Q50,12 100,6 T200,6"
                  fill="none"
                  stroke="url(#howUnderline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="howUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-lg text-foreground-muted">
            No complicated setup. Just download, set your goals, and start tracking.
            Our engine does the rest.
          </p>
        </div>

        {/* Steps with flowing connection */}
        <div className="relative">
          {/* Flowing connection line - desktop only */}
          <div className="hidden lg:block absolute top-32 left-[15%] right-[15%]">
            <svg className="w-full h-16" viewBox="0 0 800 60" preserveAspectRatio="none">
              <path
                d="M0,30 C100,10 200,50 400,30 C600,10 700,50 800,30"
                fill="none"
                stroke="url(#connectionGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="10,10"
                className="animate-gradient-flow"
              />
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step card */}
                <div className="bg-background rounded-3xl p-8 text-center card-hover relative z-10 overflow-hidden">
                  {/* Organic background shape */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                  {/* Number badge with tribal ring */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    {/* Outer ring */}
                    <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full animate-spin-slow" />
                    {/* Inner circle */}
                    <div
                      className="absolute inset-2 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                      style={{ borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%" }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 text-primary opacity-80">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-foreground-muted">
                    {step.description}
                  </p>

                  {/* Bottom wave accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
