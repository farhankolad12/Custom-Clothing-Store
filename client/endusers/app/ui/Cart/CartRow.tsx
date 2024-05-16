import { useAuth } from "@/app/context/AuthProvider";
import { ProductType } from "@/app/definations";
import usePostReq from "@/app/hooks/usePostReq";
import { formatCurrency } from "@/app/utils/formatCurrency";
import Image from "next/image";
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

      if (!res?.success) {
        return toast.error(res.message || error || "Something went wrong!");
      }

      toast.success(`${product.name} removed!`);

      setCartItems((prev: any) => {
        const subTotalPrice = prev.products.some(
          (productC: any) =>
            productC._id === product._id &&
            productC.selectedCombination.id === product.selectedCombination.id
        )
          ? (prev.subTotalPrice || 0) -
            product.selectedCombination.salePrice * product.quantity
          : (prev.subTotalPrice || 0) +
            product.selectedCombination.salePrice * product.quantity;

        return {
          ...prev,
          // shippingPrice: 200,
          discountedPrice: prev.coupon.code
            ? prev.coupon.minimumCartValue > subTotalPrice
              ? 0
              : prev.discountedPrice
            : prev.discountedPrice,
          subTotalPrice,
          coupon: prev.coupon.code
            ? prev.coupon.minimumCartValue > subTotalPrice
              ? {}
              : prev.coupon
            : prev.coupon,
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
          <Link shallow={true} href={"/product/" + product._id}>
            <Image
              src={product.images[0].link}
              width={100}
              height={100}
              className="border-2"
              alt={product.name}
              title={product.name}
            />
          </Link>
          <Link shallow={true} href={"/product/" + product._id}>
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
