
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function AddProductDialog() {
  const { dictionary: t } = useLanguage();
  const T = t.addProductDialog;

  const productSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    category: z.enum(['أثاث', 'مطابخ', 'غرف ملابس'], {required_error: "Please select a category"}),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    materials: z.string().min(3, 'Materials are required'),
    dimensions: z.string().min(3, 'Dimensions are required'),
    colors: z.string().min(3, 'Please list at least one color'),
    price: z.coerce.number().positive('Price must be a positive number').optional(),
  });

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      materials: "",
      dimensions: "",
      colors: "",
    }
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setIsSubmitting(true);
    console.log('New Product Data:', values);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: T.successTitle,
      description: T.successDescription,
    });
    setIsSubmitting(false);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          {t.adminPage.addProduct}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{T.title}</DialogTitle>
          <DialogDescription>{T.description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{T.form.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={T.form.namePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{T.form.category}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={T.form.categoryPlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="أثاث">أثاث</SelectItem>
                      <SelectItem value="مطابخ">مطابخ</SelectItem>
                      <SelectItem value="غرف ملابس">غرف ملابس</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{T.form.description}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={T.form.descriptionPlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="materials"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{T.form.materials}</FormLabel>
                    <FormControl>
                        <Input placeholder={T.form.materialsPlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="dimensions"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{T.form.dimensions}</FormLabel>
                    <FormControl>
                        <Input placeholder={T.form.dimensionsPlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{T.form.colors}</FormLabel>
                  <FormControl>
                    <Input placeholder={T.form.colorsPlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{T.form.price}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={T.form.pricePlaceholder} {...field} onChange={event => field.onChange(event.target.value === '' ? undefined : +event.target.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">{T.form.cancel}</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="animate-spin" />}
                    {isSubmitting ? T.form.saving : T.form.save}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
