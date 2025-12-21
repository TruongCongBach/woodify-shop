// packages/ui/src/components/HeroSlider.tsx
'use client'

import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from './carousel'

interface HeroSliderProps {
	slides: {image: string; title?: string; subtitle?: string; cta?: string; ctaHref?: string}[];
}

export const HeroSlider = ({ slides }: HeroSliderProps) => {

	return (<Carousel
		opts={{
			align: 'start',
			loop: true,
		}}
		plugins={[
			Autoplay({ delay: 2000 }),
		]}
	>
		<CarouselContent>
			{slides.map((s, i) => (
				<CarouselItem key={i}>
					<div className="relative min-w-full h-[400px] md:h-[600px] bg-center bg-cover"
							 style={{ backgroundImage: `url(${s.image})` }}>
						<div
							className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center text-white px-4">
							{s.title && <h2 className="text-3xl md:text-5xl font-bold mb-2">{s.title}</h2>}
							{s.subtitle && <p className="text-lg md:text-2xl mb-4">{s.subtitle}</p>}
							{s.cta && s.ctaHref && (
								<a href={s.ctaHref} className="bg-primary text-white px-6 py-3 rounded">
									{s.cta}
								</a>
							)}
						</div>
					</div>
				</CarouselItem>
			))}
		</CarouselContent>
	</Carousel>)
}
