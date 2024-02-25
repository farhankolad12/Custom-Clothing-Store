import { Button, Carousel, Typography } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";

export default function CarouselH() {
  return (
    <Carousel placeholder="">
      <div className="relative">
        <Image
          style={{ width: "100%", height: "700px" }}
          width={0}
          height={0}
          src="/carousel-1.jpg"
          alt="image 1"
          className="h-full  w-full"
        />
        <div className="absolute lg:inset-0 p-0 lg:ps-20 top-0 grid h-full w-full items-center">
          <div className="w-full lg:w-1/2 lg:text-start text-center lg:flex block flex-col">
            <h1 className="text-7xl uppercase">running clothes brands</h1>
            <span className="my-4">
              Search the Dunker and find the ideal prices for you
            </span>
            <button
              className="me-auto text-black-900 hover:text-white border border-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 "
              type="button"
            >
              Shop now
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <Image
          style={{ width: "100%", height: "700px" }}
          width={0}
          height={0}
          src="/carousel-2.jpg"
          alt="image 1"
          className="h-full  w-full"
        />
        <div className="absolute lg:inset-0 p-0 lg:ps-20 top-0 grid h-full w-full items-center">
          <div className="w-full lg:w-1/2 lg:text-start text-center lg:flex block flex-col">
            <h1 className="text-7xl uppercase">running clothes brands</h1>
            <span className="my-4">
              Search the Dunker and find the ideal prices for you
            </span>
            <button
              className="me-auto text-black-900 hover:text-white border border-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 "
              type="button"
            >
              Shop now
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <Image
          style={{ width: "100%", height: "700px" }}
          width={0}
          height={0}
          src="/carousel-3.jpg"
          alt="image 1"
          className="h-full  w-full"
        />
        <div className="absolute lg:inset-0 p-0 lg:ps-20 top-0 grid h-full w-full items-center">
          <div className="w-full lg:w-1/2 lg:text-start text-center lg:flex block flex-col ">
            <h1 className="text-7xl uppercase">running clothes brands</h1>
            <span className="my-4">
              Search the Dunker and find the ideal prices for you
            </span>
            <button
              className="me-auto text-black-900 hover:text-white border border-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 "
              type="button"
            >
              Shop now
            </button>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
