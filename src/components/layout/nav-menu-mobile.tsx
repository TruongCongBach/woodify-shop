'use client'

// packages@/ui/src/components/CategoryAccordionNav.tsx
import React from 'react'
import Link from 'next/link'
import { MapPin, Menu, Phone } from 'lucide-react'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/ui/shadcn-ui/sheet'
import { SearchCommand } from '@/components/search-command'

type NavigationItem = {
	href: string
	label: string
}

const NavMenuMobile = ({ navigation }: { navigation: NavigationItem[] }) => {
	const [searchOpen, setSearchOpen] = React.useState(false)

	return <Sheet>
		<SearchCommand open={searchOpen} setOpen={setSearchOpen} />
		<SheetTrigger
			className="inline-flex size-11 items-center justify-center border border-craft-line bg-craft-paper text-craft-ink lg:hidden"
			aria-label="Mở menu"
		>
			<Menu className="size-5" aria-hidden="true"/>
		</SheetTrigger>
		<SheetContent className="w-[88%] border-craft-line bg-craft-paper px-6 pt-16">
			<button
				type="button"
				onClick={() => setSearchOpen(true)}
				aria-label="Tìm sản phẩm"
				className="mb-4 flex min-h-12 items-center gap-3 border border-craft-line bg-craft-cream px-4 text-sm font-medium text-craft-ink hover:border-craft-copper"
			>
				<svg
					className="size-4 text-craft-copper"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.3-4.3" />
				</svg>
				Tìm sản phẩm…
			</button>
			<SheetHeader className="border-b border-craft-line px-0 pb-6 text-left">
				<SheetTitle className="font-display text-2xl text-craft-ink">Nội thất Bách Thảo</SheetTitle>
				<SheetDescription>Đồ gỗ tự nhiên cho không gian sống Việt.</SheetDescription>
			</SheetHeader>
			<nav className="flex flex-col" aria-label="Điều hướng di động">
				{navigation.map((item, index) => (
					<SheetClose asChild key={item.href}>
						<Link
							href={item.href}
							className="flex min-h-14 items-center justify-between border-b border-craft-line/70 text-base font-semibold text-craft-ink"
						>
							<span>{item.label}</span>
							<span className="font-display text-sm text-craft-copper">0{index + 1}</span>
						</Link>
					</SheetClose>
				))}
			</nav>
			<div className="mt-auto space-y-3 border-t border-craft-line py-6 text-sm text-muted-foreground">
				<a href="tel:0347373891" className="flex min-h-11 items-center gap-3 font-semibold text-craft-ink">
					<Phone className="size-4 text-craft-copper" aria-hidden="true"/>
					034 7373 891
				</a>
				<p className="flex items-center gap-3">
					<MapPin className="size-4 text-craft-copper" aria-hidden="true"/>
					Thư Lâm, Hà Nội
				</p>
			</div>
		</SheetContent>
	</Sheet>
}
export default NavMenuMobile
