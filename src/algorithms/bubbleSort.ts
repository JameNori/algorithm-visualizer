import { type ArrayBar } from "./types";
import { resetBarStates } from "./utils";

export function getBubbleSortSteps(bars: ArrayBar[]): ArrayBar[][] {
  const steps: ArrayBar[][] = [];
  const currentBars = bars.map((bar) => ({ ...bar }));
  steps.push(currentBars.map((bar) => ({ ...bar })));

  for (let i = 0; i < currentBars.length - 1; i++) {
    for (let j = 0; j < currentBars.length - i - 1; j++) {
      resetBarStates(currentBars);

      currentBars[j].state = "comparing";
      currentBars[j + 1].state = "comparing";
      steps.push(currentBars.map((bar) => ({ ...bar })));

      if (currentBars[j].value > currentBars[j + 1].value) {
        currentBars[j].state = "swapping";
        currentBars[j + 1].state = "swapping";
        steps.push(currentBars.map((bar) => ({ ...bar })));

        const temp = currentBars[j];
        currentBars[j] = currentBars[j + 1];
        currentBars[j + 1] = temp;
        steps.push(currentBars.map((bar) => ({ ...bar })));
      }

      resetBarStates(currentBars);
      steps.push(currentBars.map((bar) => ({ ...bar })));
    }
    currentBars[currentBars.length - 1 - i].state = "sorted";
    steps.push(currentBars.map((bar) => ({ ...bar })));
  }

  currentBars.forEach((bar) => {
    bar.state = "sorted";
  });
  steps.push(currentBars.map((bar) => ({ ...bar })));

  return steps;
}
