/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "dunker.qodeinteractive.com",
      },
    ],
  },
};

export default nextConfig;
