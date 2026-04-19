import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const HeroAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleY = interpolate(frame, [0, 0.5 * fps], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [0.3 * fps, 0.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subtitleY = interpolate(frame, [0.3 * fps, 0.8 * fps], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Gradient text highlight animation
  const highlightProgress = interpolate(frame, [0.5 * fps, 1.5 * fps], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // CTA button animation
  const ctaOpacity = interpolate(frame, [0.8 * fps, 1.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const ctaScale = interpolate(frame, [0.8 * fps, 1.2 * fps], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  // Floating particles
  const particleY = interpolate(frame, [0, 3 * fps], [0, -20], {
    extrapolateRight: "extend",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #FFF7ED 0%, #FFFFFF 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(239, 68, 68, 0.2))",
          filter: "blur(60px)",
          transform: `translateY(${particleY}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(249, 115, 22, 0.2))",
          filter: "blur(50px)",
          transform: `translateY(${-particleY}px)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 9999,
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            marginBottom: 32,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#F97316",
            }}
          />
          <span style={{ color: "#F97316", fontWeight: 600, fontSize: 14 }}>
            Now Available on iOS & Android
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#1C1917",
            margin: 0,
            lineHeight: 1.1,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          This is your{" "}
          <span
            style={{
              background: `linear-gradient(135deg, #F97316 0%, #EF4444 ${highlightProgress}%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            gym family
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: "#78716C",
            marginTop: 24,
            marginBottom: 40,
            maxWidth: 600,
            lineHeight: 1.6,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          The fitness + wellness + social platform that helps you achieve{" "}
          <strong style={{ color: "#1C1917" }}>sustainable progress</strong>.
        </p>

        {/* CTA Button */}
        <div
          style={{
            display: "flex",
            gap: 16,
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "16px 32px",
              borderRadius: 9999,
              background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
              color: "white",
              border: "none",
              fontSize: 18,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Download App
          </button>
        </div>
      </div>
    </AbsoluteFill>
  );
};
