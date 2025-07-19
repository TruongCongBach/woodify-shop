'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@woodify/ui/lib/utils'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	const menu = [
		{ href: '/dashboard/categories', label: 'Category' },
		{ href: '/dashboard/products', label: 'Product' },
	]

	return (
		<div className="flex min-h-screen">
			<aside className="w-60 bg-gray-100 p-4 border-r">
				<h2 className="text-lg font-bold mb-4">Quản lý</h2>
				<nav className="space-y-2">
					{menu.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								'block px-3 py-2 rounded hover:bg-gray-200 transition',
								pathname === item.href && 'bg-gray-300 font-medium'
							)}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</aside>
			<main className="flex-1 p-6">{children}</main>
		</div>
	)
}
