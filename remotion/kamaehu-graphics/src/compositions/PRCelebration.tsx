import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  random,
} from "remotion";

type PRCelebrationProps = {
  exercise?: string;
  weight?: string;
  previousPR?: string;
};

export const PRCelebration: React.FC<PRCelebrationProps> = ({
  exercise = "Bench Press",
  weight = "225 lbs",
  previousPR = "215 lbs",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Trophy entrance
  const trophyScale = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const trophyRotate = interpolate(frame, [0, 0.5 * fps], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  // Text animations
  const titleOpacity = interpolate(frame, [0.3 * fps, 0.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0.3 * fps, 0.6 * fps], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const weightScale = interpolate(frame, [0.5 * fps, 0.8 * fps], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const weightOpacity = interpolate(frame, [0.5 * fps, 0.7 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowIntensity = interpolate(
    frame,
    [0.8 * fps, 1.2 * fps, 1.6 * fps, 2 * fps],
    [0.3, 0.6, 0.3, 0.6],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "extend",
    }
  );

  // Confetti particles
  const particles = Array.from({ length: 30 }).map((_, i) => {
    const startX = random(`x-${i}`) * width;
    const startY = -50;
    const endY = height + 50;
    const rotation = random(`rot-${i}`) * 720;
    const size = 8 + random(`size-${i}`) * 12;
    const delay = random(`delay-${i}`) * 0.5;

    const colors = ["#F97316", "#EF4444", "#F59E0B", "#FFD700", "#22C55E"];
    const color = colors[Math.floor(random(`color-${i}`) * colors.length)];

    const progress = interpolate(
      frame,
      [(0.3 + delay) * fps, (2.5 + delay) * fps],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    const y = interpolate(progress, [0, 1], [startY, endY]);
    const x = startX + Math.sin(progress * 10 + i) * 30;
    const rotate = rotation * progress;
    const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return { x, y, rotate, size, color, opacity };
  });

  // Stars burst
  const stars = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const delay = i * 0.05;

    const distance = interpolate(
      frame,
      [(0.4 + delay) * fps, (1 + delay) * fps],
      [0, 150],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      }
    );

    const opacity = interpolate(
      frame,
      [(0.4 + delay) * fps, (0.6 + delay) * fps, (0.9 + delay) * fps, (1 + delay) * fps],
      [0, 1, 1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y, opacity };
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0B1622 0%, #132A3E 100%)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255, 215, 0, ${glowIntensity}) 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Confetti */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: random(`shape-${i}`) > 0.5 ? "50%" : "2px",
            transform: `rotate(${p.rotate}deg)`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Stars burst */}
      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          style={{
            position: "absolute",
            transform: `translate(${star.x}px, ${star.y}px)`,
            opacity: star.opacity,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFD700">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ))}

      {/* Trophy */}
      <div
        style={{
          transform: `scale(${trophyScale}) rotate(${trophyRotate}deg)`,
          marginBottom: 24,
          filter: `drop-shadow(0 0 30px rgba(255, 215, 0, ${glowIntensity}))`,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="#FFD700">
          <path d="M12 8.5l1.75 3.58 3.95.58-2.85 2.79.67 3.95L12 17.17l-3.52 1.85.67-3.95-2.85-2.79 3.95-.58L12 8.5zm0-6.5l-2.4 4.88L4 7.8l3.6 3.51-.85 4.96L12 13.5l5.25 2.77-.85-4.96 3.6-3.51-5.6-.82L12 2z" />
        </svg>
      </div>

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#FFD700",
            marginBottom: 8,
            textTransform: "uppercase",
            letterSpacing: 4,
          }}
        >
          New Personal Record!
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#F8FAFC",
            marginBottom: 16,
          }}
        >
          {exercise}
        </div>
      </div>

      {/* Weight */}
      <div
        style={{
          opacity: weightOpacity,
          transform: `scale(${weightScale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
          }}
        >
          {weight}
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#94A3B8",
            marginTop: 12,
          }}
        >
          Previous: {previousPR}
        </div>
      </div>
    </AbsoluteFill>
  );
};
