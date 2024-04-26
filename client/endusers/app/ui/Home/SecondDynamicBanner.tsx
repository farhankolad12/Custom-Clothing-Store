"use client";

import { useAuth } from "@/app/context/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SecondDynamicBanner() {
  const { data } = useAuth();
  const router = useRouter();

  return (
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
          <h1 className="uppercase  text-6xl font-bold">
            {data?.homePageContent?.secondBanner?.title}
          </h1>
          <span>{data?.homePageContent?.secondBanner?.description}</span>
          <button
            onClick={() =>
              router.push(data?.homePageContent?.secondBanner?.buttonLink)
            }
            className="text-black hover:text-white border-2 border-black hover:bg-black transition px-5 py-5 flex justify-center font-bold"
            type="button"
          >
            {data?.homePageContent?.secondBanner?.buttonName}
          </button>
        </div>
      </div>
    )
  );
}
