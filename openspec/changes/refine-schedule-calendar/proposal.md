# Change: Refine Schedule Calendar & ICS Integration

## Why
- The previous calendar implementation was basic and lacked integration with the Vietnamese Lunar Calendar, which is critical for the user base.
- Users requested the ability to sync Holidays and Lunar dates to their personal devices (iPhone/Google Calendar) via ICS subscription.
- Event management needed improvement (edit/delete capabilities) for a tailored personal experience.

## What Changes
- **UI Enchancements**: Upgrade `CalendarView` with Lunar Date display, "Today" navigation, and improve selected/event states.
- **Event Management**: Implement full CRUD (Create, Read, Update, Delete) for local events using `localStorage`. Add complex recurrence (Yearly, Every N Months).
- **ICS Generation API**: Create `/api/calendar/subscribe` to generate standard `.ics` files.
    - **Daily Lunar Events**: Automatically generate "Day" events (Title: "09" or "01/MM") for the next 365 days.
    - **Holidays**: Integrate separate events for Major VN/Int'l Holidays with meaningful descriptions.
    - **Monthly Summaries**: Generate "Plan for Month X" events listing upcoming activities.
- **Documentation**: Add `specs/calendar.md` and update `project.md`.

## Impact
- **New Features**: Full Schedule Calendar module.
- **Affected Specs**: `specs/calendar.md` (Newly created).
- **Affected Code**: `src/app/schedule-calendar/**`, `src/api/calendar/subscribe/route.ts`, `src/components/schedule-calendar/**`.
- **Dependencies**: Added `lunar-javascript`, `ics`, `date-fns`.
