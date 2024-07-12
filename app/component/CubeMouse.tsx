"use client";
import { motion, MotionValue, useSpring } from "framer-motion";
import React from "react";

export default function CubeMouse({
  x,
  y,
}: {
  x: MotionValue;
  y: MotionValue;
}) {
  return (
    <motion.div
      className="w-8 h-8 bg-black fixed z-[5] "
      style={{ x: x, y: y }}
    />
  );
}
