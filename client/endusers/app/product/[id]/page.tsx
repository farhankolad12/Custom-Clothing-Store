"use client";

import { useAuth } from "@/app/context/AuthProvider";
import { ProductType } from "@/app/definations";
import { useGetReq } from "@/app/hooks/useGetReq";
import usePostReq from "@/app/hooks/usePostReq";
import LoadingSkeleton from "@/app/loading";
import Footer from "@/app/ui/Footer";
import Header from "@/app/ui/Header";
import ProductList from "@/app/ui/Home/ProductList";
import WishlistButton from "@/app/ui/WishlistButton";
import ImageShowcase from "@/app/ui/product/ImageShowcase";
import LightHouse from "@/app/ui/product/LightHouse";
import VariationsList from "@/app/ui/product/VariationsList";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { updateCart } from "@/app/utils/updateCart";
import {
  Spinner,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [openLighthouse, setOpenLighthouse] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<any>([]);
  const [selectedVariantPrice, setSelectedVariantPrice] = useState<any>();
  const [value, setValue] = useState(0);

  const { id } = useParams();
  const { data, setCartItems, currentUser } = useAuth();
  const {
    data: product,
    error,
    loading,
  } = useGetReq("/product", {
    id,
  });
  const {
    error: _error,
    execute,
    loading: _loading,
  } = usePostReq("/update-cart");

  useEffect(() => {
    if (product) {
      setSelectedVariants(
        product.variants.map((variant: any) => {
          return { ...variant, values: variant.values[0] };
        })
      );
    }
  }, [product]);

  useEffect(() => {
    if (selectedVariants.length && product) {
      for (const combination of product.combinations) {
        if (
          combination.combinations.every((variant: any) => {
            return selectedVariants.find(
              (selVariant: any) =>
                selVariant.values.id === variant.id &&
                selVariant.values.variant === variant.variant
            );
          })
        ) {
          setSelectedVariantPrice(combination);
        }
      }
    }
  }, [selectedVariants, product]);

  const decrement = () => {
    setValue(value - 1);
  };

  const increment = () => {
    setValue(value + 1);
  };

  async function handleCart() {
    if (!currentUser) {
      return toast.error("Please login!");
    }

    if (value === 0) {
      return toast.error("Please select quantity bigger than 0");
    }

    try {
      await updateCart(
        execute,
        product,
        selectedVariants,
        value,
        selectedVariantPrice,
        setCartItems
      );
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Something went wrong!");
    }
  }

  return loading ? (
    <LoadingSkeleton />
  ) : product?._id ? (
    <div className="not-home">
      <Header />
      <main className="px-10 my-5">
        <div className="flex flex-wrap gap-2">
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
            <h1 className="uppercase font-bold lg:text-6xl text-5xl lg:text-8xl">
              {product.name}
            </h1>
            <div className="my-5 flex gap-10">
              <strong className="font-bold text-xl">
                {formatCurrency(selectedVariantPrice?.salePrice || 0)}
              </strong>
              <strong className="font-bold text-xl">
                <del>{formatCurrency(selectedVariantPrice?.price || 0)}</del>
              </strong>
            </div>
            <div className="my-5">Customer Reviews</div>
            <div className="my-5">
              <p>{product.shortDescription}</p>
            </div>
            <div className="border-y-2 w-full flex flex-col  gap-5 py-4">
              {product.variants.map((variant: any) => {
                return (
                  <VariationsList
                    setSelectedVariants={setSelectedVariants}
                    selectedVariants={selectedVariants}
                    key={variant._id || variant.id}
                    variant={variant}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 my-10">
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
              <button
                onClick={handleCart}
                className="uppercase lg:px-10 px-4 py-3 border-2 border-black font-bold transition hover:bg-black hover:text-white"
              >
                {_loading ? (
                  <Spinner className="w-4 h-4" />
                ) : (
                  <>
                    add to cart &nbsp; <i className="bi bi-bag" />
                  </>
                )}
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
    </div>
  ) : (
    notFound()
  );
}
