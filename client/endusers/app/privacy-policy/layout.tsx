import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essentials By LA: Privacy Policy",
  description: "Privacy Policy Page of Essentials By LA",
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
          href="https://www.essentialsbyla.com/privacy-policy"
        />
        <meta property="og:title" content="Privacy Policy" />
        <meta
          property="og:url"
          content="https://www.essentialsbyla.com/privacy-policy"
        />

        <meta
          property="og:site_name"
          content="IN Privacy Policy Page Essentials By LA"
        />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
