import type { Metadata } from "next";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Link from "next/link";
import LogoutButton from "../ui/profile/LogoutButton";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Profile Page of Essentials By LA",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link rel="canonical" href="https://www.essentialsbyla.com/profile" />
        <meta property="og:title" content="Essentials By LA: My Profile " />
        <meta
          property="og:url"
          content="https://www.essentialsbyla.com/profile"
        />

        <meta
          property="og:site_name"
          content="IN Profile Page Essentials By LA"
        />

        <meta property="og:type" content="website" />
      </head>
      <div className="not-home">
        <Header />
        <main className="container mx-auto">
          <section>
            <div className="flex gap-2 text-xs lg:px-0 px-5 my-4">
              <Link
                shallow={true}
                className="uppercase font-bold text-gray-700 hover:text-black"
                href="/"
              >
                home
              </Link>
              <span> | </span>
              <span className="uppercase font-bold text-black">my account</span>
            </div>
            <div className="pt-20 pb-10 flex lg:flex-row flex-col justify-between w-full gap-10 lg:px-0 px-5">
              <div className="lg:w-1/4 w-full flex flex-col gap-4">
                <div className="py-4 w-full border-b-2 border-gray-300">
                  <Link
                    shallow={true}
                    href="/profile/orders"
                    className="uppercase font-bold text-xs "
                  >
                    orders
                  </Link>
                </div>
                {/* <div className="py-4 w-full border-b-2 border-gray-300">
                <Link shallow={true}
                  href="/profile/addresses"
                  className="uppercase font-bold text-xs "
                >
                  addresses
                </Link>
              </div> */}
                <div className="py-4 w-full border-b-2 border-gray-300">
                  <Link
                    shallow={true}
                    href="/profile/account-details"
                    className="uppercase font-bold text-xs "
                  >
                    account details
                  </Link>
                </div>
                <div className="py-4 w-full border-b-2 border-gray-300">
                  <LogoutButton />
                </div>
              </div>
              <div className="lg:w-3/4 w-full">{children}</div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
