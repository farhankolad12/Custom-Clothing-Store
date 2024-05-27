import { ProductType } from "@/app/definations";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const productRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/product?id=${id}`
  ).catch(() => notFound());

  const product = productRes.status === 200 && (await productRes?.json());

  // console.log(product);

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
      title: product?.title,
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
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/product?id=${id}`
  ).catch(() => notFound());

  const product = productRes.status === 200 && (await productRes?.json());
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://www.essentialsbyla.com/product/" + product?.name,
    url: "https://www.essentialsbyla.com/product/" + product?.name,
    alternateName: "Essentials By LA",
    name: "Buy " + product?.title,
    images: product?.images?.map((img: any) => ({ url: img.link })),
    description: product?.shortDescription,
    datePublished: new Date(product?.createdAt).toLocaleDateString(),
  };
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
