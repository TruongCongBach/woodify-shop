// packages/ui/src/components/CategoryAccordionNav.tsx
'use client'
import React from 'react'
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent
} from '@woodify/ui/components/accordion'

export interface Category {
	key: string
	label: string
	image?: string
	sub?: Category[]
}

export const CategoryAccordionNav = ({
	categories,
	onSelectAction
}: {
	categories: Category[]
	onSelectAction: (key: string) => void
}) => (
	<Accordion type="single" collapsible className="w-full">
		{categories.map(cat => (
			<AccordionItem value={cat.key} key={cat.key}>
				<AccordionTrigger className="flex items-center space-x-2">
					<span>{cat.label}</span>
				</AccordionTrigger>
				{cat.sub && (
					<AccordionContent className="px-4 pb-4 pt-2">
						{cat.image ? (
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									{cat.sub.map(sub => (
										<button
											key={sub.key}
											className="block text-left w-full p-2 rounded hover:bg-gray-100 transition"
											onClick={() => onSelectAction(sub.key)}
										>
											{sub.label}
										</button>
									))}
								</div>
								<div className="flex items-center justify-center">
									<img
										src={cat.image}
										alt={cat.label}
										className="max-h-32 object-contain rounded"
									/>
								</div>
							</div>
						) : (
							<div className="space-y-2">
								{cat.sub.map(sub => (
									<button
										key={sub.key}
										className="block text-left w-full p-2 rounded hover:bg-gray-100 transition"
										onClick={() => onSelectAction(sub.key)}
									>
										{sub.label}
									</button>
								))}
							</div>
						)}
					</AccordionContent>
				)}
			</AccordionItem>
		))}
	</Accordion>
)
