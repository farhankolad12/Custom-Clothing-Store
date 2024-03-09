import { ReactNode } from "react";
import "../globals.css";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clothing Store - Admin Login",
  description: "Clothing Store - Admin Login",
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main
      className="d-flex flex-lg-row flex-column justify-content-center align-items-center my-auto w-100 px-4 py-5"
      style={{ height: "100vh" }}
    >
      <div className="d-flex flex-lg-row flex-column">
        <div className="w-100">
          <Image
            className="w-100  rounded-start-2"
            src="/login.jpeg"
            width={0}
            height={600}
            unoptimized
            alt="Login"
          />
        </div>
        <div
          style={{ backgroundColor: "#1f2937" }}
          className="p-5 flex flex-col align-items-center justify-content-center rounded-end-2 w-100"
        >
          {children}
        </div>
      </div>
    </main>
  );
}
