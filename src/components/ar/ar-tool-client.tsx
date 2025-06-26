'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Wand2, Lightbulb } from 'lucide-react';

import {
  suggestFurnitureOptions,
  SuggestFurnitureOptionsInput,
  SuggestFurnitureOptionsOutput,
} from '@/ai/flows/suggest-furniture-options';
import {
  reasonAboutFurnitureLayout,
  ReasonAboutFurnitureLayoutInput,
  ReasonAboutFurnitureLayoutOutput,
} from '@/ai/flows/reason-about-furniture-layout';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const suggestionSchema = z.object({
  photo: z.any().refine((files) => files?.length > 0, 'صورة غرفتك مطلوبة.'),
  stylePreferences: z.string().min(3, 'يرجى وصف تفضيلات أسلوبك.'),
  colorSchemes: z.string().min(3, 'يرجى وصف نظام الألوان الخاص بك.'),
});

const layoutSchema = z.object({
  roomDimensions: z.string().min(3, 'أبعاد الغرفة مطلوبة.'),
  selectedFurniture: z.string().min(10, 'يرجى ذكر الأثاث الذي اخترته.'),
  stylePreferences: z.string().optional(),
  photo: z.any().optional(),
});

// Helper to convert file to data URI
const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

export default function ArToolClient() {
  const [suggestionResult, setSuggestionResult] = useState<SuggestFurnitureOptionsOutput | null>(null);
  const [layoutResult, setLayoutResult] = useState<ReasonAboutFurnitureLayoutOutput | null>(null);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [layoutLoading, setLayoutLoading] = useState(false);
  const [suggestionPreview, setSuggestionPreview] = useState<string | null>(null);
  const [layoutPreview, setLayoutPreview] = useState<string | null>(null);

  const suggestionForm = useForm<z.infer<typeof suggestionSchema>>({
    resolver: zodResolver(suggestionSchema),
  });

  const layoutForm = useForm<z.infer<typeof layoutSchema>>({
    resolver: zodResolver(layoutSchema),
  });

  const handleSuggestionSubmit = async (values: z.infer<typeof suggestionSchema>) => {
    setSuggestionLoading(true);
    setSuggestionResult(null);
    try {
      const photoDataUri = await fileToDataUri(values.photo[0]);
      const input: SuggestFurnitureOptionsInput = {
        photoDataUri,
        stylePreferences: values.stylePreferences,
        colorSchemes: values.colorSchemes,
      };
      const result = await suggestFurnitureOptions(input);
      setSuggestionResult(result);
    } catch (error) {
      console.error('Error suggesting furniture:', error);
    } finally {
      setSuggestionLoading(false);
    }
  };

  const handleLayoutSubmit = async (values: z.infer<typeof layoutSchema>) => {
    setLayoutLoading(true);
    setLayoutResult(null);
    try {
        let photoDataUri: string | undefined = undefined;
        if(values.photo && values.photo.length > 0) {
            photoDataUri = await fileToDataUri(values.photo[0]);
        }
      const input: ReasonAboutFurnitureLayoutInput = { ...values, photoDataUri };
      const result = await reasonAboutFurnitureLayout(input);
      setLayoutResult(result);
    } catch (error) {
      console.error('Error reasoning about layout:', error);
    } finally {
      setLayoutLoading(false);
    }
  };

  return (
    <Tabs defaultValue="suggestions" className="w-full">
      <TabsList className="mx-auto grid w-full max-w-lg grid-cols-2">
        <TabsTrigger value="suggestions">اقتراح أثاث</TabsTrigger>
        <TabsTrigger value="layout">تحسين التخطيط</TabsTrigger>
      </TabsList>
      <TabsContent value="suggestions">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">اقتراحات الأثاث</CardTitle>
            <p className="text-muted-foreground">قم بتحميل صورة لغرفتك، ودع الذكاء الاصطناعي يجد لك الأثاث المثالي.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <Form {...suggestionForm}>
                  <form onSubmit={suggestionForm.handleSubmit(handleSuggestionSubmit)} className="space-y-6">
                    <FormField
                      control={suggestionForm.control}
                      name="photo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>صورة الغرفة</FormLabel>
                          <FormControl>
                            <Input type="file" accept="image/*" onChange={(e) => {
                                field.onChange(e.target.files);
                                if (e.target.files && e.target.files[0]) {
                                    setSuggestionPreview(URL.createObjectURL(e.target.files[0]));
                                }
                            }} />
                          </FormControl>
                          <FormMessage />
                          {suggestionPreview && <Image src={suggestionPreview} alt="Room preview" width={200} height={200} className="mt-4 rounded-md object-cover" />}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={suggestionForm.control}
                      name="stylePreferences"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تفضيلات الأسلوب</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: مودرن منتصف القرن، اسكندنافي" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={suggestionForm.control}
                      name="colorSchemes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الألوان المفضلة</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: ألوان ترابية، باستيل، أحادي اللون" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={suggestionLoading} className="w-full">
                      {suggestionLoading ? <Loader2 className="ms-2 h-4 w-4 animate-spin" /> : <Wand2 className="ms-2 h-4 w-4" />}
                      الحصول على اقتراحات
                    </Button>
                  </form>
                </Form>
              </div>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed bg-secondary/30 p-8">
                <AnimatePresence>
                  {suggestionLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                      <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                      <p className="mt-4 font-semibold">جاري تحليل مساحتك...</p>
                    </motion.div>
                  )}
                  {suggestionResult && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full text-start">
                      <h3 className="font-headline text-xl font-bold">اقتراحات الذكاء الاصطناعي</h3>
                      <div className="mt-4 space-y-4 text-sm">
                        <div>
                            <h4 className="font-semibold flex items-center"><Lightbulb className="w-4 h-4 ms-2 text-primary" />السبب</h4>
                            <p className="text-muted-foreground ps-6">{suggestionResult.reasoning}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold flex items-center"><Wand2 className="w-4 h-4 ms-2 text-primary" />الاقتراحات</h4>
                            <p className="text-muted-foreground whitespace-pre-wrap ps-6">{suggestionResult.furnitureSuggestions}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {!suggestionLoading && !suggestionResult && (
                    <div className="text-center text-muted-foreground">
                        <Wand2 className="mx-auto h-12 w-12" />
                        <p className="mt-4 font-semibold">ستظهر اقتراحاتك المدعومة بالذكاء الاصطناعي هنا.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="layout">
      <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">تحسين التخطيط</CardTitle>
            <p className="text-muted-foreground">قدم تفاصيل غرفتك ودع الذكاء الاصطناعي يجد أفضل ترتيب للأثاث.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <Form {...layoutForm}>
                  <form onSubmit={layoutForm.handleSubmit(handleLayoutSubmit)} className="space-y-6">
                    <FormField
                      control={layoutForm.control}
                      name="roomDimensions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>أبعاد الغرفة</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: 12 قدم × 15 قدم مع سقف 8 أقدام" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={layoutForm.control}
                      name="selectedFurniture"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الأثاث المختار وأبعاده</FormLabel>
                          <FormControl>
                            <Textarea placeholder="مثال: أريكة: 7 قدم × 3 قدم، طاولة قهوة: 4 قدم × 2 قدم" className="min-h-[100px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={layoutForm.control}
                      name="stylePreferences"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تفضيلات الأسلوب (اختياري)</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: مفتوح ومتجدد الهواء، مريح، عملي" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={layoutForm.control}
                      name="photo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>صورة الغرفة (اختياري)</FormLabel>
                           <FormDescription>توفير صورة يمكن أن يحسن دقة التخطيط.</FormDescription>
                          <FormControl>
                           <Input type="file" accept="image/*" onChange={(e) => {
                                field.onChange(e.target.files);
                                if (e.target.files && e.target.files[0]) {
                                    setLayoutPreview(URL.createObjectURL(e.target.files[0]));
                                }
                            }} />
                          </FormControl>
                          <FormMessage />
                          {layoutPreview && <Image src={layoutPreview} alt="Room preview" width={200} height={200} className="mt-4 rounded-md object-cover" />}
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={layoutLoading} className="w-full">
                      {layoutLoading ? <Loader2 className="ms-2 h-4 w-4 animate-spin" /> : <Wand2 className="ms-2 h-4 w-4" />}
                      تحسين التخطيط
                    </Button>
                  </form>
                </Form>
              </div>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed bg-secondary/30 p-8">
              <AnimatePresence>
                  {layoutLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                      <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                      <p className="mt-4 font-semibold">جاري تحسين التخطيط الخاص بك...</p>
                    </motion.div>
                  )}
                  {layoutResult && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full text-start">
                      <h3 className="font-headline text-xl font-bold">خطة التخطيط المحسنة</h3>
                       <div className="mt-4 space-y-4 text-sm prose-p:text-muted-foreground prose-p:m-0 prose-strong:text-foreground">
                         <p className="whitespace-pre-wrap">{layoutResult.layoutDescription}</p>
                       </div>
                    </motion.div>
                  )}
                  {!layoutLoading && !layoutResult && (
                    <div className="text-center text-muted-foreground">
                        <Wand2 className="mx-auto h-12 w-12" />
                        <p className="mt-4 font-semibold">سيظهر تخطيط الأثاث الأمثل هنا.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
