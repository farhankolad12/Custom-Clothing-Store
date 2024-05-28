import { Spinner } from "@material-tailwind/react";
import { ProductType } from "../definations";
import { formatCurrency } from "../utils/formatCurrency";
import usePostReq from "../hooks/usePostReq";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";
import Image from "next/image";

export default function CartCanvasRow({ product }: { product: ProductType }) {
  const { setCartItems, data } = useAuth();
  const { error, execute, loading } = usePostReq("/delete-cart");

  if (error) {
    toast.error(error || "Something went wrong!");
  }

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
          shippingPrice: data?.homePageContent?.shippingConfig?.minimumAmount
            ? data?.homePageContent?.shippingConfig.minimumAmount <
              subTotalPrice
              ? 0
              : data?.homePageContent?.shippingConfig.shippingCharge
            : data?.homePageContent?.shippingConfig?.shippingCharge,
          discountedPrice: prev.coupon?.code
            ? prev.coupon.minimumCartValue > subTotalPrice
              ? 0
              : prev.discountedPrice
            : prev.discountedPrice,
          subTotalPrice,
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
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <Image
          unoptimized
          loading="eager"
          quality={100}
          src={product.images[0].link}
          width={100}
          height={100}
          alt={product.name}
          title={product.name}
        />
        <div className="flex flex-col gap-1">
          <span>{product.category}</span>
          <strong className="text-sm">{product.name}</strong>
          <strong className="text-sm">
            {formatCurrency(product.selectedCombination.salePrice)}
          </strong>
          <strong className="text-sm">Qty: {product.quantity}</strong>

          {product.selectedVariantIds.map((selectedVariant) => {
            return (
              <strong key={selectedVariant._id} className="text-xs">
                {selectedVariant.title}: {selectedVariant.values.variant}
              </strong>
            );
          })}
        </div>
      </div>
      <button disabled={loading} onClick={handleDelete}>
        {loading ? (
          <Spinner className="w-4 h-4" />
        ) : (
          <i className="bi bi-x-lg" />
        )}
      </button>
    </div>
  );
}
