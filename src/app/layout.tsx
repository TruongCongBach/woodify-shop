import type { Metadata } from 'next'
import '@/ui/styles/globals.css'
import React from 'react'
import Script from 'next/script'
import { Be_Vietnam_Pro, Lora } from 'next/font/google'
import AuthProvider from '@/components/auth-provider'
import { ToasterProvider } from '@/components/toaster-provider'
import config from '@/config'
import { FooterPage, HeaderPage } from '@/components/layout'
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from '@/seo/jsonld'

const bodyFont = Be_Vietnam_Pro({
	subsets: ['latin', 'vietnamese'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-body',
	display: 'swap',
})

const displayFont = Lora({
	subsets: ['latin', 'vietnamese'],
	variable: '--font-display',
	display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(config.domainUrl),
  title: {
    template: '%s | Nội thất Bách Thảo',
    default: 'Nội thất Bách Thảo | Đồ gỗ tự nhiên chế tác tại xưởng',
  },
  description: 'Khám phá kệ tivi, sofa và đồ gỗ tự nhiên được tuyển chọn, chế tác tại xưởng Nội thất Bách Thảo ở Hà Nội.',
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
    title: 'Nội thất Bách Thảo | Đồ gỗ tự nhiên chế tác tại xưởng',
    description: 'Kệ tivi, sofa và đồ gỗ tự nhiên cho không gian sống Việt.',
    url: config.domainUrl,
    siteName: 'Nội thất Bách Thảo',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Nội thất Bách Thảo — đồ gỗ tự nhiên chế tác tại xưởng',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  verification: {
    google: config.googleSiteVerification,
  },
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
	alternates: {
		canonical: config.domainUrl,
		languages: {
			'vi-VN': config.domainUrl,
			'x-default': config.domainUrl,
		},
	},
	formatDetection: {
		telephone: false,
		address: false,
		email: false,
	},
	manifest: '/site.webmanifest',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi" className={`${bodyFont.variable} ${displayFont.variable}`}>
		<body>
			<a
				href="#main-content"
				className="fixed left-4 top-4 z-[100] -translate-y-24 bg-craft-ink px-4 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
			>
				Chuyển đến nội dung chính
			</a>
			{config.googleAnalytics.measurementId ? (
				<>
					<Script
						src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics.measurementId}`}
						strategy="afterInteractive"
					/>
					<Script id="gtag-init" strategy="afterInteractive">
						{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', '${config.googleAnalytics.measurementId}');
				`}
					</Script>
				</>
			) : null}
		<AuthProvider>
			<div className="min-h-screen bg-background">
				<HeaderPage/>
				<main id="main-content">
					{children}
				</main>
				<FooterPage/>
				<ToasterProvider />
			</div>
		</AuthProvider>
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [buildOrganizationJsonLd(), buildWebsiteJsonLd()],
			}) }}
		/>
		</body>
		</html>
	)
}
