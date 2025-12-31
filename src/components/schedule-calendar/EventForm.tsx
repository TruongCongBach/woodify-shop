"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

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
import { Textarea } from "@/ui/shadcn-ui/textarea"
import { cn } from "@/ui/lib/utils"
// import { getLunarDateString } from "@/lib/lunar-utils" // Might use later for confirming lunar date

// Define exact schema
const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().optional(),
    calendarType: z.enum(["solar", "lunar"]),
    recurrence: z.enum(["none", "monthly", "n_monthly", "yearly"]),
    recurrenceInterval: z.coerce.number().min(1).default(1),
})

// Explicit type definition to ensure compatibility
interface FormValues {
    title: string;
    description?: string;
    calendarType: "solar" | "lunar";
    recurrence: "none" | "monthly" | "n_monthly" | "yearly";
    recurrenceInterval: number;
}

interface EventFormProps {
    selectedDate: Date
    onSubmit: (data: FormValues) => void
    initialData?: FormValues
    onCancel?: () => void
    isEditing?: boolean
}

export function EventForm({ selectedDate, onSubmit, initialData, onCancel, isEditing = false }: EventFormProps) {
    const form = useForm<FormValues>({
        // @ts-ignore
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            title: "",
            description: "",
            calendarType: "solar",
            recurrence: "none",
            recurrenceInterval: 1
        },
    })

    // Update form values when initialData changes (Edit Mode)
    React.useEffect(() => {
        if (initialData) {
            form.reset(initialData)
        } else {
            form.reset({
                title: "",
                description: "",
                calendarType: "solar",
                recurrence: "none",
                recurrenceInterval: 1
            })
        }
    }, [initialData, form])


    // When date changes, we might want to reset or keep form? 
    // For now let's just keep it simple.
    const recurrenceType = form.watch("recurrence");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data as unknown as FormValues))} className="space-y-6 bg-card p-6 rounded-lg border">
                <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-medium">Add Event for {format(selectedDate, "PPP")}</h3>
                    <p className="text-sm text-muted-foreground">Creates a note for this date.</p>
                </div>

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Grandma's Anniversary" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="calendarType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="solar">Solar (Dương lịch)</SelectItem>
                                        <SelectItem value="lunar">Lunar (Âm lịch)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="recurrence"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Recurrence</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select recurrence" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="none">One-time</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="n_monthly">Every N Months</SelectItem>
                                        <SelectItem value="yearly">Yearly</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {recurrenceType === 'n_monthly' && (
                    <FormField
                        control={form.control}
                        name="recurrenceInterval"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Repeat every (months)</FormLabel>
                                <FormControl>
                                    <Input type="number" min={2} {...field} />
                                </FormControl>
                                <FormDescription>
                                    Example: 2 for every 2 months.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Remember to buy fruits..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Add Event</Button>
            </form>
        </Form>
    )
}
