import { Drawer } from "@material-tailwind/react";
import React from "react";
import { useAuth } from "../context/AuthProvider";
import { ProductType } from "../definations";
import CartCanvasRow from "./CartCanvasRow";
import { formatCurrency } from "../utils/formatCurrency";
import Link from "next/link";

export default function CartCanvas({
  openCart,
  closeDrawer,
}: {
  openCart: boolean;
  closeDrawer: any;
}) {
  const { cartItems, currentUser } = useAuth();

  return (
    <Drawer
      placement="right"
      open={openCart}
      onClose={closeDrawer}
      className={`p-4 overflow-y-auto ${
        openCart === true ? "no-doc-scroll" : ""
      }`}
      size={500}
      placeholder="Cart"
    >
      <div className="flex border-b-2 pb-3 items-center justify-between">
        <h3 color="blue-gray">Your Cart</h3>
        <button onClick={closeDrawer}>
          <i className="bi bi-x-lg" />
        </button>
      </div>
      {currentUser ? (
        <div className="flex h-full flex-col justify-between gap-10">
          <div>
            <div className="flex flex-col gap-4 my-8">
              {cartItems && cartItems.products?.length ? (
                cartItems?.products.map((product: ProductType, i: number) => {
                  return (
                    <CartCanvasRow key={product._id + i} product={product} />
                  );
                })
              ) : (
                <div className="text-center flex flex-col gap-4">
                  <h3 className="font-bold uppercase">your cart is empty</h3>
                  <Link
                    href="/shop"
                    className="border-2 border-black uppercase py-3 hover:bg-black hover:text-white transition px-20"
                  >
                    shop now
                  </Link>
                </div>
              )}
            </div>
          </div>
          {cartItems?.products?.length ? (
            <div>
              <div className="flex flex-col h-100 w-100 align-end gap-3">
                <div className="flex justify-between gap-4">
                  <strong>Shipping Price:</strong>
                  <strong>
                    {cartItems.shippingPrice === 0 && (
                      <span className="uppercase px-5 text-xs py-1 bg-black text-white rounded-full">
                        free
                      </span>
                    )}
                    &nbsp;&nbsp;&nbsp;
                    {formatCurrency(cartItems.shippingPrice)}
                  </strong>
                </div>
                <div className="flex justify-between gap-4">
                  <strong>Discounted Price:</strong>
                  <strong className="text-red">
                    -{formatCurrency(cartItems.discountedPrice)}
                  </strong>
                </div>
                <div className="flex justify-between gap-4">
                  <strong>Sub Total:</strong>
                  <strong>{formatCurrency(cartItems.subTotalPrice)}</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <strong>Total Price:</strong>
                  <strong>
                    {formatCurrency(
                      cartItems.shippingPrice +
                        cartItems.subTotalPrice -
                        cartItems.discountedPrice
                    )}
                  </strong>
                </div>
              </div>
              <div className="w-full mt-4 border-2 text-center border-black uppercase py-3 hover:bg-black hover:text-white transition">
                <Link href="/cart" className="">
                  View cart & checkout
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <h3 className="text-center">Please login</h3>
      )}
    </Drawer>
  );
}
