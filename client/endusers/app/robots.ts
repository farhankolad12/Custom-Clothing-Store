import { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/profile", "/wishlist"],
      },
    ],
    sitemap: "https://www.essentialsbyla.com/sitemap.xml",
  };
}
