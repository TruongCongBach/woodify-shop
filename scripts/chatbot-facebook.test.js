const test = require('node:test')
const assert = require('node:assert/strict')

const { sendFacebookResponse } = require('../src/services/chatbot/facebook-service')

function createMockFetch() {
	const calls = []
	const fetchImpl = async (url, init) => {
		calls.push({ url, init })
		return { ok: true, text: async () => '' }
	}
	return { calls, fetchImpl }
}

test('sendFacebookResponse sends two messages for combo responses', async () => {
	const { calls, fetchImpl } = createMockFetch()

	await sendFacebookResponse('psid-1', {
		type: 'combo',
		text: 'hello',
		carousel: {
			type: 'template',
			payload: {
				template_type: 'generic',
				elements: [],
			},
		},
	}, {
		pageAccessToken: 'token',
		fetchImpl,
	})

	assert.equal(calls.length, 2)

	const firstBody = JSON.parse(calls[0].init.body)
	const secondBody = JSON.parse(calls[1].init.body)

	assert.deepEqual(firstBody.message, { text: 'hello' })
	assert.equal(secondBody.message.attachment.type, 'template')
})

test('sendFacebookResponse skips when page access token is missing', async () => {
	const { calls, fetchImpl } = createMockFetch()

	await sendFacebookResponse('psid-2', {
		type: 'text',
		content: 'hi',
	}, {
		pageAccessToken: '',
		fetchImpl,
	})

	assert.equal(calls.length, 0)
})
