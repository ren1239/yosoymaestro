import React, { useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

export default function TextRaise() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={targetRef}
      className="relative h-[20vh] md:h-[45vh] bg-neutral-100 overflow-clip w-full flex items-end justify-center"
    >
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "37%", transition: { duration: 1.5, delay: 0.5 } }}
        className="text-7xl md:text-[16rem] font-bold text-center"
      >
        <LetterStagger scrollYProgress={scrollYProgress}>MAESTRO</LetterStagger>
      </motion.div>
    </div>
  );
}

const LetterStagger = ({
  children,
  scrollYProgress,
}: {
  children: string;
  scrollYProgress: MotionValue;
}) => {
  return (
    <h2 className="flex">
      {children.split("").map((letter, i) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [0, Math.floor(Math.random() * -175) + 25]
        );

        // Log the random transformation values for each letter
        useMotionValueEvent(y, "change", (latest) => {
          console.log(
            `Letter: ${letter}, Index: ${i}, Random Value: ${latest}`
          );
        });

        return (
          <motion.p style={{ y: y }} key={i}>
            {letter}
          </motion.p>
        );
      })}
    </h2>
  );
};