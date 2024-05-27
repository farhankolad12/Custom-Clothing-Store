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
    siteName: "Essentials By LA",
  },
  alternates: {
    canonical: "https://www.essentialsbyla.com/contact",
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
  return <>{children}</>;
}
