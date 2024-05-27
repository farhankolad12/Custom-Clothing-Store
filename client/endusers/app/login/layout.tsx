import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login To Your Account",
  keywords: [
    "Essentials by la",
    "Login essentialsbyla",
    "Essentials by la login",
  ],
  alternates: {
    canonical: "https://www.essentialsbyla.com/login",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
