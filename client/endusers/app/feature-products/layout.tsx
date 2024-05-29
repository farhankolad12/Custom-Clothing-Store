import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Featured Products",
  description:
    "Explore our exclusive collection of top-rated featured products at Essentials By LA. Handpicked for their quality, innovation, and customer satisfaction, our selection includes the latest in Printed Tees, Customizable Tote Bags, Oversized Tees, Printed Hoodies, Anti-Tarnish Jewellery. Shop now to find premium items that stand out for their superior craftsmanship and unbeatable value. Don't miss out on limited-time offers and special discounts. Elevate your shopping experience with our featured products today!",
  openGraph: {
    type: "website",
    title: "Featured Products",
    url: "https://www.essentialsbyla.com/featured-products",
    description:
      "Explore our exclusive collection of top-rated featured products at Essentials By LA. Handpicked for their quality, innovation, and customer satisfaction, our selection includes the latest in Printed Tees, Customizable Tote Bags, Oversized Tees, Printed Hoodies, Anti-Tarnish Jewellery. Shop now to find premium items that stand out for their superior craftsmanship and unbeatable value. Don't miss out on limited-time offers and special discounts. Elevate your shopping experience with our featured products today!",
    images: {
      url: "/open-graph-img.jpeg",
    },
    siteName: "Essentials By LA",
  },
  alternates: {
    canonical: "https://www.essentialsbyla.com/featured-products",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Featured Products",
    "@id": "https://www.essentialsbyla.com/featured-products",
    url: "https://www.essentialsbyla.com/featured-products",
    alternateName: "Essentials By LA",
    name: "Featured Products",
    image: "/open-graph-img.jpeg",
    description:
      "Explore our exclusive collection of top-rated featured products at Essentials By LA. Handpicked for their quality, innovation, and customer satisfaction, our selection includes the latest in Printed Tees, Customizable Tote Bags, Oversized Tees, Printed Hoodies, Anti-Tarnish Jewellery. Shop now to find premium items that stand out for their superior craftsmanship and unbeatable value. Don't miss out on limited-time offers and special discounts. Elevate your shopping experience with our featured products today!",
    datePublished: "30-05-24",
  };

  return (
    <>
      {children}
      <Script
        strategy="worker"
        id="schame_feat_prod"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
