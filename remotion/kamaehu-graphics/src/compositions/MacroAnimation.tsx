import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

type MacroData = {
  label: string;
  current: number;
  target: number;
  color: string;
  unit?: string;
};

type MacroAnimationProps = {
  macros?: MacroData[];
  darkMode?: boolean;
};

const defaultMacros: MacroData[] = [
  { label: "Protein", current: 142, target: 180, color: "#3B82F6", unit: "g" },
  { label: "Carbs", current: 220, target: 280, color: "#22C55E", unit: "g" },
  { label: "Fat", current: 58, target: 70, color: "#F59E0B", unit: "g" },
];

export const MacroAnimation: React.FC<MacroAnimationProps> = ({
  macros = defaultMacros,
  darkMode = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgColor = darkMode ? "#0B1622" : "#FFFFFF";
  const cardBg = darkMode ? "#0F1D2E" : "#FFF7ED";
  const textColor = darkMode ? "#F8FAFC" : "#1C1917";
  const mutedColor = darkMode ? "#94A3B8" : "#78716C";
  const trackColor = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Card */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: 32,
          padding: 48,
          width: "100%",
          maxWidth: 500,
          boxShadow: darkMode
            ? "0 20px 60px rgba(0,0,0,0.5)"
            : "0 20px 60px rgba(249, 115, 22, 0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: textColor,
              margin: 0,
            }}
          >
            Today&apos;s Macros
          </h2>
          <span
            style={{
              fontSize: 14,
              color: "#F97316",
              fontWeight: 600,
            }}
          >
            On Track
          </span>
        </div>

        {/* Macro bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {macros.map((macro, index) => {
            const staggerDelay = index * 0.2;
            const percentage = (macro.current / macro.target) * 100;

            // Animated width
            const animatedWidth = interpolate(
              frame,
              [(0.5 + staggerDelay) * fps, (1.5 + staggerDelay) * fps],
              [0, percentage],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }
            );

            // Animated number
            const animatedValue = interpolate(
              frame,
              [(0.5 + staggerDelay) * fps, (1.5 + staggerDelay) * fps],
              [0, macro.current],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }
            );

            // Entry animation
            const entryOpacity = interpolate(
              frame,
              [staggerDelay * fps, (0.5 + staggerDelay) * fps],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            const entryY = interpolate(
              frame,
              [staggerDelay * fps, (0.5 + staggerDelay) * fps],
              [20, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }
            );

            return (
              <div
                key={macro.label}
                style={{
                  opacity: entryOpacity,
                  transform: `translateY(${entryY}px)`,
                }}
              >
                {/* Labels */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: textColor,
                    }}
                  >
                    {macro.label}
                  </span>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: mutedColor,
                    }}
                  >
                    {Math.round(animatedValue)}
                    {macro.unit} / {macro.target}
                    {macro.unit}
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    height: 12,
                    backgroundColor: trackColor,
                    borderRadius: 6,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${animatedWidth}%`,
                      backgroundColor: macro.color,
                      borderRadius: 6,
                      boxShadow: `0 0 20px ${macro.color}40`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Calories */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 24,
            borderTop: `1px solid ${trackColor}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 16, color: mutedColor }}>Total Calories</span>
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: textColor,
            }}
          >
            1,842 / 2,100
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
