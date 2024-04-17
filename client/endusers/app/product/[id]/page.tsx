"use client";

import { useAuth } from "@/app/context/AuthProvider";
import { ProductType } from "@/app/definations";
import { useGetReq } from "@/app/hooks/useGetReq";
import LoadingSkeleton from "@/app/loading";
import Footer from "@/app/ui/Footer";
import Header from "@/app/ui/Header";
import ProductList from "@/app/ui/Home/ProductList";
import WishlistButton from "@/app/ui/WishlistButton";
import ImageShowcase from "@/app/ui/product/ImageShowcase";
import LightHouse from "@/app/ui/product/LightHouse";
import { formatCurrency } from "@/app/utils/formatCurrency";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [openLighthouse, setOpenLighthouse] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<any>([]);
  const [value, setValue] = useState(0);

  const { id } = useParams();
  const { data } = useAuth();
  const {
    data: product,
    error,
    loading,
    setData: setProduct,
  } = useGetReq("/product", {
    id,
  });

  if (error) {
    toast.error(error || "Something went wrong!");
  }

  const decrement = () => {
    setValue(value - 1);
  };

  const increment = () => {
    setValue(value + 1);
  };

  return loading ? (
    <LoadingSkeleton />
  ) : product?._id ? (
    <>
      <Header />
      <main className="px-10 my-5">
        <div className="flex gap-2">
          <Link href="/" className="text-xs uppercase text-gray-500">
            home
          </Link>
          <span className="text-xs uppercase">|</span>
          <Link href="/shop" className="text-xs uppercase text-gray-500">
            shop
          </Link>
          <span className="text-xs uppercase">|</span>
          <Link
            href={`/category/${product.category}`}
            className="text-xs uppercase text-gray-500"
          >
            {product.category}
          </Link>
          <span className="text-xs uppercase">|</span>
          <span className="text-xs uppercase">{product.name}</span>
        </div>

        <div className="flex lg:flex-row flex-col gap-20 items-start w-full my-20">
          <ImageShowcase
            setOpenLighthouse={setOpenLighthouse}
            product={product}
          />
          <div className="w-lg-50">
            <h1 className="uppercase font-bold text-6xl lg:text-8xl">
              {product.name}
            </h1>
            <div className="my-5 flex gap-10">
              <strong className="font-bold text-xl">
                {formatCurrency(
                  product.discountedPrice || product.price - 1000
                )}
              </strong>
              <strong className="font-bold text-xl">
                <del>{formatCurrency(product.price)}</del>
              </strong>
            </div>
            <div className="my-5">Customer Reviews</div>
            <div className="my-5">
              <p>{product.shortDescription}</p>
            </div>
            <div className="border-y-2 w-full flex flex-col  gap-5 py-4">
              {product.variants.map((variant: any) => {
                return (
                  <div className="flex border-b-2 last:border-b-0 items-center justify-between pb-4">
                    <strong className="uppercase font-bold">
                      {variant.title}
                    </strong>
                    <div className="flex gap-3">
                      {variant.values.map((val: any) => {
                        return (
                          <>
                            <input
                              type="radio"
                              name={variant.title}
                              id={val.variant}
                              value={val.variant}
                              className="hidden"
                              onChange={(e) => {
                                /* setSelectedVariants((prev: any) => [
                                  ...prev,
                                  { ...variant, values: [val] },
                                ]); */
                              }}
                            />
                            <label
                              className={`border-2 border-black px-6 py-1 hover:bg-black hover:text-white transition cursor-pointer /* ${
                                selectedVariants.some((variants: any) => {
                                  return variants.values.some(
                                    (value: any) =>
                                      value.variant === val.variant
                                  );
                                })
                                  ? "bg-white text-black"
                                  : ""
                              } */`}
                              htmlFor={val.variant}
                            >
                              {val.variant}
                            </label>
                          </>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 my-10">
              <div className="border-2 lg:px-5 px-1 py-3">
                <button
                  className="rounded-l px-3 py-1 outline-none focus:outline-none"
                  onClick={decrement}
                >
                  <i className="bi bi-dash-lg" />
                </button>
                <input
                  type="text"
                  value={value}
                  className="outline-none focus:outline-none text-center w-12 "
                  readOnly
                />
                <button
                  className=" hover:text-gray-900 hover:bg-gray-300 rounded-r px-3 py-1 outline-none focus:outline-none"
                  onClick={increment}
                >
                  <i className="bi bi-plus-lg" />
                </button>
              </div>
              <button className="uppercase lg:px-10 px-4 py-3 border-2 border-black font-bold transition hover:bg-black hover:text-white">
                add to cart &nbsp; <i className="bi bi-bag" />
              </button>
            </div>
            <WishlistButton
              classes="border-2 p-4 hover:bg-black hover:text-white transition"
              product={product}
            />
            <div className="flex flex-col gap-2 my-8">
              <span className="uppercase text-xs">
                <strong>category: </strong> {product.category}
              </span>
              <span className="uppercase text-xs">
                <strong>tag: </strong>{" "}
                {product.tags.map((tag: any) => tag.tag).join(", ")}
              </span>
            </div>
          </div>
        </div>
        <div>
          <Tabs value="html">
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
              }}
              placeholder=""
            >
              <Tab key="Description" value="Description" placeholder="">
                Description
              </Tab>
              <Tab value="Review" placeholder="">
                Review
              </Tab>
            </TabsHeader>
            <TabsBody placeholder="">
              <TabPanel key="Description" value="Description">
                {product.fullDescription}
              </TabPanel>
              <TabPanel key="Review" value="Review">
                Review
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
        <div className="my-20">
          <h1 className="uppercase font-bold text-5xl">related products</h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-grey">
            {data?.featuredProducts.map((product: ProductType) => {
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
        </div>
      </main>
      <Footer />
      {openLighthouse && (
        <LightHouse setOpenLighthouse={setOpenLighthouse} product={product} />
      )}
    </>
  ) : (
    notFound()
  );
}
