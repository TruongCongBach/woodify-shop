'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { Input } from '@woodify/ui/shadcn-ui/input'
import { Textarea } from '@woodify/ui/shadcn-ui/textarea'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@woodify/ui/shadcn-ui/form'

// Validation schema
const contactFormSchema = z.object({
	name: z.string().min(1, { message: 'Vui lòng nhập tên.' }),
	email: z.string().email({ message: 'Email không hợp lệ.' }),
	message: z.string().min(1, { message: 'Vui lòng nhập nội dung.' }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

interface ContactFormProps {
	onSubmit: (values: ContactFormValues) => void | Promise<void>
	isSubmitting?: boolean
}

/**
 * Contact form component with validation
 * Single Responsibility: Handles form presentation and validation only
 */
export function ContactForm({ onSubmit, isSubmitting = false }: ContactFormProps) {
	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: '',
			email: '',
			message: '',
		},
	})

	return (
		<div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-gray-900 mb-2">
					Gửi Tin Nhắn Cho Chúng Tôi
				</h2>
				<p className="text-gray-600">Chúng tôi sẽ phản hồi trong vòng 24 giờ</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-700 font-semibold">Họ và Tên</FormLabel>
								<FormControl>
									<Input
										placeholder="Nhập họ và tên của bạn"
										className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Nhập email của bạn"
										className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-700 font-semibold">Nội dung</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Viết tin nhắn của bạn tại đây..."
										className="min-h-32 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						size="lg"
						disabled={isSubmitting}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12"
					>
						{isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
					</Button>
				</form>
			</Form>
		</div>
	)
}
