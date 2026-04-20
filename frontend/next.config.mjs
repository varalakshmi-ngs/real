/** @type {import('next').NextConfig} */
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://backend.realtemple.com";
const apiUrl = new URL(apiBaseUrl);
const remotePatterns = [
  {
    protocol: apiUrl.protocol.replace(":", ""),
    hostname: apiUrl.hostname,
    ...(apiUrl.port ? { port: apiUrl.port } : {}),
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
];

const nextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
