"use client";

import Link from "next/link";

export default function Download() {
  // TODO: Replace with your actual TestFlight public link
  const TESTFLIGHT_URL = "https://testflight.apple.com/join/YOUR_CODE_HERE";

  return (
    <section id="download" className="section relative overflow-hidden bg-background-secondary">
      {/* Wave top divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-background"
          />
        </svg>
      </div>

      {/* Tribal background elements */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="downloadPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M15,5 L15,25 M5,15 L25,15" stroke="#F97316" strokeWidth="0.5" />
            <circle cx="15" cy="15" r="3" fill="none" stroke="#F97316" strokeWidth="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#downloadPattern)" />
        </svg>
      </div>

      {/* Large decorative tribal elements */}
      <div className="absolute top-1/4 left-0 w-48 h-48 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary animate-spin-slow">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="15,5,5,5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10,5" />
          <path d="M50,10 L50,90 M10,50 L90,50 M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="absolute bottom-1/4 right-0 w-40 h-40 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent animate-spin-reverse">
          <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="50,20 80,50 50,80 20,50" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      {/* Organic blobs */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-accent/15 to-primary/10 rounded-full blur-3xl animate-blob-delay" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge with tribal styling */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
          <svg className="w-4 h-4 animate-tribal-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          iOS Beta via TestFlight
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
          Join the{" "}
          <span className="relative inline-block">
            <span className="gradient-text">beta</span>
            <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 200 16" preserveAspectRatio="none">
              <path
                d="M0,8 C20,4 40,12 60,8 C80,4 100,12 120,8 C140,4 160,12 180,8 L200,8"
                fill="none"
                stroke="url(#downloadUnderline)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="downloadUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-10">
          Kamaehu is currently in beta testing on iOS via Apple TestFlight.
          Be among the first to experience the future of fitness tracking and
          help us make it even better with your feedback.
        </p>

        {/* TestFlight Button */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <Link
            href={TESTFLIGHT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-10 py-5 rounded-2xl font-semibold overflow-hidden transition-all hover:scale-105 shadow-lg shadow-primary/30"
          >
            <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left relative z-10">
              <div className="text-sm opacity-90">Join via</div>
              <div className="text-xl leading-tight font-bold">Apple TestFlight</div>
            </div>
          </Link>

          {/* Android notice */}
          <p className="text-sm text-foreground-muted">
            Android version coming soon. Sign up for updates below.
          </p>
        </div>

        {/* Email signup for Android waitlist */}
        <div className="bg-background rounded-2xl p-6 max-w-md mx-auto border border-primary/10 mb-10">
          <h3 className="font-semibold text-foreground mb-3">Get notified for Android</h3>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-background-secondary border border-primary/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Notify Me
            </button>
          </form>
        </div>

        {/* Beta info */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground-muted">
          {[
            { text: "Free during beta", icon: "star" },
            { text: "Help shape the app", icon: "chat" },
            { text: "Early access to features", icon: "bolt" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs" style={{ borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%" }}>
                {item.icon === "star" && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                )}
                {item.icon === "chat" && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                )}
                {item.icon === "bolt" && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z" />
                  </svg>
                )}
              </div>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
            className="fill-background-secondary"
          />
        </svg>
      </div>
    </section>
  );
}
