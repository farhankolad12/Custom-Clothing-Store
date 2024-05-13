import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    "Get to know the heart behind Essentials By LA. Founded on a passion for style and a commitment to quality, we strive to inspire confidence and individuality in every customer. Learn about our journey, our dedication to sustainability, and our vision for shaping the future of fashion. Discover the team behind the scenes, dedicated to bringing you the best shopping experience possible. Join us in celebrating fashion as more than just clothing—it's a statement, an art, and a lifestyle",
  openGraph: {
    type: "website",
    title: "Who we are",
    url: "https://www.essentialsbyla.com/about",
    description:
      "Get to know the heart behind Essentials By LA. Founded on a passion for style and a commitment to quality, we strive to inspire confidence and individuality in every customer. Learn about our journey, our dedication to sustainability, and our vision for shaping the future of fashion. Discover the team behind the scenes, dedicated to bringing you the best shopping experience possible. Join us in celebrating fashion as more than just clothing—it's a statement, an art, and a lifestyle",
    images: {
      url: "/open-graph-img1.avif",
    },
  },
  twitter: {
    card: "summary_large_image",
  },
  keywords: [
    "Essentials by la",
    "About essentialsbyla",
    "Essentials by la website",
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
        <link rel="canonical" href="https://www.essentialsbyla.com/about" />
        <meta property="og:title" content="Who We Are" />
        <meta
          property="og:url"
          content="https://www.essentialsbyla.com/about"
        />

        <meta property="og:site_name" content="IN About Essentials By LA" />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
