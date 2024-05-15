import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login To Your Account",
  keywords: [
    "Essentials by la",
    "Login essentialsbyla",
    "Essentials by la login",
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
        <link rel="canonical" href="https://www.essentialsbyla.com/login" />
        <meta property="og:title" content="Login" />
        <meta
          property="og:url"
          content="https://www.essentialsbyla.com/login"
        />

        <meta property="og:site_name" content="Login Essentials By LA" />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
