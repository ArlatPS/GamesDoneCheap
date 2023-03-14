/** @type {import('next').NextConfig} */

// fix to error while fetching in production mode
// the reason was node 18 using ipv6 first
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
