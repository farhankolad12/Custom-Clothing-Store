"use client";

import HTMLParser from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
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
        loading="eager"
        width={0}
        height={0}
        priority={true}
        src={slider.img.link}
        alt={slider.title}
        title={slider.title}
        className={`h-[700px] w-full object-cover animate__animated w-full ${
          active === i + 1 ? "animate__fadeIn" : ""
        }`}
      />
      <div
        className={`absolute lg:inset-0 p-0 left-0 right-0 lg:ps-20 pe-25 top-[3rem] grid h-full w-full items-center animate__animated ${
          active === i + 1 ? "animate__fadeInDown" : "animate__fadeIn"
        }`}
      >
        <div className="w-full flex flex-col lg:w-1/2 lg:text-start text-center">
          <div
            style={{ backgroundColor: "rgba(237,219,178,0.5)" }}
            className="text-[#5C4033] flex flex-col gap-2"
          >
            <h1 className="lg:text-7xl font-bold text-4xl uppercase">
              {slider.title}
            </h1>
            <span className="my-4 font-bold">
              {HTMLParser(slider.description)}
            </span>
          </div>
          <Link
            style={{ backgroundColor: "rgba(237,219,178,0.9)" }}
            href={slider.buttonLink}
            className="lg:text-black-900 lg:hover:text-white lg:hover:bg-black bg-[#e9e2d2] lg:bg-transparent border-2 border-[#724e2c] text-[#5C4033] focus:ring-4 focus:outline-none focus:ring-black-300 font-medium px-16 py-5 text-lg text-center me-auto ms-auto lg:ms-0 lg:me-auto transition mt-5"
            type="button"
          >
            {slider.buttonName}
          </Link>
        </div>
      </div>
    </div>
  );
}
