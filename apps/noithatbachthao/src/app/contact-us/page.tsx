import { Metadata } from 'next'
import ContactPageContainer from '@/containers/contact-page'

export const metadata: Metadata = {
	title: 'Liên Hệ - Nội Thất Bách Thảo',
	description:
		'Liên hệ với Nội Thất Bách Thảo để được tư vấn sản phẩm, báo giá và hỗ trợ. Chúng tôi luôn sẵn sàng lắng nghe và phục vụ bạn.',
	keywords: ['liên hệ nội thất', 'tư vấn nội thất', 'nội thất bách thảo'],
	openGraph: {
		title: 'Liên Hệ - Nội Thất Bách Thảo',
		description: 'Liên hệ với chúng tôi để được tư vấn và hỗ trợ',
		type: 'website',
	},
}

/**
 * Contact page (Server Component)
 * Follows Clean Architecture: Page → Container pattern
 * - Page handles routing and metadata (Server Component)
 * - Container handles orchestration and business logic (Client Component)
 */
export default function ContactUsPage() {
	return <ContactPageContainer />
}
