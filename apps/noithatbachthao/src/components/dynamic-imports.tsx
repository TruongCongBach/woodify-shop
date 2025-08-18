"use client";

import dynamic from "next/dynamic";

// ===== TỐI ƯU PERFORMANCE: DYNAMIC LOADING =====
// Chỉ tải các component này khi người dùng cuộn tới, giảm kích thước JS ban đầu
export const SectionProductGallery = dynamic(() => import('@woodify/ui/components/section-product-gallery'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200" />, // Placeholder
    ssr: false, // Tải ở phía client
})

export const TvStandHomepage = dynamic(() => import('@/components/tv-stand-homepage'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200" />,
    ssr: false,
});
export const TvStandHomepageV2 = dynamic(() => import('@/components/tv-stand-homepage-v2'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200" />,
    ssr: false,
});
export const TvStandHomepageV4 = dynamic(() => import('@/components/tv-stand-homepage-v4'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200" />,
    ssr: false,
});
