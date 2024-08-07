"use client";

import ProductList from "./ProductList";
import { useAuth } from "@/app/context/AuthProvider";
import { ProductType } from "@/app/definations";
import ProductSkeleton from "./ProductSkeleton";
import Link from "next/link";

export default function FeatureProducts() {
  const { data, homePageContentLoading } = useAuth();

  return (
    <section className="my-20 flex flex-col justify-center lg:px-28 px-5">
      <div className="flex justify-between items-center gap-2">
        <h3 className="lg:text-2xl text-xl lg:px-5 px-0">Featured Products</h3>
        <Link href="/feature-products" className="text-sm">
          View All <i className="bi bi-arrow-right text-sm" />
        </Link>
      </div>
      <div className="lg:grid md:grid md:grid-cols-2 lg:grid-cols-4 flex lg:overflow-x-hidden md:overflow-x-hidden overflow-x-scroll gap-0">
        {homePageContentLoading
          ? [...new Array(4)].map(() => {
              return <ProductSkeleton key={Math.random()} />;
            })
          : data?.featuredProducts.map((product: ProductType) => {
              return (
                <ProductList
                  span={undefined}
                  spanning={undefined}
                  key={product._id}
                  product={product}
                />
              );
            })}
      </div>
    </section>
  );
}
