"use client";

import Link from "next/link";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import { useGetReq } from "../hooks/useGetReq";
import CategoryAccordion from "../ui/Shop/CategoryAccordion";
import LoadingSkeleton from "../loading";
import { ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Image from "next/image";
import { Spinner } from "@material-tailwind/react";
import Newsletter from "../ui/Blogs/Newsletter";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, error, loading } = useGetReq("/shop-page", {});

  const {
    data: blogsData,
    error: _error,
    loading: _loading,
  } = useGetReq("/filter-blogs", {
    searchParams,
  });

  async function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    filter: string
  ) {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams);

    const prevParams = params.get(filter)?.split(",");

    if (prevParams?.some((cat) => cat === value)) {
      params.set(filter, prevParams.filter((cat) => cat !== value).join(","));
      params.set("page", "1");

      return router.push(`/blogs?${params.toString()}`);
    }

    params.set(filter, [...(prevParams || []), value].join(","));

    params.set("page", "1");

    router.push(`/blogs?${params.toString()}`);
  }

  const debounced = useDebouncedCallback((val) => {
    const params = new URLSearchParams(searchParams);

    params.set("query", val);
    params.set("page", "1");

    router.push(`/blogs?${params.toString()}`);
  }, 1000);

  return loading ? (
    <LoadingSkeleton />
  ) : (
    <div className="not-home">
      <Header />
      <div className="flex gap-3 lg:px-10 lg:px-16 px-5 mt-8">
        <Link
          shallow={true}
          href="/"
          className="uppercase text-xs text-gray-600 font-bold"
        >
          home
        </Link>
        <span className="uppercase text-xs font-bold">|</span>
        <span className="uppercase text-xs font-bold">blogs</span>
      </div>
      <main className="flex w-full flex-col lg:flex-row gap-20 lg:px-16 px-5 my-20">
        <div className="flex flex-col gap-5 w-full lg:w-1/4">
          <div className="border-b border-gray-300 pb-5">
            <span className="uppercase font-bold text-xs">
              showing {blogsData?.startDocument}-{blogsData?.lastDocument} of{" "}
              {blogsData?.totalDocuments} results
            </span>
          </div>
          <div>
            <div className="w-full relative">
              <input
                onChange={(e) => debounced(e.target.value)}
                type="text"
                placeholder="TYPE YOUR SEARCH"
                className="form-control border-b-2 py-3 w-full my-14 text-black font-bold border-black outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-0 bottom-3 outline-none"
              >
                <i className="bi bi-search text-black font-bold text-lg" />
              </button>
            </div>
            <CategoryAccordion data={data} handleChange={handleChange} />
          </div>
          <div className="my-20">
            <h3 className="font-bold uppercase text-2xl">related posts</h3>
            <div className="flex flex-col gap-4 mt-5">
              {blogsData?.relatedPosts?.map((blog: any) => {
                return (
                  <div key={blog._id} className="flex gap-5 items-center">
                    <Image
                      loading="eager"
                      unoptimized
                      src={blog.image.link}
                      alt={blog.title}
                      width={0}
                      height={0}
                      className="w-[80px] h-[80px] object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase font-bold text-gray-800">
                        {blog.category}
                      </span>
                      <strong className="font-bold uppercase">
                        {blog.title}
                      </strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Newsletter />
        </div>
        <div className="flex flex-col w-full lg:w-3/4">
          <div className="my-10">
            {_loading ? (
              ""
            ) : // <ShopSkeleton />
            blogsData?.blogs.length ? (
              <>
                <div className="flex flex-col gap-20 w-full">
                  {blogsData.blogs.map((blog: any) => {
                    return (
                      <div key={blog._id} className="w-full">
                        <Image
                          loading="eager"
                          unoptimized
                          src={blog.image.link}
                          width={0}
                          height={500}
                          className="w-full object-cover"
                          alt={blog.title}
                        />
                        <div className="flex flex-col gap-3 mt-10">
                          <div className="flex gap-3">
                            <Link
                              shallow={true}
                              href="/"
                              className="uppercase text-sm text-gray-600 font-bold"
                            >
                              {blog.category}
                            </Link>
                            <span className="uppercase text-sm font-bold">
                              |
                            </span>
                            <span className="uppercase text-sm font-bold">
                              {new Date(blog.createdAt).toDateString()}
                            </span>
                          </div>
                          <h2 className="text-6xl font-bold uppercase">
                            {blog.title}
                          </h2>
                          <p className="my-6">{blog.shortDescription}</p>
                          <Link
                            href={`/blog/${blog._id}`}
                            className="border-2 border-black py-5 px-10 uppercase hover:bg-black hover:text-white transition w-auto"
                          >
                            read more
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center flex-wrap gap-2 my-10 justify-center items-ceter">
                  {[...Array(blogsData.totalPages)].map((c, ind) => {
                    return (
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("page", (ind + 1).toString());
                          router.push(`/blogs?${params.toString()}`);
                        }}
                        key={ind}
                        className={`border-2 border-black p-3 transition hover:bg-black hover:text-white rounded ${
                          (!searchParams.get("page") && ind === 0) ||
                          +(searchParams?.get("page") || 1) === ind + 1
                            ? "bg-black text-white"
                            : ""
                        }`}
                      >
                        {ind + 1}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="w-full py-5 text-center px-4 bg-gray-200">
                <span className="font-bold text-sm">
                  NO BLOGS WERE FOUND FOR PROVIDED QUERY PARAMETERS.
                </span>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
