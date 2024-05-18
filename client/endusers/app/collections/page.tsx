"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthProvider";
import ProductSkeleton from "../ui/Home/ProductSkeleton";
import Image from "next/image";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

export default function Page() {
  const { data, homePageContentLoading } = useAuth();

  return (
    <>
      <Header />
      <main className="flex flex-col gap-5 lg:px-10 px-5 flex flex-col items-center">
        <h1 className="text-4xl mt-5">Collections</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center lg:grid-cols-3 gap-y-10 gap-x-1 my-10">
          {homePageContentLoading
            ? [...new Array(3)].map(() => {
                return <ProductSkeleton key={Math.random()} />;
              })
            : data?.categories.map((category: any) => {
                return (
                  <Link
                    shallow={true}
                    key={category._id}
                    href={"/collections/" + category.name}
                    className="relative group flex flex-col gap-5 cursor-pointer"
                  >
                    <div className="overflow-hidden">
                      <Image
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
        </section>
      </main>
      <Footer />
    </>
  );
}
