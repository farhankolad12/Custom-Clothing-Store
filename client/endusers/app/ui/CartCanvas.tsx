import { Drawer } from "@material-tailwind/react";
import React from "react";
import { useAuth } from "../context/AuthProvider";
import { ProductType } from "../definations";
import CartCanvasRow from "./CartCanvasRow";

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
      placeholder="Cart"
      open={openCart}
      placement="right"
      onClose={closeDrawer}
      className="p-4"
      size={400}
    >
      <div className="flex border-b-2 pb-3 items-center justify-between">
        <h1 color="blue-gray">Your Cart</h1>
        <button onClick={closeDrawer}>
          <i className="bi bi-x-lg" />
        </button>
      </div>
      <div className="flex flex-col gap-4 my-8">
        {currentUser ? (
          cartItems?.products.map((product: ProductType) => {
            return <CartCanvasRow key={product._id} product={product} />;
          })
        ) : (
          <h1 className="text-center">Please login</h1>
        )}
      </div>
    </Drawer>
  );
}
