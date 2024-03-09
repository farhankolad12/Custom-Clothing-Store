import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer position="top-right" />
      {children}
    </>
  );
}
