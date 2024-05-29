import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Cart",
  description: "Cart Page of Essentials By LA",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link rel="canonical" href="https://www.essentialsbyla.com/cart" />
        <meta property="og:title" content="Cart" />
        <meta property="og:url" content="https://www.essentialsbyla.com/cart" />

        <meta property="og:site_name" content="IN Cart Page Essentials By LA" />

        <meta property="og:type" content="website" />
        <Script
          strategy="afterInteractive"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
      </head>
      {children}
    </>
  );
}
