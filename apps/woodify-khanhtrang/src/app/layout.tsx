import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@woodify/ui/styles/globals.css'
import React from 'react'
import { CategoryNav } from '@/components/category-nav'
import { PageHeader } from '@/components/page-header'
import { PageFooter } from '@/components/page-footer'
import categoriesMock from '@/data/categoriesMock'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	metadataBase: new URL(process.env.BASE_URL || 'https://woodify.com'),
	keywords: ['gỗ', 'nội thất', 'Nội Thất Khánh Trang', 'đồ gỗ chất lượng'],
	verification: {
		google: process.env.GOOGLE_VERIFICATION_CODE || 'your-google-code',
		yandex: process.env.YANDEX_VERIFICATION_CODE || 'your-yandex-code',
	},
}



export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body
			className={`${geistSans.variable} ${geistMono.variable} antialiased`}
		>
		<PageHeader
			phone="098.830.3534"
			logo="/logo.png"
		/>
		<CategoryNav
			categories={categoriesMock}
		/>
		{children}
		<PageFooter/>
		</body>
		</html>
	)
}

