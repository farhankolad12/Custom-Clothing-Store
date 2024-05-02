"use client";

import { useRouter } from "next/navigation";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="not-home">
      <Header />
      <main className="text-center px-10 flex flex-col justify-center items-center h-screen gap-10 lg:px-96 px-10">
        <h1 className="text-5xl font-bold uppercase">error page</h1>
        <span>
          The page you are looking for doesn't exist. It may have been moved or
          removed altogether. Please try searching for some other page, or
          return to the website's homepage to find what you're looking for.
        </span>
        <button
          onClick={() => router.push("/")}
          className="mt-5 border-2 border-black px-12 py-5 hover:bg-black hover:text-white transition uppercase font-bold"
        >
          back to home
        </button>
      </main>
      <Footer />
    </div>
  );
}
