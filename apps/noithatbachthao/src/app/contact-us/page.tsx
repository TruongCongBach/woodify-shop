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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-6 py-3 bg-blue-600/10 backdrop-blur-sm rounded-full border border-blue-400/20 mb-6">
              <span className="text-blue-700 font-semibold text-sm">📞 Liên Hệ Ngay</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
              Nếu bạn cần tư vấn sản phẩm, báo giá, hoặc có bất kỳ thắc mắc nào,
              hãy để lại thông tin, đội ngũ <strong className="text-blue-700">Nội Thất Bách Thảo</strong> sẽ phản hồi trong thời gian sớm nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Gửi Tin Nhắn Cho Chúng Tôi</h2>
                  <p className="text-gray-600">Chúng tôi sẽ phản hồi trong vòng 24 giờ</p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Họ và Tên</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Nhập họ và tên của bạn" 
                              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              {...field} 
                            />
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
                          <FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Nhập email của bạn" 
                              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              {...field} 
                            />
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
                          <FormLabel className="text-gray-700 font-semibold">Nội dung</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Viết tin nhắn của bạn tại đây..." 
                              className="min-h-32 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12"
                    >
                      Gửi Tin Nhắn
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Thông Tin Liên Hệ</h2>
                  <p className="text-gray-600 mb-6">
                    Bạn có thể kết nối trực tiếp với chúng tôi qua số điện thoại,
                    fanpage hoặc ghé thăm xưởng sản xuất để xem sản phẩm thực tế.
                  </p>

                  <div className="space-y-4">
                    <a
                      href="https://www.facebook.com/noithatmynghegiadinh"
                      className="flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:bg-blue-200 transition-colors">
                        <FacebookIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Facebook Fanpage</p>
                        <p className="text-gray-600 text-sm">Nội Thất Bách Thảo</p>
                      </div>
                    </a>

                    <a 
                      href="tel:0347373891" 
                      className="flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
                    >
                      <div className="bg-green-100 p-3 rounded-full mr-4 group-hover:bg-green-200 transition-colors">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Số Điện Thoại</p>
                        <p className="text-gray-600 text-sm">0347 373 891</p>
                      </div>
                    </a>

                    <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200">
                      <div className="bg-red-100 p-3 rounded-full mr-4">
                        <MapPin className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Địa Chỉ</p>
                        <p className="text-gray-600 text-sm">Xã Thư Lâm, TP Hà Nội</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">Vị Trí Trên Bản Đồ</h3>
                    <p className="text-gray-600 text-sm mt-1">Ghé thăm showroom của chúng tôi</p>
                  </div>
                  <div className="h-80 bg-gray-200">
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
          </div>
        </div>
      </section>
    </div>
  );
}
