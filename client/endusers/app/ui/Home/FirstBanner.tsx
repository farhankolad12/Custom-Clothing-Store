"use client";

import { useAuth } from "@/app/context/AuthProvider";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Gochi_Hand } from "next/font/google";
import Link from "next/link";
import WishlistButton from "../WishlistButton";
import Image from "next/image";
import FirstBannerSkeleton from "./FirstBannerSkeleton";
import { toast } from "react-toastify";
import { ProductType } from "@/app/definations";
import { updateCart } from "@/app/utils/updateCart";
import usePostReq from "@/app/hooks/usePostReq";
import { Spinner } from "@material-tailwind/react";

const gochi = Gochi_Hand({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export default function FirstBanner() {
  const { data, homePageContentLoading } = useAuth();

  const { currentUser, cartItems, setCartItems } = useAuth();

  const { error, execute, loading } = usePostReq("/update-cart");

  async function handleCart(
    product: ProductType,
    selectedCombination: any,
    selectedVariants: any
  ) {
    if (!currentUser) {
      return toast.error("Please login!");
    }

    let quantity = 1;
    if (
      cartItems?.products.some(
        (productC: ProductType) =>
          product._id === productC._id &&
          productC.selectedCombination.id === selectedCombination?.id
      )
    ) {
      quantity =
        cartItems?.products.filter(
          (productC: any) =>
            product._id === productC._id &&
            productC.selectedCombination.id === selectedCombination?.id
        )[0]?.quantity + 1;
    } else if (
      cartItems?.products.some(
        (productC: any) =>
          product._id === productC._id &&
          productC.selectedCombination.id !== selectedCombination?.id
      )
    ) {
      quantity = 1;
    } else if (
      cartItems?.products.some((productC: any) => product._id === productC._id)
    ) {
      quantity =
        cartItems?.products.filter(
          (productC: any) => productC._id === product._id
        )[0]?.quantity + 1;
    }

    try {
      await updateCart(
        execute,
        product,
        selectedVariants,
        quantity,
        selectedCombination,
        setCartItems
      );
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Wrong!");
    }
  }

  return homePageContentLoading ? (
    <FirstBannerSkeleton />
  ) : (
    data?.featuredProducts?.length && data?.newCollections?.length && (
      <section className="container mx-auto px-5 pt-[5rem]">
        <div
          style={{ height: "700px" }}
          className="flex lg:flex-row flex-col w-full lg:flex-row"
        >
          <div className="featured-box bg-gray-100 relative z-50 lg:h-auto h-96 lg:w-1/2 w-full group">
            <Image
              src={data?.featuredProducts[0]?.images[0].link || ""}
              style={{
                mixBlendMode: "multiply",
                objectFit: "cover",
              }}
              className="w-full h-full"
              width={0}
              height={0}
              alt={data?.featuredProducts[0].name}
              title={data?.featuredProducts[0].name}
            />
            <h3
              className={`absolute text-5xl top-14 lg:text-left text-center left-0 right-0 lg:left-10 ${gochi.className}`}
            >
              Featured
            </h3>
            <button
              onClick={() => {
                let selectedCombination;
                const product = data?.featuredProducts[0];
                const selectedVariants = product?.variants?.map((variation) => {
                  return {
                    id: variation._id,
                    title: variation.title,
                    values: variation.values[0],
                  };
                });
                if (product.combinations) {
                  for (const combination of product.combinations) {
                    if (
                      combination.combinations.every((variant: any) => {
                        return selectedVariants?.find(
                          (selVariant: any) =>
                            selVariant.values.id === variant.id &&
                            selVariant.values.variant === variant.variant
                        );
                      })
                    ) {
                      selectedCombination = combination;
                    }
                  }
                }
                handleCart(product, selectedCombination, selectedVariants);
              }}
              disabled={loading}
              className="bg-white w-14 h-14 flex items-center justify-center rounded-full absolute hover:bg-black hover:text-white animate__animated hover:animate__fadeIn bottom-4 right-6 lg:right-16 lg:left-auto lg:top-auto lg:bottom-24 z-50"
            >
              {loading ? (
                <Spinner className="w-10 h-10" />
              ) : (
                <i className="bi bi-bag text-lg " />
              )}
            </button>
            <div className="flex-col justify-between animate__animated animate__slideInUp absolute top-0 bottom-0 left-0 right-0 lg:bottom-20 lg:w-1/2 w-full lg:h-1/2 h-full lg:right-10 lg:top-auto lg:left-auto p-5 hidden group-hover:flex z-49 bg-white">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="mb-1 text-xs">Essentials By LA</span>
                  <Link
                    shallow={true}
                    href={`/product/${data?.featuredProducts[0]._id}`}
                    className="font-bold"
                  >
                    {data?.featuredProducts[0].name}
                  </Link>
                  <Link
                    shallow={true}
                    href={`/shop?category=${data?.featuredProducts[0].category}`}
                  >
                    {data?.featuredProducts[0].category}
                  </Link>
                </div>

                <div className="bg-white w-14 h-14 flex items-center justify-center rounded-full hover:bg-black hover:text-white animate__animated hover:animate__fadeIn">
                  <WishlistButton
                    classes="bg-transparent w-14 h-14 rounded-full items-center hover:bg-black hover:text-white absolute right-5 top-5 cursor-pointer z-50"
                    product={data?.featuredProducts[0]}
                  />
                </div>
              </div>
              <div className="flex lg:flex-row flex-col items-start gap-5 lg:items-end">
                <h3 className="font-bold text-3xl">
                  {formatCurrency(
                    data?.featuredProducts[0].combinations[0].salePrice || 0
                  )}
                </h3>
                <del className="font-bold text-sm">
                  {formatCurrency(
                    data?.featuredProducts[0].combinations[0].price || 0
                  )}
                </del>
              </div>
            </div>
          </div>
          <div
            className="newcollection-box z-50 bg-black relative lg:h-full h-96 lg:w-1/2 w-full group"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Image
              style={{
                mixBlendMode: "multiply",
                objectFit: "cover",
              }}
              className="w-full h-full"
              width={0}
              height={0}
              alt={data?.newCollections[0].name}
              title={data?.newCollections[0].name}
              src={data?.newCollections[0]?.images[0].link || ""}
            />
            <h3
              className={`absolute text-5xl top-14 lg:text-left text-center left-0 right-0 lg:left-10 ${gochi.className} text-white`}
            >
              New Collection
            </h3>
            <button
              onClick={() => {
                let selectedCombination;
                const product = data?.newCollections[0];
                const selectedVariants = product?.variants?.map((variation) => {
                  return {
                    id: variation._id,
                    title: variation.title,
                    values: variation.values[0],
                  };
                });
                if (product.combinations) {
                  for (const combination of product.combinations) {
                    if (
                      combination.combinations.every((variant: any) => {
                        return selectedVariants?.find(
                          (selVariant: any) =>
                            selVariant.values.id === variant.id &&
                            selVariant.values.variant === variant.variant
                        );
                      })
                    ) {
                      selectedCombination = combination;
                    }
                  }
                }
                handleCart(product, selectedCombination, selectedVariants);
              }}
              disabled={loading}
              className="bg-white w-14 h-14 flex items-center justify-center rounded-full  transition absolute hover:bg-black hover:text-white animate__animated transition hover:animate__fadeIn bottom-4 right-6 lg:right-16 lg:left-auto lg:top-auto lg:bottom-24 z-50"
            >
              {loading ? (
                <Spinner className="w-10 h-10" />
              ) : (
                <i className="bi bi-bag text-lg " />
              )}
            </button>
            <div className="flex-col justify-between animate__animated animate__slideInUp absolute top-0 bottom-0 left-0 right-0 lg:bottom-20 lg:w-1/2 w-full lg:h-1/2 h-full lg:right-10 lg:top-auto lg:left-auto bg-white p-5 hidden group-hover:flex z-49">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="mb-1 text-xs">Essentials By LA</span>
                  <Link
                    shallow={true}
                    href={`/product/${data?.newCollections[0]._id}`}
                    className="font-bold"
                  >
                    {data?.newCollections[0].name}
                  </Link>
                  <Link
                    shallow={true}
                    href={`/shop?category=${data?.newCollections[0].category}`}
                  >
                    {data?.newCollections[0].category}
                  </Link>
                </div>

                <div className="bg-white w-14 h-14 flex items-center justify-center rounded-full hover:bg-black hover:text-white animate__animated hover:animate__fadeIn">
                  <WishlistButton
                    classes="bg-transparent w-14 h-14 rounded-full items-center hover:bg-black hover:text-white absolute right-5 top-5 cursor-pointer z-50 transition"
                    product={data?.newCollections[0]}
                  />
                </div>

                {/* <button className="">
                <i className="bi bi-heart text-lg " />
              </button> */}
              </div>
              <div className="flex lg:flex-row flex-col items-start gap-5 lg:items-end">
                <h3 className="font-bold text-3xl">
                  {formatCurrency(
                    data?.newCollections[0].combinations[0].salePrice || 0
                  )}
                </h3>
                <del className="font-bold text-sm">
                  {formatCurrency(
                    data?.newCollections[0].combinations[0].price || 0
                  )}
                </del>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
}
