"use client";

import { useAuth } from "@/app/context/AuthProvider";
import Image from "next/image";
import Link from "next/link";

export default function HomeCategories() {
  const { data } = useAuth();

  return (
    <div className="flex lg:overflow-hidden lg:px-0 md:ps-[5rem] ps-[20rem] md:pe-[5rem] sm:pe-[2rem] overflow-x-scroll w-[auto] justify-center gap-[2rem] items-center my-[5rem]">
      {data?.categories?.map((category: any) => {
        return (
          <Link
            key={category._id}
            href={`/collections/${category.name}`}
            className="flex flex-col items-center gap-5"
          >
            <div className="rounded-full w-32 h-32 bg-[#ececec] flex items-center justify-center flex-col">
              <Image
                unoptimized
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
      })}
    </div>
  );
}
