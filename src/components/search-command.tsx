'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Loader2, Search } from 'lucide-react'

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from '@/ui/shadcn-ui/command'
import { useCategories } from '@/hooks/useCategories'
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts'
import { formatPrice } from '@/utils/format-price'

type Props = {
	open: boolean
	setOpen: (open: boolean) => void
}

type SearchHit = {
	id: number
	name: string
	url: string
	defaultImage: string
	price: string
	originalPrice?: string | null
}

export function SearchCommand({ open, setOpen }: Props) {
	const router = useRouter()
	const [query, setQuery] = React.useState('')
	const [hits, setHits] = React.useState<SearchHit[]>([])
	const [isSearching, setIsSearching] = React.useState(false)

	const { data: categories = [] } = useCategories()
	const { products: featured = [] } = useFeaturedProducts(6)

	// Cmd/Ctrl+K global shortcut
	React.useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen(!open)
			}
		}
		window.addEventListener('keydown', handler)
		return () => window.removeEventListener('keydown', handler)
	}, [open, setOpen])

	// Debounced search when query length >= 2
	React.useEffect(() => {
		const q = query.trim()
		if (q.length < 2) {
			setHits([])
			return
		}
		const handle = setTimeout(async () => {
			setIsSearching(true)
			try {
				const res = await fetch(
					`/api/products/search?type=chatbot-search&query=${encodeURIComponent(q)}`
				)
				if (!res.ok) {
					setHits([])
					return
				}
				const data = (await res.json()) as SearchHit[]
				setHits(data.slice(0, 8))
			} catch {
				setHits([])
			} finally {
				setIsSearching(false)
			}
		}, 200)
		return () => clearTimeout(handle)
	}, [query])

	// Reset on close
	React.useEffect(() => {
		if (!open) {
			setQuery('')
			setHits([])
		}
	}, [open])

	const handleSelect = (href: string) => {
		setOpen(false)
		router.push(href)
	}

	const showEmpty = query.trim().length >= 2 && !isSearching && hits.length === 0
	const showResults = hits.length > 0

	return (
		<CommandDialog
			open={open}
			onOpenChange={setOpen}
			title="Tìm sản phẩm"
			description="Gõ để tìm kệ tivi, sofa, mõ gỗ tự nhiên…"
		>
			<CommandInput
				value={query}
				onValueChange={setQuery}
				placeholder="Tìm kệ tivi, sofa, mõ gỗ…"
			/>
			<CommandList>
				{isSearching ? (
					<div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
						<Loader2 className="size-4 animate-spin" aria-hidden="true" />
						Đang tìm…
					</div>
				) : showEmpty ? (
					<CommandEmpty>Không tìm thấy sản phẩm phù hợp.</CommandEmpty>
				) : null}

				{showResults ? (
					<CommandGroup heading="Sản phẩm">
						{hits.map((p) => (
							<CommandItem
								key={p.id}
								value={`${p.name} ${p.url}`}
								onSelect={() => handleSelect(`/product/${p.url}`)}
							>
								<div className="relative size-10 shrink-0 overflow-hidden border border-craft-line bg-craft-cream">
									<Image
										src={p.defaultImage}
										alt=""
										fill
										sizes="40px"
										className="object-cover"
									/>
								</div>
								<div className="flex min-w-0 flex-1 flex-col">
									<span className="truncate font-medium text-craft-ink">
										{p.name}
									</span>
									<span className="text-xs font-semibold text-craft-copper">
										{formatPrice(p.price)}
									</span>
								</div>
							</CommandItem>
						))}
					</CommandGroup>
				) : null}

				{query.trim().length < 2 && categories.length > 0 ? (
					<CommandGroup heading="Danh mục">
						{categories.slice(0, 6).map((c) => (
							<CommandItem
								key={c.id}
								value={`category ${c.name} ${c.url}`}
								onSelect={() => handleSelect(`/category/${c.url}`)}
							>
								<Search className="size-4 text-muted-foreground" aria-hidden="true" />
								<span className="text-craft-ink">{c.name}</span>
							</CommandItem>
						))}
					</CommandGroup>
				) : null}

				{query.trim().length < 2 && featured.length > 0 ? (
					<CommandGroup heading="Sản phẩm nổi bật">
						{featured.slice(0, 5).map((p) => (
							<CommandItem
								key={p.id}
								value={`featured ${p.name} ${p.url}`}
								onSelect={() => handleSelect(`/product/${p.url}`)}
							>
								<div className="relative size-10 shrink-0 overflow-hidden border border-craft-line bg-craft-cream">
									<Image
										src={p.defaultImage}
										alt=""
										fill
										sizes="40px"
										className="object-cover"
									/>
								</div>
								<div className="flex min-w-0 flex-1 flex-col">
									<span className="truncate font-medium text-craft-ink">
										{p.name}
									</span>
									<span className="text-xs font-semibold text-craft-copper">
										{formatPrice(p.price)}
									</span>
								</div>
							</CommandItem>
						))}
					</CommandGroup>
				) : null}

				<CommandShortcut className="px-3 py-2 text-[10px] text-muted-foreground">
					Esc để đóng · ⌘K
				</CommandShortcut>
			</CommandList>
		</CommandDialog>
	)
}
