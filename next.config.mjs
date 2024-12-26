/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gdev.cloudhosta.com",
        pathname: "/uploads/**",
      },
    ],
    domains: ["gdev.cloudhosta.com"],
    minimumCacheTTL: 604800,
  },
};

export default nextConfig;
