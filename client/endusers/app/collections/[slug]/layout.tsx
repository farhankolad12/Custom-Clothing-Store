import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = params.slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/category-name?name=${name}`
  ).catch(() => notFound());
  const data = await res.json();

  return {
    keywords: [
      ...data?.tags.map((tag: any) => {
        return tag.tag;
      }),
      data?.name,
      "Essentials By LA",
      "collections of essentialsbyla",
      "essentialsbyla collections website",
    ],
    title: {
      absolute: "Buy " + data?.name,
    },
    description: data?.description,
    alternates: {
      canonical: "https://www.essentialsbyla.com/collections/" + data?.name,
    },
    openGraph: {
      siteName: "Essentials By LA",
      type: "website",
      title: {
        absolute: "Buy " + data?.name,
      },
      url: "https://www.essentialsbyla.com/collections/" + data?.name,
      description: data?.description,
      images: {
        url: data?.bannerImg.link,
      },
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  const name = params.slug;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/category-name?name=${name}`
  ).catch(() => notFound());
  const data = await res.json();

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "CategoryCodeSet",
    "@id": data?.name,
    name: data?.name,
    hasCategoryCode: {
      "@type": "CategoryCode",
      name: data?.name,
      description: data?.description,
      inCodeSet: data?.name,
    },
  };

  return (
    <>
      {children}
      <Script
        id={name}
        strategy="worker"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
