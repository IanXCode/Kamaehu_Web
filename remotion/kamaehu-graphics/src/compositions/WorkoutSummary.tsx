import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

type ExerciseData = {
  name: string;
  sets: number;
  reps: string;
  weight: string;
  isPR?: boolean;
};

type WorkoutSummaryProps = {
  workoutName?: string;
  duration?: string;
  exercises?: ExerciseData[];
  totalVolume?: string;
};

const defaultExercises: ExerciseData[] = [
  { name: "Bench Press", sets: 4, reps: "8-10", weight: "185 lbs", isPR: true },
  { name: "Incline DB Press", sets: 3, reps: "10-12", weight: "65 lbs" },
  { name: "Cable Flies", sets: 3, reps: "12-15", weight: "25 lbs" },
  { name: "Tricep Pushdown", sets: 3, reps: "12-15", weight: "45 lbs" },
];

export const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({
  workoutName = "Push Day",
  duration = "52 min",
  exercises = defaultExercises,
  totalVolume = "24,500 lbs",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerY = interpolate(frame, [0, 0.5 * fps], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0B1622 0%, #0F1D2E 100%)",
        padding: 60,
        justifyContent: "flex-start",
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
            </svg>
          </div>
          <div>
            <h1
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#F8FAFC",
                margin: 0,
              }}
            >
              {workoutName}
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "#94A3B8",
                margin: 0,
              }}
            >
              Workout Complete
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 40,
        }}
      >
        {[
          { label: "Duration", value: duration, icon: "⏱️" },
          { label: "Exercises", value: `${exercises.length}`, icon: "💪" },
          { label: "Volume", value: totalVolume, icon: "📊" },
        ].map((stat, index) => {
          const delay = 0.2 + index * 0.15;
          const statOpacity = interpolate(
            frame,
            [delay * fps, (delay + 0.3) * fps],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const statScale = interpolate(
            frame,
            [delay * fps, (delay + 0.3) * fps],
            [0.8, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            }
          );

          return (
            <div
              key={stat.label}
              style={{
                flex: 1,
                backgroundColor: "#132A3E",
                borderRadius: 16,
                padding: 20,
                textAlign: "center",
                opacity: statOpacity,
                transform: `scale(${statScale})`,
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#F8FAFC",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: "#94A3B8" }}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Exercise list */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#94A3B8",
            marginBottom: 16,
          }}
        >
          Exercises
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {exercises.map((exercise, index) => {
            const delay = 0.5 + index * 0.12;
            const exerciseOpacity = interpolate(
              frame,
              [delay * fps, (delay + 0.3) * fps],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const exerciseX = interpolate(
              frame,
              [delay * fps, (delay + 0.3) * fps],
              [30, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }
            );

            return (
              <div
                key={exercise.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#1A3A4F",
                  borderRadius: 12,
                  padding: "16px 20px",
                  opacity: exerciseOpacity,
                  transform: `translateX(${exerciseX}px)`,
                  border: exercise.isPR ? "2px solid #FFD700" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: "rgba(249, 115, 22, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>🏋️</span>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#F8FAFC",
                        }}
                      >
                        {exercise.name}
                      </span>
                      {exercise.isPR && (
                        <span
                          style={{
                            fontSize: 12,
                            backgroundColor: "#FFD700",
                            color: "#1C1917",
                            padding: "2px 8px",
                            borderRadius: 4,
                            fontWeight: 700,
                          }}
                        >
                          PR
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: 14, color: "#94A3B8" }}>
                      {exercise.sets} sets × {exercise.reps}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#F97316",
                  }}
                >
                  {exercise.weight}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
