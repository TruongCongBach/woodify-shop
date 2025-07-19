'use client'

import React, { useRef, useEffect, useState } from 'react'
import '@google/model-viewer'
import { ModelViewerElement } from '@google/model-viewer'

// TypeScript declaration
const ModelViewer = 'model-viewer' as any

export default function ARTester() {
	const ref = useRef<ModelViewerElement>(null)
	const [isARSupported, setIsARSupported] = useState(true)
	const [isLoading, setIsLoading] = useState(true)

	const openAR = () => {
		const viewer = ref.current
		if (viewer?.activateAR) {
			viewer.activateAR()
		} else {
			console.warn('AR not supported or model-viewer not ready.')
		}
	}

	useEffect(() => {
		// Check AR support
		const temp = document.createElement('model-viewer') as ModelViewerElement
		if (!temp?.activateAR) {
			setIsARSupported(false)
		}
	}, [])

	useEffect(() => {
		const viewer = ref.current
		if (!viewer) return

		const handleLoad = () => {
			console.log('Model loaded successfully')
			setIsLoading(false)
		}

		const handleError = (event: any) => {
			console.error('Model failed to load:', event)
			setIsLoading(false)
		}

		const handleARStatus = (event: any) => {
			console.log('AR status:', event.detail.status)
		}

		viewer.addEventListener('load', handleLoad)
		viewer.addEventListener('error', handleError)
		viewer.addEventListener('ar-status', handleARStatus)

		return () => {
			viewer.removeEventListener('load', handleLoad)
			viewer.removeEventListener('error', handleError)
			viewer.removeEventListener('ar-status', handleARStatus)
		}
	}, [])

	return (
		<div className="max-w-md mx-auto text-center">
			{!isARSupported ? (
				<p className="text-red-600 mb-4">Thiết bị của bạn không hỗ trợ AR</p>
			) : (
				<button
					onClick={openAR}
					className="btn-ar bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition-colors"
				>
					Xem AR
				</button>
			)}

			{isLoading && <p className="text-gray-500 mb-2">Đang tải mô hình...</p>}

			<ModelViewer
				ref={ref}
				src="/models/chair.glb"
				ios-src="/models/chair.usdz"
				alt="Demo AR model"
				ar
				ar-modes="webxr scene-viewer quick-look"
				camera-controls
				auto-rotate
				style={{ width: '100%', height: '300px' }}
				loading="lazy"
				reveal="interaction"
				environment-image="neutral"
				shadow-intensity="1"
				camera-orbit="0deg 75deg 10%"
				max-camera-orbit="auto auto 10%"
				min-camera-orbit="auto auto 10%"
			/>
		</div>
	)
}
