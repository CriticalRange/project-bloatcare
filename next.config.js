/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    loader: "default",
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
