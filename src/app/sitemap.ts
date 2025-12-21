import { MetadataRoute } from 'next';
import { fetchProducts } from '@/services/product';
import { fetchCategories } from '@/services/category';
import config from '@/config'

const URL = config.domainUrl; // <-- NHỚ THAY THẾ BẰNG TÊN MIỀN THẬT

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productEntries: MetadataRoute.Sitemap = [];
  let categoryEntries: MetadataRoute.Sitemap = [];

  try {
    // 1. Lấy tất cả sản phẩm
    const products = await fetchProducts();
    productEntries = products.map(({ url }) => ({
      url: `${URL}/product/${url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // 2. Lấy tất cả danh mục
    const categories = await fetchCategories();
    categoryEntries = categories.map(({ url }) => ({
      url: `${URL}/category/${url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));
  } catch {
    // Build không cần fail nếu mất mạng; trả về sitemap tĩnh.
  }

  // 3. Thêm các trang tĩnh (bao gồm HOMEPAGE)
  const staticRoutes = [
    // ✅ HOMEPAGE - priority cao nhất
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },

    // Các trang khác
    {
      url: `${URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    },
    {
      url: `${URL}/warranty-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
    {
      url: `${URL}/shipping-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
  ];

  return [
    ...staticRoutes,      // Homepage đầu tiên
    ...categoryEntries,   // Categories ưu tiên cao
    ...productEntries,    // Products cuối cùng
  ];
}
