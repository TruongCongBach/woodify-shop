import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone } from 'lucide-react'
import NavMenuMobile from './nav-menu-mobile'
import { SearchButton } from './search-button'
import { fetchNavCategoriesWithChildren } from '@/services/category/fetch-nav-categories-with-children'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/ui/shadcn-ui/navigation-menu'

type NavItem = { href: string; label: string }

const staticNav: NavItem[] = [
	{ href: '/', label: 'Trang chủ' },
	{ href: '/ve-chung-toi', label: 'Câu chuyện xưởng' },
	{ href: '/chinh-sach-bao-hanh', label: 'Bảo hành' },
	{ href: '/lien-he', label: 'Liên hệ' },
]

const HeaderPage = async () => {
	const categoryTree = await fetchNavCategoriesWithChildren()
	const topCategories = categoryTree.slice(0, 5)

	const navigation: NavItem[] = [
		...staticNav.slice(0, 1),
		...(topCategories.length > 0
			? [{ href: '/category/ke-tivi', label: 'Bộ sưu tập' }]
			: []),
		...staticNav.slice(1),
	]

	return (
		<header className="sticky top-0 z-50 border-b border-craft-line/80 bg-craft-paper/95 backdrop-blur-xl">
			<div className="hidden bg-craft-ink text-craft-cream sm:block">
				<div className="container mx-auto flex h-9 items-center justify-between px-4 text-xs">
					<p className="flex items-center gap-2">
						<MapPin className="size-3.5" aria-hidden="true"/>
						Xưởng đồ gỗ tại Thư Lâm, Hà Nội
					</p>
					<a href="tel:0347373891" className="flex items-center gap-2 font-semibold hover:text-white">
						<Phone className="size-3.5" aria-hidden="true"/>
						034 7373 891
					</a>
				</div>
			</div>

			<div className="container mx-auto flex h-18 items-center justify-between px-4 lg:h-20">
				<Link href="/" className="flex items-center gap-3" aria-label="Nội thất Bách Thảo - Trang chủ">
					<Image
						src="/logo-black.png"
						alt=""
						width={88}
						height={54}
						className="h-12 w-auto object-contain"
						priority
					/>
					<span className="block border-l border-craft-line pl-3 font-display text-sm font-semibold leading-tight text-craft-ink sm:text-lg">
						Nội thất<br/>
						<span className="text-craft-copper">Bách Thảo</span>
					</span>
				</Link>

				<nav className="hidden items-center gap-7 lg:flex" aria-label="Điều hướng chính">
					{topCategories.length > 0 ? (
						<NavigationMenu viewport={false}>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger className="bg-transparent text-sm font-semibold text-craft-ink hover:text-craft-copper">
										Bộ sưu tập
									</NavigationMenuTrigger>
									<NavigationMenuContent className="border-craft-line bg-craft-paper">
										<ul className="grid w-[min(640px,90vw)] grid-cols-2 gap-1 p-3">
											{topCategories.map((cat) => (
												<li key={cat.id}>
													<NavigationMenuLink asChild>
														<Link
															href={`/category/${cat.url}`}
															className="block rounded-sm px-3 py-2 text-sm font-semibold text-craft-ink hover:bg-craft-cream hover:text-craft-copper"
														>
															{cat.name}
														</Link>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					) : null}

					{staticNav.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="relative py-2 text-sm font-semibold text-craft-ink transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-craft-copper after:transition-transform hover:text-craft-copper hover:after:scale-x-100"
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-3">
					<SearchButton />
					<a
						href="tel:0347373891"
						className="hidden min-h-11 items-center justify-center border border-craft-copper bg-craft-copper px-5 text-sm font-bold text-white transition-colors hover:bg-craft-brown xl:inline-flex"
					>
						Tư vấn chọn gỗ
					</a>
					<NavMenuMobile navigation={navigation}/>
				</div>
			</div>
		</header>
	)
}
export default HeaderPage
