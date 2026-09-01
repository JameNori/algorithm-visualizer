import { useMemo, useState } from "react";
import { ArrayBarChart } from "./components/ArrayBarChart";
import { createInitialBars, generateRandomValues } from "./algorithms/utils";
import { getBubbleSortSteps } from "./algorithms/bubbleSort";
import { useSortAnimation } from "./hooks/useSortAnimation";
import { useAutoPlay } from "./hooks/useAutoPlay";

const INITIAL_VALUES = [100, 50, 20, 80, 30];

const SPEED_PRESETS = [
  { label: "0.5x", intervalMs: 600 },
  { label: "1x", intervalMs: 300 },
  { label: "2x", intervalMs: 150 },
] as const;

const BUTTON_BASE =
  "rounded-lg px-4 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40";

const BUTTON_PRIMARY = `${BUTTON_BASE} bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 disabled:hover:bg-blue-600`;

const BUTTON_SECONDARY_BLUE = `${BUTTON_BASE} border border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500 disabled:hover:bg-transparent`;

const BUTTON_SECONDARY_NEUTRAL = `${BUTTON_BASE} border border-gray-400 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-400 disabled:hover:bg-transparent`;

function App() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [speed, setSpeed] = useState(300);
  const steps = useMemo(
    () => getBubbleSortSteps(createInitialBars(values)),
    [values],
  );
  const { currentBars, nextStep, resetStep, isFinished } =
    useSortAnimation(steps);
  const { isPlaying, togglePlay, pause } = useAutoPlay(
    nextStep,
    isFinished,
    speed,
  );

  const handleNext = () => {
    pause();
    nextStep();
  };

  const handleRandomize = () => {
    pause();
    setValues(generateRandomValues(5, 10, 100));
    resetStep();
  };

  return (
    <div className="p-8">
      <ArrayBarChart bars={currentBars} />
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3">
          <button onClick={handleNext} disabled={isFinished} className={BUTTON_PRIMARY}>
            Next
          </button>
          <button
            onClick={togglePlay}
            disabled={isFinished && !isPlaying}
            className={BUTTON_SECONDARY_BLUE}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <div className="flex items-center gap-1 rounded-lg border border-gray-300 p-1">
            {SPEED_PRESETS.map((preset) => (
              <button
                key={preset.intervalMs}
                onClick={() => setSpeed(preset.intervalMs)}
                className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
                  speed === preset.intervalMs
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-8 w-px bg-gray-300" />

        <button onClick={handleRandomize} className={BUTTON_SECONDARY_NEUTRAL}>
          Randomize
        </button>
      </div>
    </div>
  );
}

export default App;
