"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CarouselItem({
  slider,
  active,
  i,
}: {
  slider: any;
  active: number;
  i: number;
}) {
  const router = useRouter();

  return (
    <div className="relative">
      <Image
        unoptimized
        style={{ width: "100%", height: "700px", objectFit: "cover" }}
        width={0}
        height={0}
        src={slider.img.link}
        alt={`Carousel ${i + 1}`}
        className={`h-full animate__animated w-full ${
          active === i + 1 ? "animate__fadeIn" : ""
        }`}
      />
      <div
        className={`absolute lg:inset-0 p-0 left-0 right-0 lg:ps-20 pe-25 top-0 grid h-full w-full items-center animate__animated ${
          active === i + 1 ? "animate__fadeInDown" : "animate__fadeIn"
        }`}
      >
        <div className="w-full flex flex-col lg:w-1/2 lg:text-start text-center">
          <h1 className="lg:text-7xl text-gray-800 font-bold text-4xl uppercase">
            {slider.title}
          </h1>
          <span className="my-4 text-gray-800">{slider.description}</span>
          <button
            onClick={() => router.push(slider.buttonLink)}
            className=" text-black-900 hover:text-white border border-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black-300 font-medium px-16 py-5 text-lg text-center me-auto ms-auto lg:ms-0 lg:me-auto transition text-gray-800"
            type="button"
          >
            {slider.buttonName}
          </button>
        </div>
      </div>
    </div>
  );
}
