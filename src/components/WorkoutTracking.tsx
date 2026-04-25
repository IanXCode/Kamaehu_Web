"use client";

const setTypes = [
  { label: "W", name: "Warmup", color: "bg-orange-500/20 text-orange-400", description: "Excluded from PR calculations" },
  { label: "1", name: "Working", color: "bg-[#1A3A4F] text-white", description: "Standard working sets" },
  { label: "D", name: "Dropset", color: "bg-purple-500/20 text-purple-400", description: "Reduced weight continuation" },
  { label: "F", name: "Failure", color: "bg-red-500/20 text-red-400", description: "Reached muscular failure" },
  { label: "L", name: "Left", color: "bg-[#FF5722]/20 text-[#FF5722]", description: "Unilateral left side" },
  { label: "R", name: "Right", color: "bg-[#3F51B5]/20 text-[#3F51B5]", description: "Unilateral right side" },
];

const prTypes = [
  { icon: "🏆", name: "Heaviest Weight", description: "Absolute heaviest you've lifted" },
  { icon: "📊", name: "Best Set Volume", description: "Highest weight × reps in one set" },
  { icon: "💪", name: "Best 1RM", description: "Estimated one-rep max (6 formulas)" },
  { icon: "📈", name: "Session Volume", description: "Most total work in one session" },
];

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    title: "4-Type PR Detection",
    description: "Not just 1RM. We track heaviest weight, best set volume, estimated 1RM, and session volume — all automatically detected during your workout.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
      </svg>
    ),
    title: "Smart Weight Suggestions",
    description: "Hit 3+ reps over target? We suggest a weight increase. Missed reps? We scale back. Progressive overload built into every session.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
      </svg>
    ),
    title: "Assisted Reps Done Right",
    description: "Assisted reps count toward volume (it's still work), but are excluded from 1RM calculations (for accuracy). Most apps ignore this distinction.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
      </svg>
    ),
    title: "6 Different 1RM Formulas",
    description: "Epley, Brzycki, Lombardi, Mayhew, O'Conner, Wathan. Pick your preferred formula or let us average them. Confidence levels based on rep range.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Per-Exercise Rest Timers",
    description: "Compound lifts need more rest than isolation work. Set different rest intervals per exercise, and we'll track your actual rest patterns.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>
      </svg>
    ),
    title: "Superset Support",
    description: "Group exercises into supersets in your routines. We track rest differently for paired movements and calculate antagonist efficiency.",
  },
];

export default function WorkoutTracking() {
  return (
    <section id="workout" className="section relative overflow-hidden bg-background-secondary">
      {/* Tribal decorative elements */}
      <div className="absolute top-32 right-8 w-20 h-20 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary animate-spin-slow">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="15,10,5,10" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10,8" />
        </svg>
      </div>

      <div className="absolute bottom-32 left-8 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-secondary animate-spin-reverse">
          <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Flowing background blobs */}
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-blob-delay" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            <svg className="w-5 h-5 animate-tribal-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
            </svg>
            Workout Tracking
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 mb-6">
            Built for lifters who{" "}
            <span className="relative inline-block">
              <span className="gradient-text">train seriously</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path
                  d="M0,6 C40,2 60,10 100,6 C140,2 160,10 200,6"
                  fill="none"
                  stroke="url(#workoutUnderline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="workoutUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="50%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-lg text-foreground-muted">
            Most workout apps treat all sets the same. Kamaehu understands warmups, dropsets,
            failure sets, and unilateral work — because real training is nuanced.
          </p>
        </div>

        {/* Set Types Visual */}
        <div className="mb-16">
          <h3 className="text-center text-lg font-semibold text-foreground mb-6">Every set type tracked properly</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {setTypes.map((type, i) => (
              <div key={i} className="group relative">
                <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center font-bold text-lg cursor-help transition-transform hover:scale-110`}>
                  {type.label}
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F1D2E] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  <div className="text-sm font-medium text-white">{type.name}</div>
                  <div className="text-xs text-white/60">{type.description}</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0F1D2E]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PR Types */}
        <div className="mb-16">
          <h3 className="text-center text-lg font-semibold text-foreground mb-6">Four ways to set a PR</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {prTypes.map((pr, i) => (
              <div key={i} className="bg-background rounded-2xl p-4 border border-primary/10 text-center card-hover">
                <div className="text-3xl mb-2">{pr.icon}</div>
                <div className="font-semibold text-foreground mb-1">{pr.name}</div>
                <div className="text-xs text-foreground-muted">{pr.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Phone Mockup + Features */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Phone mockup showing active workout */}
          <div className="relative flex justify-center order-2 lg:order-1">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[350px] h-[350px] bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-full blur-3xl" />
            </div>

            <div className="relative">
              <div className="relative w-[280px] sm:w-[300px] h-[560px] sm:h-[600px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-[#0B1622] rounded-[2rem] overflow-hidden relative">
                  {/* Status bar */}
                  <div className="h-6 flex items-center justify-between px-5 bg-[#0F1D2E]">
                    <span className="text-[9px] text-white/80">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-2.5 h-1.5 bg-white/50 rounded-sm" />
                      <div className="w-2.5 h-1.5 bg-white/50 rounded-sm" />
                      <div className="w-4 h-1.5 bg-green-500 rounded-sm" />
                    </div>
                  </div>

                  {/* Workout Header */}
                  <div className="px-4 py-2 flex items-center justify-between bg-[#0F1D2E] border-b border-white/5">
                    <span className="text-red-400 text-xs font-medium">Cancel</span>
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm">Push Day</p>
                      <p className="text-primary text-xs">47:32</p>
                    </div>
                    <span className="text-green-400 text-xs font-medium">Finish</span>
                  </div>

                  {/* Stats Row */}
                  <div className="flex justify-around px-4 py-2 border-b border-white/5">
                    <div className="text-center">
                      <p className="text-white font-bold text-sm">4</p>
                      <p className="text-white/40 text-[9px]">Exercises</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-sm">18</p>
                      <p className="text-white/40 text-[9px]">Sets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-sm">12.4k</p>
                      <p className="text-white/40 text-[9px]">Volume (lbs)</p>
                    </div>
                    <div className="text-center">
                      <p className="text-yellow-400 font-bold text-sm">3</p>
                      <p className="text-white/40 text-[9px]">PRs</p>
                    </div>
                  </div>

                  {/* Exercise Card */}
                  <div className="px-3 py-2">
                    <div className="bg-[#132A3E] rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 bg-primary/20 rounded-lg flex items-center justify-center">
                          <span className="text-xs">🏋️</span>
                        </div>
                        <span className="text-white font-semibold text-sm flex-1">Bench Press</span>
                        <span className="text-primary text-[10px]">90s rest</span>
                      </div>

                      {/* Sets */}
                      <div className="space-y-1.5">
                        {/* Headers */}
                        <div className="flex text-[8px] text-white/40 px-1">
                          <span className="w-7">SET</span>
                          <span className="flex-1 text-center">LBS</span>
                          <span className="flex-1 text-center">REPS</span>
                          <span className="w-7"></span>
                        </div>

                        {/* Warmup */}
                        <div className="flex items-center gap-1 bg-green-500/10 rounded-lg px-1.5 py-1">
                          <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <span className="text-orange-400 text-[8px] font-bold">W</span>
                          </div>
                          <span className="flex-1 text-center text-white/70 text-[10px]">135</span>
                          <span className="flex-1 text-center text-white/70 text-[10px]">12</span>
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          </div>
                        </div>

                        {/* Working set with PR */}
                        <div className="flex items-center gap-1 bg-green-500/10 rounded-lg px-1.5 py-1 relative">
                          <div className="absolute -top-1 right-0 px-1 py-0.5 bg-yellow-500 rounded text-[6px] text-black font-bold">PR</div>
                          <div className="w-5 h-5 rounded-full bg-[#1A3A4F] flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold">1</span>
                          </div>
                          <span className="flex-1 text-center text-white text-[10px] font-medium">225</span>
                          <span className="flex-1 text-center text-white text-[10px] font-medium">8</span>
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          </div>
                        </div>

                        {/* Working set */}
                        <div className="flex items-center gap-1 bg-green-500/10 rounded-lg px-1.5 py-1">
                          <div className="w-5 h-5 rounded-full bg-[#1A3A4F] flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold">2</span>
                          </div>
                          <span className="flex-1 text-center text-white/70 text-[10px]">225</span>
                          <span className="flex-1 text-center text-white/70 text-[10px]">6</span>
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          </div>
                        </div>

                        {/* Dropset */}
                        <div className="flex items-center gap-1 bg-[#1A3A4F] rounded-lg px-1.5 py-1">
                          <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <span className="text-purple-400 text-[8px] font-bold">D</span>
                          </div>
                          <span className="flex-1 text-center text-white/50 text-[10px]">185</span>
                          <span className="flex-1 text-center text-white/50 text-[10px]">—</span>
                          <div className="w-5 h-5 rounded-full bg-primary/80 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full border border-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 1RM Estimate card */}
                    <div className="mt-3 bg-[#132A3E] rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/60 text-[10px]">Estimated 1RM</span>
                        <span className="text-primary text-xs font-bold">285 lbs</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="flex-1 h-1.5 bg-primary/30 rounded-full overflow-hidden">
                          <div className="h-full w-[79%] bg-primary rounded-full" />
                        </div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[8px] text-white/40">Previous: 275 lbs</span>
                        <span className="text-[8px] text-green-400">+3.6%</span>
                      </div>
                    </div>

                    {/* Weight Suggestion */}
                    <div className="mt-3 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-primary/20 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-primary">Next set suggestion</p>
                          <p className="text-[9px] text-white/60">You hit +2 reps. Try 230 lbs.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating PR notification */}
              <div className="absolute -right-4 top-28 bg-[#0F1D2E] rounded-xl p-2.5 shadow-xl border border-yellow-500/30 animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🏆</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-yellow-400">Best Set Volume!</p>
                    <p className="text-[8px] text-white/60">225 × 8 = 1,800 lbs</p>
                  </div>
                </div>
              </div>

              {/* Floating muscle split */}
              <div className="absolute -left-6 bottom-36 bg-[#0F1D2E] rounded-xl p-2.5 shadow-xl border border-white/10 animate-slide-up" style={{ animationDelay: "0.8s" }}>
                <p className="text-[8px] text-white/50 mb-1.5">Muscle Split</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-10 h-1.5 bg-primary rounded-full" />
                    <span className="text-[8px] text-white/60">Chest 45%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-1.5 bg-secondary rounded-full" />
                    <span className="text-[8px] text-white/60">Triceps 30%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-1.5 bg-accent rounded-full" />
                    <span className="text-[8px] text-white/60">Shoulders 25%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-4 order-1 lg:order-2">
            {features.map((feature, index) => (
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

        {/* Extra features row */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "🎵", title: "Spotify Integration", desc: "Auto-track what songs power your lifts" },
            { icon: "📸", title: "Workout Media", desc: "Attach photos and videos to sessions" },
            { icon: "😤", title: "RPE + Mood Tracking", desc: "Rate perceived exertion and energy" },
            { icon: "📊", title: "16 Muscle Groups", desc: "Track volume distribution by muscle" },
          ].map((item, i) => (
            <div key={i} className="bg-background rounded-2xl p-4 border border-primary/10 text-center card-hover">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-semibold text-foreground text-sm mb-1">{item.title}</div>
              <div className="text-xs text-foreground-muted">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
