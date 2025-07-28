import { MetadataRoute } from 'next';
import { fetchProducts } from '@/services/product';
import { fetchCategories } from '@/services/category';

const URL = 'https://www.your-domain.com'; // <-- NHỚ THAY THẾ BẰNG TÊN MIỀN THẬT

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Lấy tất cả sản phẩm
  const products = await fetchProducts();
  const productEntries: MetadataRoute.Sitemap = products.map(({ url, updated_at }) => ({
    url: `${URL}/product/${url}`,
    lastModified: updated_at ? new Date(updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 2. Lấy tất cả danh mục
  const categories = await fetchCategories();
  const categoryEntries: MetadataRoute.Sitemap = categories.map(({ url, updated_at }) => ({
    url: `${URL}/category/${url}`,
    lastModified: updated_at ? new Date(updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. Thêm các trang tĩnh
  const staticRoutes = [
    { url: URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${URL}/ve-chung-toi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${URL}/lien-he`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${URL}/chinh-sach-bao-hanh`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${URL}/chinh-sach-van-chuyen`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  return [
    ...staticRoutes,
    ...categoryEntries,
    ...productEntries,
  ];
}
