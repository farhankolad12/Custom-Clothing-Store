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
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    "@id": "https://essentialsbyla.com/" + blog?._id,
    mainEntityOfPage: "https://essentialsbyla.com/",
    headline: blog?.title,
    name: blog?.title,
    description: blog?.shortDescription,
    datePublished: new Date(blog?.createdAt).toLocaleString(),
    author: {
      "@type": "Person",
      "@id": "https://essentialsbyla.com",
      name: "Laraib Siddique",
      url: "https://essentialsbyla.com",
      image: {
        "@type": "ImageObject",
        "@id": blog?.image?.link,
        url: blog?.image?.link,
        height: "96",
        width: "96",
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://essentialsbyla.com",
      name: "Laraib Siddique",
      logo: {
        "@type": "ImageObject",
        "@id": "https://www.essentialsbyla.com/logo.png",
        url: "https://www.essentialsbyla.com/logo.png",
        width: "600",
        height: "60",
      },
    },
    image: {
      "@type": "ImageObject",
      "@id": blog?.image?.link,
      url: blog?.image?.link,
      height: "362",
      width: "388",
    },
    url: "https://essentialsbyla.com",
    about: [
      {
        "@type": blog?.category,
        "@id": `https://essentialsbyla.com/collections/${blog?.category}/`,
        name: blog?.category,
      },
    ],
    keywords: [
      ...(blog?.tags?.map((b: any) => b.tag) || ""),
      "Essentials By La Blogs",
    ],
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
