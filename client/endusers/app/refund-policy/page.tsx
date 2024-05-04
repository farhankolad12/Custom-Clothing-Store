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
  ) : data?.refundPolicy ? (
    <div className="not-home">
      <Header />
      <main className="px-10 my-5">
        <div className="flex gap-2">
          <Link href="/" className="text-xs uppercase text-gray-500">
            home
          </Link>
          <span className="text-xs uppercase">|</span>
          <span className="text-xs uppercase">Refund/Cancellation Policy</span>
        </div>
        <section className="my-20">{HTMLParser(data.refundPolicy)}</section>
      </main>
      <Footer />
    </div>
  ) : (
    <main className="py-10 text-center">Refund/Cancellation Policy</main>
  );
}
