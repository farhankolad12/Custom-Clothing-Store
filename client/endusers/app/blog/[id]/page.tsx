"use client";

import { useGetReq } from "@/app/hooks/useGetReq";
import LoadingSkeleton from "@/app/loading";
import Footer from "@/app/ui/Footer";
import Header from "@/app/ui/Header";
import HTMLParser from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  const { data: blog, error, loading } = useGetReq("/blog-id", { id });

  return loading ? (
    <LoadingSkeleton />
  ) : blog?._id ? (
    <div className="not-home">
      <Header />
      <main className="px-10 my-5">
        <div className="flex flex-wrap gap-2">
          <Link
            shallow={true}
            href="/"
            className="text-xs uppercase text-gray-500"
          >
            home
          </Link>
          <span className="text-xs uppercase">|</span>
          <Link
            shallow={true}
            href="/shop"
            className="text-xs uppercase text-gray-500"
          >
            blogs
          </Link>
          <span className="text-xs uppercase">|</span>
          <Link
            shallow={true}
            href={`/blogs?category=${blog.category}`}
            className="text-xs uppercase text-gray-500"
          >
            {blog.category}
          </Link>
          <span className="text-xs uppercase">|</span>
          <span className="text-xs uppercase">{blog.title}</span>
        </div>
        <div className="mt-10">
          <Image
            loading="eager"
            unoptimized
            priority={true}
            src={blog.image.link}
            alt={blog.title}
            width={0}
            height={0}
            className="w-full h-auto"
          />
          <div className="my-6">
            <div className="flex gap-3 mb-5">
              <Link
                shallow={true}
                href="/"
                className="uppercase text-sm text-gray-600 font-bold"
              >
                {blog.category}
              </Link>
              <span className="uppercase text-sm font-bold">|</span>
              <span className="uppercase text-sm font-bold">
                {new Date(blog.createdAt).toDateString()}
              </span>
            </div>
            <h2 className="text-6xl font-bold uppercase">{blog.title}</h2>
            <p className="my-6">{blog.shortDescription}</p>
            <div className="[&>img]:w-full">
              {HTMLParser(blog.fullDescription)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  ) : (
    notFound()
  );
}
