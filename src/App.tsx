import { useMemo, useState } from "react";
import { ArrayBarChart } from "./components/ArrayBarChart";
import { createInitialBars, generateRandomValues } from "./algorithms/utils";
import { getBubbleSortSteps } from "./algorithms/bubbleSort";
import { useSortAnimation } from "./hooks/useSortAnimation";

const INITIAL_VALUES = [100, 50, 20, 80, 30];

function App() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const steps = useMemo(
    () => getBubbleSortSteps(createInitialBars(values)),
    [values],
  );
  const { currentBars, nextStep, resetStep, isFinished } =
    useSortAnimation(steps);
  const handleRandomize = () => {
    setValues(generateRandomValues(5, 10, 100));
    resetStep();
  };

  return (
    <div className="p-8">
      <ArrayBarChart bars={currentBars} />
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={nextStep}
          disabled={isFinished}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Next
        </button>
        <button
          onClick={handleRandomize}
          className="rounded-lg border border-blue-600 px-4 py-2 font-medium text-blue-600 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Randomize
        </button>
      </div>
    </div>
  );
}

export default App;
