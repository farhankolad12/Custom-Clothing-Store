import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund Policy Page of Essentials By LA",
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
          href="https://www.essentialsbyla.com/refund-policy"
        />
        <meta property="og:title" content="Refund Policy" />
        <meta
          property="og:url"
          content="https://www.essentialsbyla.com/refund-policy"
        />

        <meta
          property="og:site_name"
          content="IN Refund Policy Page Essentials By LA"
        />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
