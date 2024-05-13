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
      absolute: product?.name,
    },
    description: product?.shortDescription,
    openGraph: {
      type: "website",
      title: product?.title,
      images: product?.images?.map((img: any) => ({ url: img.link })),
      description: product?.shortDescription,
      url: `https://www.essentialsbyla.com/product/${product?._id}`,
    },
    keywords: [...product?.tags.map((p: any) => p.tag), product?.category],
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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
