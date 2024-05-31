import { ProductType } from "@/app/definations";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import { handler } from "@material-tailwind/react/types/components/dialog";
import ProductReview from "./ProductReview";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import usePostReq from "@/app/hooks/usePostReq";
import { useAuth } from "@/app/context/AuthProvider";

export default function ReviewsModel({
  open,
  handleOpen,
  products,
  orderId,
  setIsReview,
}: {
  open: boolean;
  handleOpen: handler;
  products: ProductType[];
  orderId: string;
  setIsReview: Function;
}) {
  const { currentUser } = useAuth();

  const [reviews, setReviews] = useState(
    products.map((product) => {
      return {
        id: Math.floor(Math.random() * 99999999),
        message: "",
        rating: 0,
        name: product.name,
        images: product.images,
        productId: product.productId,
        orderId,
        username: `${currentUser?.fname} ${currentUser?.lname}`,
        email: currentUser?.email,
      };
    })
  );

  const { error, execute, loading, setError } = usePostReq("/reviews");

  async function handleSubmit() {
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];

      if (review.message === "" || review.rating === 0) {
        setError("Please fill required fields");
        break;
      }
    }

    try {
      const res = await execute({ reviews });

      if (!res?.success) {
        return toast.error(res.message || error);
      }

      setIsReview(true);
      toast.success("Review added");
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <Dialog placeholder="Review Modal" open={open} handler={handleOpen}>
      <DialogHeader placeholder="">Write Review</DialogHeader>
      <DialogBody className="h-96 overflow-y-scroll" placeholder="Review Body">
        <div className="w-full flex flex-col gap-10">
          {reviews.map((review) => {
            return (
              <ProductReview
                setReviews={setReviews}
                key={review.name}
                review={review}
              />
            );
          })}
        </div>
        {error && (
          <div className="text-center my-5">
            <strong className="font-bold uppercase text-red-500">
              {error}
            </strong>
          </div>
        )}
      </DialogBody>
      <DialogFooter placeholder="Reivew Footer">
        <div className="flex lg:flex-row flex-col gap-4 w-full">
          <button
            type="button"
            disabled={loading}
            onClick={handleOpen}
            className="bg-gray-500 text-white rounded transition w-full py-3"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            onClick={() => {
              handleSubmit();
              return handleOpen;
            }}
            className="border-2 border-black rounded transition font-bold uppercase hover:bg-black text-black hover:text-white w-full py-3"
          >
            {loading ? <Spinner className="w-10 h-10" /> : "Submit"}
          </button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}
