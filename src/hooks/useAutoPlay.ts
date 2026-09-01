import { useEffect, useRef, useState } from "react";

export function useAutoPlay(
  nextStep: () => void,
  isFinished: boolean,
  intervalMs = 300,
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const nextStepRef = useRef(nextStep);

  // เก็บ callback ล่าสุดไว้ใน ref — ไม่ให้ effect restart ทุก re-render
  nextStepRef.current = nextStep;

  // interval: เรียก nextStep ซ้ำ ๆ ตอน playing
  useEffect(() => {
    if (!isPlaying || isFinished) return;

    const id = setInterval(() => {
      nextStepRef.current();
    }, intervalMs);

    return () => clearInterval(id);
  }, [isPlaying, isFinished, intervalMs]);

  // จบ animation → หยุด autoplay อัตโนมัติ
  useEffect(() => {
    if (isFinished) {
      setIsPlaying(false);
    }
  }, [isFinished]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const togglePlay = () => setIsPlaying((prev) => !prev);

  return { isPlaying, play, pause, togglePlay };
}
