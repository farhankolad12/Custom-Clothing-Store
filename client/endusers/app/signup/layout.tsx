import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
  description: "Create Your Account",
  keywords: [
    "Essentials by la",
    "Signup essentialsbyla",
    "Essentials by la Signup",
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
        <link rel="canonical" href="https://www.essentialsbyla.com/signup" />
        <meta property="og:title" content="Signup" />
        <meta
          property="og:url"
          content="https://www.essentialsbyla.com/signup"
        />

        <meta property="og:site_name" content="Signup Essentials By LA" />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
