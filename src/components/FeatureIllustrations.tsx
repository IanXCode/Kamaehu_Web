"use client";

// Smart Workout Tracking - Barbell with ocean waves
export function WorkoutTrackingIllustration() {
  return (
    <div className="relative w-full h-48 overflow-hidden">
      {/* Ocean background */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
        {/* Gradient sky/ocean */}
        <defs>
          <linearGradient id="oceanGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <rect width="200" height="120" fill="url(#oceanGradient1)" />

        {/* Animated waves */}
        <g className="animate-wave-slow">
          <path d="M-20,80 Q20,70 60,80 T140,80 T220,80 L220,120 L-20,120 Z" fill="#0EA5E9" opacity="0.4" />
        </g>
        <g className="animate-wave-medium">
          <path d="M-20,85 Q30,75 70,85 T150,85 T230,85 L230,120 L-20,120 Z" fill="#0284C7" opacity="0.5" />
        </g>
        <g className="animate-wave-fast">
          <path d="M-20,90 Q25,82 60,90 T140,90 T220,90 L220,120 L-20,120 Z" fill="#0369A1" opacity="0.6" />
        </g>
      </svg>

      {/* Palm tree silhouette */}
      <svg className="absolute left-4 bottom-0 w-16 h-32 animate-sway" viewBox="0 0 50 100">
        <path d="M25,100 Q23,70 25,50" stroke="#0F172A" strokeWidth="3" fill="none" />
        <g transform="translate(25,45)">
          <ellipse cx="-15" cy="-5" rx="18" ry="5" fill="#0F172A" transform="rotate(-30)" />
          <ellipse cx="15" cy="-5" rx="18" ry="5" fill="#0F172A" transform="rotate(30)" />
          <ellipse cx="0" cy="-10" rx="15" ry="5" fill="#0F172A" transform="rotate(-10)" />
          <ellipse cx="-5" cy="-8" rx="16" ry="5" fill="#0F172A" transform="rotate(-50)" />
          <ellipse cx="5" cy="-8" rx="16" ry="5" fill="#0F172A" transform="rotate(50)" />
        </g>
      </svg>

      {/* Animated Barbell */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-40 h-24 animate-float" viewBox="0 0 160 60">
          {/* Bar */}
          <rect x="20" y="27" width="120" height="6" rx="3" fill="url(#barbellGradient)" />

          {/* Left weights */}
          <rect x="10" y="12" width="12" height="36" rx="2" fill="#1E293B" className="animate-tribal-pulse" />
          <rect x="0" y="8" width="10" height="44" rx="2" fill="#0F172A" />

          {/* Right weights */}
          <rect x="138" y="12" width="12" height="36" rx="2" fill="#1E293B" className="animate-tribal-pulse" />
          <rect x="150" y="8" width="10" height="44" rx="2" fill="#0F172A" />

          {/* Grip marks */}
          <g stroke="#64748B" strokeWidth="1">
            <line x1="65" y1="27" x2="65" y2="33" />
            <line x1="70" y1="27" x2="70" y2="33" />
            <line x1="90" y1="27" x2="90" y2="33" />
            <line x1="95" y1="27" x2="95" y2="33" />
          </g>

          <defs>
            <linearGradient id="barbellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating rep counter */}
      <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-bold animate-tribal-pulse">
        12 REPS
      </div>
    </div>
  );
}

// Adaptive Metabolism Engine - Chart with tropical sunset
export function MetabolismIllustration() {
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-xl">
      {/* Sunset gradient background */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sunsetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#EF4444" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#7C3AED" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="60%" r="40%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="50%" stopColor="#F97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="120" fill="url(#sunsetGradient)" />

        {/* Setting sun */}
        <circle cx="100" cy="85" r="25" fill="url(#sunGlow)" className="animate-tribal-pulse" />

        {/* Ocean horizon */}
        <path d="M0,90 L200,90 L200,120 L0,120 Z" fill="#0F172A" opacity="0.5" />
        <g className="animate-wave-slow">
          <path d="M-20,95 Q30,88 70,95 T150,95 T230,95 L230,120 L-20,120 Z" fill="#0F172A" opacity="0.7" />
        </g>
      </svg>

      {/* Metabolism chart */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120">
        {/* Animated progress line */}
        <path
          d="M20,90 Q40,85 60,75 T100,50 T140,35 T180,25"
          fill="none"
          stroke="#22C55E"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="200"
          className="animate-gradient-flow"
          style={{ strokeDashoffset: 0 }}
        />

        {/* Glow effect */}
        <path
          d="M20,90 Q40,85 60,75 T100,50 T140,35 T180,25"
          fill="none"
          stroke="#22C55E"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.3"
          filter="blur(4px)"
        />

        {/* Data points */}
        <circle cx="20" cy="90" r="4" fill="#22C55E" className="animate-tribal-pulse" />
        <circle cx="60" cy="75" r="4" fill="#22C55E" className="animate-tribal-pulse" style={{ animationDelay: "0.2s" }} />
        <circle cx="100" cy="50" r="4" fill="#22C55E" className="animate-tribal-pulse" style={{ animationDelay: "0.4s" }} />
        <circle cx="140" cy="35" r="4" fill="#22C55E" className="animate-tribal-pulse" style={{ animationDelay: "0.6s" }} />
        <circle cx="180" cy="25" r="5" fill="#F97316" className="animate-tribal-pulse" style={{ animationDelay: "0.8s" }} />
      </svg>

      {/* Adaptive badge */}
      <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        ADAPTING
      </div>
    </div>
  );
}

// Nutrition Logging - Tropical plate with macros
export function NutritionIllustration() {
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-700">
      {/* Decorative leaves */}
      <svg className="absolute -top-4 -right-4 w-24 h-24 text-green-500/30 animate-sway" viewBox="0 0 100 100">
        <ellipse cx="50" cy="30" rx="35" ry="12" fill="currentColor" transform="rotate(45 50 50)" />
        <ellipse cx="70" cy="50" rx="30" ry="10" fill="currentColor" transform="rotate(20 70 50)" />
        <ellipse cx="30" cy="50" rx="30" ry="10" fill="currentColor" transform="rotate(-20 30 50)" />
      </svg>

      {/* Plate */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-36 h-36" viewBox="0 0 120 120">
          {/* Plate base */}
          <ellipse cx="60" cy="65" rx="50" ry="15" fill="#E2E8F0" />
          <ellipse cx="60" cy="60" rx="50" ry="45" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          <ellipse cx="60" cy="60" rx="42" ry="38" fill="none" stroke="#E2E8F0" strokeWidth="1" />

          {/* Food items - tropical + protein */}
          {/* Grilled chicken/fish */}
          <ellipse cx="55" cy="55" rx="18" ry="12" fill="#D97706" transform="rotate(-10 55 55)" />
          <path d="M40,50 Q55,45 70,52" stroke="#92400E" strokeWidth="1" fill="none" />
          <path d="M42,55 Q55,50 68,57" stroke="#92400E" strokeWidth="1" fill="none" />

          {/* Rice/grains */}
          <ellipse cx="75" cy="65" rx="12" ry="8" fill="#FEFCE8" />
          <g fill="#FEF3C7">
            <circle cx="72" cy="63" r="2" />
            <circle cx="76" cy="65" r="2" />
            <circle cx="78" cy="68" r="2" />
          </g>

          {/* Tropical fruits/veggies */}
          <circle cx="42" cy="70" r="6" fill="#22C55E" /> {/* Avocado */}
          <ellipse cx="42" cy="70" rx="3" ry="4" fill="#4ADE80" />

          {/* Pineapple slice */}
          <path d="M30,55 L35,50 L40,55 L35,60 Z" fill="#FCD34D" className="animate-tribal-pulse" />
        </svg>
      </div>

      {/* Macro rings */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-around">
        <div className="flex flex-col items-center">
          <svg className="w-10 h-10" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="none" stroke="#E2E8F0" strokeWidth="3" />
            <circle
              cx="20" cy="20" r="16"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray="75 100"
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
              className="animate-tribal-pulse"
            />
          </svg>
          <span className="text-xs font-bold text-protein mt-1">145g</span>
        </div>
        <div className="flex flex-col items-center">
          <svg className="w-10 h-10" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="none" stroke="#E2E8F0" strokeWidth="3" />
            <circle
              cx="20" cy="20" r="16"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3"
              strokeDasharray="60 100"
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
              className="animate-tribal-pulse"
              style={{ animationDelay: "0.2s" }}
            />
          </svg>
          <span className="text-xs font-bold text-carbs mt-1">180g</span>
        </div>
        <div className="flex flex-col items-center">
          <svg className="w-10 h-10" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="none" stroke="#E2E8F0" strokeWidth="3" />
            <circle
              cx="20" cy="20" r="16"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="3"
              strokeDasharray="45 100"
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
              className="animate-tribal-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </svg>
          <span className="text-xs font-bold text-fat mt-1">65g</span>
        </div>
      </div>
    </div>
  );
}

// Social Community - Island gathering with connections
export function CommunityIllustration() {
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-xl">
      {/* Beach/island background */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="beachSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="60%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
        <rect width="200" height="120" fill="url(#beachSky)" />

        {/* Beach sand */}
        <ellipse cx="100" cy="130" rx="120" ry="50" fill="#FCD34D" />
        <ellipse cx="100" cy="125" rx="100" ry="40" fill="#FBBF24" opacity="0.5" />

        {/* Ocean waves */}
        <g className="animate-wave-slow">
          <path d="M-20,85 Q30,78 70,85 T150,85 T230,85 L230,100 L-20,100 Z" fill="#0EA5E9" opacity="0.8" />
        </g>
      </svg>

      {/* Palm trees */}
      <svg className="absolute left-2 bottom-6 w-12 h-24 animate-sway" viewBox="0 0 40 80">
        <path d="M20,80 Q18,55 20,35" stroke="#92400E" strokeWidth="3" fill="none" />
        <g transform="translate(20,32)">
          <ellipse cx="-10" cy="-3" rx="14" ry="4" fill="#15803D" transform="rotate(-25)" />
          <ellipse cx="10" cy="-3" rx="14" ry="4" fill="#16A34A" transform="rotate(25)" />
          <ellipse cx="0" cy="-6" rx="12" ry="4" fill="#22C55E" transform="rotate(-5)" />
        </g>
      </svg>

      <svg className="absolute right-2 bottom-8 w-10 h-20 animate-sway" style={{ animationDelay: "0.5s" }} viewBox="0 0 40 80">
        <path d="M20,80 Q19,60 20,40" stroke="#92400E" strokeWidth="2.5" fill="none" />
        <g transform="translate(20,38)">
          <ellipse cx="-8" cy="-2" rx="12" ry="3" fill="#15803D" transform="rotate(-30)" />
          <ellipse cx="8" cy="-2" rx="12" ry="3" fill="#16A34A" transform="rotate(30)" />
          <ellipse cx="0" cy="-5" rx="10" ry="3" fill="#22C55E" />
        </g>
      </svg>

      {/* Connected people/avatars */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-40 h-32" viewBox="0 0 160 100">
          {/* Connection lines */}
          <line x1="40" y1="45" x2="80" y2="35" stroke="#F97316" strokeWidth="2" strokeDasharray="4,4" className="animate-gradient-flow" />
          <line x1="120" y1="45" x2="80" y2="35" stroke="#F97316" strokeWidth="2" strokeDasharray="4,4" className="animate-gradient-flow" />
          <line x1="40" y1="45" x2="80" y2="70" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" className="animate-gradient-flow" />
          <line x1="120" y1="45" x2="80" y2="70" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" className="animate-gradient-flow" />

          {/* Center person - larger */}
          <circle cx="80" cy="35" r="15" fill="url(#avatarGradient1)" className="animate-tribal-pulse" />
          <circle cx="80" cy="28" r="6" fill="#FCD34D" />
          <path d="M74,35 Q80,42 86,35" fill="#FCD34D" />

          {/* Left person */}
          <circle cx="40" cy="45" r="12" fill="url(#avatarGradient2)" className="animate-tribal-pulse" style={{ animationDelay: "0.3s" }} />
          <circle cx="40" cy="40" r="5" fill="#FCD34D" />
          <path d="M35,46 Q40,51 45,46" fill="#FCD34D" />

          {/* Right person */}
          <circle cx="120" cy="45" r="12" fill="url(#avatarGradient3)" className="animate-tribal-pulse" style={{ animationDelay: "0.6s" }} />
          <circle cx="120" cy="40" r="5" fill="#FCD34D" />
          <path d="M115,46 Q120,51 125,46" fill="#FCD34D" />

          {/* Bottom person */}
          <circle cx="80" cy="70" r="12" fill="url(#avatarGradient2)" className="animate-tribal-pulse" style={{ animationDelay: "0.9s" }} />
          <circle cx="80" cy="65" r="5" fill="#FCD34D" />
          <path d="M75,71 Q80,76 85,71" fill="#FCD34D" />

          <defs>
            <linearGradient id="avatarGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <linearGradient id="avatarGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="avatarGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hearts/reactions floating */}
      <div className="absolute top-4 right-8 text-red-500 animate-float" style={{ animationDelay: "0s" }}>❤️</div>
      <div className="absolute top-8 left-12 text-xl animate-float" style={{ animationDelay: "0.5s" }}>💪</div>
      <div className="absolute top-6 right-16 text-lg animate-float" style={{ animationDelay: "1s" }}>🔥</div>
    </div>
  );
}

// Music Integration - Waves + sound waves + gym
export function MusicIllustration() {
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-xl bg-gradient-to-br from-purple-900 to-slate-900">
      {/* Ocean waves at bottom */}
      <svg className="absolute bottom-0 left-0 w-full h-20" viewBox="0 0 200 60" preserveAspectRatio="none">
        <g className="animate-wave-slow">
          <path d="M-20,30 Q30,20 70,30 T150,30 T230,30 L230,60 L-20,60 Z" fill="#7C3AED" opacity="0.3" />
        </g>
        <g className="animate-wave-medium">
          <path d="M-20,35 Q25,28 60,35 T140,35 T220,35 L220,60 L-20,60 Z" fill="#8B5CF6" opacity="0.4" />
        </g>
        <g className="animate-wave-fast">
          <path d="M-20,40 Q30,35 65,40 T145,40 T225,40 L225,60 L-20,60 Z" fill="#A78BFA" opacity="0.5" />
        </g>
      </svg>

      {/* Sound wave visualizer */}
      <div className="absolute inset-0 flex items-center justify-center gap-1">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-2 bg-gradient-to-t from-green-500 to-green-300 rounded-full"
            style={{
              height: `${20 + Math.sin(i * 0.8) * 30 + 20}px`,
              animation: `soundBar 0.8s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Dumbbell silhouette overlay */}
      <svg className="absolute bottom-8 right-4 w-16 h-8 text-white/20" viewBox="0 0 80 30">
        <rect x="5" y="10" width="10" height="10" rx="2" fill="currentColor" />
        <rect x="15" y="8" width="50" height="14" rx="2" fill="currentColor" />
        <rect x="65" y="10" width="10" height="10" rx="2" fill="currentColor" />
      </svg>

      {/* Music notes */}
      <div className="absolute top-4 left-6 text-2xl animate-float">🎵</div>
      <div className="absolute top-8 right-10 text-xl animate-float" style={{ animationDelay: "0.3s" }}>🎶</div>

      {/* Now playing badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        NOW PLAYING
      </div>

      <style jsx>{`
        @keyframes soundBar {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

// Personal Records - Trophy with tropical celebration
export function PRIllustration() {
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-xl">
      {/* Celebration background */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="celebrationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#F97316" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="trophyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="120" fill="url(#celebrationGradient)" />

        {/* Glow behind trophy */}
        <circle cx="100" cy="60" r="40" fill="url(#trophyGlow)" className="animate-tribal-pulse" />
      </svg>

      {/* Confetti/celebration particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-float"
          style={{
            left: `${10 + (i * 6)}%`,
            top: `${10 + Math.sin(i) * 20}%`,
            backgroundColor: ['#F97316', '#EF4444', '#F59E0B', '#22C55E', '#3B82F6'][i % 5],
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${2 + Math.random()}s`,
          }}
        />
      ))}

      {/* Trophy */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-24 h-28 animate-float" viewBox="0 0 80 100">
          {/* Trophy cup */}
          <path
            d="M20,15 L20,5 L60,5 L60,15 Q65,15 65,25 L65,35 Q65,45 55,50 L55,60 L25,60 L25,50 Q15,45 15,35 L15,25 Q15,15 20,15"
            fill="url(#trophyGold)"
          />

          {/* Trophy handles */}
          <path d="M15,25 Q5,25 5,35 Q5,45 15,45" fill="none" stroke="url(#trophyGold)" strokeWidth="4" />
          <path d="M65,25 Q75,25 75,35 Q75,45 65,45" fill="none" stroke="url(#trophyGold)" strokeWidth="4" />

          {/* Trophy base */}
          <rect x="30" y="60" width="20" height="8" fill="url(#trophyGold)" />
          <rect x="22" y="68" width="36" height="6" rx="2" fill="#92400E" />
          <rect x="18" y="74" width="44" height="10" rx="3" fill="#78350F" />

          {/* Star on trophy */}
          <polygon
            points="40,20 43,30 53,30 45,36 48,46 40,40 32,46 35,36 27,30 37,30"
            fill="#FEFCE8"
            className="animate-tribal-pulse"
          />

          <defs>
            <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* PR badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse shadow-lg">
        NEW PR! 🏆
      </div>

      {/* Palm leaves framing */}
      <svg className="absolute -bottom-2 -left-4 w-20 h-20 text-green-600/40 animate-sway" viewBox="0 0 80 80">
        <ellipse cx="40" cy="60" rx="30" ry="8" fill="currentColor" transform="rotate(-30 40 60)" />
        <ellipse cx="50" cy="55" rx="25" ry="7" fill="currentColor" transform="rotate(-50 50 55)" />
      </svg>
      <svg className="absolute -bottom-2 -right-4 w-20 h-20 text-green-600/40 animate-sway" style={{ animationDelay: "0.5s" }} viewBox="0 0 80 80">
        <ellipse cx="40" cy="60" rx="30" ry="8" fill="currentColor" transform="rotate(30 40 60)" />
        <ellipse cx="30" cy="55" rx="25" ry="7" fill="currentColor" transform="rotate(50 30 55)" />
      </svg>
    </div>
  );
}
