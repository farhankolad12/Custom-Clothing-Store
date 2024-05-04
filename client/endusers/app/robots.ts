import { MetadataRoute } from "next";

import { ProductType } from "./definations";

const EXTERNAL_DATA_URL =
  process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/products-sitemap";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const res = await fetch(EXTERNAL_DATA_URL, {
    credentials: "include",
    method: "GET",
  });
  const products: ProductType[] = await res.json();

  const staticRules = [
    { userAgent: "*", allow: "/" },
    { userAgent: "*", allow: "/about" },
    { userAgent: "*", allow: "/contact" },
    { userAgent: "*", allow: "/shop" },
    { userAgent: "*", disallow: "/cart" },
    { userAgent: "*", disallow: "/profile" },
    { userAgent: "*", disallow: "/wishlist" },
  ];

  return {
    rules: [
      ...staticRules,
      ...products?.map((product) => {
        return {
          userAgent: "*",
          allow: "/product/" + product._id,
        };
      }),
    ],
    sitemap: "https://www.essentialsbyla.com/sitemap.xml",
  };
}
