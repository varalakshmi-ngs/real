/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.197",
        port: "4040",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4040",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "backend.realtemple.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "backend.realtemple.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
