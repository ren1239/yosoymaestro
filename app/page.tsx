'use client';
import ImageSlider from "./component/ImageSlider";
import Header from "./component/Header/Header";
import Menu from "./component/Menu/Menu";
import TextRaise from "./component/TextRaise";
import { useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { MenuContext } from "./component/context/menu.context";
import CubeMouse from "./component/CubeMouse";

const PixelBackground = dynamic(
  () => import("./component/PixelBackground/PixelBackground"),
  { ssr: false }
);

const LenisScroll = dynamic(() => import('./component/LenisScroll'), { ssr: false });

export default function Home() {
  const { menuIsActive, setMenuIsActive } = useContext(MenuContext);

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
      <LenisScroll />
      <CubeMouse x={x} y={y} />
      <Header menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive} />
      <Menu menuIsActive={menuIsActive} />
      <PixelBackground menuIsActive={menuIsActive} />
      <TextRaise />
      <ImageSlider />
      <div className="bg-red-300 h-[50vh]" />
    </main>
  );
}
