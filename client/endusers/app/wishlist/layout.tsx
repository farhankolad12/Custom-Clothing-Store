import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Wishlist Page of Essentials By LA",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link rel="canonical" href="https://www.essentialsbyla.com/wishlist" />
        <meta property="og:title" content="Wishlist" />
        <meta
          property="og:url"
          content="https://www.essentialsbyla.com/wishlist"
        />

        <meta
          property="og:site_name"
          content="IN Wishlist Page Essentials By LA"
        />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
