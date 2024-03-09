/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "dunker.qodeinteractive.com",
      },
    ],
  },
};

export default nextConfig;
