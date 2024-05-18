"use client";

import { useAuth } from "@/app/context/AuthProvider";
import { Spinner } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export default function HomeCategories() {
  const { data } = useAuth();

  return (
    <div className="flex lg:overflow-hidden lg:px-0 md:ps-[5rem] px-[2rem] md:pe-[5rem] sm:pe-[2rem] overflow-x-scroll w-[auto] lg:justify-center md:justify-center justify-start gap-[2rem] lg:items-center md:items-center items-start my-[5rem]">
      {data?.categories?.map((category: any) => {
        return (
          <Link
            shallow={true}
            key={category._id}
            href={`/collections/${category.name}`}
            className="flex flex-col items-center gap-5"
          >
            <div className="rounded-full w-32 h-32 bg-[#ececec] flex items-center justify-center flex-col">
              <Image
                unoptimized
                quality={100}
                src={category.icon.link}
                width={0}
                height={0}
                className="w-28 h-28 rounded-full"
                style={{ objectFit: "cover" }}
                alt={category.name}
              />
            </div>
            <span className="text-xl">{category.name}</span>
          </Link>
        );
      }) ||
        [...new Array(5)].map(() => {
          return <Spinner key={Math.random()} className="w-28 h-28" />;
        })}
    </div>
  );
}
