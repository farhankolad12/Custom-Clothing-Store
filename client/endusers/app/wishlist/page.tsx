"use client";

import Link from "next/link";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import withAuth from "../utils/PrivateRoutes";
import { useGetReq } from "../hooks/useGetReq";
import { toast } from "react-toastify";
import LoadingSkeleton from "../loading";
import { ProductType } from "../definations";
import { formatCurrency } from "../utils/formatCurrency";
import WishlistItem from "../ui/WishlistItem";

function Page() {
  const {
    data: wishlists,
    error,
    loading,
    setData: setWishlists,
  } = useGetReq("/wishlists", {});

  if (error) {
    toast.error(error || "Something went wrong!");
  }

  console.log(wishlists);

  return loading ? (
    <LoadingSkeleton />
  ) : (
    <>
      <Header />
      <main className="px-10 my-5">
        <div className="flex gap-2">
          <Link href="/" className="text-xs uppercase text-gray-400">
            home
          </Link>
          <span className="text-xs uppercase">|</span>
          <span className="text-xs uppercase">wishlist</span>
        </div>

        <div className="mt-20">
          <h1 className="text-5xl font-bold  uppercase">product wishlist</h1>
          <div className={`${wishlists.length ? "border-y-2" : ""} my-20`}>
            {wishlists.length ? (
              wishlists.map((wishlist: ProductType) => {
                return (
                  <WishlistItem
                    setWishlists={setWishlists}
                    wishlist={wishlist}
                  />
                );
              })
            ) : (
              <h1 className="text-center uppercase text-2xl font-bold">
                No products in wishlist!
              </h1>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withAuth(Page);
