import { getTagColor } from '@/utils/getTagColor'
import { formatPrice } from '@/utils/formatPrice'

type Props = {
	product: Product
	tags?: string[]
}

export const ProductCard = ({ product, tags }: Props) => {

	return (
		<div className="flex flex-col bg-white rounded shadow overflow-hidden transition group hover:shadow-lg h-full">
			<div className="relative w-full flex-shrink-0 h-48 sm:h-56 overflow-hidden">
				<img
					src={product.defaultImage}
					alt={product.name}
					className="w-full h-full object-cover transition-transform duration-300 sm:group-hover:scale-105"
				/>
				{tags && tags.length > 0 && (
					<div className="absolute top-2 left-2 flex flex-col gap-1">
						{tags.map((label, idx) => (
							<span
								key={idx}
								className={`${getTagColor(label)} text-white text-[10px] sm:text-xs text-center font-medium px-2 py-0.5 rounded`}
							>
            {label}
          </span>
						))}
					</div>
				)}
			</div>

			<div className="flex-grow p-3 sm:p-4 flex flex-col justify-between">
				<h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2">
					{product.name}
				</h3>
				<p className="text-red-600 font-semibold text-base sm:text-lg mt-1">
					{formatPrice(product.price)}
				</p>
			</div>
		</div>
	)
}
