"use client";
import React, { useRef, useState } from "react";
import real from "/public/real.png";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function PixelScroll() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const gridSize = 40;

  const blur = useTransform(scrollYProgress, [0, 1], [0, gridSize]);

  const squares = Array.from({ length: gridSize }, (_, i) => i);

  const [activeSquares, setActiveSquares] = useState<number[]>([]);

  // Randomly generate 10 unique squares to be blurred
  const [blurredSquares, setBlurredSquares] = useState<number[]>(() => {
    const newBlurredSquares: number[] = [];
    while (newBlurredSquares.length < 10) {
      const randomIndex = Math.floor(Math.random() * gridSize);
      if (!newBlurredSquares.includes(randomIndex)) {
        newBlurredSquares.push(randomIndex);
      }
    }
    return newBlurredSquares;
  });

  useMotionValueEvent(blur, "change", (latest: number) => {
    const active = blurredSquares.filter((index) => index < latest);
    setActiveSquares(active);
  });

  return (
    <div ref={targetRef} className="w-screen h-[200vh] relative bg-white">
      <div
        style={{ backgroundImage: `url(${real.src})`, backgroundSize: "cover" }}
        className="h-screen w-screen sticky top-0 overflow-hidden"
      >
        <div className="w-[1600px] h-[1000px] grid [grid-template-columns:repeat(8,_minmax(0,_1fr))] grid-rows-5 gap-1">
          {squares.map((pixel, idx) => (
            <div
              key={idx}
              className={`w-[200px] h-[200px] ${
                activeSquares.includes(idx) ? " " : "backdrop-blur-lg"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
