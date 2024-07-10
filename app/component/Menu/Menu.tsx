import React from "react";
import { motion } from "framer-motion";

const anim = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export default function index({ menuIsActive }: { menuIsActive: boolean }) {
  return (
    <motion.div
      className={`fixed flex flex-col items-center justify-center h-[90vh] w-full z-[3] text-white m-1 text-5xl md:text-9xl md:tracking-[-.5rem] font-bold ${
        menuIsActive ? "block" : "hidden"
      }`}
      variants={anim}
      initial="initial"
      animate={menuIsActive ? "open" : "closed"}
    >
      <p>HOME</p>
      <p>ABOUT</p>
      <p>STORE</p>
    </motion.div>
  );
}
