import { type ArrayBar, type SortStep } from "./types";
import { resetBarStates } from "./utils";

export function getBubbleSortSteps(bars: ArrayBar[]): SortStep[] {
  const steps: SortStep[] = [];
  const currentBars = bars.map((bar) => ({ ...bar }));

  let comparisons = 0;
  let swaps = 0;

  const recordStep = () => {
    steps.push({
      bars: currentBars.map((bar) => ({ ...bar })),
      comparisons,
      swaps,
    });
  };

  recordStep();

  for (let i = 0; i < currentBars.length - 1; i++) {
    for (let j = 0; j < currentBars.length - i - 1; j++) {
      resetBarStates(currentBars);

      currentBars[j].state = "comparing";
      currentBars[j + 1].state = "comparing";
      comparisons++;
      recordStep();

      if (currentBars[j].value > currentBars[j + 1].value) {
        currentBars[j].state = "swapping";
        currentBars[j + 1].state = "swapping";
        recordStep();

        const temp = currentBars[j];
        currentBars[j] = currentBars[j + 1];
        currentBars[j + 1] = temp;
        swaps++;
        recordStep();
      }

      resetBarStates(currentBars);
      recordStep();
    }
    currentBars[currentBars.length - 1 - i].state = "sorted";
    recordStep();
  }

  currentBars.forEach((bar) => {
    bar.state = "sorted";
  });
  recordStep();
  return steps;
}
