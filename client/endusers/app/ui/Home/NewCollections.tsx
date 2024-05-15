"use client";

import { useAuth } from "@/app/context/AuthProvider";
import ProductSkeleton from "./ProductSkeleton";
import { ProductType } from "@/app/definations";
import ProductList from "./ProductList";

export default function NewCollections() {
  const { data, homePageContentLoading } = useAuth();

  return (
    <section className="my-20 flex flex-col justify-center lg:px-28 px-5">
      <h3 className="text-2xl lg:px-5 px-0">New Drops</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {homePageContentLoading
          ? [...new Array(4)].map(() => {
              return <ProductSkeleton key={Math.random()} />;
            })
          : data?.newCollections.map((product: ProductType) => {
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
