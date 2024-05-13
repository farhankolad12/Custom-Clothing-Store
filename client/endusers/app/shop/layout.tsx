import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Page",
  description:
    "Explore the latest trends and timeless classics at Essentials By LA shop page. Browse our curated selection of clothing, shoes, bags, accessories, and more. Shop with confidence knowing you're getting high-quality fashion items from top brands. Elevate your wardrobe and express your unique style today.",
  openGraph: {
    type: "website",
    title: "Shop",
    url: "https://www.essentialsbyla.com/shop",
    description:
      "Explore the latest trends and timeless classics at Essentials By LA shop page. Browse our curated selection of clothing, shoes, bags, accessories, and more. Shop with confidence knowing you're getting high-quality fashion items from top brands. Elevate your wardrobe and express your unique style today.",
    images: {
      url: "/open-graph-img3.jpeg",
    },
  },
  twitter: {
    card: "summary_large_image",
  },
  keywords: [
    "customized tote bags with names",
    "customized tote bags india",
    "t shirt tote bag",
    "design on tote bag",
    "tote bags embroidered",
    "t-shirt tote bag",
    "personalised tote bags india",
    "printed tote bag",
    "q-tees tote bags",
    "reusable bag from t-shirt",
    "customized t shirts near me",
    "customized tshirts for men",
    "order customized t shirts",
    "custom t shirt examples",
    "customized t shirts couples",
    "customized t shirts online",
    "customized t shirts mumbai",
    "girls personalised t shirts",
    "kpop customized tshirts",
    "printed hoodies for men",
    "custom printed hoodies",
    "printed hoodies for men under 1200",
    "printed hoodies and sweatshirts",
    "embroidered hoodies anime",
    "back printed hoodies",
    "butterfly printed hoodies",
    "hoodie printing shop near me",
    "full printed hoodies",
    "custom hoodies india",
    "3d printed hoodies india",
    "printed hoodies jacket",
    "printed oversized t shirt under 500",
    "best printed oversized t shirt",
    "graphic printed oversized t shirt",
    "back printed oversized t shirt",
    "t shirt name printing price",
    "oversized t shirt 5xl",
    "best custom accessories",
    "customized gifts and accessories",
    "customized gifts app",
    "personalized accessories for ",
    "fancy accessories",
    "personalised accessories holder",
    "keychain accessories ideas",
    "custom keychain ideas",
    "name customized pendant",
    "personalised party accessories",
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
        <link rel="canonical" href="https://www.essentialsbyla.com/shop" />
        <meta property="og:title" content="Essentials By LA: Shop Page" />
        <meta property="og:url" content="https://www.essentialsbyla.com/shop" />

        <meta property="og:site_name" content="IN Shop Page Essentials By LA" />

        <meta property="og:type" content="website" />
      </head>
      {children}
    </>
  );
}
