import { Metadata } from 'next'
import DashboardPageContainer from '@/containers/dashboard-page'

export const metadata: Metadata = {
	title: 'Dashboard - Nội Thất Bách Thảo',
	description: 'Quản lý sản phẩm và danh mục',
	robots: 'noindex, nofollow', // Dashboard should not be indexed
}

/**
 * Dashboard page (Server Component)
 * Follows Clean Architecture: Page → Container pattern
 */
export default function DashboardPage() {
	return <DashboardPageContainer />
}
