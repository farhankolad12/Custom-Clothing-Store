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
  const blogRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/blog-id?id=${id}`
  ).catch(() => notFound());

  const blog = blogRes.status === 200 && (await blogRes?.json());

  return {
    title: blog?.title,
    description: blog?.shortDescription,
    openGraph: {
      images: blog?.image?.link,
    },
  };
}

export async function generateStaticParams() {
  // fetch data
  const blogsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/blogs-sitemap`
  );

  const blogs = blogsRes.status === 200 && (await blogsRes.json());

  return blogs?.map((blog: any) => {
    return blog._id;
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