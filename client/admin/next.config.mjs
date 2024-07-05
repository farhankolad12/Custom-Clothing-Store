/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "www.essentialsbyla.com",
      },
      {
        hostname: "essentialsbyla.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
