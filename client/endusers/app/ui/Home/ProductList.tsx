import { ProductType } from "@/app/definations";
import { Carousel, IconButton, ThemeProvider } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductList({
  product,
  spanning,
  span,
}: {
  product: ProductType;
  spanning: boolean | undefined;
  span: string | undefined;
}) {
  return (
    <ThemeProvider>
      <div
        className={`group p-6 relative border border-grey hover:border-black cursor-pointer flex flex-col justify-between ${
          spanning ? span : ""
        }`}
        style={{ height: "600px" }}
      >
        <button className="bg-transparent w-14 h-14 rounded-full items-center hover:bg-black hover:text-white absolute right-5 top-5 cursor-pointer z-50">
          <i className="bi bi-heart text-lg font-bold" />
        </button>
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

        <Link
          href="/product/id"
          className="flex justify-between items-end mt-4 w-full"
        >
          <div className="flex flex-col w-full h-full">
            <span className="text-gray-700 text-sm">NIKE</span>
            <span className="fw-bold uppercase">black nike</span>
            <span className="text-gray-700 font-bold text-sm">Fitness</span>
            <span className="font-bold text-sm mt-4">$45</span>
          </div>
          <button className="bg-transparent w-20 h-16 rounded-full items-center hover:bg-black hover:text-white cursor-pointer">
            <i className="bi bi-bag text-lg font-bold" />
          </button>
        </Link>
      </div>
    </ThemeProvider>
  );
}
