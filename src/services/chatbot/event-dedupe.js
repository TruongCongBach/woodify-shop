const DEFAULT_TTL_MS = 60 * 1000
const seenEvents = new Map()

function shouldProcessEvent(eventId, now = Date.now(), ttlMs = DEFAULT_TTL_MS) {
	if (!eventId) return true

	for (const [key, timestamp] of seenEvents.entries()) {
		if (now - timestamp > ttlMs) {
			seenEvents.delete(key)
		}
	}

	if (seenEvents.has(eventId)) {
		return false
	}

	seenEvents.set(eventId, now)
	return true
}

module.exports = {
	shouldProcessEvent,
}
