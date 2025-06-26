'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const quoteFormSchema = z.object({
  name: z.string().min(2, 'يجب أن يتكون الاسم من حرفين على الأقل.'),
  phone: z.string().min(10, 'يرجى إدخال رقم هاتف صالح.'),
  city: z.string().min(2, 'المدينة مطلوبة.'),
  measurements: z.string().optional(),
  projectDetails: z.string().min(20, 'يرجى تقديم بعض التفاصيل حول مشروعك.'),
  images: z.any().optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export default function QuoteForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      city: '',
      measurements: '',
      projectDetails: '',
    },
  });

  async function onSubmit(data: QuoteFormValues) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitting(false);
    toast({
      title: 'تم إرسال طلب عرض السعر بنجاح!',
      description: 'شكرًا لك! لقد تلقينا طلبك وسنتواصل معك قريبًا.',
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>الاسم الكامل</FormLabel>
                <FormControl>
                    <Input placeholder="فلان الفلاني" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                    <Input placeholder="XXX-XXX-XXXX" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
                <FormItem>
                <FormLabel>المدينة</FormLabel>
                <FormControl>
                    <Input placeholder="الرياض" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="measurements"
            render={({ field }) => (
                <FormItem>
                <FormLabel>قياسات المساحة (اختياري)</FormLabel>
                <FormControl>
                    <Input placeholder="مثال: غرفة المعيشة: 15 قدم × 20 قدم" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="projectDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تفاصيل المشروع</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="صف مشروعك وتفضيلات الأسلوب وأي عناصر محددة تهتم بها."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تحميل الصور (اختياري)</FormLabel>
              <FormControl>
                <Input type="file" multiple {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="ms-2 h-4 w-4 animate-spin" />}
            احصل على عرض سعر مجاني
        </Button>
      </form>
    </Form>
  );
}
