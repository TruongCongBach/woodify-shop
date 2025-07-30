'use client'

import { Toaster as Sonner } from '@woodify/ui/shadcn-ui/sonner'

// The shadcn-ui implementation of Sonner's Toaster
// already uses useTheme internally, so we just need to
// render it in a client component to avoid the server-side error.
export function ToasterProvider() {
	return <Sonner />
}
