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
							return <NavigationMenuItem key={idx}>
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
