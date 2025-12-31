const test = require('node:test')
const assert = require('node:assert/strict')

const { shouldProcessEvent } = require('../src/services/chatbot/event-dedupe')

test('shouldProcessEvent returns false for duplicate ids within TTL', () => {
	const now = 1_000
	assert.equal(shouldProcessEvent('msg-1', now, 1_000), true)
	assert.equal(shouldProcessEvent('msg-1', now + 10, 1_000), false)
})

test('shouldProcessEvent allows ids after TTL expires', () => {
	const now = 2_000
	assert.equal(shouldProcessEvent('msg-2', now, 500), true)
	assert.equal(shouldProcessEvent('msg-2', now + 600, 500), true)
})
