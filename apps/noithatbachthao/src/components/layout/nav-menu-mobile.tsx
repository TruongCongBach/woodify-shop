// packages/ui/src/components/CategoryAccordionNav.tsx
import React from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@woodify/ui/shadcn-ui/sheet'

const NavMenuMobile = () => {

	return <Sheet>
		<SheetTrigger className="lg:hidden">
			<Menu className="h-6 w-6"/>
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetDescription>
					<nav className="flex flex-col space-y-4">
						<a href="/" className="text-gray-700 hover:text-amber-600 font-medium">Trang Chủ</a>
						<a href="/category/ke-tivi" className="text-gray-700 hover:text-amber-600 font-medium">Bộ Sưu Tập</a>
						<a href="/category/ke-tivi" className="text-gray-700 hover:text-amber-600 font-medium">Showroom</a>
						<a href="/about-us" className="text-gray-700 hover:text-amber-600 font-medium">Về Chúng Tôi</a>
						<a href="/contact-us" className="text-gray-700 hover:text-amber-600 font-medium">Liên Hệ</a>
					</nav>
				</SheetDescription>
			</SheetHeader>
		</SheetContent>
	</Sheet>

}
export default NavMenuMobile
