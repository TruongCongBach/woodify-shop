"use client"

import * as React from "react"
import { CalendarView } from "@/components/schedule-calendar/CalendarView"
import { EventForm } from "@/components/schedule-calendar/EventForm"
import { CalendarSettings } from "@/components/schedule-calendar/CalendarSettings"
import { Button } from "@/ui/shadcn-ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/shadcn-ui/card"
import { Download } from "lucide-react"
import { cn } from "@/ui/lib/utils"
import { toast } from "sonner"

interface CalendarEvent {
    id: string
    title: string
    description?: string
    date: string // ISO date string YYYY-MM-DD
    calendarType: 'solar' | 'lunar'
    recurrence: 'none' | 'monthly' | 'yearly' | 'n_monthly'
    recurrenceInterval?: number
}

export default function ScheduleCalendarPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [events, setEvents] = React.useState<Record<string, CalendarEvent[]>>({})
    const [settings, setSettings] = React.useState<any>({
        calendarName: "My Schedule",
        includeLunar: true,
        includeHolidays: true,
        notifyDay: 'last',
        notifyTime: '09:00'
    })
    const [isDownloading, setIsDownloading] = React.useState(false)
    const [editingEvent, setEditingEvent] = React.useState<CalendarEvent | null>(null)

    // Load events from localStorage on mount
    React.useEffect(() => {
        const savedEvents = localStorage.getItem('woodify-calendar-events')
        if (savedEvents) {
            setEvents(JSON.parse(savedEvents))
        }
    }, [])

    // Save events to localStorage whenever they change
    React.useEffect(() => {
        localStorage.setItem('woodify-calendar-events', JSON.stringify(events))
    }, [events])

    const handleAddOrUpdateEvent = (data: any) => {
        if (!date) return

        const dateKey = date.toISOString().split('T')[0]

        if (editingEvent) {
            // Update logic
            // 1. Remove old event (it might be on a different date)
            setEvents(prev => {
                const newEvents = { ...prev };
                // Remove from old date
                if (newEvents[editingEvent.date]) {
                    newEvents[editingEvent.date] = newEvents[editingEvent.date].filter(e => e.id !== editingEvent.id);
                    if (newEvents[editingEvent.date].length === 0) delete newEvents[editingEvent.date];
                }

                // 2. Add as new event to CURRENT selected date
                const updatedEvent: CalendarEvent = {
                    ...editingEvent,
                    ...data,
                    date: dateKey // Move to currently selected date
                };

                const targetList = newEvents[dateKey] || [];
                newEvents[dateKey] = [...targetList, updatedEvent];

                return newEvents;
            });
            setEditingEvent(null);
        } else {
            // Add logic
            const newEvent: CalendarEvent = {
                id: Math.random().toString(36).substr(2, 9),
                date: dateKey,
                ...data,
            }

            setEvents(prev => {
                const currentDayEvents = prev[dateKey] || []
                return {
                    ...prev,
                    [dateKey]: [...currentDayEvents, newEvent]
                }
            })
        }
    }

    const handleEditClick = (event: CalendarEvent) => {
        setEditingEvent(event);
        if (event.date) {
            setDate(new Date(event.date));
        }
    }

    const handleDeleteClick = (event: CalendarEvent) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        setEvents(prev => {
            const newEvents = { ...prev };
            if (newEvents[event.date]) {
                newEvents[event.date] = newEvents[event.date].filter(e => e.id !== event.id);
                if (newEvents[event.date].length === 0) delete newEvents[event.date];
            }
            return newEvents;
        });
        if (editingEvent?.id === event.id) {
            setEditingEvent(null);
        }
    }

    const handleSubscribe = async () => {
        setIsDownloading(true)
        try {
            // Flatten events for API
            const allEvents = Object.values(events).flat();

            const response = await fetch('/api/calendar/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    events: allEvents,
                    settings: settings
                })
            });

            if (!response.ok) throw new Error("Failed to generate calendar");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const safeName = (settings.calendarName || "Woodify_Calendar").replace(/\s+/g, '_');
            a.download = `${safeName}.ics`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (e) {
            console.error(e)
            // Show error toast
        } finally {
            setIsDownloading(false)
        }
    }

    // Flatten and sort all events for display
    const allEventsList = React.useMemo(() => {
        const flat = Object.values(events).flat();
        return flat.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [events]);

    return (
        <div className="container mx-auto py-10 px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex flex-col gap-6 w-full md:w-auto md:min-w-[400px]">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Schedule Calendar</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your schedule with Lunar Calendar support.
                        </p>
                    </div>

                    <CalendarView
                        date={date}
                        setDate={setDate}
                        events={Object.keys(events).reduce((acc, key) => {
                            acc[key] = events[key];
                            return acc;
                        }, {} as Record<string, any[]>)}
                    />

                    <div className="space-y-4">
                        <CalendarSettings onSettingsChange={setSettings} />

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle>Subscription</CardTitle>
                                <CardDescription>
                                    Download or subscribe to your personalized calendar.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        variant="default"
                                        className="w-full"
                                        onClick={handleSubscribe}
                                        disabled={isDownloading}
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        {isDownloading ? "Generating..." : "Download Full Calendar (Personal + System)"}
                                    </Button>

                                    <div className="text-xs text-muted-foreground text-center">
                                        Contains <b>{Object.values(events).flat().length}</b> events +
                                        {settings.includeLunar ? " Lunar Dates " : ""}
                                        {settings.includeLunar && settings.includeHolidays ? "+" : ""}
                                        {settings.includeHolidays ? " Holidays " : ""}
                                    </div>

                                    <div className="relative my-2">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-muted-foreground">OR</span>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => {
                                            const params = new URLSearchParams({
                                                name: settings.calendarName || "Woodify Calendar",
                                                includeLunar: String(settings.includeLunar),
                                                includeHolidays: String(settings.includeHolidays),
                                                notifyDay: settings.notifyDay,
                                                notifyTime: settings.notifyTime
                                            });
                                            const url = `${window.location.origin}/api/calendar/subscribe?${params.toString()}`;
                                            navigator.clipboard.writeText(url);
                                            toast.success("Subscription URL Copied!", {
                                                description: "Paste this into Apple/Google Calendar."
                                            })
                                        }}
                                    >
                                        <span className="mr-2">🔗</span> Copy Subscription URL
                                    </Button>
                                    <div className="text-xs text-muted-foreground text-center">
                                        <b>Includes:</b> {settings.includeLunar ? "Daily Lunar" : ""} {settings.includeHolidays ? "• Holidays" : ""} • Monthly Summaries
                                        <br />
                                        <span className="text-amber-600 font-medium">Note: Private events are NOT in this link.</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="flex-1 w-full max-w-xl">
                    <div className="sticky top-4 space-y-6">
                        {date ? (
                            <EventForm
                                selectedDate={date}
                                onSubmit={handleAddOrUpdateEvent}
                                // @ts-ignore
                                initialData={editingEvent || undefined}
                                isEditing={!!editingEvent}
                                onCancel={() => {
                                    setEditingEvent(null);
                                }}
                            />
                        ) : (
                            <div className="p-4 border rounded-lg bg-card text-center">Select a date to add details</div>
                        )}

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">All Events ({allEventsList.length})</h3>
                            <div className="grid gap-4 max-h-[600px] overflow-y-auto pr-2">
                                {allEventsList.length > 0 ? allEventsList.map((event) => (
                                    <Card key={event.id} className={cn(
                                        "transition-colors",
                                        editingEvent?.id === event.id ? "border-primary ring-1 ring-primary" : ""
                                    )}>
                                        <CardHeader className="pb-2 flex flex-row items-start justify-between gap-4">
                                            <div>
                                                <CardTitle className="text-base">{event.title}</CardTitle>
                                                <CardDescription className="text-xs mt-1">
                                                    {new Date(event.date).toLocaleDateString()} • {event.calendarType === 'lunar' ? 'Lunar' : 'Solar'} • {event.recurrence !== 'none' ? `Repeats ${event.recurrence}` : 'One-time'}
                                                </CardDescription>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" onClick={() => handleEditClick(event)}>Edit</Button>
                                                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDeleteClick(event)}>X</Button>
                                            </div>
                                        </CardHeader>
                                        {event.description && (
                                            <CardContent>
                                                <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                                            </CardContent>
                                        )}
                                    </Card>
                                )) : (
                                    <p className="text-muted-foreground text-sm">No events found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
