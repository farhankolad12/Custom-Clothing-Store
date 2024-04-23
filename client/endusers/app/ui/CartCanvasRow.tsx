import { Spinner } from "@material-tailwind/react";
import { ProductType } from "../definations";
import { formatCurrency } from "../utils/formatCurrency";
import usePostReq from "../hooks/usePostReq";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";

export default function CartCanvasRow({ product }: { product: ProductType }) {
  const { setCartItems, cartItems } = useAuth();
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