export function getPaginationRange(current: number, total: number, delta = 1): (number | 'ellipsis')[] {
	const range: (number | 'ellipsis')[] = []

	const left = Math.max(2, current - delta)
	const right = Math.min(total - 1, current + delta)

	range.push(1)

	if (left > 2) range.push('ellipsis')

	for (let i = left; i <= right; i++) {
		range.push(i)
	}

	if (right < total - 1) range.push('ellipsis')

	if (total > 1) range.push(total)

	return range
}
