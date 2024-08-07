import { toast } from "react-toastify";
import { ProductType } from "../definations";

export async function updateCart(
  execute: Function,
  product: ProductType,
  selectedVariants: any,
  quantity: number,
  selectedCombination: any,
  setCartItems: Function,
  shippingConfig: any
) {
  const res = await execute({
    productId: product._id,
    selectedVariantIds: selectedVariants,
    quantity,
    selectedCombination,
  });

  if (!res?.success) {
    return toast.error(res.message || "Something went wrong!");
  }

  setCartItems((prev: any) => {
    const subTotalPrice = prev?.products.some(
      (productC: any) =>
        productC._id === product._id &&
        productC.selectedCombination.id === selectedCombination.id
    )
      ? (prev.subTotalPrice || 0) +
        selectedCombination.salePrice * quantity -
        selectedCombination.salePrice
      : (prev.subTotalPrice || 0) + selectedCombination.salePrice * quantity;
    return {
      ...prev,
      shippingPrice: shippingConfig?.minimumAmount
        ? shippingConfig.minimumAmount < subTotalPrice
          ? 0
          : shippingConfig.shippingCharge
        : shippingConfig?.shippingCharge,
      discountedPrice: prev?.discountedPrice ? prev.discountedPrice : 0,
      subTotalPrice,
      products: prev?.products.some(
        (productC: any) =>
          productC._id === product._id &&
          productC.selectedCombination.id === selectedCombination.id
      )
        ? prev?.products.map((productC: any) => {
            return productC._id === product._id &&
              productC.selectedCombination.id === selectedCombination.id
              ? { ...productC, quantity }
              : productC;
          })
        : prev?.products.some(
            (productC: any) =>
              productC._id === product._id &&
              productC.selectedCombination.id !== selectedCombination.id
          )
        ? [
            ...prev?.products,
            {
              ...product,
              quantity,
              selectedVariantIds: selectedVariants,
              selectedCombination,
            },
          ]
        : [
            ...prev?.products,
            {
              ...product,
              quantity,
              selectedVariantIds: selectedVariants,
              selectedCombination,
            },
          ],
    };
  });

  return toast.success(product.name + " added to cart!");
}
