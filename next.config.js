/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = {
  images: {
    domains: ["demo.gethugothemes.com", "demo.themefisher.com"],
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
  nextConfig,
};
