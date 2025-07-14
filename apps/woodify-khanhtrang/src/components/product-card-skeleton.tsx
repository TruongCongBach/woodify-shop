export const ProductCardSkeleton = () => (
	<div className="bg-white rounded shadow overflow-hidden animate-pulse">
		<div className="relative w-full h-48 sm:h-56 bg-gray-300" />
		<div className="p-3 sm:p-4">
			<div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
			<div className="h-4 bg-gray-300 rounded w-1/2" />
		</div>
	</div>
)
