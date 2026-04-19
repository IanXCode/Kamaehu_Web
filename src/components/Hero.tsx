"use client";

import Image from "next/image";
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

        {/* Dumbbell decorative element */}
        <svg className="absolute top-1/3 right-[10%] w-20 h-10 text-primary/10 animate-float hidden lg:block" viewBox="0 0 100 40">
          <rect x="5" y="12" width="15" height="16" rx="3" fill="currentColor" />
          <rect x="20" y="16" width="60" height="8" rx="2" fill="currentColor" />
          <rect x="80" y="12" width="15" height="16" rx="3" fill="currentColor" />
        </svg>

        {/* Kettlebell decorative element */}
        <svg className="absolute top-1/2 left-[8%] w-12 h-16 text-secondary/10 animate-float hidden lg:block" style={{ animationDelay: "1s" }} viewBox="0 0 50 70">
          <circle cx="25" cy="45" r="20" fill="currentColor" />
          <path d="M15,30 Q15,10 25,10 Q35,10 35,30" stroke="currentColor" strokeWidth="6" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="stagger-children text-center lg:text-left">
            {/* Badge with tribal accent */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Beta Testing Open via TestFlight
            </div>

            {/* Headline with flowing text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              This is your{" "}
              <span className="relative">
                <span className="gradient-text">gym family</span>
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
            <p className="text-lg sm:text-xl text-foreground-muted max-w-xl mx-auto lg:mx-0 mb-8">
              The fitness + wellness + social platform that helps you achieve{" "}
              <strong className="text-foreground">sustainable progress</strong>.
              No crash diets, no burnout.
            </p>

            {/* CTA Buttons with organic shape */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="#download" className="btn-primary text-lg px-8 py-4 rounded-2xl">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Join iOS Beta
              </Link>
              <Link href="#features" className="btn-secondary text-lg px-8 py-4 rounded-2xl">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                See Features
              </Link>
            </div>

            {/* App features summary */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start mt-10 pt-10 border-t border-primary/10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-secondary border border-primary/10">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
                </svg>
                <span className="text-sm font-medium">Track Workouts</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-secondary border border-primary/10">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05l-5 2.9V4c0-1.1-.9-2-2-2h-5.5v1h4.75c.55 0 1 .45 1 1v5.64l-4.5 2.61-4.5-2.61V4c0-.55.45-1 1-1H13V2H7.5C6.12 2 5 3.12 5 4.5v.34L1 7.14V21.5c0 .83.67 1.5 1.5 1.5h13.06c.84 0 1.53-.64 1.63-1.46l.9-7.18-4.5-2.6V14l4.47 2.59z"/>
                </svg>
                <span className="text-sm font-medium">Hit Your Macros</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-secondary border border-primary/10">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
                <span className="text-sm font-medium">Join the Community</span>
              </div>
            </div>
          </div>

          {/* Phone Mockup - Active Workout Screen */}
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

                  {/* Active Workout Header */}
                  <div className="px-4 py-3 flex items-center justify-between bg-[#0F1D2E] border-b border-white/5">
                    <button className="text-red-500 text-xs font-medium">Cancel</button>
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm">Push Day</p>
                      <p className="text-primary text-xs">32:15</p>
                    </div>
                    <button className="text-green-500 text-xs font-medium">Finish</button>
                  </div>

                  {/* Rest Timer Banner */}
                  <div className="mx-3 mt-2 px-3 py-2 bg-primary rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
                      </svg>
                      <span className="text-white font-bold text-sm">Rest: 0:45</span>
                    </div>
                    <button className="text-white/80">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </button>
                  </div>

                  {/* Stats Bar */}
                  <div className="flex justify-around px-4 py-2 mt-2">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">3</p>
                      <p className="text-white/50 text-[10px]">Exercises</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">12</p>
                      <p className="text-white/50 text-[10px]">Sets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">8,450</p>
                      <p className="text-white/50 text-[10px]">Volume (lbs)</p>
                    </div>
                  </div>

                  {/* Exercise Cards */}
                  <div className="px-3 mt-2 space-y-2 overflow-hidden">
                    {/* Exercise 1 - Bench Press with PR */}
                    <div className="bg-[#132A3E] rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <span className="text-xs">🏋️</span>
                        </div>
                        <span className="text-white font-semibold text-sm flex-1">Bench Press</span>
                        <span className="text-primary text-xs">90s</span>
                      </div>

                      {/* Set Headers */}
                      <div className="flex text-[9px] text-white/40 mb-1 px-1">
                        <span className="w-8">SET</span>
                        <span className="flex-1 text-center">LBS</span>
                        <span className="flex-1 text-center">REPS</span>
                        <span className="w-8"></span>
                      </div>

                      {/* Sets */}
                      <div className="space-y-1">
                        {/* Set 1 - Warmup completed */}
                        <div className="flex items-center gap-1 bg-green-500/10 rounded-lg px-2 py-1.5">
                          <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <span className="text-orange-400 text-[10px] font-bold">W</span>
                          </div>
                          <span className="flex-1 text-center text-white/80 text-xs">135</span>
                          <span className="flex-1 text-center text-white/80 text-xs">12</span>
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          </div>
                        </div>

                        {/* Set 2 - Working set completed with PR */}
                        <div className="flex items-center gap-1 bg-green-500/10 rounded-lg px-2 py-1.5 relative">
                          <div className="absolute -top-1 right-1 px-1.5 py-0.5 bg-yellow-500 rounded text-[8px] text-black font-bold">
                            PR
                          </div>
                          <div className="w-6 h-6 rounded-full bg-[#1A3A4F] flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">1</span>
                          </div>
                          <span className="flex-1 text-center text-white text-xs font-medium">225</span>
                          <span className="flex-1 text-center text-white text-xs font-medium">8</span>
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          </div>
                        </div>

                        {/* Set 3 - In progress */}
                        <div className="flex items-center gap-1 bg-[#1A3A4F] rounded-lg px-2 py-1.5">
                          <div className="w-6 h-6 rounded-full bg-[#1E4D5C] flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">2</span>
                          </div>
                          <span className="flex-1 text-center text-white/50 text-xs">225</span>
                          <span className="flex-1 text-center text-white/50 text-xs">—</span>
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" strokeWidth="2" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Exercise 2 - Dumbbell Press with L/R and Dropset */}
                    <div className="bg-[#132A3E] rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                          <span className="text-xs">💪</span>
                        </div>
                        <span className="text-white font-semibold text-sm flex-1">DB Shoulder Press</span>
                        <span className="text-primary text-xs">60s</span>
                      </div>

                      {/* Sets with L/R indicators */}
                      <div className="space-y-1">
                        {/* L set completed */}
                        <div className="flex items-center gap-1 bg-green-500/10 rounded-lg px-2 py-1.5">
                          <div className="flex items-center gap-0.5">
                            <div className="w-5 h-5 rounded-full bg-[#1A3A4F] flex items-center justify-center">
                              <span className="text-white text-[9px] font-bold">1</span>
                            </div>
                            <div className="w-4 h-4 rounded-full bg-[#FF5722] flex items-center justify-center">
                              <span className="text-white text-[8px] font-bold">L</span>
                            </div>
                          </div>
                          <span className="flex-1 text-center text-white/80 text-xs">55</span>
                          <span className="flex-1 text-center text-white/80 text-xs">10</span>
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          </div>
                        </div>

                        {/* R set completed */}
                        <div className="flex items-center gap-1 bg-green-500/10 rounded-lg px-2 py-1.5">
                          <div className="flex items-center gap-0.5">
                            <div className="w-5 h-5 rounded-full bg-[#1A3A4F] flex items-center justify-center">
                              <span className="text-white text-[9px] font-bold">1</span>
                            </div>
                            <div className="w-4 h-4 rounded-full bg-[#3F51B5] flex items-center justify-center">
                              <span className="text-white text-[8px] font-bold">R</span>
                            </div>
                          </div>
                          <span className="flex-1 text-center text-white/80 text-xs">55</span>
                          <span className="flex-1 text-center text-white/80 text-xs">10</span>
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          </div>
                        </div>

                        {/* Dropset */}
                        <div className="flex items-center gap-1 bg-[#1A3A4F] rounded-lg px-2 py-1.5">
                          <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <span className="text-purple-400 text-[10px] font-bold">D</span>
                          </div>
                          <span className="flex-1 text-center text-white/50 text-xs">45</span>
                          <span className="flex-1 text-center text-white/50 text-xs">—</span>
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" strokeWidth="2" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Add Exercise Button */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/50">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating PR notification */}
              <div className="absolute -right-4 top-32 bg-[#0F1D2E] rounded-2xl p-3 shadow-xl border border-yellow-500/30 animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">🏆</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-yellow-400">New PR!</p>
                    <p className="text-[10px] text-white/70">Bench Press: 225 lbs</p>
                    <p className="text-[10px] text-green-400">+10 lbs improvement</p>
                  </div>
                </div>
              </div>

              {/* Floating set type legend */}
              <div className="absolute -left-6 bottom-40 bg-[#0F1D2E] rounded-2xl p-3 shadow-xl border border-white/10 animate-slide-up" style={{ animationDelay: "0.8s" }}>
                <p className="text-[10px] text-white/50 mb-2">Set Types</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <span className="text-orange-400 text-[8px] font-bold">W</span>
                    </div>
                    <span className="text-[10px] text-white/70">Warmup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 text-[8px] font-bold">D</span>
                    </div>
                    <span className="text-[10px] text-white/70">Dropset</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 text-[8px] font-bold">F</span>
                    </div>
                    <span className="text-[10px] text-white/70">Failure</span>
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
