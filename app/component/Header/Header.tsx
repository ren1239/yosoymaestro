import React from "react";

type HeaderProps = {
  menuIsActive: boolean;
  setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Index({ menuIsActive, setMenuIsActive }: HeaderProps) {
  return (
    <div className="fixed w-full h-16  overflow-clip flex items-center px-2 z-[5] justify-end">
      <h1 className="absolute top-4 left-1/2 -translate-x-1/2">MAESTRO</h1>
      <button
        className=" text-center w-6 h-6 rounded-full text-white bg-black "
        onClick={() => {
          setMenuIsActive(!menuIsActive);
        }}
      >
        x
      </button>
    </div>
  );
}
