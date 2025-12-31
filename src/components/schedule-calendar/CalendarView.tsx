"use client"

import * as React from "react"
import { Calendar } from "@/ui/shadcn-ui/calendar"
import { getLunarDateString } from "@/lib/lunar-utils"
import { cn } from "@/ui/lib/utils"
// import { DayContent, DayContentProps } from "react-day-picker"

interface CalendarViewProps {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
    events?: Record<string, any[]> // fast lookup for dates with events
}

export function CalendarView({ date, setDate, events = {} }: CalendarViewProps) {

    const renderDay = (props: any) => {
        const { date: dayDate, displayMonth } = props;
        const lunarString = getLunarDateString(dayDate);

        // Check if there are events for this day
        const dateKey = dayDate.toISOString().split('T')[0];
        const hasEvents = events[dateKey] && events[dateKey].length > 0;

        return (
            <div className="flex flex-col items-center justify-center h-full w-full py-1">
                <span className="text-sm font-medium">{dayDate.getDate()}</span>
                <span className="text-[10px] opacity-70 leading-none mt-0.5">{lunarString}</span>
                {hasEvents && (
                    <span className="mt-1 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                )}
            </div>
        );
    };

    return (
        <div className="p-4 border rounded-lg bg-card shadow-sm w-full overflow-hidden">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                captionLayout="dropdown"
                fromYear={1900}
                toYear={2100}
                className="w-full"
                classNames={{
                    months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                    month: "space-y-4 w-full flex flex-col",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "w-full text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: cn(
                        "w-full p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[selected]:bg-zinc-700 data-[selected]:text-white",
                        // Force rounded corners for individual days to look nicer
                        "rounded-md"
                    ),
                    day_selected: "bg-zinc-700 text-white hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white", // Explicit dark gray for selected
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                }}
                // @ts-ignore - DayContent type bypass
                components={{
                    DayContent: renderDay
                } as any}
            />
        </div>
    )
}
