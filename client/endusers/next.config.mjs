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
    ],
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

export default nextConfig;
