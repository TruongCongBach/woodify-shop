"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/ui/shadcn-ui/button"
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
    notifyDay: z.string(), // "last", "1", "15" etc.
    notifyTime: z.string(), // "09:00"
})

interface NotificationSettingsProps {
    onSettingsChange?: (settings: any) => void
}

export function NotificationSettings({ onSettingsChange }: NotificationSettingsProps) {
    // Try to load initial values from localStorage (client-side only)
    // We'll let the parent handle the actual "source of truth" loading/saving if possible, 
    // or do it here for simplicity. 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            notifyDay: "last",
            notifyTime: "09:00",
        },
    })

    React.useEffect(() => {
        const saved = localStorage.getItem('woodify-calendar-notification-settings')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                form.reset(parsed)
                onSettingsChange?.(parsed)
            } catch (e) {
                console.error("Failed to parse settings", e)
            }
        } else {
            // Initial defaults
            onSettingsChange?.({ notifyDay: "last", notifyTime: "09:00" });
        }
    }, [])

    function onSubmit(values: z.infer<typeof formSchema>) {
        localStorage.setItem('woodify-calendar-notification-settings', JSON.stringify(values))
        onSettingsChange?.(values)
        toast.success("Notification settings saved", {
            description: "These settings will be used when you subscribe to the calendar."
        })
    }

    return (
        <div className="border rounded-lg p-4 bg-card">
            <div className="mb-4">
                <h3 className="font-semibold">Monthly Summary Notification</h3>
                <p className="text-sm text-muted-foreground">Receive a summary of next month's events.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
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

                    <Button type="submit" size="sm" variant="secondary">Save Settings</Button>
                </form>
            </Form>
        </div>
    )
}
