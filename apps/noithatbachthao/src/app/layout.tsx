import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@woodify/ui/styles/globals.css'
import React from 'react'
import AuthProvider from '@/components/auth-provider'
import { ToasterProvider } from '@/components/toaster-provider'
import config from '@/config'
import { FooterPage, HeaderPage } from '@/components/layout'

const geistSans = Geist({
	variable: '--font-geist-sans',

	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(config.domainUrl), // <-- THAY THẾ BẰNG DOMAIN CỦA BẠN
  title: {
    template: '%s | Nội thất Bách Thảo',
    default: 'Nội thất Bách Thảo - Uy tín, Chất lượng, Giá tại xưởng',
  },
  description: 'Nội thất Bách Thảo chuyên cung cấp các sản phẩm nội thất gỗ chất lượng cao, mẫu mã đa dạng, giá tại xưởng. Mua ngay!',
  keywords: ['nội thất', 'đồ gỗ', 'nội thất gỗ', 'nội thất giá rẻ', 'nội thất phòng khách', 'nội thất phòng ngủ', 'kệ tivi', 'bàn ăn', 'sofa'],
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		shortcut: '/favicon.ico',
		apple: [
			{ url: '/apple-touch-icon.png' },
			{ url: '/apple-touch-icon-180x180.png', sizes: '180x180' },
		],
	},
  openGraph: {
    title: 'Nội thất Bách Thảo - Uy tín, Chất lượng, Giá tại xưởng',
    description: 'Chuyên cung cấp các sản phẩm nội thất gỗ chất lượng cao, mẫu mã đa dạng, giá tại xưởng.',
    url: config.domainUrl, // <-- THAY THẾ BẰNG DOMAIN CỦA BẠN
    siteName: 'Nội thất Bách Thảo',
    images: [
      {
        url: '/images/og-image.jpg', // Đồng bộ với ảnh có thật trong public/images
        width: 1200,
        height: 630,
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  verification: {
    google: config.googleSiteVerification,
  },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi">
		<body
			className={`${geistSans.variable} ${geistMono.variable} antialiased`}
		>
		<AuthProvider>
			<div className="min-h-screen bg-white">
				<HeaderPage/>
				{children}
				<FooterPage/>
				<ToasterProvider />
			</div>
		</AuthProvider>
		</body>
		</html>
	)
}

