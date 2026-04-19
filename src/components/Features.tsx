"use client";

import {
  WorkoutTrackingIllustration,
  MetabolismIllustration,
  NutritionIllustration,
  CommunityIllustration,
  MusicIllustration,
  PRIllustration,
} from "./FeatureIllustrations";

const features = [
  {
    illustration: <WorkoutTrackingIllustration />,
    title: "Smart Workout Tracking",
    description:
      "Log exercises, sets, and reps with ease. Track personal records automatically and visualize your muscle split.",
    color: "from-primary to-secondary",
  },
  {
    illustration: <MetabolismIllustration />,
    title: "Adaptive Metabolism Engine",
    description:
      "Our algorithm learns your body. It adjusts calorie and macro targets based on your actual progress, not just formulas.",
    color: "from-secondary to-accent",
  },
  {
    illustration: <NutritionIllustration />,
    title: "Nutrition Logging",
    description:
      "Scan barcodes, search foods, or use AI to estimate meals. Track macros with beautiful visualizations.",
    color: "from-accent to-primary",
  },
  {
    illustration: <CommunityIllustration />,
    title: "Social Community",
    description:
      "Share workout wins, follow friends, celebrate PRs together. This is your gym family.",
    color: "from-primary to-accent",
  },
  {
    illustration: <MusicIllustration />,
    title: "Music Integration",
    description:
      "Connect Spotify and see what tracks power your workouts. Share your gym playlist with the community.",
    color: "from-secondary to-primary",
  },
  {
    illustration: <PRIllustration />,
    title: "Personal Records",
    description:
      "Automatic PR detection with trophy celebrations. Track your strength journey and see your growth over time.",
    color: "from-accent to-secondary",
  },
];

export default function Features() {
  return (
    <section id="features" className="section section-organic relative">
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
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 mb-6">
            Everything you need for{" "}
            <span className="relative inline-block">
              <span className="gradient-text">sustainable progress</span>
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
            Kamaehu combines workout tracking, nutrition logging, and social features
            into one powerful platform designed for real results.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-3xl overflow-hidden card-hover group relative border border-primary/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated illustration */}
              <div className="relative overflow-hidden">
                {feature.illustration}
                {/* Overlay gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom wave accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            </div>
          ))}
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
