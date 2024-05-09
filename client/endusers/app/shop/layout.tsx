import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Page",
  description:
    "Explore the latest trends and timeless classics at Essentials By LA shop page. Browse our curated selection of clothing, shoes, bags, accessories, and more. Shop with confidence knowing you're getting high-quality fashion items from top brands. Elevate your wardrobe and express your unique style today.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link rel="canonical" href="https://www.essentialsbyla.com/shop" />
        <meta property="og:title" content="Essentials By LA: Shop Page" />
        <meta property="og:url" content="https://www.essentialsbyla.com/shop" />

        <meta property="og:site_name" content="IN Shop Page Essentials By LA" />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
