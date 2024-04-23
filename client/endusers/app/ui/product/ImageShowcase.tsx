import { ProductType } from "@/app/definations";
import { useRef, useState } from "react";

export default function ImageShowcase({
  product,
  setOpenLighthouse,
}: {
  product: ProductType;
  setOpenLighthouse: Function;
}) {
  const [selectedImg, setSelectedImg] = useState(product.images[0]);

  const imagesRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col w-lg-50 border-2">
      <div className="overflow-hidden inline-block">
        <img
          className=" transition transition-transform hover:scale-150 cursor-pointer"
          src={selectedImg.link}
          alt="Product"
          width="100%"
          onClick={() => setOpenLighthouse(true)}
          height="100%"
        />
      </div>
      <div className="flex">
        <button
          className="px-3"
          onClick={() =>
            imagesRef.current?.scrollBy({ behavior: "smooth", left: -100 })
          }
        >
          <i className="bi bi-arrow-left" />
        </button>
        <div
          ref={imagesRef}
          className="flex w-full overflow-x-auto my-2 images-scroll"
        >
          {product.images.map((img) => {
            return (
              <button
                className="flex-shrink-0"
                key={img.id}
                onClick={() => setSelectedImg(img)}
              >
                <img
                  alt="Product"
                  width="150px"
                  height="150px"
                  src={img.link}
                />
              </button>
            );
          })}
        </div>
        <button
          className="px-3"
          onClick={() =>
            imagesRef.current?.scrollBy({ behavior: "smooth", left: 100 })
          }
        >
          <i className="bi bi-arrow-right" />
        </button>
      </div>
    </div>
  );
}