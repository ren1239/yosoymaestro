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

  const yTransform = useTransform(scrollYProgress, [0, 1], [0, 100]);

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
        <motion.div style={{ y: yTransform }}>
          <LetterStagger scrollYProgress={scrollYProgress}>
            MAESTRO
          </LetterStagger>
        </motion.div>
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
  // Create an array of y transforms for each letter
  // const yTransforms = children
  //   .split("")
  //   .map(() =>
  //     useTransform(
  //       scrollYProgress,
  //       [0, 1],
  //       [0, Math.floor(Math.random() * -175) + 25]
  //     )
  //   );

  return (
    <h2 className="flex">
      {children.split("").map((letter, i) => (
        <motion.p style={{}} key={i}>
          {letter}
        </motion.p>
      ))}
    </h2>
  );
};
