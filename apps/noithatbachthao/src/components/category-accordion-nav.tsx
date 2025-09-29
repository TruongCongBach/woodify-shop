// packages/ui/src/components/CategoryAccordionNav.tsx
'use client'
import React, { use } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@woodify/ui/shadcn-ui/accordion'
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@woodify/ui/shadcn-ui/sheet'
import { Menu } from 'lucide-react'

export const CategoryAccordionNav = ({
	categoryTreeMenu,
}: {
	categoryTreeMenu: Promise<CategoryTree[]>
}) => {
	const router = useRouter()
	const categories = use(categoryTreeMenu)

	if (!categories || categories.length === 0) {
		return <div className="p-4">Không có danh mục nào</div>
	}
	const handleSelect = (key: string) => {
		router.push(`/category/${key}`)
	}

	return <Sheet>
		<SheetTrigger className="md:hidden">
			<Menu className="h-6 w-6"/>
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetDescription>
					<Accordion type="single" collapsible className="w-full">
						{categories.map((cat, idx) => {
							if (cat.children) {
								return <AccordionItem value={cat.url} key={idx}>
									<AccordionTrigger className="flex items-center space-x-2">
										<span>{cat.name}</span>
									</AccordionTrigger>
									<AccordionContent className="px-4 pb-4 pt-2">
										{cat.image ? (
											<div className="grid grid-cols-2 gap-4">
												<div className="space-y-2">
													{cat.children.map((sub, subIdx) => (
														<button
															key={subIdx}
															className="block text-left w-full p-2 rounded hover:bg-gray-100 transition"
															onClick={() => handleSelect(sub.url)}
														>
															{sub.name}
														</button>
													))}
												</div>
												<div className="flex items-center justify-center">
													<img
														src={cat.image}
														alt={cat.image}
														className="max-h-32 object-contain rounded"
													/>
												</div>
											</div>
										) : (
											<div className="space-y-2">
												{cat.children.map((sub, idx) => (
													<button
														key={idx}
														className="block text-left w-full p-2 rounded hover:bg-gray-100 transition"
														onClick={() => handleSelect(sub.url)}
													>
														<span className="font-bold">{sub.name}</span>
													</button>
												))}
											</div>
										)}
									</AccordionContent>
								</AccordionItem>
							}
							return <div key={idx}>
								<button
									className="block text-left w-full py-4 rounded hover:bg-gray-100 transition"
									onClick={() => handleSelect(cat.url)}
								>
									<span className="font-bold">{cat.name}</span>
								</button>
							</div>

						})}
						<div className="border-t border-gray-200 pt-4 mt-4">
							<a href="/contact-us" className="block text-left w-full py-4 rounded hover:bg-gray-100 transition font-bold">
								Liên hệ
							</a>
							<a href="/about-us" className="block text-left w-full py-4 rounded hover:bg-gray-100 transition font-bold">
								Về chúng tôi
							</a>
						</div>
					</Accordion>
				</SheetDescription>
			</SheetHeader>
		</SheetContent>
	</Sheet>

}
