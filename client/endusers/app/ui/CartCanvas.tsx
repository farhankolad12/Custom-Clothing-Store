import { Drawer, IconButton } from "@material-tailwind/react";
import React from "react";
import { useAuth } from "../context/AuthProvider";
import { ProductType } from "../definations";
import { formatCurrency } from "../utils/formatCurrency";

export default function CartCanvas({
  openCart,
  closeDrawer,
}: {
  openCart: boolean;
  closeDrawer: any;
}) {
  const { cartItems } = useAuth();

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
      <div className="flex flex-col my-8">
        {cartItems?.products.map((product: ProductType) => {
          return (
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={product.images[0].link}
                  width="100px"
                  height="100px"
                  alt="product"
                />
                <div className="flex flex-col gap-1">
                  <span>{product.category}</span>
                  <strong>{product.name}</strong>
                  <strong>{formatCurrency(product.price)}</strong>
                </div>
              </div>
              <button>
                <i className="bi bi-x-lg" />
              </button>
            </div>
          );
        })}
      </div>
    </Drawer>
  );
}
