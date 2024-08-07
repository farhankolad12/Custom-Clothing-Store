"use client";

import { useGetReq } from "../hooks/useGetReq";
import { toast } from "react-toastify";
import LoadingSkeleton from "../loading";
import Link from "next/link";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import HTMLParser from "html-react-parser";

export default function Page() {
  const { data, error, loading } = useGetReq("/privacy-terms-page", {});

  if (error) {
    toast.error(error || "Something went wrong!");
  }

  return loading ? (
    <LoadingSkeleton />
  ) : data?.termsConditions ? (
    <div className="not-home">
      <Header />
      <main className="px-10 my-5">
        <div className="flex gap-2">
          <Link
            shallow={true}
            href="/"
            className="text-xs uppercase text-gray-500"
          >
            home
          </Link>
          <span className="text-xs uppercase">|</span>
          <span className="text-xs uppercase">Terms Conditions</span>
        </div>
        <section className="my-20">{HTMLParser(data.termsConditions)}</section>
      </main>
      <Footer />
    </div>
  ) : (
    <main className="py-10 text-center">Terms Conditions</main>
  );
}
