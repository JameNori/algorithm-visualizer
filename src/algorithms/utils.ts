import { type ArrayBar } from "./types";

function createInitialBars(values: number[]): ArrayBar[] {
  return values.map((value, index) => ({
    id: index,
    value: value,
    state: "normal",
  }));
}

function resetBarStates(bars: ArrayBar[]): void {
  bars.forEach((bar) => {
    if (bar.state !== "sorted") {
      bar.state = "normal";
    }
  });
}

export { createInitialBars, resetBarStates };
