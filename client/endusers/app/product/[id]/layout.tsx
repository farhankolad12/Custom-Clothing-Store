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

  return {
    title: {
      absolute: product.name,
    },
    description: product.shortDescription,
    openGraph: {
      images: product?.images?.map((img: any) => img.link),
    },
  };
}

export async function generateStaticParams() {
  // fetch data
  const productRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/all-products`
  );

  const products = await productRes.json();

  return products.map((product: ProductType) => {
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
