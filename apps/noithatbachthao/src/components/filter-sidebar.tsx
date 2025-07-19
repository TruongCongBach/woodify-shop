'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@woodify/ui/shadcn-ui/accordion'
import { Checkbox } from '@woodify/ui/shadcn-ui/checkbox'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { useCallback, useState } from 'react'

type FilterOption = { label: string; value: string }
type Filter = { key: string; label: string; type: 'multi' | 'range'; options: FilterOption[] }

interface Props {
	filters: Filter[]
	onApply: (selected: Record<string, string[]>) => void
}

export const FilterSidebar = ({ filters, onApply }: Props) => {
	const initial = Object.fromEntries(filters.map(f => [f.key, []]))
	const [selected, setSelected] = useState<Record<string, string[]>>(initial)

	const handleToggle = (key: string, value: string) => {
		setSelected(prev => {
			const current = prev[key] ?? []
			const updated = current.includes(value)
				? current.filter(v => v !== value)
				: [...current, value]

			const newSelected = { ...prev, [key]: updated }
			onApply(newSelected)
			return newSelected
		})
	}

	const handleRadio = (key: string, value: string) => {
		const newSelected = { ...selected, [key]: [value] }
		setSelected(newSelected)
		onApply(newSelected)
	}

	const reset = () => {
		setSelected(initial)
		onApply(initial)
	}

	const buildClassNameByKeyFilter = useCallback((key: string) => {
		switch (key) {
			case 'price':
				return 'flex flex-col gap-2 pt-2';
			case 'Chất liệu Gỗ':
				return 'grid grid-cols-1';
			default:
				return 'grid grid-cols-1 md:grid-cols-2 gap-2 pt-2';
		}

	}, [])

	return (
		<div className="flex flex-col h-full md:max-h-[calc(100vh-8rem)] overflow-hidden">
			{/* Nội dung filter scrollable */}
			<div className="overflow-auto px-2 pb-28 md:pb-4">
				<Accordion type="multiple" className="space-y-2">
					{filters.map(filter => (
						<AccordionItem key={filter.key} value={filter.key}>
							<AccordionTrigger className="text-sm font-medium">{filter.label}</AccordionTrigger>
							<AccordionContent>
								<div className={`${buildClassNameByKeyFilter(filter.key)} space-y-2`}>
									{filter.options.map(option => (
										<label key={option.value} className="flex items-center space-x-2 text-sm">
											{filter.type === 'multi' ? (
												<Checkbox
													checked={selected[filter.key]?.includes(option.value)}
													onCheckedChange={() => handleToggle(filter.key, option.value)}
												/>
											) : (
												<input
													type="radio"
													name={filter.key}
													checked={selected[filter.key]?.includes(option.value)}
													onChange={() => handleRadio(filter.key, option.value)}
												/>
											)}
											<span>{option.label}</span>

										</label>
									))}
								</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>

			{/* Sticky button dưới đáy */}
			<div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 md:static md:p-0 md:border-none flex gap-2">
				<Button variant="outline" className="flex-1" onClick={reset}>
					Đặt lại
				</Button>
			</div>
		</div>
	)
}
