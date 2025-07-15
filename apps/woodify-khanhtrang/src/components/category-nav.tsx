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
import { cva } from 'class-variance-authority'
import { cn } from '@woodify/ui/lib/utils'

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
	const navigationMenuTriggerStyle = cva(
		"hover:bg-transparent hover:text-accent-foreground focus:bg-transparent focus:text-accent-foreground data-[state=open]:hover:bg-transparent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-transparent data-[state=open]:bg-transparent/50"
	)

	return (
		<div className="sticky top-0 z-40 shadow-md transition-shadow w-full bg-white hidden md:block">
			<div className="container mx-auto px-4 flex items-center justify-start">
				<NavigationMenu viewport={false}>
					<NavigationMenuList>
						{categories.map((category, idx) => {
							if(category.sub) {
								return <NavigationMenuItem key={idx}>
									<NavigationMenuTrigger className={cn('p-6 h-full cursor-pointer', navigationMenuTriggerStyle())}>
										<span className="font-bold">{category.name}</span>
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[300px] gap-4">
											<li>
												{category.sub.map((subCategory, subIdx) => (
													<NavigationMenuLink asChild key={subIdx}>
														<Link
															href={`/category/${subCategory.url}`}
														>
															<div className="font-medium">{subCategory.name}</div>
															<div className="text-muted-foreground">
																{subCategory.description}
															</div>
														</Link>
													</NavigationMenuLink>
												))}
											</li>
										</ul>

									</NavigationMenuContent>
								</NavigationMenuItem>
							}
							return <NavigationMenuItem>
								<NavigationMenuLink asChild className={cn('p-6', navigationMenuTriggerStyle())}>
									<Link href={`/category/${category.url}`}>
										<span className="font-bold">{category.name}</span>
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						})}
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
