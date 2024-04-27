"use client";

import Footer from "../ui/Footer";
import Header from "../ui/Header";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import MultiRangeSlider from "../ui/Shop/MultiRangeSlider";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetReq } from "../hooks/useGetReq";
import { toast } from "react-toastify";
import LoadingSkeleton from "../loading";
import CategoryAccordion from "../ui/Shop/CategoryAccordion";
import FilterAccordian from "../ui/Shop/FilterAccordian";
import { useDebouncedCallback } from "use-debounce";
import { ProductType } from "../definations";
import ProductList from "../ui/Home/ProductList";
import ShopSkeleton from "../ui/Shop/ShopSkeleton";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("min")) || 0
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("max")) || 20000
  );

  const { data, error, loading } = useGetReq("/shop-page", {});

  const {
    data: productsData,
    error: _error,
    loading: _loading,
  } = useGetReq("/filter-products", {
    searchParams,
  });

  if (error || _error) {
    toast.error(error || _error || "Something went wrong!");
  }

  async function handlePrice() {
    const params = new URLSearchParams(searchParams);

    params.set("min", minPrice.toString());
    params.set("max", maxPrice.toString());
    params.set("page", "1");

    router.push(`/shop?${params.toString()}`);
  }

  async function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    filter: string
  ) {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams);

    const prevParams = params.get(filter)?.split(",");

    if (prevParams?.some((cat) => cat === value)) {
      params.set(filter, prevParams.filter((cat) => cat !== value).join(","));
      params.set("page", "1");

      return router.push(`/shop?${params.toString()}`);
    }

    params.set(filter, [...(prevParams || []), value].join(","));

    params.set("page", "1");

    router.push(`/shop?${params.toString()}`);
  }

  async function handleSorting(e: ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;

    const params = new URLSearchParams(searchParams);

    params.set("sort-by", val);
    params.set("page", "1");

    router.push(`/shop?${params.toString()}`);
  }

  const debounced = useDebouncedCallback((val) => {
    const params = new URLSearchParams(searchParams);

    params.set("query", val);
    params.set("page", "1");

    router.push(`/shop?${params.toString()}`);
  }, 1000);

  return loading ? (
    <LoadingSkeleton />
  ) : (
    <div className="not-home">
      <Header />
      <div className="flex gap-3 lg:px-10 lg:px-16 px-5 mt-8">
        <Link href="/" className="uppercase text-xs text-gray-600 font-bold">
          home
        </Link>
        <span className="uppercase text-xs font-bold">|</span>
        <span className="uppercase text-xs font-bold">shop</span>
      </div>
      <main className="flex w-full flex-col lg:flex-row gap-20 lg:px-16 px-5 my-20">
        <div className="flex flex-col gap-5 w-full lg:w-1/4">
          <div className="border-b border-gray-300 pb-5">
            <span className="uppercase font-bold text-xs">
              showing {productsData?.startDocument}-{productsData?.lastDocument}{" "}
              of {productsData?.totalDocuments} results
            </span>
          </div>
          <div>
            <CategoryAccordion data={data} handleChange={handleChange} />
            {data.attributes.map((variation: any) => {
              return (
                <FilterAccordian
                  data={data}
                  key={variation._id}
                  handleChange={handleChange}
                  variation={variation}
                />
              );
            })}
          </div>
          <div className="py-5 pb-16 flex flex-col gap-4 w-full border-b border-gray-300">
            <label htmlFor="price" className="uppercase font-bold ">
              price
            </label>
            <div className="lg:w-3/5 w-full">
              <MultiRangeSlider
                min={0}
                max={20000}
                onChange={({ min, max }: { min: number; max: number }) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
                handlePrice={handlePrice}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-3/4">
          <div className="flex justify-between gap-3 lg:flex-row flex-col">
            <input
              type="text"
              defaultValue={searchParams.get("query") || ""}
              onChange={(e) => debounced(e.target.value)}
              placeholder="Search"
              className="outline-none border-b border-black py-3 px-2 w-full"
            />
            <select onChange={handleSorting} name="sorting" id="sort-by">
              <option value="default" className="uppercase font-bold">
                Default Sorting
              </option>
              <option value="latest" className="uppercase font-bold">
                Sort by latest
              </option>
              <option value="high-low" className="uppercase font-bold">
                Price: High to low
              </option>
              <option value="low-high" className="uppercase font-bold">
                Price: Low to high
              </option>
            </select>
          </div>
          <div className="my-10">
            {_loading ? (
              <ShopSkeleton />
            ) : productsData?.products.length ? (
              <>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                  {productsData.products.map((product: ProductType) => {
                    return (
                      <ProductList
                        product={product}
                        span=""
                        spanning={false}
                        key={product._id}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center flex-wrap gap-2 my-10 justify-center items-ceter">
                  {[...Array(productsData.totalPages)].map((c, ind) => {
                    return (
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("page", (ind + 1).toString());
                          router.push(`/shop?${params.toString()}`);
                        }}
                        key={ind}
                        className={`border-2 border-black p-3 transition hover:bg-black hover:text-white rounded ${
                          (!searchParams.get("page") && ind === 0) ||
                          +searchParams?.get("page") === ind + 1
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
              <div className="w-full py-5 text-center px-4 bg-gray-200">
                <span className="font-bold  text-sm">
                  NO PRODUCTS WERE FOUND FOR PROVIDED QUERY PARAMETERS.
                </span>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
