import { useAuth } from "@/app/context/AuthProvider";
import { ProductType } from "@/app/definations";
import usePostReq from "@/app/hooks/usePostReq";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Carousel, IconButton, ThemeProvider } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import WishlistButton from "../WishlistButton";

export default function ProductList({
  product,
  spanning,
  span,
}: {
  product: ProductType;
  spanning: boolean | undefined;
  span: string | undefined;
}) {
  const { setCartItems, currentUser, cartItems } = useAuth();

  const { error, execute, loading, setError } = usePostReq("/update-cart");

  async function handleCart() {
    let quantity = 1;
    if (
      cartItems.products.some((productC: any) => product._id === productC._id)
    ) {
      quantity =
        cartItems.products.filter(
          (productC: any) => productC._id === product._id
        )[0].quantity + 1;
    }

    try {
      const res = await execute({
        productId: product._id,
        selectedVariantIds: product.variants.map((variation) => {
          return {
            id: variation._id,
            title: variation.name,
            values: variation.values[0],
          };
        }),
        quantity,
      });

      if (!res.success) {
        return toast.error(res.message || "Wrong!");
      }

      setCartItems((prev: any) => {
        return {
          ...prev,
          products: prev.products.some(
            (productC: any) => productC._id === product._id
          )
            ? prev.products.map((productC: any) => {
                return productC._id === product._id
                  ? { ...productC, quantity }
                  : productC;
              })
            : [
                ...prev?.products,
                {
                  ...product,
                  quantity: 1,
                  selectedVariantIds: product.variants.map((variation) => {
                    return {
                      id: variation._id,
                      title: variation.name,
                      values: variation.values[0],
                    };
                  }),
                },
              ],
        };
      });
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Wrong!");
    }
  }

  return (
    <ThemeProvider>
      <div
        className={`group p-6 relative border border-grey hover:border-black cursor-pointer flex flex-col justify-between ${
          spanning ? span : ""
        }`}
        style={{ height: "600px" }}
      >
        <WishlistButton
          classes="bg-transparent w-14 h-14 rounded-full items-center hover:bg-black hover:text-white absolute right-5 top-5 cursor-pointer z-50"
          product={product}
        />
        <Carousel
          className="z-49"
          style={{ height: "600px" }}
          prevArrow={({ handlePrev }) => (
            <IconButton
              placeholder=""
              variant="text"
              color="black"
              size="lg"
              onClick={handlePrev}
              className="hidden group-hover:block !absolute top-2/4 left-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              placeholder=""
              variant="text"
              color="black"
              size="lg"
              onClick={handleNext}
              className="hidden group-hover:block !absolute top-2/4 !right-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          )}
          navigation={() => false}
          placeholder="Product"
        >
          {product.images.map((img) => {
            return (
              <div
                key={img.id}
                className={`h-full ${spanning ? "bg-gray-100" : ""}`}
                style={{
                  backgroundImage: `url('${img.link}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100%",
                  backgroundPosition: "center",
                  backgroundBlendMode: spanning ? "multiply" : "normal",
                }}
              />
            );
          })}
        </Carousel>

        <div className="flex justify-between items-end mt-4 w-full">
          <div className="flex flex-col w-full h-full">
            <Link
              href={`/product/${product._id}`}
              className="text-gray-700 text-sm"
            >
              TeeVerse
            </Link>
            <Link
              href={`/product/${product._id}`}
              className="fw-bold uppercase"
            >
              {product.name}
            </Link>
            <Link
              href={`/product/${product._id}`}
              className="text-gray-700 font-bold text-sm"
            >
              {product.category}
            </Link>
            <span className="font-bold text-sm mt-4">
              {formatCurrency(product.price)}
            </span>
          </div>
          <button
            disabled={loading}
            onClick={handleCart}
            className="bg-transparent w-20 h-16 rounded-full items-center hover:bg-black hover:text-white cursor-pointer"
          >
            {loading ? "..." : <i className="bi bi-bag text-lg font-bold" />}
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
}
