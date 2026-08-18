import { type ArrayBar } from "./types";

function createInitialBars(values: number[]): ArrayBar[] {
  return values.map((value, index) => ({
    id: index,
    value: value,
    state: "normal",
  }));
}

export { createInitialBars };
