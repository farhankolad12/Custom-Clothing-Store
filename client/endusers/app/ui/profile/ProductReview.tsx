import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductReview({
  setReviews,
  review,
}: {
  review: any;
  setReviews: Function;
}) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(review.rating);
  const [message, setMessage] = useState(review.message);

  useEffect(() => {
    setReviews((prev: any) => {
      return prev.map((review1: any) => {
        return review1.id === review.id
          ? { ...review1, message, rating }
          : review1;
      });
    });
  }, [rating, message]);

  return (
    <div className="flex flex-col border-b border-black pb-10">
      <div className="flex justify-between items-center">
        <strong className="uppercase">{review.name}</strong>
        <Image
          src={review.images[0].link}
          alt={review.name}
          className="rounded"
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-col mt-5">
        <label htmlFor="star-rating">Give Star Rating</label>
        <div>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={
                  index <= (hover || rating)
                    ? "text-black btn p-0"
                    : "text-gray-400 btn p-0"
                }
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star text-xl">&#9733;</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="relative mt-5 w-full min-w-[200px]">
        <textarea
          className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Message
        </label>
      </div>
    </div>
  );
}
