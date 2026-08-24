import { useMemo } from "react";
import { ArrayBarChart } from "./components/ArrayBarChart";
import { createInitialBars } from "./algorithms/utils";
import { getBubbleSortSteps } from "./algorithms/bubbleSort";
import { useSortAnimation } from "./hooks/useSortAnimation";

const INITIAL_VALUES = [100, 50, 20, 80, 30];

function App() {
  // useMemo + empty deps: compute the full step list once, not on every
  // re-render. useSortAnimation only cares about navigating the result.
  const steps = useMemo(
    () => getBubbleSortSteps(createInitialBars(INITIAL_VALUES)),
    [],
  );
  const { currentBars, nextStep, isFinished } = useSortAnimation(steps);

  return (
    <div className="p-8">
      <ArrayBarChart bars={currentBars} />
      <button
        onClick={nextStep}
        disabled={isFinished}
        className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

export default App;
