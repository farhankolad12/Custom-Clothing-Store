"use client";

import { ProductType } from "@/app/definations";
import { Products } from "../../test";
import { useState } from "react";
import ProductList from "./ProductList";

export default function FeatureProducts() {
  const [selectCategory, setSelectCategory] = useState("all");

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
          <input
            onChange={(e) => setSelectCategory(e.target.value)}
            value="fitness"
            type="radio"
            name="category"
            id="fitness"
            className="hidden"
          />
          <label
            className={`cursor-pointer ${
              selectCategory === "fitness" ? "border-b-4 border-black" : ""
            }`}
            htmlFor="fitness"
          >
            Fitness
          </label>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-grey">
          {Products.map((product: any, i: number) => {
            return selectCategory === "all" ? (
              <ProductList
                span={undefined}
                spanning={undefined}
                key={product.id + i}
                product={product}
              />
            ) : (
              product.category.toLowerCase() === selectCategory && (
                <ProductList
                  span={undefined}
                  spanning={undefined}
                  key={product.id + i}
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
