'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignOutPage() {
	const router = useRouter()

	useEffect(() => {
		// Gọi hàm logout và redirect về trang login hoặc home
		signOut({ redirect: false }).then(() => {
			router.push('/login') // Hoặc '/' tùy ý
		})
	}, [router])

	return (
		<div className="flex justify-center items-center min-h-screen">
			<p className="text-gray-500">Đang đăng xuất...</p>
		</div>
	)
}
