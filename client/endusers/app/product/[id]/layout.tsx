import { ProductType } from "@/app/definations";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const productRes = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_HOSTNAME +
      "/product" +
      "?" +
      new URLSearchParams({ id })
  ).catch(() => notFound());

  const product = await (productRes.status === 200 &&
    (await productRes?.json()));

  return {
    title: {
      absolute: product?.name || "Product Not Found",
    },
    description: product?.shortDescription,
    alternates: {
      canonical: "https://www.essentialsbyla.com/product" + product?._id,
    },
    openGraph: {
      type: "website",
      title: product?.name,
      images: product?.images?.map((img: any) => ({ url: img.link })),
      description: product?.shortDescription,
      url: `https://www.essentialsbyla.com/product/${product?._id}`,
      siteName: "Essentials By LA",
    },
    keywords: [
      ...(product?.tags?.map((p: any) => p.tag) || ""),
      product?.category,
    ],
  };
}

export async function generateStaticParams() {
  // fetch data
  const productRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/products-sitemap`
  );

  const products = productRes.status === 200 && (await productRes.json());

  return products?.map((product: ProductType) => {
    return product._id;
  });
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  // read route params
  const id = params.id;

  // fetch data
  const productRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/product?id=${id}`,
    {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":
          process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || "",
      },
    }
  ).catch(() => notFound());

  const product = await (productRes.status === 200 && productRes?.json());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://www.essentialsbyla.com/product/" + product?._id,
    url: "https://www.essentialsbyla.com/product/" + product?._id,
    alternateName: "Essentials By LA",
    name: "Buy " + product?.name,
    image: product?.images?.map((img: any) => img.link),
    description: product?.shortDescription,
    datePublished: new Date(product?.createdAt).toLocaleDateString(),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: await (product?.totalRating
        ? product.totalRating.toString()
        : "0"),
      reviewCount: await (product?.reviews
        ? product.reviews.length.toString()
        : "0"),
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: product?.combinations?.[0].salePrice.toString(),
      priceCurrency: "INR",
    },
    review: product?.reviews?.map((review: any) => {
      return {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: review.username,
        },
        datePublished: new Date(review.createdAt).toLocaleString(),
        reviewBody: review.message,
        name: review.name,
        reviewRating: {
          "@type": "Rating",
          bestRating: "5",
          ratingValue: review.rating.toString(),
          worstRating: "1",
        },
      };
    }),
  };
  return (
    <>
      {children}
      <Script
        id={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
