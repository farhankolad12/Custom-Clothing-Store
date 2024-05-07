import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const productRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/product?id=${id}`
  );

  const product = await productRes.json();

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      images: product?.images?.map((img: any) => img.link),
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
        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
