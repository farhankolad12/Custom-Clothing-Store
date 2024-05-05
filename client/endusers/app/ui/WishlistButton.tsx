import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { ProductType } from "../definations";
import usePostReq from "../hooks/usePostReq";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";

export default function WishlistButton({
  product,
  classes,
}: {
  product: ProductType | undefined;
  classes: string;
}) {
  const [isWish, setIsWish] = useState(product?.inWishlist);

  const { currentUser } = useAuth();
  const { error, execute, loading, setError } = usePostReq("/update-wishlist");

  if (error) {
    toast.error(error || "Something went wrong!");
  }

  async function handleWishlist() {
    if (!currentUser) return toast.error("Please login first!");

    try {
      const res = await execute({
        productId: product?._id,
      });

      if (!res?.success) {
        return toast.error(res.message || "Something went wrong!");
      }

      setIsWish((prev) => !prev);

      return toast.success(
        !isWish ? "Item added to wishlist" : "Item removed from wishlist"
      );
    } catch (err: any) {
      console.log(err);
      return toast.error(err || "Something went wrong!");
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleWishlist}
      className={classes + " z-50"}
    >
      {loading ? (
        <Spinner className="w-14 h-14" />
      ) : (
        <i
          className={`bi bi-heart${isWish ? "-fill" : ""} text-lg font-bold`}
        />
      )}
    </button>
  );
}
