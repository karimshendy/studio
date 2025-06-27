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
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/language-context';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function QuoteForm() {
    const { dictionary: t, language } = useLanguage();
    const T = t.quoteForm;
    const searchParams = useSearchParams();

    const quoteFormSchema = z.object({
        name: z.string().min(2, T.errors.name),
        phone: z.string().min(10, T.errors.phone),
        city: z.string().min(2, T.errors.city),
        measurements: z.string().optional(),
        projectDetails: z.string().min(10, T.errors.details),
        images: z.any().optional(),
      });
      
    type QuoteFormValues = z.infer<typeof quoteFormSchema>;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [roomImagePreview, setRoomImagePreview] = useState<string | null>(null);
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

  useEffect(() => {
    const roomImageDataUri = sessionStorage.getItem('roomImageForQuote');
    if (roomImageDataUri) {
      setRoomImagePreview(roomImageDataUri);
    }

    const productName = searchParams.get('product');
    const material = searchParams.get('material');
    const dimensions = searchParams.get('dimensions');
    const notes = searchParams.get('notes');

    if (productName) {
      const detailsAr = [
        `طلب عرض تكلفة للمنتج: ${productName}`,
        material && `المادة: ${material}`,
        notes && `ملاحظات العميل: ${notes}`,
      ].filter(Boolean).join('\n') + '\n\n';

      const detailsEn = [
        `Quote request for product: ${productName}`,
        material && `Material: ${material}`,
        notes && `Customer notes: ${notes}`,
      ].filter(Boolean).join('\n') + '\n\n';
      
      const currentDetails = form.getValues('projectDetails');
      form.setValue('projectDetails', (language === 'ar' ? detailsAr : detailsEn) + currentDetails);
    }
    
    if (dimensions) {
        form.setValue('measurements', dimensions);
    }
  }, [searchParams, form, language]);


  async function onSubmit(data: QuoteFormValues) {
    setIsSubmitting(true);
    
    const roomImageDataUri = sessionStorage.getItem('roomImageForQuote');
    const submissionData = {
      ...data,
      roomImageFromProductPage: roomImageDataUri,
    };
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(submissionData);
    setIsSubmitting(false);
    toast({
      title: T.successTitle,
      description: T.successDescription,
    });
    form.reset();
    sessionStorage.removeItem('roomImageForQuote');
    setRoomImagePreview(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {roomImagePreview && (
            <div className="space-y-2">
                <Label>صورة الغرفة من صفحة المنتج:</Label>
                <div className="relative h-48 w-48 rounded-md border">
                    <Image src={roomImagePreview} alt="معاينة صورة الغرفة" layout="fill" objectFit="cover" className="rounded-md" />
                </div>
            </div>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{T.fullName}</FormLabel>
                <FormControl>
                    <Input placeholder={T.namePlaceholder} {...field} />
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
                <FormLabel>{T.phone}</FormLabel>
                <FormControl>
                    <Input placeholder={T.phonePlaceholder} {...field} />
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
                <FormLabel>{T.city}</FormLabel>
                <FormControl>
                    <Input placeholder={T.cityPlaceholder} {...field} />
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
                <FormLabel>{T.measurements}</FormLabel>
                <FormControl>
                    <Input placeholder={T.measurementsPlaceholder} {...field} />
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
              <FormLabel>{T.projectDetails}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={T.detailsPlaceholder}
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
          render={({ field: { onChange, onBlur, name, ref } }) => (
            <FormItem>
              <FormLabel>{T.uploadImages}</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => onChange(e.target.files)}
                  onBlur={onBlur}
                  name={name}
                  ref={ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="ms-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? T.submitting : T.getFreeQuote}
        </Button>
      </form>
    </Form>
  );
}
