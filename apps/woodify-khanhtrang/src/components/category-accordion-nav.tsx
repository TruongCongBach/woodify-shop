// packages/ui/src/components/CategoryAccordionNav.tsx
'use client'
import React from 'react'
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent
} from '@woodify/ui/components/accordion'

export const CategoryAccordionNav = ({
	categories,
	onSelectAction
}: {
	categories: Category[]
	onSelectAction: (key: string) => void
}) => (
	<Accordion type="single" collapsible className="w-full">
		{categories.map((cat, idx) => {
			if(cat.sub) {
				return <AccordionItem value={cat.url} key={idx}>
					<AccordionTrigger className="flex items-center space-x-2">
						<span>{cat.name}</span>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4 pt-2">
						{cat.image ? (
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									{cat.sub.map((sub, subIdx) => (
										<button
											key={subIdx}
											className="block text-left w-full p-2 rounded hover:bg-gray-100 transition"
											onClick={() => onSelectAction(sub.url)}
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
								{cat.sub.map((sub, idx) => (
									<button
										key={idx}
										className="block text-left w-full p-2 rounded hover:bg-gray-100 transition"
										onClick={() => onSelectAction(sub.url)}
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
					onClick={() => onSelectAction(cat.url)}
				>
					<span className="font-bold">{cat.name}</span>
				</button>
			</div>

		})}
	</Accordion>
)
