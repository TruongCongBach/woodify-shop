const DEFAULT_API_VERSION = 'v12.0'

async function sendFacebookResponse(senderPsid, response, options = {}) {
	const { pageAccessToken, fetchImpl = fetch, apiVersion = DEFAULT_API_VERSION } = options

	if (!pageAccessToken || pageAccessToken === 'YOUR_PAGE_ACCESS_TOKEN') {
		console.warn('Missing or invalid FACEBOOK_PAGE_ACCESS_TOKEN in env. Message not sent.')
		return
	}

	const apiUrl = `https://graph.facebook.com/${apiVersion}/me/messages?access_token=${pageAccessToken}`

	if (response.type === 'combo') {
		await postToFacebook(fetchImpl, apiUrl, {
			recipient: { id: senderPsid },
			message: { text: response.text },
		})

		await postToFacebook(fetchImpl, apiUrl, {
			recipient: { id: senderPsid },
			message: { attachment: { type: 'template', payload: response.carousel.payload } },
		})
		return
	}

	let requestBody = null

	if (response.type === 'text') {
		requestBody = {
			recipient: { id: senderPsid },
			message: { text: response.content },
		}
	}

	if (response.type === 'template') {
		requestBody = {
			recipient: { id: senderPsid },
			message: { attachment: { type: 'template', payload: response.payload } },
		}
	}

	if (requestBody) {
		await postToFacebook(fetchImpl, apiUrl, requestBody)
	}
}

async function postToFacebook(fetchImpl, apiUrl, body) {
	try {
		const res = await fetchImpl(apiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})

		if (!res.ok) {
			const errorText = await res.text()
			console.error('Unable to send message:', errorText)
		}
	} catch (error) {
		console.error('Unable to send message:', error)
	}
}

module.exports = {
	sendFacebookResponse,
}
