"use client";

import { useAuth } from "@/app/context/AuthProvider";
import Link from "next/link";

export default function Categories() {
  const { data } = useAuth();

  return (
    <section className="my-20 flex flex-col justify-center items-center">
      <span className="my-10 text-sm uppercase text-gray-900">
        buy best fashion
      </span>
      <div className="flex gap-14 flex-wrap justify-center lg:px-20">
        {data?.categories?.map((cat: any) => {
          return (
            <Link
              href={`/shop?category=${cat.name}`}
              className="text-7xl font-bold uppercase"
            >
              {cat.name}{" "}
              <sup className="text-sm font-normal text-gray-700">
                ({cat.totalProducts})
              </sup>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
