/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi-182914-0.cloudclusters.net",
        pathname: "/uploads/**",
      },
    ],
    minimumCacheTTL: 604800,
  },
};

export default nextConfig;
