"use client";

import { useAuth } from "@/app/context/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SecondDynamicBanner() {
  const { data, homePageContentLoading } = useAuth();
  const router = useRouter();

  return homePageContentLoading ? (
    <div className="animate-pulse w-full ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-screen w-full text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    </div>
  ) : (
    data?.homePageContent?.secondBanner && (
      <div className="relative">
        <Image
          unoptimized
          src={data?.homePageContent?.secondBanner?.img.link}
          width={0}
          height={0}
          style={{ objectFit: "cover", width: "100%", height: "700px" }}
          alt="Banner"
        />
        <div
          //   style={{ width: "400px" }}
          className="absolute top-0 w-full lg:w-96 bottom-0 right-0 lg:right-10 lg:left-auto left-0 lg:px-0 px-2 flex flex-col gap-8 justify-center"
        >
          <h1
            style={{ color: " #5C4033" }}
            className="uppercase text-5xl font-bold"
          >
            {data?.homePageContent?.secondBanner?.title}
          </h1>
          <span style={{ color: " #5C4033" }}>
            {data?.homePageContent?.secondBanner?.description}
          </span>
          <button
            onClick={() =>
              router.push(data?.homePageContent?.secondBanner?.buttonLink)
            }
            className="text-black hover:text-white border-2 border-black hover:bg-black transition px-5 py-5 flex justify-center font-bold"
            type="button"
            style={{ color: " #5C4033" }}
          >
            {data?.homePageContent?.secondBanner?.buttonName}
          </button>
        </div>
      </div>
    )
  );
}
