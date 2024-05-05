import { Drawer } from "@material-tailwind/react";
import React from "react";
import { useAuth } from "../context/AuthProvider";
import { ProductType } from "../definations";
import CartCanvasRow from "./CartCanvasRow";
import { formatCurrency } from "../utils/formatCurrency";
import { useRouter } from "next/navigation";

export default function CartCanvas({
  openCart,
  closeDrawer,
}: {
  openCart: boolean;
  closeDrawer: any;
}) {
  const { cartItems, currentUser } = useAuth();
  const router = useRouter();

  return (
    <Drawer
      placement="right"
      open={openCart}
      onClose={closeDrawer}
      className="p-4 overflow-y-auto"
      size={500}
      placeholder="Cart"
    >
      <div className="flex border-b-2 pb-3 items-center justify-between">
        <h1 color="blue-gray">Your Cart</h1>
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
                <div className="text-center">
                  <h3 className="font-bold uppercase">your cart is empty</h3>
                  <button
                    onClick={() => router.push("/shop")}
                    className="border-2 border-black uppercase py-3 hover:bg-black hover:text-white transition px-20 mt-4"
                  >
                    shop now
                  </button>
                </div>
              )}
            </div>
          </div>
          {cartItems?.products.length ? (
            <div>
              <div className="flex flex-col h-100 w-100 align-end gap-3">
                <div className="flex justify-between gap-4">
                  <strong>Shipping Price:</strong>
                  <strong>{formatCurrency(cartItems.shippingPrice)}</strong>
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
              <button
                onClick={() => router.push("/cart")}
                className="border-2 border-black uppercase py-3 hover:bg-black hover:text-white transition w-full mt-4"
              >
                View cart & checkout
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <h1 className="text-center">Please login</h1>
      )}
    </Drawer>
  );
}
