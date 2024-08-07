import { ProductType } from "@/app/definations";
import Image from "next/image";
import { useState } from "react";

export default function LightHouse({
  product,
  setOpenLighthouse,
}: {
  product: ProductType;
  setOpenLighthouse: Function;
}) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
      className="fixed no-doc-scroll top-0 bottom-0 right-0 left-0 w-full h-full flex justify-center z-50 items-center px-5"
    >
      <button
        onClick={() => {
          if (currentImage !== 0) {
            setCurrentImage((prev) => prev - 1);
          }
        }}
        className="absolute top-50 left-5"
      >
        <i className="bi bi-arrow-left lg:text-white text-black text-xl" />
      </button>
      <button
        onClick={() => {
          if (currentImage !== product.images.length - 1) {
            setCurrentImage((prev) => prev + 1);
          }
        }}
        className="absolute top-50 right-5"
      >
        <i className="bi bi-arrow-right lg:text-white text-black text-xl" />
      </button>
      <div className="flex flex-col gap-3 items-end">
        <button onClick={() => setOpenLighthouse(false)} className="mt-5">
          <i className="bi bi-x-lg text-white" />
        </button>
        <Image
          loading="eager"
          unoptimized
          src={product.images[currentImage].link}
          width={500}
          className="h-[500px] object-cover"
          height={0}
          alt={product.name}
          title={product.name}
        />
      </div>
    </div>
  );
}
