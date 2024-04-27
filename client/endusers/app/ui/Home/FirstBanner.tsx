"use client";

import { useAuth } from "@/app/context/AuthProvider";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Gochi_Hand } from "next/font/google";
import Link from "next/link";
import WishlistButton from "../WishlistButton";
import Image from "next/image";
import FirstBannerSkeleton from "./FirstBannerSkeleton";

const gochi = Gochi_Hand({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export default function FirstBanner() {
  const { data, homePageContentLoading } = useAuth();

  return homePageContentLoading ? (
    <FirstBannerSkeleton />
  ) : (
    <section className="container mx-auto px-5" style={{ paddingTop: "45rem" }}>
      <div
        style={{ height: "700px" }}
        className="flex lg:flex-row flex-col w-full lg:flex-row"
      >
        <div className="featured-box bg-gray-100 relative z-50 lg:h-auto h-96 lg:w-1/2 w-full group">
          <Image
            src={data?.featuredProducts[0]?.images[0].link || ""}
            unoptimized
            style={{
              mixBlendMode: "multiply",
              objectFit: "cover",
            }}
            className="w-full h-full"
            width={0}
            height={0}
            alt="Product"
          />
          <h1
            className={`absolute text-5xl top-14 lg:text-left text-center left-0 right-0 lg:left-10 ${gochi.className}`}
          >
            Featured
          </h1>
          <button className="bg-white w-14 h-14 flex items-center justify-center rounded-full absolute hover:bg-black hover:text-white animate__animated hover:animate__fadeIn bottom-4 right-6 lg:right-16 lg:left-auto lg:top-auto lg:bottom-24 z-50">
            <i className="bi bi-bag text-lg " />
          </button>
          <div className="flex-col justify-between animate__animated animate__slideInUp absolute top-0 bottom-0 left-0 right-0 lg:bottom-20 lg:w-1/2 w-full lg:h-1/2 h-full lg:right-10 lg:top-auto lg:left-auto p-5 hidden group-hover:flex z-49 bg-white">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <span className="mb-1 text-xs">TeeVerse</span>
                <Link
                  href={`/product/${data?.featuredProducts[0]._id}`}
                  className="font-bold"
                >
                  {data?.featuredProducts[0].name}
                </Link>
                <Link
                  href={`/shop?category=${data?.featuredProducts[0].category}`}
                >
                  {data?.featuredProducts[0].category}
                </Link>
              </div>

              <div className="bg-white w-14 h-14 flex items-center justify-center rounded-full hover:bg-black hover:text-white animate__animated hover:animate__fadeIn">
                <WishlistButton
                  classes="bg-transparent w-14 h-14 rounded-full items-center hover:bg-black hover:text-white absolute right-5 top-5 cursor-pointer z-50"
                  product={data?.featuredProducts[0]}
                />
              </div>
            </div>
            <div>
              <h1 className="ms-auto font-bold text-4xl">
                {formatCurrency(data?.featuredProducts[0].price || 0)}
              </h1>
            </div>
          </div>
        </div>
        <div
          className="newcollection-box z-50 bg-black relative lg:h-full h-96 lg:w-1/2 w-full group"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Image
            unoptimized
            style={{
              mixBlendMode: "multiply",
              objectFit: "cover",
            }}
            className="w-full h-full"
            width={0}
            height={0}
            alt="Product"
            src={data?.newCollections[2]?.images[0].link || ""}
          />
          <h1
            className={`absolute text-5xl top-14 lg:text-left text-center left-0 right-0 lg:left-10 ${gochi.className} text-white`}
          >
            New Collection
          </h1>
          <button className="bg-white w-14 h-14 flex items-center justify-center rounded-full absolute hover:bg-black hover:text-white animate__animated hover:animate__fadeIn bottom-4 right-6 lg:right-16 lg:left-auto lg:top-auto lg:bottom-24 z-50">
            <i className="bi bi-bag text-lg " />
          </button>
          <div className="flex-col justify-between animate__animated animate__slideInUp absolute top-0 bottom-0 left-0 right-0 lg:bottom-20 lg:w-1/2 w-full lg:h-1/2 h-full lg:right-10 lg:top-auto lg:left-auto bg-white p-5 hidden group-hover:flex z-49">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <span className="mb-1 text-xs">TeeVerse</span>
                <Link
                  href={`/product/${data?.newCollections[2]._id}`}
                  className="font-bold"
                >
                  {data?.newCollections[2].name}
                </Link>
                <Link
                  href={`/shop?category=${data?.newCollections[2].category}`}
                >
                  {data?.newCollections[2].category}
                </Link>
              </div>

              <div className="bg-white w-14 h-14 flex items-center justify-center rounded-full hover:bg-black hover:text-white animate__animated hover:animate__fadeIn">
                <WishlistButton
                  classes="bg-transparent w-14 h-14 rounded-full items-center hover:bg-black hover:text-white absolute right-5 top-5 cursor-pointer z-50"
                  product={data?.newCollections[2]}
                />
              </div>

              {/* <button className="">
                <i className="bi bi-heart text-lg " />
              </button> */}
            </div>
            <div>
              <h1 className="ms-auto font-bold text-4xl">
                {formatCurrency(data?.newCollections[2].price || 0)}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
