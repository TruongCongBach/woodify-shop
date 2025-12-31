"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/ui/shadcn-ui/button"
import { Checkbox } from "@/ui/shadcn-ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/ui/shadcn-ui/form"
import { Input } from "@/ui/shadcn-ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/ui/shadcn-ui/select"
import { toast } from "sonner"

const formSchema = z.object({
    calendarName: z.string().min(1, "Calendar name is required"),
    includeLunar: z.boolean(),
    includeHolidays: z.boolean(),
    notifyDay: z.string(),
    notifyTime: z.string(),
})

export type CalendarSettingsType = z.infer<typeof formSchema>

interface CalendarSettingsProps {
    onSettingsChange?: (settings: CalendarSettingsType) => void
}

export function CalendarSettings({ onSettingsChange }: CalendarSettingsProps) {
    const form = useForm<CalendarSettingsType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            calendarName: "My Schedule",
            includeLunar: true,
            includeHolidays: true,
            notifyDay: "last",
            notifyTime: "09:00",
        },
    })

    React.useEffect(() => {
        const saved = localStorage.getItem('woodify-calendar-settings')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                // merge defaults in case of new fields
                const merged = {
                    calendarName: "My Schedule",
                    includeLunar: true,
                    includeHolidays: true,
                    notifyDay: "last",
                    notifyTime: "09:00",
                    ...parsed
                };
                form.reset(merged)
                onSettingsChange?.(merged)
            } catch (e) {
                console.error("Failed to parse settings", e)
            }
        } else {
            // Initial defaults
            onSettingsChange?.({
                calendarName: "My Schedule",
                includeLunar: true,
                includeHolidays: true,
                notifyDay: "last",
                notifyTime: "09:00"
            });
        }
    }, [])

    function onSubmit(values: CalendarSettingsType) {
        localStorage.setItem('woodify-calendar-settings', JSON.stringify(values))
        onSettingsChange?.(values)
        toast.success("Settings saved", {
            description: "Your subscription link and download will use these preferences."
        })
    }

    return (
        <div className="border rounded-lg p-4 bg-card">
            <div className="mb-4">
                <h3 className="font-semibold">Subscription Settings</h3>
                <p className="text-sm text-muted-foreground">Customize your calendar content.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="calendarName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Calendar Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. My Schedule" {...field} />
                                </FormControl>
                                <FormDescription>Name used for the calendar file.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-row space-x-4">
                        <FormField
                            control={form.control}
                            name="includeLunar"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-2 border rounded-md">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                        Lunar Dates
                                    </FormLabel>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="includeHolidays"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-2 border rounded-md">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                        Holidays
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="border-t pt-4 mt-2">
                        <LabelHeader>Monthly Summary Notification</LabelHeader>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <FormField
                                control={form.control}
                                name="notifyDay"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Day of Month</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select day" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="last">Last Day of Month</SelectItem>
                                                <SelectItem value="1">1st of Month</SelectItem>
                                                <SelectItem value="15">15th of Month</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="notifyTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Time</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit" size="sm" variant="secondary">Save Configuration</Button>
                </form>
            </Form>
        </div>
    )
}

function LabelHeader({ children }: { children: React.ReactNode }) {
    return <h4 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{children}</h4>
}
