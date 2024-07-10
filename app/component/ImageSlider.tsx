"use client";
import React, { useEffect, useRef, useState } from "react";

import { Images } from "../lib/ImageArray";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import Image from "next/image";
import { easeInOut } from "framer-motion/dom";

export default function ImageSlider() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const scrollX = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [yValue, setYValue] = useState<number>(0);

  useMotionValueEvent(scrollX, "change", (latest) => {
    console.log("scrollX", latest);
  });

  useMotionValueEvent(scaleY, "change", (latest) => {
    setYValue(Math.round(latest));
  });

  return (
    <div ref={targetRef} className="h-[400vh] w-screen overflow-clip relative ">
      <div className="h-screen sticky top-0  bg-neutral-100">
        <p className="p-4 font-semibold text-4xl ">{yValue}</p>
        <motion.div
          style={{ translateX: scrollX }}
          className="absolute top-1/2 left-0 transform flex whitespace-nowrap"
        >
          <Collection />
          <Collection />
        </motion.div>
        <ScrollWheel scaleY={scaleY} />
      </div>
    </div>
  );
}

const Collection = () => {
  return (
    <div className={"pl-5 flex gap-5"}>
      {Images.map((image, i) => (
        <motion.div
          whileHover={{ scale: 1.05, transition: { ease: easeInOut } }}
          className="w-[240px] h-[340px] "
        >
          <Image
            className="-translate-y-1/2 transition-transform duration-300"
            src={Images[i]}
            alt="image"
            width={240}
            height={340}
          />
        </motion.div>
      ))}
    </div>
  );
};

const SingleItem = ({ bgProp }: { bgProp: string }) => {
  return <div className={` w-[240px] h-[340px] ${bgProp} -translate-y-1/2`} />;
};

const ScrollWheel = ({ scaleY }: { scaleY: any }) => {
  const lineLength = 30;

  const lines = Array.from({ length: lineLength }, (_, i) => ({
    min: i * (100 / lineLength),
    max: i * (100 / lineLength) + 100 / lineLength + 5,
  }));

  return (
    <div className="flex w-full justify-center absolute bottom-5">
      <div className="left-1/2 flex gap-2">
        {lines.map(({ min, max }, index) => (
          <Line key={index} scaleY={scaleY} min={min} max={max} />
        ))}
      </div>
    </div>
  );
};

const Line = ({
  scaleY,
  min,
  max,
}: {
  scaleY: any;
  min: number;
  max: number;
}) => {
  const scale = useTransform(
    scaleY,
    [min, (max - min) / 2 + min, max],
    [0.5, 1, 0.5]
  );

  return (
    <motion.div
      style={{ scaleY: scale }}
      className="w-[1px] h-[40px] bg-black origin-bottom"
    />
  );
};
