'use client'

import * as React from 'react'
import { Search } from 'lucide-react'

import { SearchCommand } from '@/components/search-command'

export function SearchButton() {
	const [open, setOpen] = React.useState(false)

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				aria-label="Tìm sản phẩm"
				aria-haspopup="dialog"
				aria-keyshortcuts="Meta+K Control+K"
				className="inline-flex h-10 min-w-0 items-center gap-2 border border-craft-line bg-craft-paper px-3 text-sm font-medium text-craft-ink transition-colors hover:border-craft-copper hover:text-craft-copper sm:px-4"
			>
				<Search className="size-4 shrink-0" aria-hidden="true" />
				<span className="hidden truncate sm:inline">Tìm sản phẩm…</span>
				<kbd className="ml-2 hidden h-5 items-center rounded border border-craft-line bg-craft-cream px-1.5 font-mono text-[10px] font-semibold text-muted-foreground lg:inline-flex">
					⌘K
				</kbd>
			</button>
			<SearchCommand open={open} setOpen={setOpen} />
		</>
	)
}
