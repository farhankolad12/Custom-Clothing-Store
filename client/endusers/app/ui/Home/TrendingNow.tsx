"use client";

import { Products } from "@/app/test";
import React from "react";
import ProductList from "./ProductList";

export default function TrendingNow() {
  return (
    <section className="my-20 lg:px-10 px-5">
      <div className="text-center mb-16">
        <span className="text-xs">FIND WHAT IT IS</span>
        <h2 className="text-6xl font-bold">TRENDING NOW</h2>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-grey">
        {Products.map((product: any, i: number) => {
          return (
            <ProductList
              key={product.id + i}
              span={
                i + 1 === 3 || i + 1 === 4
                  ? "lg:col-span-2 md:col-span-2 sm:col-span-1 bg-gray-100"
                  : undefined
              }
              spanning={i + 1 === 3 || i + 1 === 4 ? true : undefined}
              product={product}
            />
          );
        })}
      </div>
    </section>
  );
}
