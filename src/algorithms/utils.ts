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

function generateRandomValues(
  count: number,
  min: number,
  max: number,
): number[] {
  const values: number[] = [];
  for (let i = 0; i < count; i++) {
    values.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return values;
}

export { createInitialBars, resetBarStates, generateRandomValues };
