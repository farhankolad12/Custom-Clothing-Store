import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essentials By LA: Terms & Condition",
  description: "Terms & Condition Page of Essentials By LA",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link
          rel="canonical"
          href="https://www.essentialsbyla.com/terms-condition"
        />
        <meta property="og:title" content="Terms & Condition" />
        <meta
          property="og:url"
          content="https://www.essentialsbyla.com/terms-condition"
        />
        <meta
          property="og:description"
          content="Terms & Condition Page of Essentials By LA"
        />

        <meta
          property="og:site_name"
          content="IN Terms & Condition Page Essentials By LA"
        />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
