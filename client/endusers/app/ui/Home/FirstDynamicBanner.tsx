"use client";

import { useAuth } from "@/app/context/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FirstDynamicBanner() {
  const { data } = useAuth();
  const router = useRouter();

  return (
    data?.homePageContent?.firstBanner && (
      <div className="relative">
        <Image
          unoptimized
          src={data?.homePageContent?.firstBanner?.img.link}
          width={0}
          height={0}
          style={{ objectFit: "cover", width: "100%", height: "700px" }}
          alt="Banner"
        />
        <div
          // style={{ width: "400px" }}
          className="absolute top-0 bottom-0 lg:right-0 lg:left-0 right-2 left-2 flex flex-col gap-8 justify-center items-center "
        >
          <h1 className="uppercase lg:text-9xl text-7xl font-bold">
            {data?.homePageContent?.firstBanner?.title}
          </h1>
          <span>{data?.homePageContent?.firstBanner?.description}</span>
          <button
            onClick={() =>
              router.push(data?.homePageContent?.firstBanner?.buttonLink)
            }
            className="text-black hover:text-white border-2 border-black hover:bg-black transition px-16 py-5 font-bold"
            type="button"
          >
            {data?.homePageContent?.firstBanner?.buttonName}
          </button>
        </div>
      </div>
    )
  );
}
