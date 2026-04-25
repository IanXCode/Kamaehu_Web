"use client";

const principles = [
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
      </svg>
    ),
    title: "Lifts every day",
    description: "The founder uses Kamaehu for his own training. Every feature gets battle-tested.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    title: "Problems get fixed fast",
    description: "When the founder hits a bug, it gets fixed. No ticket queues, no corporate delays.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    title: "Indonesian context",
    description: "Built by someone who lives and eats in Indonesia. The food database isn't guesswork.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
      </svg>
    ),
    title: "No corporate incentives",
    description: "No engagement metrics to optimize. No addiction psychology. Just tools that help you train.",
  },
];

export default function BuiltByLifter() {
  return (
    <section id="about" className="section relative overflow-hidden bg-background-secondary">
      {/* Tribal decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary animate-spin-slow">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="12,6" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8,4" />
        </svg>
      </div>

      <div className="absolute bottom-20 right-10 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent animate-spin-reverse">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="50,30 70,75 30,75" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Organic blobs */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-blob-delay" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            <svg className="w-5 h-5 animate-tribal-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            About the Founder
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 mb-6">
            Built by a lifter,{" "}
            <span className="relative inline-block">
              <span className="gradient-text">not a corporation</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path
                  d="M0,6 C30,2 70,10 100,6 C130,2 170,10 200,6"
                  fill="none"
                  stroke="url(#founderUnderline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="founderUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="50%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-lg text-foreground-muted">
            Kamaehu isn&apos;t a product designed by committee. It&apos;s the app I built because
            I needed it — and couldn&apos;t find it anywhere else.
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-2xl bg-background border border-primary/10 card-hover"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shrink-0" style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}>
                {principle.icon}
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{principle.title}</h3>
                <p className="text-sm text-foreground-muted">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote block */}
        <div className="max-w-3xl mx-auto">
          <div className="relative p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            {/* Quote mark */}
            <svg className="absolute top-4 left-4 w-8 h-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>

            <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed mb-4 pl-8">
              I got tired of apps that didn&apos;t understand the food I actually eat,
              that used psychology tricks to keep me anxious, and that felt designed
              by people who&apos;ve never stepped inside a gym. So I built Kamaehu.
            </blockquote>

            <div className="flex items-center gap-3 pl-8">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                I
              </div>
              <div>
                <div className="font-semibold text-foreground">Ian</div>
                <div className="text-sm text-foreground-muted">Founder & solo developer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial placeholder */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-dashed border-primary/30">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            <span className="text-sm text-foreground-muted">
              User testimonials coming soon — we&apos;re still in beta
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
