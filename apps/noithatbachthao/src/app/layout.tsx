import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@woodify/ui/styles/globals.css'
import React from 'react'
import AuthProvider from '@/components/auth-provider'
import { HeaderPage } from '@woodify/ui/components/layout'
import FooterPage from '@woodify/ui/components/layout/footer'
import { ToasterProvider } from '@/components/toaster-provider'

const geistSans = Geist({
	variable: '--font-geist-sans',

	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'https://noithatbachthao.com'), // <-- THAY THẾ BẰNG DOMAIN CỦA BẠN
  title: {
    template: '%s | Nội thất Bách Thảo',
    default: 'Nội thất Bách Thảo - Uy tín, Chất lượng, Giá tại xưởng',
  },
  description: 'Nội thất Bách Thảo chuyên cung cấp các sản phẩm nội thất gỗ tự nhiên và công nghiệp. Mẫu mã đa dạng, chất lượng cao, giá tại xưởng. Mua ngay!',
  keywords: ['nội thất', 'đồ gỗ', 'nội thất gỗ', 'nội thất giá rẻ', 'nội thất phòng khách', 'nội thất phòng ngủ', 'kệ tivi', 'bàn ăn', 'sofa'],
  openGraph: {
    title: 'Nội thất Bách Thảo - Uy tín, Chất lượng, Giá tại xưởng',
    description: 'Chuyên cung cấp các sản phẩm nội thất gỗ tự nhiên và công nghiệp. Mẫu mã đa dạng, chất lượng cao, giá tại xưởng.',
    url: process.env.BASE_URL || 'https://noithatbachthao.com', // <-- THAY THẾ BẰNG DOMAIN CỦA BẠN
    siteName: 'Nội thất Bách Thảo',
    images: [
      {
        url: '/og-image.png', // <-- TẠO 1 FILE HÌNH ĐẠI DIỆN KHI SHARE
        width: 1200,
        height: 630,
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || 'your-google-code',
    yandex: process.env.YANDEX_VERIFICATION_CODE || 'your-yandex-code',
  },
};

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

