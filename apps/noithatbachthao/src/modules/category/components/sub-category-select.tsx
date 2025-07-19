'use client'

import { Check } from 'lucide-react'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@woodify/ui/shadcn-ui/popover'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { ScrollArea } from '@woodify/ui/shadcn-ui/scroll-area'
import { cn } from '@woodify/ui/lib/utils'
import { Checkbox } from '@woodify/ui/shadcn-ui/checkbox'

export function SubCategorySelect({
	value,
	onChange,
	options,
}: {
	value: string[]
	onChange: (val: string[]) => void
	options: { id: string; name: string }[]
}) {
	const toggle = (id: string) => {
		if (value.includes(id)) {
			onChange(value.filter((v) => v !== id))
		} else {
			onChange([...value, id])
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="w-full justify-start">
					{value.length > 0
						? `${value.length} danh mục con được chọn`
						: 'Chọn danh mục con'}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] max-h-[300px] p-0">
				<ScrollArea className="p-2">
					{options.map((cat) => (
						<div
							key={cat.id}
							className={cn(
								'flex items-center gap-2 px-2 py-1 cursor-pointer rounded hover:bg-muted',
								value.includes(cat.id) && 'bg-muted'
							)}
							onClick={() => toggle(cat.id)}
						>
							<Checkbox checked={value.includes(cat.id)} />
							<span className="text-sm">{cat.name}</span>
							{value.includes(cat.id) && (
								<Check className="w-4 h-4 text-primary ml-auto" />
							)}
						</div>
					))}
				</ScrollArea>
			</PopoverContent>
		</Popover>
	)
}
