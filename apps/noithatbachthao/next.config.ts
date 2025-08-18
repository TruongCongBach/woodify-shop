import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
	transpilePackages: ["@woodify/ui"],
	images: {
		remotePatterns: [new URL("https://res.cloudinary.com/furniture-shop/image/upload/**")],
	},
};

export default withBundleAnalyzer(nextConfig);

