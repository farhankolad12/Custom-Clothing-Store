import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Shipping Policy Page of Essentials By LA",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link
          rel="canonical"
          href="https://www.essentialsbyla.com/shipping-policy"
        />
        <meta property="og:title" content="Shipping Policy" />
        <meta
          property="og:url"
          content="https://www.essentialsbyla.com/shipping-policy"
        />

        <meta
          property="og:site_name"
          content="IN Shipping Policy Page Essentials By LA"
        />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
