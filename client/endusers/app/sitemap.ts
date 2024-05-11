import { ProductType } from "./definations";

const EXTERNAL_DATA_URL1 =
  process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/products-sitemap";

const EXTERNAL_DATA_URL2 =
  process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/blogs-sitemap";

export default async function sitemap() {
  const request1 = await fetch(EXTERNAL_DATA_URL1, {
    credentials: "include",
    method: "GET",
  });
  const products = await request1.json();

  const request2 = await fetch(EXTERNAL_DATA_URL2, {
    credentials: "include",
    method: "GET",
  });
  const blogs = await request2.json();

  const staticRoutes = [
    {
      url: "https://www.essentialsbyla.com",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.essentialsbyla.com/shop",
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.essentialsbyla.com/about",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.essentialsbyla.com/contact",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.essentialsbyla.com/privacy-policy",
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.essentialsbyla.com/terms-condition",
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  return [
    ...staticRoutes,
    ...products.map((product: ProductType) => {
      return {
        url: `https://www.essentialsbyla.com/product/${product._id}`,
        changeFrequency: "monthly",
        priority: 1.0,
      };
    }),
    ...blogs.map((blog: any) => {
      return {
        url: `https://www.essentialsbyla.com/blog/${blog._id}`,
        changeFrequency: "monthly",
        priority: 1.0,
      };
    }),
  ];
}
