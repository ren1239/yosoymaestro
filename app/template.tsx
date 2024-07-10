import React from "react";
import { ShuffleLoaderSection } from "./component/ShuffleLoader/ShuffleLoader";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ShuffleLoaderSection />
      {children}
    </div>
  );
}
