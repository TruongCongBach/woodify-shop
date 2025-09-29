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
  name: z.string().min(1, { message: 'Vui lòng nhập tên.' }),
  email: z.string().email({ message: 'Email không hợp lệ.' }),
  message: z.string().min(1, { message: 'Vui lòng nhập nội dung.' }),
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
    // TODO: Handle form submission (API call or email service)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
          Nếu bạn cần tư vấn sản phẩm, báo giá, hoặc có bất kỳ thắc mắc nào,
          hãy để lại thông tin, đội ngũ <strong>Nội Thất Bách Thảo </strong>
          sẽ phản hồi trong thời gian sớm nhất.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Gửi Tin Nhắn Cho Chúng Tôi</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và Tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập họ và tên của bạn" {...field} />
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
                        <Input placeholder="Nhập email của bạn" {...field} />
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
                      <FormLabel>Nội dung</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Viết tin nhắn của bạn tại đây..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Gửi Tin Nhắn</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Thông Tin Liên Hệ</h2>
          <p className="text-gray-700">
            Bạn có thể kết nối trực tiếp với chúng tôi qua số điện thoại,
            fanpage hoặc ghé thăm xưởng sản xuất để xem sản phẩm thực tế.
          </p>

          <a
            href="https://www.facebook.com/noithatmynghegiadinh"
            className="flex items-center space-x-4 text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="w-6 h-6" />
            <p>Fanpage: Nội Thất Bách Thảo</p>
          </a>

          <a href="tel:0347373891" className="flex items-center space-x-4">
            <Phone className="w-6 h-6 text-green-600" />
            <p>034 7373 891</p>
          </a>

          <div className="flex items-center space-x-4">
            <MapPin className="w-6 h-6 text-red-500" />
            <p>Xã Thư Lâm, TP Hà Nội</p>
          </div>

          {/* Map */}
          <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow">
            <iframe
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ Nội Thất Bách Thảo"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7441.882403599502!2d105.81023698024018!3d21.154738117009583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1752338914733!5m2!1svi!2s"
              width="100%"
              height="100%"
              className="border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
