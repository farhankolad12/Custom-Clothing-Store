import { toast } from "react-toastify";
import { ProductType } from "../definations";
import { formatCurrency } from "../utils/formatCurrency";
import usePostReq from "../hooks/usePostReq";
import { Spinner } from "@material-tailwind/react";

export default function WishlistItem({
  wishlist,
  setWishlists,
}: {
  wishlist: ProductType;
  setWishlists: Function;
}) {
  const { error, execute, loading } = usePostReq("/delete-wishlist");

  if (error) {
    toast.error(error || "Something went wrong!");
  }

  async function handleDelete() {
    try {
      const res = await execute({
        productId: wishlist._id,
      });

      if (!res.success) {
        return toast.error(res.message || "Something went wrong!");
      }

      toast.success(wishlist.name + " removed!");

      setWishlists((prev: ProductType[]) =>
        prev.filter((product) => product._id !== wishlist._id)
      );
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Something went wrong!");
    }
  }

  return (
    <div className="border-b-2 py-4 flex flex-wrap justify-between items-center">
      <div className="flex flex-wrap items-center gap-4">
        <button disabled={loading} onClick={handleDelete}>
          {loading ? (
            <Spinner className="w-6 h-6" />
          ) : (
            <i className="bi bi-x-lg" />
          )}
        </button>
        <img
          src={wishlist.images[0].link}
          alt="Product"
          width="100px"
          height="100px"
        />
        <div className="flex flex-col gap-1">
          <strong>{wishlist.name}</strong>
          <span>{wishlist.category}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-8">
        <strong className="text-xl">{formatCurrency(wishlist.price)}</strong>
        <button className="bg-transparent border-2 border-black hover:bg-black hover:text-white uppercase px-5 py-4 hover:transition">
          add to cart &nbsp;
          <i className="bi bi-bag" />
        </button>
      </div>
    </div>
  );
}
