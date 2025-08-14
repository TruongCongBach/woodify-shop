const config  = {
	domainUrl: process.env.DOMAIN_URL ?? 'http://localhost:3000',
	database: {
		anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
		url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
	},
	cloudinaryCloud: {
		cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '',
		apiKey: process.env.CLOUDINARY_API_KEY ?? '',
		apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
	},
	nextAuth: {
		secret: process.env.NEXTAUTH_SECRET ?? '',
		url: process.env.NEXTAUTH_URL ?? '',
	},
	googleAuth: {
		clientId: process.env.GOOGLE_CLIENT_ID ?? '',
		clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
	},
	googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION ?? 'your-google-code',
	facebookAuth: {
		clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
	},
	defaultPassword: process.env.DEFAULT_PASSWORD ?? '',
	revalidateSecret: process.env.REVALIDATE_SECRET ?? '',
}
export default config
