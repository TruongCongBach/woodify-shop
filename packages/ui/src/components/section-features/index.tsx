import { Award, Clock, Shield, Truck } from 'lucide-react'

const SectionFeatures = () => {

	return (<section className="py-20 bg-white">
		<div className="container mx-auto px-4">
			<div className="grid md:grid-cols-4 gap-8">
				{[
					{
						icon: <Award className="w-12 h-12 text-amber-600" />,
						title: "Chất Lượng Đảm Bảo",
						description: "100% Gỗ Hương Đá"
					},
					{
						icon: <Truck className="w-12 h-12 text-blue-600" />,
						title: "Giao Hàng Nhanh",
						description: "Miễn phí vận chuyển dưới 100km"
					},
					{
						icon: <Shield className="w-12 h-12 text-green-600" />,
						title: "Bảo Hành",
						description: "Cam kết chất lượng lâu dài"
					},
					{
						icon: <Clock className="w-12 h-12 text-purple-600" />,
						title: "Hỗ Trợ 24/7",
						description: "Tư vấn chuyên nghiệp mọi lúc"
					}
				].map((feature, index) => (
					<div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
						<div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
							{feature.icon}
						</div>
						<h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
						<p className="text-gray-600 leading-relaxed">{feature.description}</p>
					</div>
				))}
			</div>
		</div>
	</section>)
}
export default SectionFeatures
