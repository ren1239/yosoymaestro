"use client";
import React, { useState, useEffect } from "react";
import { easeInOut, motion } from "framer-motion";

interface PixelBackgroundProps {
  menuIsActive: boolean;
}

// Framer motion varient. Controls the opacity and stagger shuffle
const anim = {
  initial: {
    opacity: 0,
  },
  open: (i: any) => ({
    opacity: 1,
    transition: { duration: 0, delay: 0.03 * i, easeInOut },
  }),
  closed: (i: any) => ({
    opacity: 0,
    transition: { duration: 0, delay: 0.03 * i, easeInOut },
  }),
};

// Shuffle logic - shuffle the pixels with an algorithm
const shuffle = (a: any) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

const getBlocks = (menuIsActive: boolean) => {
  const blockSize = window.innerWidth * 0.05;
  const amountOfBlocks = Math.ceil(window.innerHeight / blockSize);
  const delay = shuffle([...Array(amountOfBlocks)].map((_, i) => i));

  return delay.map((randomDelay: any, i: any) => (
    <motion.div
      variants={anim}
      animate={menuIsActive ? "open" : "closed"}
      key={i}
      custom={randomDelay}
      className="h-[5vw] w-full bg-black  border-neutral-700  border-[.5px]"
    />
  ));
};

export default function PixelBackground({
  menuIsActive,
}: PixelBackgroundProps) {
  const [shouldRender, setShouldRender] = useState(menuIsActive);

  useEffect(() => {
    if (menuIsActive) {
      setShouldRender(true);
    } else {
      const timeoutId = setTimeout(() => setShouldRender(false), 500); // Delay in milliseconds
      return () => clearTimeout(timeoutId);
    }
  }, [menuIsActive]);

  return (
    <div
      className={`flex h-screen fixed overflow-hidden z-[2] transition-opacity duration-1000 ${
        menuIsActive ? "opacity-100" : "opacity-0"
      } ${shouldRender ? "block" : "hidden"}`}
    >
      {[...Array(20)].map((_, i) => (
        <div key={i} className="w-[5vw] h-full">
          {getBlocks(menuIsActive)}
        </div>
      ))}
    </div>
  );
}
