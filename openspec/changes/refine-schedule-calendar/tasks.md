# Tasks

- [x] **Core UI Refinements**
    - [x] Display Lunar Date alongside Solar Date in grid.
    - [x] Highlight "Today", "Selected Date", and "Event Days" (yellow dot).
    - [x] Implement "All Events" list side-panel.

- [x] **Event Management Logic**
    - [x] Create `EventForm` with Edit/Delete capabilities.
    - [x] Implement Recurrence Logic (Monthly, Yearly, Every N Months).
    - [x] Persist data to `localStorage`.

- [x] **ICS Subscription Backend**
    - [x] Implement `POST` route for Full Download (User Events + Lunar).
    - [x] Implement `GET` route for Subscription URL (Lunar + Holidays only).
    - [x] **Daily Lunar Events**: Generate all-day events titled "09" (or "01/MM").
    - [x] **Holidays**: Integrate distinct Holiday events with meaningful descriptions (e.g., "Giỗ Tổ Hùng Vương").
    - [x] **Monthly Summaries**: Auto-generate summary events.

- [x] **Documentation & Spec**
    - [x] Create `openspec/specs/calendar.md`.
    - [x] Update `openspec/project.md` context.
