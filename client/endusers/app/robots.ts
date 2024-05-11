import { MetadataRoute } from "next";

import { ProductType } from "./definations";

const EXTERNAL_DATA_URL1 =
  process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/products-sitemap";

const EXTERNAL_DATA_URL2 =
  process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/blogs-sitemap";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const res1 = await fetch(EXTERNAL_DATA_URL1, {
    credentials: "include",
    method: "GET",
  });
  const products: ProductType[] = await res1.json();

  const res2 = await fetch(EXTERNAL_DATA_URL2, {
    credentials: "include",
    method: "GET",
  });
  const blogs: any[] = await res2.json();

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
      ...blogs?.map((blog) => {
        return {
          userAgent: "*",
          allow: "/blog/" + blog._id,
        };
      }),
    ],
    sitemap: "https://www.essentialsbyla.com/sitemap.xml",
  };
}
