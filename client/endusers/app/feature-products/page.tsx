"use client";

import Footer from "../ui/Footer";
import Header from "../ui/Header";
import { useAuth } from "../context/AuthProvider";
import ProductList from "../ui/Home/ProductList";
import { ProductType } from "../definations";
import Link from "next/link";
import LoadingSkeleton from "../loading";

export default function Page() {
  const { data } = useAuth();

  return data?.featuredProducts ? (
    <>
      <Header />
      <main className="flex flex-col gap-5 lg:px-52 px-5">
        <div className="flex items-center gap-3 mt-6 justify-between">
          <h1 className="lg:text-4xl text-lg">Featured Products</h1>
          <span className="uppercase font-bold  text-xs text-end">
            {data?.featuredProducts?.length} Products
          </span>
        </div>
        {data?.featuredProducts.length ? (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center lg:grid-cols-4 gap-y-10 gap-x-1 mb-10">
              {data?.featuredProducts.map((product: ProductType) => {
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
  ) : (
    <LoadingSkeleton />
  );
}
