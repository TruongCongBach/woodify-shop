'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ContactForm, type ContactFormValues } from '@/components/contact-form'
import { ContactInfo } from '@/components/contact-info'

/**
 * Contact page container component
 * Responsibility: Orchestrate contact page sections and handle business logic
 * Follows Clean Architecture: Container → Component → Service pattern
 */
export default function ContactPageContainer() {
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Business logic: Handle form submission
	const handleSubmit = async (values: ContactFormValues) => {
		setIsSubmitting(true)

		try {
			// TODO: Implement actual API call or email service
			console.log('Contact form submitted:', values)

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000))

			toast.success('Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất.')

			// Could add analytics tracking here
			// trackContactFormSubmission(values)
		} catch (error) {
			console.error('Failed to submit contact form:', error)
			toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<div className="inline-block px-6 py-3 bg-blue-600/10 backdrop-blur-sm rounded-full border border-blue-400/20 mb-6">
							<span className="text-blue-700 font-semibold text-sm">📞 Liên Hệ Ngay</span>
						</div>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
							Liên Hệ Với Chúng Tôi
						</h1>
						<p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
							Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Nếu bạn cần tư vấn sản phẩm,
							báo giá, hoặc có bất kỳ thắc mắc nào, hãy để lại thông tin, đội ngũ{' '}
							<strong className="text-blue-700">Nội Thất Bách Thảo</strong> sẽ phản hồi trong
							thời gian sớm nhất.
						</p>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
							{/* Contact Form */}
							<ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

							{/* Contact Information */}
							<ContactInfo />
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
