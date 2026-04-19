import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

type ProgressRingAnimationProps = {
  progress?: number;
  label?: string;
  color?: string;
  darkMode?: boolean;
};

export const ProgressRingAnimation: React.FC<ProgressRingAnimationProps> = ({
  progress = 78,
  label = "Daily Goal",
  color = "#F97316",
  darkMode = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const size = 300;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Animate progress from 0 to target
  const animatedProgress = interpolate(frame, [0, 2 * fps], [0, progress], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const offset = circumference - (animatedProgress / 100) * circumference;

  // Number counter animation
  const displayNumber = Math.round(animatedProgress);

  // Pulse animation at the end
  const pulseScale = interpolate(
    frame,
    [2 * fps, 2.2 * fps, 2.4 * fps],
    [1, 1.05, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    }
  );

  // Glow effect
  const glowOpacity = interpolate(frame, [1.5 * fps, 2.5 * fps], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgColor = darkMode ? "#0B1622" : "#FFFFFF";
  const textColor = darkMode ? "#F8FAFC" : "#1C1917";
  const mutedColor = darkMode ? "#94A3B8" : "#78716C";
  const trackColor = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          transform: `scale(${pulseScale})`,
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            inset: -20,
            borderRadius: "50%",
            background: color,
            filter: "blur(40px)",
            opacity: glowOpacity,
          }}
        />

        {/* SVG Ring */}
        <svg
          width={size}
          height={size}
          style={{ transform: "rotate(-90deg)", position: "relative", zIndex: 1 }}
        >
          {/* Background track */}
          <circle
            stroke={trackColor}
            fill="none"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress arc */}
          <circle
            stroke={color}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{
              filter: `drop-shadow(0 0 10px ${color})`,
            }}
          />
        </svg>

        {/* Center content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: textColor,
              lineHeight: 1,
            }}
          >
            {displayNumber}%
          </span>
          <span
            style={{
              fontSize: 18,
              color: mutedColor,
              marginTop: 8,
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
