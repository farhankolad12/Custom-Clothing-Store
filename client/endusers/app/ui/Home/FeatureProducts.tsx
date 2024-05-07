"use client";

import { useState } from "react";
import ProductList from "./ProductList";
import { useAuth } from "@/app/context/AuthProvider";
import { ProductType } from "@/app/definations";
import ProductSkeleton from "./ProductSkeleton";

export default function FeatureProducts() {
  const [selectCategory, setSelectCategory] = useState("all");

  const { data, homePageContentLoading } = useAuth();

  return (
    <section className="my-20 lg:px-10 px-5">
      <div className="text-center mb-16">
        <span className="text-xs">TEEVERSE COLLECTION</span>
        <h3 className="lg:text-6xl text-5xl font-bold">FEATURED PRODUCTS</h3>
      </div>
      <div className="">
        <div className="flex flex-wrap text-center justify-center gap-10">
          {homePageContentLoading ? (
            <div className="animate-pulse">
              <h1 className="h-10 w-96 rounded-full bg-gray-300"></h1>
            </div>
          ) : (
            <>
              <input
                onChange={(e) => setSelectCategory(e.target.value)}
                value="all"
                type="radio"
                name="category"
                id="all"
                className="hidden"
              />
              <label
                className={`cursor-pointer ${
                  selectCategory === "all" ? "border-b-4 border-black" : ""
                }`}
                htmlFor="all"
              >
                Show All
              </label>
              {data?.categories.map((category: any) => {
                return (
                  <div key={category._id}>
                    <input
                      onChange={(e) => setSelectCategory(e.target.value)}
                      value={category.name}
                      type="radio"
                      name="category"
                      id={category.name}
                      className="hidden"
                    />
                    <label
                      className={`cursor-pointer ${
                        selectCategory === category.name
                          ? "border-b-4 border-black"
                          : ""
                      }`}
                      htmlFor={category.name}
                    >
                      {category.name}
                    </label>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-grey">
          {homePageContentLoading
            ? [...new Array(4)].map(() => {
                return <ProductSkeleton key={Math.random()} />;
              })
            : data?.featuredProducts.map((product: ProductType) => {
                return selectCategory === "all" ? (
                  <ProductList
                    span={undefined}
                    spanning={undefined}
                    key={product._id}
                    product={product}
                  />
                ) : (
                  product.category === selectCategory && (
                    <ProductList
                      span={undefined}
                      spanning={undefined}
                      key={product._id}
                      product={product}
                    />
                  )
                );
              })}
        </div>
      </div>
    </section>
  );
}
