import "./index.css";
import { Composition, Folder, Still } from "remotion";
import { HeroAnimation } from "./compositions/HeroAnimation";
import { ProgressRingAnimation } from "./compositions/ProgressRingAnimation";
import { MacroAnimation } from "./compositions/MacroAnimation";
import { PRCelebration } from "./compositions/PRCelebration";
import { WorkoutSummary } from "./compositions/WorkoutSummary";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Website-Graphics">
        {/* Hero Animation - for website header */}
        <Composition
          id="HeroAnimation"
          component={HeroAnimation}
          durationInFrames={90}
          fps={30}
          width={1920}
          height={1080}
        />

        {/* Progress Ring - light mode */}
        <Composition
          id="ProgressRing-Light"
          component={ProgressRingAnimation}
          durationInFrames={90}
          fps={30}
          width={600}
          height={600}
          defaultProps={{
            progress: 78,
            label: "Daily Goal",
            color: "#F97316",
            darkMode: false,
          }}
        />

        {/* Progress Ring - dark mode */}
        <Composition
          id="ProgressRing-Dark"
          component={ProgressRingAnimation}
          durationInFrames={90}
          fps={30}
          width={600}
          height={600}
          defaultProps={{
            progress: 78,
            label: "Daily Goal",
            color: "#F97316",
            darkMode: true,
          }}
        />

        {/* Macro Animation - light mode */}
        <Composition
          id="MacroAnimation-Light"
          component={MacroAnimation}
          durationInFrames={90}
          fps={30}
          width={800}
          height={600}
          defaultProps={{
            darkMode: false,
          }}
        />

        {/* Macro Animation - dark mode */}
        <Composition
          id="MacroAnimation-Dark"
          component={MacroAnimation}
          durationInFrames={90}
          fps={30}
          width={800}
          height={600}
          defaultProps={{
            darkMode: true,
          }}
        />
      </Folder>

      <Folder name="Social-Graphics">
        {/* PR Celebration */}
        <Composition
          id="PRCelebration"
          component={PRCelebration}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1080}
          defaultProps={{
            exercise: "Bench Press",
            weight: "225 lbs",
            previousPR: "215 lbs",
          }}
        />

        {/* Workout Summary */}
        <Composition
          id="WorkoutSummary"
          component={WorkoutSummary}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1350}
          defaultProps={{
            workoutName: "Push Day",
            duration: "52 min",
            totalVolume: "24,500 lbs",
          }}
        />
      </Folder>

      <Folder name="Stills">
        {/* Static images for website */}
        <Still
          id="ProgressRing-Still-Light"
          component={ProgressRingAnimation}
          width={600}
          height={600}
          defaultProps={{
            progress: 78,
            label: "Daily Goal",
            color: "#F97316",
            darkMode: false,
          }}
        />

        <Still
          id="ProgressRing-Still-Dark"
          component={ProgressRingAnimation}
          width={600}
          height={600}
          defaultProps={{
            progress: 78,
            label: "Daily Goal",
            color: "#F97316",
            darkMode: true,
          }}
        />

        <Still
          id="Macro-Still-Light"
          component={MacroAnimation}
          width={800}
          height={600}
          defaultProps={{
            darkMode: false,
          }}
        />

        <Still
          id="Macro-Still-Dark"
          component={MacroAnimation}
          width={800}
          height={600}
          defaultProps={{
            darkMode: true,
          }}
        />
      </Folder>
    </>
  );
};
