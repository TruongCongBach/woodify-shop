'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

// Client-only: needs window.history for a sensible fallback.
export default function NotFoundBackButton() {
	const router = useRouter()
	return (
		<button
			type="button"
			onClick={() => {
				if (typeof window !== 'undefined' && window.history.length > 1) router.back()
				else router.push('/')
			}}
			className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 border border-craft-brown px-6 text-sm font-bold text-craft-brown transition-colors hover:bg-craft-brown hover:text-white"
		>
			<ArrowLeft className="size-4" aria-hidden="true" />
			Quay lại
		</button>
	)
}
