"use client";

import { Spinner } from "@material-tailwind/react";
import React from "react";

export default function LoadingSkeleton() {
  return (
    <div
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
      className="absolute flex justify-center items-center top-0 left-0 right-0 bottom-0"
    >
      <Spinner className="w-12 h-12" />
    </div>
  );
}
