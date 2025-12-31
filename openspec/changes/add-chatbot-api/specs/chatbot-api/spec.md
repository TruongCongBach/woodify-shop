## ADDED Requirements
### Requirement: Chatbot webhook endpoint
The system SHALL expose `/api/chatbot/webhook` with Facebook webhook verification (GET) and message handling (POST).

#### Scenario: Webhook verification success
- **WHEN** a GET request includes `hub.mode=subscribe`, a matching `hub.verify_token`, and `hub.challenge`
- **THEN** the endpoint returns the challenge string with HTTP 200

#### Scenario: Webhook verification failure
- **WHEN** a GET request includes an invalid verification token
- **THEN** the endpoint returns HTTP 403

#### Scenario: Message handling acknowledgement
- **WHEN** a POST request contains a valid Facebook `page` webhook payload
- **THEN** the endpoint processes text or postback events and returns HTTP 200

### Requirement: Chatbot product search mode
The system SHALL support `GET /api/products/search` with `type=chatbot-search` and `query` parameters for chatbot-specific product search.

#### Scenario: Chatbot search returns products
- **WHEN** `type=chatbot-search` and a `query` string are provided
- **THEN** the endpoint returns a JSON array of products matching the chatbot search logic

#### Scenario: Chatbot search returns no results
- **WHEN** `type=chatbot-search` is provided and no products match
- **THEN** the endpoint returns an empty JSON array

### Requirement: Preserve existing product search behavior
The system SHALL keep the current `GET /api/products/search` behavior unchanged when `type` is missing or not `chatbot-search`.

#### Scenario: Legacy search path
- **WHEN** `type` is omitted or set to a value other than `chatbot-search`
- **THEN** the endpoint uses the existing search implementation and response format

### Requirement: Remove legacy chatbot server
The system SHALL remove the `chatbot-supabase/` folder after migrating the chatbot functionality into Next.js.

#### Scenario: Legacy folder removal
- **WHEN** the codebase is inspected after migration
- **THEN** the `chatbot-supabase/` directory is not present
