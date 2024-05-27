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
    title: blog?.title || "Blog Not Found",
    description: blog?.shortDescription,
    openGraph: {
      type: "website",
      title: blog?.title,
      images: blog?.image?.link,
      url: "https://essentialsbyla.com/blog/" + blog?._id,
      description: blog?.shortDescription,
      siteName: "Essentials By LA",
    },
    alternates: {
      canonical: "https://essentialsbyla.com/blog/" + blog?._id,
    },
    twitter: {
      card: "summary_large_image",
    },
    keywords: [
      ...(blog?.tags?.map((b: any) => b.tag) || ""),
      "Essentials By La Blogs",
    ],
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

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const id = params.id;
  const blogRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/blog-id?id=${id}`
  ).catch(() => notFound());

  const blog = blogRes.status === 200 && (await blogRes?.json());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPage",
    "@id": "https://www.essentialsbyla.com/blog/" + blog?.title,
    url: "https://www.essentialsbyla.com/blog/" + blog?.title,
    alternateName: "Essentials By LA",
    name: blog?.title,
    image: blog?.image?.link,
    description: blog?.shortDescription,
    datePublished: new Date(blog.createdAt).toLocaleDateString(),
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
