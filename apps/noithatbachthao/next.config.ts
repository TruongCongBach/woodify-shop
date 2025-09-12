import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
	transpilePackages: ["@woodify/ui"],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				pathname: '/**',
			},
		],
		formats: ['image/webp', 'image/avif'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 3600, // 1 hour
		qualities: [50, 75, 80, 85, 90, 95, 100],
	},
	experimental: {
		optimizePackageImports: ['lucide-react'],
	},
};

export default withBundleAnalyzer(nextConfig);

