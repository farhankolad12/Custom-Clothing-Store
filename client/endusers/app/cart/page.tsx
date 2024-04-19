"use client";

import Link from "next/link";
import Header from "../ui/Header";
import withAuth from "../utils/PrivateRoutes";
import Footer from "../ui/Footer";
import { useAuth } from "../context/AuthProvider";
import { ProductType } from "../definations";
import { formatCurrency } from "../utils/formatCurrency";
import CartRow from "../ui/Cart/CartRow";

function Page() {
  const { cartItems } = useAuth();

  return (
    <>
      <Header />
      <main className="px-10 my-5">
        <div className="flex gap-2">
          <Link href="/" className="text-xs uppercase text-gray-500">
            home
          </Link>
          <span className="text-xs uppercase">|</span>
          <span className="text-xs uppercase">cart</span>
        </div>
        <div className="my-20">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left ">
              <thead>
                <tr>
                  <th className="border-b-2 text-xs uppercase p-4 text-center">
                    Product
                  </th>
                  <th className="border-b-2  text-xs uppercase p-4">Price</th>
                  <th className="border-b-2 text-xs uppercase p-4">Quantity</th>
                  <th className="border-b-2 text-xs uppercase p-4">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.products.map((product: ProductType, i: number) => {
                  return <CartRow key={product._id} product={product} />;
                })}
              </tbody>
            </table>
          </div>
          <div className="my-10 flex lg:flex-row justify-between items-start flex-col gap-10">
            <div className="flex lg:flex-row flex-col gap-4 w-full">
              <input
                type="text"
                placeholder="COUPON CODE"
                className="bg-transparent border-b-2 border-black p-0 py-4 outline-none"
              />
              <button className="px-5 py-4 border-2 border-black hover:bg-black hover:text-white transition uppercase">
                apply coupon
              </button>
            </div>
            <div className="w-full flex flex-col gap-6">
              <div className="border-b-2 flex justify-between pb-4">
                <strong>Shipping Price:</strong>
                <strong>{formatCurrency(cartItems.shippingPrice)}</strong>
              </div>
              <div className="border-b-2 flex justify-between pb-4">
                <strong>Sub Total:</strong>
                <strong>{formatCurrency(cartItems.subTotalPrice)}</strong>
              </div>
              <div className="border-b-2 flex justify-between pb-4">
                <strong>Discounted Price:</strong>
                <strong>{formatCurrency(cartItems.discountedPrice)}</strong>
              </div>
              <div className="border-b-2 flex justify-between pb-4">
                <strong>Total Price:</strong>
                <strong>
                  {formatCurrency(
                    cartItems.shippingPrice +
                      cartItems.subTotalPrice -
                      cartItems.discountedPrice
                  )}
                </strong>
              </div>
              <button className="py-4 border-2 border-black hover:bg-black hover:text-white transition uppercase font-bold">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withAuth(Page);
