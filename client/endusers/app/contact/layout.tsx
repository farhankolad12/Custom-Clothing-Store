import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essentials By LA: Contact Us",
  description: "Contact Us Page of Essentials By LA",
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
          <link rel="canonical" href="https://www.essentialsbyla.com/contact" />
          <meta property="og:title" content="Contact Us" />
          <meta
            property="og:url"
            content="https://www.essentialsbyla.com/contact"
          />
          <meta
            property="og:description"
            content="Contact Us Page of Essentials By LA"
          />

          <meta
            property="og:site_name"
            content="IN Contact Us Page Essentials By LA"
          />

          <meta property="og:type" content="website" />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
