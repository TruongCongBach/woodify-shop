'use client';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { Input } from '@woodify/ui/shadcn-ui/input'
import { Textarea } from '@woodify/ui/shadcn-ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@woodify/ui/shadcn-ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@woodify/ui/shadcn-ui/card'
import { FacebookIcon, MapPin, Phone } from 'lucide-react'

const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  message: z.string().min(1, { message: 'Message is required.' }),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    console.log(values);
    // Handle form submission
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Send Message</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <a href="https://www.facebook.com/noithatmynghegiadinh"
             className="flex items-center space-x-4">
            <FacebookIcon className="w-6 h-6" />
          </a>
          <a href="tel:0347373891" className="flex items-center space-x-4">
            <Phone className="w-6 h-6" />
            <p>034 7373 891</p>
          </a>
          <div className="flex items-center space-x-4">
            <MapPin className="w-6 h-6" />
            <p>Xã Thư Lâm, TP Hà Nội</p>
          </div>
          {/* Bản đồ nhúng */}
          <div className="w-full h-64 bg-gray-200">
            <iframe
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ Nội Thất Gia Đình"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7441.882403599502!2d105.81023698024018!3d21.154738117009583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1752338914733!5m2!1svi!2s"
              width="100%"
              height="100%"
              className="border-0 rounded"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
