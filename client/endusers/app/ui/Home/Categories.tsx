"use client";

import { useAuth } from "@/app/context/AuthProvider";
import Link from "next/link";

export default function Categories() {
  const { data, homePageContentLoading } = useAuth();

  return (
    <section className="my-20 flex flex-col justify-center items-center">
      <span className="my-10 text-sm uppercase text-gray-900">
        buy best fashion
      </span>
      <div className="flex gap-14 flex-wrap text-center justify-center lg:px-20">
        {homePageContentLoading ? (
          <div className="animate-pulse flex gap-14 flex-wrap text-center justify-center lg:px-20">
            {[...new Array(4)].map(() => {
              return (
                <h1
                  key={Math.random()}
                  className="h-20 w-56 rounded-full bg-gray-300"
                ></h1>
              );
            })}
          </div>
        ) : (
          data?.categories?.map((cat: any) => {
            return (
              <Link
                href={`/shop?category=${cat.name}`}
                className="lg:text-7xl text-4xl font-bold uppercase"
              >
                {cat.name}{" "}
                <sup className="text-sm font-normal text-gray-700">
                  ({cat.totalProducts})
                </sup>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
