import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essentials By LA: Who we are",
  description:
    "Get to know the heart behind Essentials By LA. Founded on a passion for style and a commitment to quality, we strive to inspire confidence and individuality in every customer. Learn about our journey, our dedication to sustainability, and our vision for shaping the future of fashion. Discover the team behind the scenes, dedicated to bringing you the best shopping experience possible. Join us in celebrating fashion as more than just clothing—it's a statement, an art, and a lifestyle",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <head>
          <link rel="canonical" href="https://www.essentialsbyla.com/about" />
          <meta property="og:title" content="Who We Are" />
          <meta
            property="og:url"
            content="https://www.essentialsbyla.com/about"
          />
          <meta
            property="og:description"
            content="Discover the story behind Essentials By LA. Explore our commitment to style, sustainability, and exceptional service. Join us in shaping the future of fashion."
          />

          <meta property="og:site_name" content="IN About Essentials By LA" />

          <meta property="og:type" content="website" />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
