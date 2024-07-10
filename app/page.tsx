"use client";
import { useEffect, useState } from "react";
import ImageSlider from "./component/ImageSlider";
import PixelScroll from "./component/PixelScroll";
import Header from "./component/Header/Header";
import Menu from "./component/Menu/Menu";
import PixelBackground from "./component/PixelBackground/PixelBackground";
import TextRaise from "./component/TextRaise";
import Lenis from "@studio-freight/lenis";
import { useMotionValue, motion, useSpring } from "framer-motion";

export default function Home() {
  const [menuIsActive, setMenuIsActive] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {}, []);

  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  const mousePosition = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };

  const { x, y } = mousePosition;

  const mouseMove = (e: any) => {
    const { clientX, clientY } = e;
    const targetX = clientX - 16;
    const targetY = clientY - 16;

    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
  };

  return (
    <main className="relative" onMouseMove={mouseMove}>
      <motion.div
        className="w-8 h-8 bg-black fixed z-[5]"
        style={{ x: x, y: y }}
      />
      <Header menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive} />
      <Menu menuIsActive={menuIsActive} />
      <PixelBackground menuIsActive={menuIsActive} />
      <TextRaise />
      <ImageSlider />
      <div className="bg-red-300 h-[50vh]" />
    </main>
  );
}
