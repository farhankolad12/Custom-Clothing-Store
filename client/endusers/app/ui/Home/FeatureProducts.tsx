"use client";

import { useState } from "react";
import ProductList from "./ProductList";
import { useAuth } from "@/app/context/AuthProvider";
import { ProductType } from "@/app/definations";

export default function FeatureProducts() {
  const [selectCategory, setSelectCategory] = useState("all");

  const { data } = useAuth();

  return (
    <section className="my-20 lg:px-10 px-5">
      <div className="text-center mb-16">
        <span className="text-xs">COMPANY COLLECTION</span>
        <h2 className="text-6xl font-bold">FEATURED PRODUCTS</h2>
      </div>
      <div className="">
        <div className="flex flex-wrap text-center justify-center gap-10">
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
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-grey">
          {data?.featuredProducts.map((product: ProductType) => {
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
