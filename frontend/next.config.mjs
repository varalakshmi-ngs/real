/** @type {import('next').NextConfig} */

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://backend.realtemple.com";

const apiUrl = new URL(apiBaseUrl);

const remotePatterns = [
  {
    protocol: apiUrl.protocol.replace(":", ""),
    hostname: apiUrl.hostname,
    ...(apiUrl.port ? { port: apiUrl.port } : {}),
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "backend.realtemple.com",
    pathname: "/**",
  },{
  protocol: "https",
  hostname: "realtemple-backend.nuhvin.com",
  pathname: "/**",
},
  {
    protocol: "http",
    hostname: "backend.realtemple.com",
    pathname: "/**",
  },
];

const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns,
  },
};

export default nextConfig;