'use client'
import React, { useState } from 'react'
import {
	MapPinIcon,
	PhoneIcon,
	EnvelopeIcon,
} from '@heroicons/react/24/outline'

export default function ContactPage() {
	const [form, setForm] = useState({ name: '', email: '', message: '' })
	const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setStatus('sending')
		try {
			// TODO: gọi API gửi form tại đây
			await new Promise(r => setTimeout(r, 1000)) // Mô phỏng API
			setStatus('success')
			setForm({ name: '', email: '', message: '' })
		} catch {
			setStatus('error')
		}
	}

	return (
		<section className="container mx-auto px-4 py-8 space-y-10">
			<h1 className="text-3xl font-semibold text-center">Liên hệ với chúng tôi</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
				{/* Thông tin liên hệ */}
				<div className="space-y-6">
					<div className="flex items-start space-x-4">
						<MapPinIcon className="h-6 w-6 text-primary mt-1" />
						<div>
							<h2 className="font-semibold text-lg">Địa chỉ</h2>
							<p>123 Phố Gỗ, Hải Phòng</p>
						</div>
					</div>
					<div className="flex items-start space-x-4">
						<PhoneIcon className="h-6 w-6 text-primary mt-1" />
						<div>
							<h2 className="font-semibold text-lg">Hotline / Zalo</h2>
							<p><a href="tel:0988303534" className="text-primary">098.830.3534</a></p>
						</div>
					</div>
					<div className="flex items-start space-x-4">
						<EnvelopeIcon className="h-6 w-6 text-primary mt-1" />
						<div>
							<h2 className="font-semibold text-lg">TikTok</h2>
							<p><a
								href="https://www.tiktok.com/@dogokhanhtrang1"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline"
							>
								@dogokhanhtrang1
							</a></p>
						</div>
					</div>
				</div>

				{/* Form liên hệ */}
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						name="name"
						type="text"
						placeholder="Tên của bạn"
						value={form.name}
						onChange={handleChange}
						required
						className="w-full border rounded px-3 py-2"
					/>
					<input
						name="email"
						type="email"
						placeholder="Email của bạn"
						value={form.email}
						onChange={handleChange}
						required
						className="w-full border rounded px-3 py-2"
					/>
					<textarea
						name="message"
						rows={5}
						placeholder="Nội dung tin nhắn"
						value={form.message}
						onChange={handleChange}
						required
						className="w-full border rounded px-3 py-2"
					/>
					<button
						type="submit"
						disabled={status === 'sending'}
						className="bg-primary text-white w-full py-3 rounded hover:bg-primary-dark transition disabled:opacity-50"
					>
						{status === 'sending' ? 'Đang gửi...' : 'Gửi tin nhắn'}
					</button>
					{status === 'success' && <p className="text-green-600">Gửi thành công! Cảm ơn bạn.</p>}
					{status === 'error' && <p className="text-red-600">Gửi thất bại, vui lòng thử lại.</p>}
				</form>
			</div>

			{/* Bản đồ nhúng */}
			<div className="w-full h-64 bg-gray-200">
				<iframe
					referrerPolicy="no-referrer-when-downgrade"
					title="Bản đồ Nội Thất Khánh Trang"
					src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7441.882403599502!2d105.81023698024018!3d21.154738117009583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1752338914733!5m2!1svi!2s"
					width="100%"
					height="100%"
					className="border-0 rounded"
					loading="lazy"
				></iframe>
			</div>
		</section>
	)
}
