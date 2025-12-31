# Schedule Calendar & ICS Subscription Spec

## 1. Overview
The **Schedule Calendar** is a dedicated module for managing personal events with native support for the **Vietnamese Lunar Calendar**. It allows users to track their schedule, view Lunar dates, and integrate these details into their external calendar apps (Google Calendar, Apple Calendar) via ICS subscription.

> **Change Proposal**: See [changes/refine-schedule-calendar/proposal.md](../changes/refine-schedule-calendar/proposal.md) for the implementation plan and rationale.

## 2. Core Features

### 2.1. Calendar Interface
- **Route**: `/schedule-calendar`
- **Visuals**: A grid-based calendar showing both **Solar Date** (dominant) and **Lunar Date** (secondary, smaller text).
- **Navigation**: Month/Year selection via dropdowns or "Today" shortcut.
- **Indicators**: Dates with events are marked with a yellow dot.
- **Selection**: Adjusted styling (dark gray background) for the currently selected date.

### 2.2. Event Management
- **Storage**: Client-side only (`localStorage` key: `woodify-calendar-events`) for user privacy and simplicity.
- **Event Properties**:
    - **Title**: Event name.
    - **Description**: Optional details.
    - **Date**: Solar date of the event.
    - **Calendar Type**: Tags the event as 'Solar' or 'Lunar' related.
    - **Recurrence**:
        - `None`: One-time event.
        - `Monthly`: Repeats on the same solar day each month.
        - `Yearly`: Repeats on the same solar day/month each year.
        - `Every N Months`: Repeats every specified interval (e.g., quarterly).
- **Operations**:
    - **List View**: A scrollable list of all events, sorted chronologically.
    - **Edit**: Modify existing events.
    - **Delete**: Remove events.

## 3. ICS Subscription & Generation

The system generates `.ics` files dynamically via `/api/calendar/subscribe`. This serves two purposes:
1.  **Full Backup (Download)**: Includes User Personal Events + Holidays + Lunar Data.
2.  **Subscription (URL)**: Includes only Holidays + Lunar Data (no personal data), suitable for adding to external calendars.

### 3.1. Daily Lunar Events
To provide Lunar Date visibility in external apps, the system automatically generates an **All-Day Event** for every day of the next 365 days.
- **Title Format**:
    - **Normal Day**: Displays just the lunar day number (e.g., "**09**").
    - **1st of Lunar Month**: Displays "**01/[Lunar Month]**" (e.g., "**01/03**") to signal the start of a new moon.
- **Description**: Contains the full Lunar Date (e.g., "Âm Lịch: 09/03/2026").

### 3.2. Holiday Integration
Vietnamese and major International holidays vary from the daily lunar notes. They appear as **Distinct Events**.
- **Supported Holidays**:
    - **Solar**: New Year (1/1), Valentine (14/2), Women's Day (8/3, 20/10), Reunion Day (30/4), Labor Day (1/5), Children's Day (1/6), National Day (2/9), Teacher's Day (20/11), Christmas (24-25/12).
    - **Lunar**: Tet Nguyen Dan, Hung Kings (10/3), Vesak (15/4), Doan Ngo (5/5), Vu Lan (15/7), Mid-Autumn (15/8), Kitchen Gods (23/12).
- **Meaningful Descriptions**: 
    - Instead of just repeating the date, the event note explains the holiday's significance.
    - *Example*: **Giỗ Tổ Hùng Vương** -> Note: "Tưởng nhớ công ơn dựng nước của các Vua Hùng."

### 3.3. Monthly Summary Notification
A special "Reminder" event generated at a specific time (configurable) to give a quick overview of the upcoming month.
- **Configuration**: User sets "Day of Month" (e.g., Last Day) and "Time" (e.g., 09:00).
- **Content**: The event description lists all events occurring in the *next* month.

## 4. Technical Architecture

### 4.1. Key Dependencies
- `lunar-javascript`: Accurate conversion between Solar and Lunar dates.
- `ics`: Generation of standard iCalendar files.
- `date-fns` & `react-day-picker`: UI Calendar handling.

### 4.2. API Reference (`src/app/api/calendar/subscribe/route.ts`)

#### GET `/api/calendar/subscribe`
Used for external calendar subscription (URL).
- **Query Parameters**:
    - `notifyDay` (optional): Day of month for summary (default: 'last').
    - `notifyTime` (optional): Time for summary (default: '09:00').
- **Response**: `text/calendar` (.ics file) containing:
    - Holidays
    - Daily Lunar Events
    - Summary Placeholders (if configured)

#### POST `/api/calendar/subscribe`
Used for full calendar download.
- **Request Body (JSON)**:
    ```json
    {
      "events": [
        {
          "title": "My Event",
          "date": "2024-03-20",
          "description": "Optional notes",
          "calendarType": "solar", // or "lunar"
          "recurrence": "monthly", // "none" | "monthly" | "yearly" | "n_monthly"
          "recurrenceInterval": 1 // used if recurrence is n_monthly
        }
      ],
      "settings": {
        "notifyDay": "1",
        "notifyTime": "09:00"
      }
    }
    ```
- **Response**: `text/calendar` (.ics file) containing *everything* (User events merged with system events).

### 4.3. Data Flow
1.  **Frontend**: User creates events -> stored in `localStorage`.
2.  **View**: `CalendarView` reads `localStorage` -> displays dots.
3.  **Export**: 
    - User clicks **Download**: Frontend sends `events` array to POST API -> Browser downloads blob.
    - User clicks **Copy Link**: Browser copies GET URL -> User pastes into Google/Apple Calendar. The Calendar App polls the GET API periodically.
