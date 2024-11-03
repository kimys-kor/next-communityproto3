"use client";

import React from "react";
import { BeatLoader } from "react-spinners";

function Loading() {
  return (
    <div className="flex justify-center items-center fixed left-0 top-0 w-full h-full bg-white/50">
      <BeatLoader color="#1939eb" />
    </div>
  );
}

export default Loading;
