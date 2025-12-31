import { NextRequest, NextResponse } from 'next/server'
import { handlePostback, processMessage } from '@/services/chatbot/chatbot-service'
import { sendFacebookResponse } from '@/services/chatbot/facebook-service'
import { shouldProcessEvent } from '@/services/chatbot/event-dedupe'

const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
const VERIFY_TOKEN = process.env.VERIFY_TOKEN

export async function GET(request: NextRequest) {
	const mode = request.nextUrl.searchParams.get('hub.mode')
	const token = request.nextUrl.searchParams.get('hub.verify_token')
	const challenge = request.nextUrl.searchParams.get('hub.challenge')

	if (!mode || !token) {
		return new NextResponse(null, { status: 400 })
	}

	if (mode === 'subscribe' && token === VERIFY_TOKEN) {
		return new NextResponse(challenge ?? '', { status: 200 })
	}

	return new NextResponse(null, { status: 403 })
}

export async function POST(request: NextRequest) {
	let body: any

	try {
		body = await request.json()
	} catch (error) {
		console.error('Invalid webhook payload:', error)
		return new NextResponse(null, { status: 400 })
	}

	if (body.object !== 'page') {
		return new NextResponse(null, { status: 404 })
	}

	for (const entry of body.entry ?? []) {
		for (const event of entry.messaging ?? []) {
			const senderPsid = event?.sender?.id
			if (!senderPsid) {
				continue
			}

			const eventId = getEventId(event, senderPsid)
			if (eventId && !shouldProcessEvent(eventId)) {
				console.warn('Skipping duplicate webhook event:', eventId)
				continue
			}

			if (event.message?.text) {
				try {
					const response = await processMessage(senderPsid, event.message.text)
					await sendFacebookResponse(senderPsid, response, { pageAccessToken: PAGE_ACCESS_TOKEN })
				} catch (error) {
					console.error('Error processing message:', error)
				}
				continue
			}

			if (event.postback?.payload) {
				try {
					const response = await handlePostback(senderPsid, event.postback.payload)
					await sendFacebookResponse(senderPsid, response, { pageAccessToken: PAGE_ACCESS_TOKEN })
				} catch (error) {
					console.error('Error processing postback:', error)
				}
			}
		}
	}

	return new NextResponse('EVENT_RECEIVED', { status: 200 })
}

function getEventId(event: any, senderPsid: string): string | null {
	if (event?.message?.mid) return event.message.mid
	if (event?.postback?.mid) return event.postback.mid
	if (event?.timestamp) return `${senderPsid}:${event.timestamp}`
	if (event?.message?.text) return `${senderPsid}:${event.message.text}`
	return null
}
