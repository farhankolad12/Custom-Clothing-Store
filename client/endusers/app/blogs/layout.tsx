import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Celebrate style and functionality with our curated collection of bags, t-shirts, and accessories at Essentials By LA. Dive into our blog to explore the latest trends, styling tips, and insider guides crafted just for you. From the must-have tote for everyday adventures to statement tees that speak volumes, our blog is your go-to destination for all things fashion-forward. Stay ahead of the curve and discover the perfect blend of flair and function with our expertly curated content. Elevate your wardrobe and inspire your style journey with Essentials By LA's blog today.",
  openGraph: {
    type: "website",
    title: "Blogs",
    url: "https://www.essentialsbyla.com/blogs",
    description:
      "Celebrate style and functionality with our curated collection of bags, t-shirts, and accessories at Essentials By LA. Dive into our blog to explore the latest trends, styling tips, and insider guides crafted just for you. From the must-have tote for everyday adventures to statement tees that speak volumes, our blog is your go-to destination for all things fashion-forward. Stay ahead of the curve and discover the perfect blend of flair and function with our expertly curated content. Elevate your wardrobe and inspire your style journey with Essentials By LA's blog today.",
    images: {
      url: "/open-graph-img1.avif",
    },
  },
  twitter: {
    card: "summary_large_image",
  },
  keywords: [
    "Essentials By LA",
    "blogs of essentialsbyla",
    "essentialsbyla blogs website",
  ],
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link rel="canonical" href="https://www.essentialsbyla.com/blogs" />
        <meta property="og:title" content="Who We Are" />
        <meta
          property="og:url"
          content="https://www.essentialsbyla.com/blogs"
        />

        <meta property="og:site_name" content="IN Blogs Essentials By LA" />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
