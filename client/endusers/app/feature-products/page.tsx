"use client";

import Footer from "../ui/Footer";
import Header from "../ui/Header";
import ProductList from "../ui/Home/ProductList";
import { ProductType } from "../definations";
import Link from "next/link";
import LoadingSkeleton from "../loading";
import { useGetReq } from "../hooks/useGetReq";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, loading } = useGetReq("/feature-products", {
    searchParams,
  });

  return loading ? (
    <LoadingSkeleton />
  ) : (
    <>
      <Header />
      <main className="flex flex-col gap-5 lg:px-52 px-5">
        <div className="flex items-center gap-3 mt-6 justify-between">
          <h1 className="lg:text-4xl text-lg">Featured Products</h1>
          <span className="uppercase font-bold  text-xs text-end">
            {data?.totalDocuments} Products
          </span>
        </div>
        {data?.products?.length ? (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center lg:grid-cols-4 gap-y-10 gap-x-1 mb-10">
              {data?.products.map((product: ProductType) => {
                return (
                  <ProductList
                    key={product._id}
                    product={product}
                    span=""
                    spanning={undefined}
                  />
                );
              })}
            </section>
            <div className="flex items-center flex-wrap gap-2 my-10 justify-center items-center">
              {[...Array(data?.totalPages)].map((c, ind) => {
                return (
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set("page", (ind + 1).toString());
                      router.push(`/feature-products?${params.toString()}`);
                    }}
                    key={ind}
                    className={`border-2 border-black p-3 transition hover:bg-black hover:text-white rounded ${
                      (!searchParams.get("page") && ind === 0) ||
                      +(searchParams?.get("page") || 1) === ind + 1
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {ind + 1}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-2xl text-center my-10">
            <h3>No products found</h3>
            <Link className="underline" href="/">
              Use fewer filters or remove all
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
