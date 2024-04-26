import { useAuth } from "@/app/context/AuthProvider";
import { Carousel, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CarouselH() {
  const [animation, setAnimation] = useState(false);

  const { data } = useAuth();
  const router = useRouter();

  return (
    <Carousel
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      loop
      prevArrow={({ handlePrev }) => (
        <IconButton
          placeholder=""
          variant="text"
          color="black"
          size="lg"
          onClick={() => {
            setAnimation(false);
            handlePrev();
            setAnimation(true);
          }}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          placeholder=""
          variant="text"
          color="black"
          size="lg"
          onClick={() => {
            setAnimation(false);
            handleNext();
            setAnimation(true);
          }}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
      placeholder=""
    >
      {data?.homePageContent?.mainSliders?.map((slider: any, i: number) => {
        return (
          <div className="relative">
            <Image
              unoptimized
              style={{ width: "100%", height: "700px" }}
              width={0}
              height={0}
              src={slider.img.link}
              alt={`Carousel ${i + 1}`}
              className="h-full w-full animate__animated animate__fadeIn"
            />
            <div
              className={`absolute lg:inset-0 p-0 lg:ps-20 pe-25 top-0 grid h-full w-full items-center ${
                animation ? "animate__animated  animate__fadeInDown" : ""
              }`}
            >
              <div className="w-full flex flex-col lg:w-1/2 lg:text-start text-center">
                <h1 className="text-7xl uppercase">{slider.title}</h1>
                <span className="my-4">{slider.description}</span>
                <button
                  onClick={() => router.push(slider.buttonLink)}
                  className=" text-black-900 hover:text-white border border-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black-300 font-medium px-16 py-5 text-lg text-center me-auto ms-auto lg:ms-0 lg:me-auto"
                  type="button"
                >
                  {slider.buttonName}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
