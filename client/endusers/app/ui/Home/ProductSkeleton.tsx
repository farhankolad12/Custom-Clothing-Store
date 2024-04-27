import { ThemeProvider } from "@material-tailwind/react";
import React from "react";

export default function ProductSkeleton() {
  return (
    <ThemeProvider>
      <div
        className="group p-6 relative border border-grey hover:border-black cursor-pointer flex flex-col justify-between animate-pulse"
        style={{ height: "600px" }}
      >
        <button className="h-14 w-14 rounded-full bg-gray-300 shadow-none hover:shadow-none absolute right-5 top-2">
          &nbsp;
        </button>
        {/* <WishlistButton
          classes="bg-transparent w-14 h-14 rounded-full items-center hover:bg-black hover:text-white absolute right-5 top-5 cursor-pointer z-50"
          product={product}
        /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-full w-full text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>

        <div className="flex justify-between items-end mt-4 w-full">
          <div className="flex flex-col gap-2 w-full h-full">
            <div className="h-2 w-28 rounded-full bg-gray-300">&nbsp;</div>
            <div className="h-2 w-28 rounded-full bg-gray-300">&nbsp;</div>
            <div className="h-2 w-28 rounded-full bg-gray-300">&nbsp;</div>
            <div className="flex gap-2 h-2 w-36 rounded-full bg-gray-300">
              <div className="mt-4">&nbsp;</div>
              <span className="mt-4">&nbsp;</span>
            </div>
          </div>
          <button className="bg-gray-300 shadow-none hover:shadow-none w-14 h-14 rounded-full items-center  absolute right-5 bottom-5">
            &nbsp;
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
}
