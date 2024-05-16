import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/home-page`
  ).catch(() => notFound());
  const data = await res.json();

  return {
    keywords: [
      ...data?.categories.map((cat: any) => {
        return cat.tags.map((tag: any) => tag.tag).join(",");
      }),
      ...data?.categories.map((cat: any) => {
        return cat.name;
      }),
      "Essentials By LA",
      "collections of essentialsbyla",
      "essentialsbyla collections website",
    ],
    title: "Collections",
    description:
      "Welcome to Essentials By LA Categories Page! Explore our extensive range of products carefully curated into distinct categories to enhance your shopping experience. From fashion essentials to tech gadgets, home decor to fitness gear, we have everything you need conveniently organized for effortless browsing. Discover top-quality products, unbeatable deals, and the latest trends across various categories. Start exploring now and find exactly what you're looking for, all in one place, with Essentials By LA. Shop smart, shop seamlessly, only with us!",
    openGraph: {
      type: "website",
      title: "collections",
      url: "https://www.essentialsbyla.com/collections",
      description:
        "Welcome to Essentials By LA Categories Page! Explore our extensive range of products carefully curated into distinct categories to enhance your shopping experience. From fashion essentials to tech gadgets, home decor to fitness gear, we have everything you need conveniently organized for effortless browsing. Discover top-quality products, unbeatable deals, and the latest trends across various categories. Start exploring now and find exactly what you're looking for, all in one place, with Essentials By LA. Shop smart, shop seamlessly, only with us!",
      images: data?.categories.map((cat: any) => {
        return {
          url: cat.bannerImg.link,
        };
      }),
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

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
          href="https://www.essentialsbyla.com/collections"
        />
        <meta property="og:title" content="Collections of all types" />
        <meta
          property="og:url"
          content="https://www.essentialsbyla.com/collections"
        />

        <meta
          property="og:site_name"
          content="IN collections Essentials By LA"
        />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
