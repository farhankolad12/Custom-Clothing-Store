"use client";

import { ProductType } from "@/app/definations";
import { useGetReq } from "@/app/hooks/useGetReq";
import LoadingSkeleton from "@/app/loading";
import Footer from "@/app/ui/Footer";
import Header from "@/app/ui/Header";
import ProductList from "@/app/ui/Home/ProductList";
import FilterSortDrawer from "@/app/ui/collections/FilterSortDrawer";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Option, Select } from "@material-tailwind/react";
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Page() {
  const { slug }: { slug: string } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: collection, loading } = useGetReq("/category-products", {
    name: slug,
    searchParams,
  });
  const { data: filters, loading: _loading } = useGetReq("/shop-page", {});

  const [openDrawer, setOpenDrawer] = useState(false);

  const minPriceRef = useRef<HTMLInputElement>(null!);
  const maxPriceRef = useRef<HTMLInputElement>(null!);

  const params = new URLSearchParams(searchParams);

  function closeDrawer() {
    setOpenDrawer(false);
  }

  async function handlePrice() {
    const params = new URLSearchParams(searchParams);

    params.set("min", minPriceRef.current.value.toString());
    params.set("max", maxPriceRef.current.value.toString());
    params.set("page", "1");

    router.push(`/collections/${slug}?${params.toString()}`);
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

      return router.push(`/collections/${slug}?${params.toString()}`);
    }

    params.set(filter, [...(prevParams || []), value].join(","));

    params.set("page", "1");

    router.push(`/collections/${slug}?${params.toString()}`);
  }

  async function handleSorting(e: string | undefined) {
    const val = e;

    const params = new URLSearchParams(searchParams);

    params.set("sort-by", val || "");
    params.set("page", "1");

    router.push(`/collections/${slug}?${params.toString()}`);
  }

  const debouned = useDebouncedCallback(() => {
    handlePrice();
  }, 1000);

  return loading ? (
    <LoadingSkeleton />
  ) : collection.products ? (
    <>
      <Header />
      <main className="flex flex-col gap-5 lg:px-52 px-5">
        <h1 className="text-4xl mt-5 uppercase">
          {slug.replaceAll("%20", " ")}
        </h1>
        <div className="lg:hidden flex justify-between">
          <button
            onClick={() => setOpenDrawer(true)}
            className="flex items-start"
          >
            <i className="bi bi-sliders" /> &nbsp;&nbsp; Filter & Sort
          </button>
          <span className="uppercase font-bold text-xs">
            showing {collection?.startDocument}-{collection?.lastDocument} of{" "}
            {collection?.totalDocuments} results
          </span>
        </div>
        <section className="lg:flex flex-wrap items-center gap-5 hidden mt-10">
          <span className="text-xl">Filter: </span>
          <div className="flex gap-5">
            <Select placeholder="" label="Price">
              <div className="w-full">
                <div className="border-b pb-3">
                  <span>The Highest price is ₹4999</span>
                </div>
                <div className="flex flex-col gap-4 my-5">
                  <div>
                    <label htmlFor="lte">From ₹</label>
                    <input
                      ref={minPriceRef}
                      defaultValue={searchParams?.get("min") || ""}
                      onChange={debouned}
                      type="number"
                      className="border-2"
                      id="lte"
                    />
                  </div>
                  <div>
                    <label htmlFor="gte">To ₹</label>
                    <input
                      ref={maxPriceRef}
                      onChange={debouned}
                      defaultValue={searchParams?.get("max") || ""}
                      type="number"
                      className="border-2"
                      id="gte"
                    />
                  </div>
                </div>
              </div>
            </Select>
            {filters?.attributes?.map((attr: any) => {
              return (
                <Select key={attr._id} placeholder="" label={attr.title}>
                  <div className="text-black flex flex-col gap-4">
                    {attr.options.map((val: any) => {
                      return (
                        <div key={val.id} className="flex items-center gap-4">
                          <input
                            checked={params
                              .get("variants")
                              ?.split(",")
                              .some((variant: any) => variant === val.variant)}
                            onChange={(e) => handleChange(e, "variants")}
                            type="checkbox"
                            name={attr.title}
                            id={val.variant}
                            value={val.variant}
                          />
                          <label htmlFor={val.variant}>{val.variant}</label>
                        </div>
                      );
                    })}
                  </div>
                </Select>
              );
            })}
          </div>
          <div>
            <Select
              placeholder=""
              onChange={(e) => handleSorting(e)}
              defaultValue={searchParams.get("sort-by") || "default"}
              label="Sort By"
            >
              <Option value="default">Default</Option>
              <Option value="latest">Latest</Option>
              <Option value="new-old">Date new to old</Option>
              <Option value="old-new">Date old to new</Option>
              <Option value="high-low">Price High to low</Option>
              <Option value="low-high">Price Low to High</Option>
            </Select>
          </div>
          <span className="uppercase font-bold text-xs">
            showing {collection?.startDocument}-{collection?.lastDocument} of{" "}
            {collection?.totalDocuments} results
          </span>
        </section>
        {searchParams.size ? (
          <section className="mt-4 flex flex-wrap gap-4">
            {searchParams.get("min") && (
              <span className="rounded-full p-2 border">
                {formatCurrency(+(searchParams?.get("min") || 1))} -{" "}
                {formatCurrency(+(searchParams?.get("max") || 1))}
                <button
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);

                    params.delete("min");
                    params.delete("max");

                    params.set("page", "1");

                    router.push(`/collections/${slug}?${params.toString()}`);
                  }}
                >
                  <i className="bi bi-x" />
                </button>
              </span>
            )}
            {searchParams.get("variants") &&
              searchParams
                .get("variants")
                ?.split(",")
                .map((variant: any) => {
                  return (
                    <span key={variant} className="rounded-full p-2 border">
                      {variant}
                      <button
                        type="button"
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);

                          const prevParams = params.get("variants")?.split(",");

                          if (prevParams?.some((cat) => cat === variant)) {
                            params.set(
                              "variants",
                              prevParams
                                .filter((cat) => cat !== variant)
                                .join(",")
                            );
                            params.set("page", "1");

                            return router.push(
                              `/collections/${slug}?${params.toString()}`
                            );
                          }

                          params.set(
                            "variants",
                            [...(prevParams || []), variant].join(",")
                          );

                          params.set("page", "1");

                          router.push(
                            `/collections/${slug}?${params.toString()}`
                          );
                        }}
                      >
                        <i className="bi bi-x" />
                      </button>
                    </span>
                  );
                })}
            <button
              onClick={() => {
                router.push(`/collections/${slug}`);
              }}
              className="underline text-red-400"
            >
              Remove All
            </button>
          </section>
        ) : (
          ""
        )}
        {collection.products.length ? (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center lg:grid-cols-4 gap-y-10 gap-x-1 mb-10">
              {collection.products.map((product: ProductType) => {
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
            <div className="flex items-center flex-wrap gap-2 my-10 justify-center items-ceter">
              {[...Array(collection.totalPages)].map((c, ind) => {
                return (
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set("page", (ind + 1).toString());
                      router.push(`/collections/${slug}?${params.toString()}`);
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
            <button
              className="underline"
              onClick={() => router.push(`/collections/${slug}`)}
            >
              Use fewer filters or remove all
            </button>
          </div>
        )}
      </main>
      <Footer />
      <FilterSortDrawer
        filters={filters}
        closeDrawer={closeDrawer}
        open={openDrawer}
        debouned={debouned}
        handleChange={handleChange}
        handleSorting={handleSorting}
        maxPriceRef={maxPriceRef}
        minPriceRef={minPriceRef}
        params={params}
        slug={slug}
        searchParams={searchParams}
      />
    </>
  ) : (
    collection.notCategory && notFound()
  );
}
