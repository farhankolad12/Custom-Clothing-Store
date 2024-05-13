import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Us Page of Essentials By LA",
  openGraph: {
    type: "website",
    title: "Contact Us",
    url: "https://www.essentialsbyla.com/contact",
    description: "Contact Us Page of Essentials By LA",
    images: {
      url: "/open-graph-img2.jpeg",
    },
  },
  twitter: {
    card: "summary_large_image",
  },
  keywords: [
    "Essentials By LA",
    "contact essentialsbyla",
    "support essentialsbyla website",
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
        <link rel="canonical" href="https://www.essentialsbyla.com/contact" />
        <meta property="og:title" content="Contact Us" />
        <meta
          property="og:url"
          content="https://www.essentialsbyla.com/contact"
        />

        <meta
          property="og:site_name"
          content="IN Contact Us Page Essentials By LA"
        />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
