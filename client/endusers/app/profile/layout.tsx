import type { Metadata } from "next";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Profile - Clothing Store",
  description: "Welcome to your account of custom clothing store",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container mx-auto">
        <section>
          <div className="flex gap-2 text-xs my-4">
            <Link
              className="uppercase font-bold text-gray-700 hover:text-black"
              href="/"
            >
              home
            </Link>
            <span> | </span>
            <span className="uppercase font-bold text-black">my account</span>
          </div>
          <div className="pt-20 pb-10 flex justify-between w-full gap-10">
            <div className="w-1/4 flex flex-col gap-4">
              <div className="py-4 w-full border-b-2 border-gray-300">
                <Link
                  href="/profile/orders"
                  className="uppercase font-bold text-xs "
                >
                  orders
                </Link>
              </div>
              <div className="py-4 w-full border-b-2 border-gray-300">
                <Link
                  href="/profile/addresses"
                  className="uppercase font-bold text-xs "
                >
                  addresses
                </Link>
              </div>
              <div className="py-4 w-full border-b-2 border-gray-300">
                <Link
                  href="/profile/account-details"
                  className="uppercase font-bold text-xs "
                >
                  account details
                </Link>
              </div>
              <div className="py-4 w-full border-b-2 border-gray-300">
                <button
                  type="button"
                  className="bg-transparent uppercase font-bold text-xs "
                >
                  logout
                </button>
              </div>
            </div>
            <div className="w-3/4">{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
