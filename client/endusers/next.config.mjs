/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "www.essentialsbyla.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "www.facebook.com",
      },
    ],
  },
};

export default nextConfig;
