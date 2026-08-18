type BarState = "normal" | "comparing" | "swapping" | "sorted";

const STATE_COLORS: Record<BarState, string> = {
  normal: "#2a78d6", // neutral blue - default state
  comparing: "#fab219", // status "warning" - actively being compared
  swapping: "#d03b3b", // status "critical" - actively being swapped
  sorted: "#0ca30c", // status "good" - finished, final position
};

interface ArrayBar {
  id: number;
  value: number;
  state: BarState;
}

export { type BarState, STATE_COLORS, type ArrayBar };
