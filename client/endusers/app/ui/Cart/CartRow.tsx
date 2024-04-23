import { useAuth } from "@/app/context/AuthProvider";
import { ProductType } from "@/app/definations";
import usePostReq from "@/app/hooks/usePostReq";
import { formatCurrency } from "@/app/utils/formatCurrency";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

export default function CartRow({ product }: { product: ProductType }) {
  const { error, execute, loading } = usePostReq("/delete-cart");
  const { setCartItems } = useAuth();

  async function handleDelete() {
    try {
      const res = await execute({
        productId: product._id,
        selectedCombination: product.selectedCombination,
        quantity: product.quantity,
      });

      if (!res.success) {
        return toast.error(res.message || error || "Something went wrong!");
      }

      toast.success(`${product.name} removed!`);

      setCartItems((prev: any) => {
        return {
          ...prev,
          // shippingPrice: 200,
          // discountedPrice: 0,
          subTotalPrice: prev.products.some(
            (productC: any) =>
              productC._id === product._id &&
              productC.selectedCombination.id === product.selectedCombination.id
          )
            ? (prev.subTotalPrice || 0) -
              product.selectedCombination.salePrice * product.quantity
            : (prev.subTotalPrice || 0) +
              product.selectedCombination.salePrice * product.quantity,
          products: prev.products.some(
            (productC: any) =>
              productC._id === product._id &&
              productC.selectedCombination.id === product.selectedCombination.id
          )
            ? prev.products.filter((productC: any) => {
                return (
                  productC.selectedCombination.id !==
                  product.selectedCombination.id
                );
              })
            : [],
        };
      });
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Something went wrong!");
    }
  }

  return (
    <tr>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-5">
          <button onClick={handleDelete}>
            <i className="bi bi-x-lg" />
          </button>
          <Link href={"/product/" + product._id}>
            <img
              src={product.images[0].link}
              width="100px"
              height="100px"
              className="border-2"
              alt="Product"
            />
          </Link>
          <Link href={"/product/" + product._id}>
            <strong className="uppercase">{product.name}</strong>
          </Link>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        {formatCurrency(product.selectedCombination.salePrice)}
      </td>
      <td className="p-4 border-b border-blue-gray-50">{product.quantity}</td>
      <td className="p-4 border-b border-blue-gray-50">
        {formatCurrency(
          product.selectedCombination.salePrice * product.quantity
        )}
      </td>
    </tr>
  );
}