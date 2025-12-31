import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import { createEvents, EventAttributes } from 'ics'
import { getUpcomingLunarDate } from "@/lib/lunar-utils"
import { Solar, Lunar } from "lunar-javascript"

// Helper to get last day of month
function getLastDayOfMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

// Helper to generate the ICS file content
async function generateCalendar(userEvents: any[], settings: any, calendarName: string = "Woodify Calendar") {
    const events: EventAttributes[] = []
    const today = new Date();

    // Settings flags (default to true if undefined for backward compatibility)
    const includeLunar = settings.includeLunar !== false; // Only exclude if explicitly false
    const includeHolidays = settings.includeHolidays !== false;

    // 1. DEFINE HOLIDAYS & MEANINGS
    const solarHolidays: Record<string, { name: string, meaning: string }> = {
        "1-1": { name: "Tết Dương lịch", meaning: "Chào đón năm mới." },
        "14-2": { name: "Lễ Tình nhân (Valentine)", meaning: "Ngày lễ tôn vinh tình yêu đôi lứa." },
        "8-3": { name: "Quốc tế Phụ nữ", meaning: "Tôn vinh quyền và vẻ đẹp của phụ nữ." },
        "30-4": { name: "Giải phóng miền Nam", meaning: "Kỷ niệm ngày thống nhất đất nước Việt Nam." },
        "1-5": { name: "Quốc tế Lao động", meaning: "Kỷ niệm phong trào công nhân quốc tế." },
        "1-6": { name: "Quốc tế Thiếu nhi", meaning: "Ngày Tết dành cho trẻ em." },
        "2-9": { name: "Quốc khánh Việt Nam", meaning: "Kỷ niệm ngày Bác Hồ đọc Tuyên ngôn Độc lập." },
        "20-10": { name: "Phụ nữ Việt Nam", meaning: "Tôn vinh những đóng góp của phụ nữ Việt Nam." },
        "20-11": { name: "Nhà giáo Việt Nam", meaning: "Tri ân công ơn dạy dỗ của thầy cô giáo." },
        "24-12": { name: "Lễ Giáng sinh (Noel)", meaning: "Kỷ niệm ngày Chúa Jesus ra đời." },
        "25-12": { name: "Lễ Giáng sinh", meaning: "Kỷ niệm ngày Chúa Jesus ra đời." }
    };

    const lunarHolidays: Record<string, { name: string, meaning: string }> = {
        "1-1": { name: "Tết Nguyên Đán", meaning: "Tết cổ truyền, sum họp gia đình chào đón năm mới." },
        "15-1": { name: "Tết Nguyên Tiêu", meaning: "Lễ cúng Rằm tháng Giêng, cầu bình an." },
        "10-3": { name: "Giỗ Tổ Hùng Vương", meaning: "Tưởng nhớ công ơn dựng nước của các Vua Hùng." },
        "15-4": { name: "Lễ Phật Đản", meaning: "Kỷ niệm ngày Đức Phật Thích Ca đản sinh." },
        "5-5": { name: "Tết Đoan Ngọ", meaning: "Tết giết sâu bọ, cầu mong mùa màng bội thu, sức khỏe." },
        "15-7": { name: "Lễ Vu Lan", meaning: "Ngày báo hiếu cha mẹ, xá tội vong nhân." },
        "15-8": { name: "Tết Trung Thu", meaning: "Tết thiếu nhi, ngắm trăng và phá cỗ." },
        "23-12": { name: "Ông Công Ông Táo", meaning: "Tiễn Táo quân về trời báo cáo cuối năm." }
    };

    const daysToGenerate = 365;
    for (let i = 0; i < daysToGenerate; i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
        const solarDate = Solar.fromDate(date);
        const lunarDate = solarDate.getLunar();
        const day = lunarDate.getDay();
        const month = lunarDate.getMonth();
        const year = lunarDate.getYear();

        // Format: DD/MM/YYYY for Lunar
        const dayStr = String(day).padStart(2, '0');
        const monthStr = String(month).padStart(2, '0');
        const lunarDateStr = `${dayStr}/${monthStr}/${year}`;

        // 1. Daily Lunar Event (Conditional)
        if (includeLunar) {
            // Title logic: "09" normally, but "01/03" for first day of month
            let title = dayStr;
            if (day === 1) {
                title = `${dayStr}/${monthStr}`;
            }

            events.push({
                start: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
                duration: { days: 1 },
                title: title,
                description: `Âm Lịch: ${lunarDateStr}`,
                categories: ['Lunar Date'],
                status: 'CONFIRMED',
                busyStatus: 'FREE'
            });
        }

        // 2. Separate Holiday Events (Conditional)
        if (includeHolidays) {
            // Check Solar Holidays
            const sKey = `${date.getDate()}-${date.getMonth() + 1}`;
            if (solarHolidays[sKey]) {
                events.push({
                    start: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
                    duration: { days: 1 },
                    title: solarHolidays[sKey].name,
                    description: solarHolidays[sKey].meaning,
                    categories: ['Holiday', 'Solar'],
                    busyStatus: 'FREE'
                });
            }

            // Check Lunar Holidays
            const lKey = `${day}-${month}`;
            if (lunarHolidays[lKey]) {
                events.push({
                    start: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
                    duration: { days: 1 },
                    title: lunarHolidays[lKey].name,
                    description: lunarHolidays[lKey].meaning,
                    categories: ['Holiday', 'Lunar'],
                    busyStatus: 'FREE'
                });
            }
        }
    }

    // 2. ADD USER EVENTS
    if (Array.isArray(userEvents)) {
        userEvents.forEach((ev: any) => {
            if (!ev.date) return;

            // Safer Date Parsing: "YYYY-MM-DD" -> [YYYY, MM, DD]
            const parts = ev.date ? ev.date.split('-') : [];
            if (parts.length === 3) {
                const y = parseInt(parts[0], 10);
                const m = parseInt(parts[1], 10);
                const d = parseInt(parts[2], 10);

                if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
                    const icsEvent: EventAttributes = {
                        start: [y, m, d],
                        duration: { hours: 1 },
                        title: ev.title || "Untitled Event",
                        description: ev.description || '',
                        categories: ['User Event', ev.calendarType || 'solar'],
                        busyStatus: 'BUSY'
                    }

                    // Recurrence
                    if (ev.recurrence === 'monthly') {
                        icsEvent.recurrenceRule = 'FREQ=MONTHLY';
                    } else if (ev.recurrence === 'yearly') {
                        icsEvent.recurrenceRule = 'FREQ=YEARLY';
                    } else if (ev.recurrence === 'n_monthly' && ev.recurrenceInterval) {
                        icsEvent.recurrenceRule = `FREQ=MONTHLY;INTERVAL=${ev.recurrenceInterval}`;
                    }

                    events.push(icsEvent);
                }
            }
        });
    }

    // 3. GENERATE MONTHLY SUMMARIES
    // Parse notification settings
    const notifyTimeParts = settings.notifyTime ? settings.notifyTime.split(':').map(Number) : [9, 0];
    const notifyHour = notifyTimeParts[0];
    const notifyMinute = notifyTimeParts[1];

    // We'll generate summaries for the next 12 months
    for (let i = 0; i < 12; i++) {
        const targetMonthDate = new Date(today.getFullYear(), today.getMonth() + i, 1);
        const year = targetMonthDate.getFullYear();
        const month = targetMonthDate.getMonth(); // 0-based

        const notificationDate = new Date(year, month, 1);
        let dayOfMonth = 1;

        if (settings.notifyDay === 'last') {
            dayOfMonth = getLastDayOfMonth(year, month);
        } else {
            dayOfMonth = parseInt(settings.notifyDay) || 1;
            const lastDay = getLastDayOfMonth(year, month);
            if (dayOfMonth > lastDay) dayOfMonth = lastDay;
        }

        // Get next month info
        const nextMonthDate = new Date(year, month + 1, 1);
        const nextMonthYear = nextMonthDate.getFullYear();
        const nextMonthIndex = nextMonthDate.getMonth();

        // Filter events
        const monthEventsLineArray: string[] = [];
        const daysInNextMonth = getLastDayOfMonth(nextMonthYear, nextMonthIndex);

        for (let d = 1; d <= daysInNextMonth; d++) {
            const currentCheckDate = new Date(nextMonthYear, nextMonthIndex, d);
            const currentISO = currentCheckDate.toISOString().split('T')[0];

            const lunarCheck = Solar.fromDate(currentCheckDate).getLunar();
            const lunarDay = lunarCheck.getDay();
            const lunarMonth = lunarCheck.getMonth();

            if (Array.isArray(userEvents)) {
                userEvents.forEach((ev: any) => {
                    let isMatch = false;

                    // Safe parse
                    const parts = ev.date ? ev.date.split('-') : [];
                    if (parts.length !== 3) return;
                    const [evY, evM, evD] = parts.map(Number);

                    if (ev.calendarType === 'solar') {
                        // check recurrence
                        // Note: evM is 1-based, nextMonthIndex is 0-based
                        if (ev.recurrence === 'yearly' && evD === d && evM === (nextMonthIndex + 1)) isMatch = true;
                        if (ev.recurrence === 'monthly' && evD === d) isMatch = true;
                        if ((!ev.recurrence || ev.recurrence === 'none') && ev.date === currentISO) isMatch = true;

                        if (ev.recurrence === 'n_monthly' && ev.recurrenceInterval) {
                            // diff in months
                            const start = new Date(evY, evM - 1, evD);
                            const current = new Date(nextMonthYear, nextMonthIndex, d);
                            const monthsDiff = (current.getFullYear() - start.getFullYear()) * 12 + (current.getMonth() - start.getMonth());
                            if (monthsDiff > 0 && monthsDiff % ev.recurrenceInterval === 0 && start.getDate() === d) {
                                isMatch = true;
                            }
                        }
                    } else {
                        // Lunar match (Simplified)
                        // create Solar from YMD
                        const creationSolar = Solar.fromYmd(evY, evM, evD);
                        const creationLunar = creationSolar.getLunar();

                        if (ev.recurrence === 'yearly' && creationLunar.getDay() === lunarDay && creationLunar.getMonth() === lunarMonth) isMatch = true;
                        if (ev.recurrence === 'monthly' && creationLunar.getDay() === lunarDay) isMatch = true;
                    }

                    if (isMatch) {
                        monthEventsLineArray.push(`- ${d}/${nextMonthIndex + 1} (Solar): ${ev.title}`);
                    }
                });
            }
        }

        if (monthEventsLineArray.length > 0) {
            events.push({
                start: [notificationDate.getFullYear(), notificationDate.getMonth() + 1, dayOfMonth, notifyHour, notifyMinute],
                duration: { minutes: 30 },
                title: `📅 Plan for ${nextMonthIndex + 1}/${nextMonthYear}`,
                description: "Events:\n" + monthEventsLineArray.join('\n'),
                categories: ['Summary', 'Notification'],
            })
        }
    }

    const { error, value } = createEvents(events, {
        calName: calendarName,
        productId: 'woodify-shop/ics'
    })

    if (error) {
        console.error("ICS Gen Error", error);
        return new Response('Error generating calendar', { status: 500 })
    }

    return new Response(value, {
        headers: {
            'Content-Type': 'text/calendar; charset=utf-8',
            'Content-Disposition': `attachment; filename="${calendarName.replace(/\s+/g, '_')}.ics"`,
        },
    })
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const notifyDay = searchParams.get('notifyDay') || 'last';
    const notifyTime = searchParams.get('notifyTime') || '09:00';

    // New Params
    const name = searchParams.get('name') || "Woodify Helper (Holidays Only)";
    const includeLunar = searchParams.get('includeLunar') !== 'false';
    const includeHolidays = searchParams.get('includeHolidays') !== 'false';

    // For GET subscription, we can't access localStorage events.
    // We only create Holidays (integrated into daily events) + Summary Placeholder

    return generateCalendar([], { notifyDay, notifyTime, includeLunar, includeHolidays }, name);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { events = [], settings = {} } = body
        // settings includes: notifyDay, notifyTime, calendarName, includeLunar, includeHolidays

        const calName = settings.calendarName || "Woodify Personal Calendar";

        return generateCalendar(events, settings, calName);
    } catch (e) {
        console.error("Error parsing request", e)
        return new Response("Invalid Request", { status: 400 })
    }
}
