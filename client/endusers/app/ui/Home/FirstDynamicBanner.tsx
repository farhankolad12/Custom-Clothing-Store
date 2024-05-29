"use client";

import { useAuth } from "@/app/context/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FirstDynamicBanner() {
  const { data, homePageContentLoading } = useAuth();
  const router = useRouter();

  return homePageContentLoading ? (
    <div className="flex lg:flex-row justify-center items-center lg:p-0 px-3 flex-col gap-3">
      {[...new Array(3)].map(() => {
        return (
          <div key={Math.random()} className="animate-pulse w-full ">
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
        );
      })}
    </div>
  ) : (
    data?.homePageContent?.firstBanner && (
      <div className="flex lg:flex-row justify-center items-center lg:p-0 px-3 flex-col gap-3">
        <Link
          shallow={true}
          href={
            "/collections/" + data?.homePageContent?.firstBanner?.categoryName
          }
          className="relative group flex flex-col gap-5 cursor-pointer"
        >
          <div className="overflow-hidden">
            <Image
              loading="eager"
              unoptimized
              src={data?.homePageContent?.firstBanner?.img.link}
              width={0}
              height={0}
              style={{ objectFit: "cover", width: "400px", height: "400px" }}
              alt={data?.homePageContent?.firstBanner?.title}
              title={data?.homePageContent?.firstBanner?.title}
              className=" group-hover:scale-150 transition"
            />
          </div>
          <h3 className="text-lg">
            {data?.homePageContent?.firstBanner?.title}{" "}
            <i className="bi bi-arrow-right group-hover:text-2  xl transition" />
          </h3>
        </Link>
        <Link
          shallow={true}
          href={
            "/collections/" + data?.homePageContent?.secondBanner?.categoryName
          }
          className="relative group flex flex-col gap-5 cursor-pointer"
        >
          <div className="overflow-hidden">
            <Image
              loading="eager"
              unoptimized
              src={data?.homePageContent?.secondBanner?.img.link}
              width={0}
              height={0}
              style={{ objectFit: "cover", width: "400px", height: "400px" }}
              alt={data?.homePageContent?.secondBanner?.title}
              title={data?.homePageContent?.secondBanner?.title}
              className=" group-hover:scale-150 transition"
            />
          </div>
          <h3 className="text-lg">
            {data?.homePageContent?.secondBanner?.title}{" "}
            <i className="bi bi-arrow-right group-hover:text-2  xl transition" />
          </h3>
        </Link>
        <Link
          shallow={true}
          href={
            "/collections/" + data?.homePageContent?.thirdBanner?.categoryName
          }
          className="relative group flex flex-col gap-5 cursor-pointer"
        >
          <div className="overflow-hidden">
            <Image
              unoptimized
              loading="eager"
              src={data?.homePageContent?.thirdBanner?.img.link}
              width={0}
              height={0}
              style={{ objectFit: "cover", width: "400px", height: "400px" }}
              alt={data?.homePageContent?.thirdBanner?.title}
              title={data?.homePageContent?.thirdBanner?.title}
              className=" group-hover:scale-150 transition"
            />
          </div>
          <h3 className="text-lg">
            {data?.homePageContent?.thirdBanner?.title}{" "}
            <i className="bi bi-arrow-right group-hover:text-2  xl transition" />
          </h3>
        </Link>
      </div>
    )
  );
}

/* <div
        // style={{ width: "400px" }}
        // className="relative"
        >
          <div className="absolute lg:top-0 lg:bottom-0 lg:right-0 lg:left-0 bottom-0 left-0 right-0 top-auto flex justify-center items-center gap-5 flex-col">
            <div
              style={{ backgroundColor: "rgba(237,219,178,0.7)" }}
              className="text-center flex flex-col gap-2"
            >
              <h1 className="uppercase lg:text-7xl text-4xl font-bold text-[#5C4033]">
                {data?.homePageContent?.firstBanner?.title}
              </h1>
              <span className="font-bold text-[#5C4033]">
                {data?.homePageContent?.firstBanner?.description}
              </span>
            </div>
          </div>
          <div className="absolute lg:top-0 lg:bottom-[-16rem] lg:right-0 lg:left-0 top-0 left-auto right-0 bottom-auto flex justify-center items-center">
            <button
              style={{ backgroundColor: "rgba(237,219,178,0.9)" }}
              onClick={() =>
                router.push(data?.homePageContent?.firstBanner?.buttonLink)
              }
              className="text-[#5C4033] bg-[#e9e2d2] transition px-16 py-5 font-bold"
              type="button"
            >
              {data?.homePageContent?.firstBanner?.buttonName}
            </button>
          </div>
        </div> */
