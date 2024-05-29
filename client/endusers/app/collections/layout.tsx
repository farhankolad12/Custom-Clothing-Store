import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

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
      siteName: "Essentials By LA",
    },
    alternates: {
      canonical: "https://www.essentialsbyla.com/collections",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/categories-sitemap`
  ).catch(() => notFound());
  const categories = await res.json();

  const jsonLd = [];

  for (let i = 0; i < categories.length; i++) {
    const data = categories[i];
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Collection",
      "@id": "https://www.essentialsbyla.com/collections/" + data?.name,
      url: "https://www.essentialsbyla.com/collections/" + data?.name,
      alternateName: "Essentials By LA",
      name: "Buy " + data?.name,
      image: data?.bannerImg.link,
      description: data?.description,
      datePublished: new Date(data?.createdAt).toLocaleDateString(),
    });
  }

  return (
    <>
      {children}
      <Script
        strategy="worker"
        id="schema_coll_script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
