import { useEffect, useRef } from "react";
import { STATE_COLORS, type ArrayBar } from "../algorithms/types";

interface ArrayBarChartProps {
  bars: ArrayBar[];
}

const BAR_GAP = 4; // px between bars

export function ArrayBarChart({ bars }: ArrayBarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || bars.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scale the backing store for crisp rendering on high-DPI screens
    // (e.g. MacBook Retina). Without this the canvas looks blurry.
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const maxValue = Math.max(...bars.map((bar) => bar.value));
    const barWidth = (cssWidth - BAR_GAP * (bars.length - 1)) / bars.length;

    bars.forEach((bar, index) => {
      const barHeight = (bar.value / maxValue) * cssHeight;
      const x = index * (barWidth + BAR_GAP);
      const y = cssHeight - barHeight;

      ctx.fillStyle = STATE_COLORS[bar.state];
      ctx.fillRect(x, y, barWidth, barHeight);
    });
  }, [bars]);

  return (
    <canvas ref={canvasRef} className="w-full h-64 rounded-lg bg-neutral-900/5">
      Your browser does not support the Canvas API needed to display this chart.
    </canvas>
  );
}
