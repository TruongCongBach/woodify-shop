// packages/ui/src/components/CategoryNav.tsx
'use client'
import React from 'react'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@woodify/ui/components/navigation-menu'
import Link from 'next/link'

export interface Category {
	key: string
	label: string
	image?: string
	sub?: Category[]
}

const components: {title: string; href: string; description: string}[] = [
	{
		title: 'Bàn ghế gỗ',
		href: '/ban-ghe',
		description:
			'Các mẫu bàn ăn, bàn trà và ghế phòng khách – chất liệu gỗ tự nhiên, thiết kế tinh xảo.',
	},
	{
		title: 'Kệ Tivi',
		href: '/category/ke-tivi',
		description:
			'Kệ tivi đa dạng kiểu dáng – từ kiểu truyền thống đến hiện đại, phù hợp mọi không gian.',
	},
	{
		title: 'Tủ thờ',
		href: '/tu-tho',
		description:
			'Tủ thờ gỗ cao cấp, thiết kế theo phong thủy, mang nét trang nghiêm cho không gian thờ.',
	},
	{
		title: 'Vách thờ',
		href: '/vach-tho',
		description:
			'Vách ngăn thờ trang nghiêm và hoa văn truyền thống, hòa hợp với nội thất phòng thờ.',
	},
	{
		title: 'Bàn ghế phòng thờ',
		href: '/ban-ghe-phong-tho',
		description:
			'Bàn ghế bộ nhỏ gọn, lịch sự cho phòng thờ hoặc khách nhỏ – gỗ tự nhiên bền đẹp.',
	},
]

export const CategoryNav = ({
	categories,
}: {
	categories: Category[]
}) => {

	return (
		<div className="sticky top-0 bg-[#a54e12] z-40 shadow-md transition-shadow w-full">
			<div className="container mx-auto px-4 h-16 hidden md:flex items-center justify-start">
				<NavigationMenu viewport={false}>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger
								className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:hover:bg-transparent">
								<span className="font-bold text-white">	Nội Thất Phòng Khách</span>
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
									<li className="row-span-3">

										<NavigationMenuLink asChild>
											<a
												className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
												href="/"
											>
												<div className="mt-4 mb-2 text-lg font-medium">
													shadcn/ui
												</div>
												<p className="text-muted-foreground text-sm leading-tight">
													Beautifully designed components built with Tailwind CSS.
												</p>
											</a>
										</NavigationMenuLink>
									</li>
									<ListItem href="/docs" title="Bàn Ghế Gỗ">
										Các ghế phòng khách – chất liệu gỗ tự nhiên, thiết kế tinh xảo.
									</ListItem>
									<ListItem href="/docs/installation" title="Kệ Tivi">
										Kệ tivi đa dạng kiểu dáng – từ kiểu truyền thống đến hiện đại, phù hợp mọi không gian.
									</ListItem>
									<ListItem href="/docs/primitives/typography" title="Đồ Thờ">
										Tủ thờ gỗ cao cấp, thiết kế theo phong thủy, mang nét trang nghiêm cho không gian thờ.
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger
								className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:hover:bg-transparent">
								<span className="font-bold text-white">	Bàn Ghế Gỗ</span>
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									{components.map((component) => (
										<ListItem
											key={component.title}
											title={component.title}
											href={component.href}
										>
											{component.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink asChild
																	className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:hover:bg-transparent">
								<Link href="/category/ke-tivi">
									<div className="font-bold text-white">Kệ Tivi</div>
								</Link>
							</NavigationMenuLink>

						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger
								className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:hover:bg-transparent">
								<span className="font-bold text-white">Đồ Thờ</span>
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[300px] gap-4">
									<li>
										<NavigationMenuLink asChild>
											<Link href="#">
												<div className="font-medium">Vách</div>
												<div className="text-muted-foreground">
													vách ngăn thờ trang nghiêm và hoa văn truyền thống, hòa hợp với nội thất phòng thờ.
												</div>
											</Link>
										</NavigationMenuLink>
										<NavigationMenuLink asChild>
											<Link href="#">
												<div className="font-medium">Bàn Thờ</div>
												<div className="text-muted-foreground">
													Tủ thờ gỗ cao cấp, thiết kế theo phong thủy, mang nét trang nghiêm cho không gian thờ.
												</div>
											</Link>
										</NavigationMenuLink>
										<NavigationMenuLink asChild>
											<Link href="#">
												<div className="font-medium">Tủ Cơm</div>
												<div className="text-muted-foreground">
													Tủ cơm gỗ tự nhiên, thiết kế tinh xảo, phù hợp với không gian thờ cúng.
												</div>
											</Link>
										</NavigationMenuLink>
									</li>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	)
}

function ListItem({
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<'li'> & {href: string}) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href}>
					<div className="text-sm leading-none font-medium">{title}</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	)
}
