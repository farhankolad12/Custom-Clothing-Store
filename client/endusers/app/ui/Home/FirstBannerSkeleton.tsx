export default function FirstBannerSkeleton() {
  return (
    <section
      className="container mx-auto px-5 animate-pulse"
      style={{ paddingTop: "45rem" }}
    >
      <div
        style={{ height: "700px" }}
        className="flex lg:flex-row flex-col w-full lg:flex-row"
      >
        <div className="featured-box bg-gray-100 relative z-50 lg:h-auto h-96 lg:w-1/2 w-full group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-full w-full text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <h1
            className={`absolute top-14 lg:text-left text-center left-0 right-0 lg:left-10 h-5 w-40 rounded-full bg-gray-300`}
          ></h1>
          <div className="flex-col justify-between animate__animated animate__slideInUp absolute top-0 bottom-0 left-0 right-0 lg:bottom-20 lg:w-1/2 w-full lg:h-1/2 h-full lg:right-10 lg:top-auto lg:left-auto p-5 hidden group-hover:flex z-49 bg-white">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div className="h-2 w-56 rounded-full bg-gray-300"></div>
                <div className="h-2 w-56 rounded-full bg-gray-300"></div>
                <div className="h-2 w-56 rounded-full bg-gray-300"></div>
              </div>
            </div>
            <div>
              <h1 className="ms-auto h-5 w-56 rounded-full bg-gray-300"></h1>
            </div>
          </div>
        </div>
        <div
          className="newcollection-box z-50 bg-black relative lg:h-full h-96 lg:w-1/2 w-full group"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-full w-full text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <h1
            className={`absolute top-14 lg:text-left text-center left-0 right-0 lg:left-10 h-5 w-40 rounded-full bg-gray-300`}
          ></h1>
          <div className="flex-col justify-between animate__animated animate__slideInUp absolute top-0 bottom-0 left-0 right-0 lg:bottom-20 lg:w-1/2 w-full lg:h-1/2 h-full lg:right-10 lg:top-auto lg:left-auto p-5 hidden group-hover:flex z-49 bg-white">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div className="h-2 w-56 rounded-full bg-gray-300"></div>
                <div className="h-2 w-56 rounded-full bg-gray-300"></div>
                <div className="h-2 w-56 rounded-full bg-gray-300"></div>
              </div>
            </div>
            <div>
              <h1 className="ms-auto h-5 w-56 rounded-full bg-gray-300"></h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
