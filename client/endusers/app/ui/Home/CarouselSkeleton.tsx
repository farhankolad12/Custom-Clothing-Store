export default function CarouselSkeleton() {
  return (
    <div className="relative w-full overflow-y-hidden animate-pulse">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-screen w-full overflow-y-hidden text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
      <div className="absolute lg:inset-0 p-0 left-0 right-0 lg:ps-20 pe-25 top-0 grid h-full w-full items-center  overflow-hidden	">
        <div className="overflow-hidden	w-full lg:justify-start lg:items-start justify-center items-center flex flex-col lg:w-1/2 lg:text-start text-center">
          <h1 className="h-10 w-64 rounded-full bg-gray-300"></h1>
          <span className="my-4 h-3 w-52 rounded-full bg-gray-300"></span>
          <button
            className="h-10 w-40 bg-gray-300 shadow-none hover:shadow-none"
            type="button"
          ></button>
        </div>
      </div>
    </div>
  );
}
