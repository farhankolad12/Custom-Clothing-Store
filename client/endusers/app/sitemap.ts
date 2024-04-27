import { ProductType } from "./definations";

const EXTERNAL_DATA_URL =
  process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/products-sitemap";

export default async function sitemap() {
  const request = await fetch(EXTERNAL_DATA_URL, {
    credentials: "include",
    method: "GET",
  });
  const products = await request.json();

  const staticRoutes = [
    {
      url: "http://localhost:3000/",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "http://localhost:3000/shop",
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "http://localhost:3000/about",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "http://localhost:3000/contact",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "http://localhost:3000/privacy-policy",
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "http://localhost:3000/terms-condition",
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  return [
    ...staticRoutes,
    ...products.map((product: ProductType) => {
      return {
        url: `http://localhost:3000/product/${product._id}`,
        changeFrequency: "monthly",
        priority: 1.0,
      };
    }),
  ];
}
