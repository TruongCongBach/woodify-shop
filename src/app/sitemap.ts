import type { MetadataRoute } from 'next'
import { fetchProducts } from '@/services/product'
import { fetchCategories } from '@/services/category'
import config from '@/config'

// Honest lastModified: at build time, giving crawlers a fresh re-crawl signal.
const NOW = new Date()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	let productEntries: MetadataRoute.Sitemap = []
	let categoryEntries: MetadataRoute.Sitemap = []

	try {
		const [products, categories] = await Promise.all([
			fetchProducts(),
			fetchCategories(),
		])

		productEntries = products.map((product) => ({
			url: `${config.domainUrl}/product/${product.url}`,
			lastModified: NOW,
			changeFrequency: 'weekly',
			priority: 0.85,
		}))

		categoryEntries = categories.map((category) => ({
			url: `${config.domainUrl}/category/${category.url}`,
			lastModified: NOW,
			changeFrequency: 'weekly',
			priority: 0.9,
		}))
	} catch {
		// Keep canonical static routes available if the catalog data source is unavailable.
	}

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: config.domainUrl,
			lastModified: NOW,
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${config.domainUrl}/ve-chung-toi`,
			lastModified: NOW,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${config.domainUrl}/lien-he`,
			lastModified: NOW,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${config.domainUrl}/chinh-sach-bao-hanh`,
			lastModified: NOW,
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `${config.domainUrl}/chinh-sach-van-chuyen`,
			lastModified: NOW,
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `${config.domainUrl}/return-policy`,
			lastModified: NOW,
			changeFrequency: 'yearly',
			priority: 0.5,
		},
	]

	return [...staticRoutes, ...categoryEntries, ...productEntries]
}
