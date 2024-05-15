"use client";

import { useAuth } from "@/app/context/AuthProvider";
import ProductSkeleton from "./ProductSkeleton";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesBanners() {
  const { data, homePageContentLoading } = useAuth();

  return (
    <section className="my-20 flex flex-col justify-center lg:px-28 px-5">
      <div className="grid grid-cols-1 justify-center items-center lg:grid-cols-3 gap-y-10 gap-x-1">
        {homePageContentLoading
          ? [...new Array(3)].map(() => {
              return <ProductSkeleton key={Math.random()} />;
            })
          : data?.categories.map((category: any) => {
              return (
                <Link
                  key={category._id}
                  href={"/collections/" + category.name}
                  className="relative group flex flex-col gap-5 cursor-pointer"
                >
                  <div className="overflow-hidden">
                    <Image
                      unoptimized
                      src={category.bannerImg.link}
                      width={0}
                      height={0}
                      style={{
                        // objectFit: "cover",
                        width: "400px",
                        height: "400px",
                      }}
                      alt={category.description}
                      title={category.name}
                      className=" group-hover:scale-150 transition"
                    />
                  </div>
                  <h3 className="text-lg">
                    {category.name}{" "}
                    <i className="bi bi-arrow-right group-hover:text-2  xl transition" />
                  </h3>
                </Link>
              );
            })}
      </div>
    </section>
  );
}
