import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essentials By LA: Cart",
  description: "Cart Page of Essentials By LA",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <head>
          <link rel="canonical" href="https://www.essentialsbyla.com/cart" />
          <meta property="og:title" content="Cart" />
          <meta
            property="og:url"
            content="https://www.essentialsbyla.com/cart"
          />
          <meta
            property="og:description"
            content="Cart Page of Essentials By LA"
          />

          <meta
            property="og:site_name"
            content="IN Cart Page Essentials By LA"
          />

          <meta property="og:type" content="website" />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
