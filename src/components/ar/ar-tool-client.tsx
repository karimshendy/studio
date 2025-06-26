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
  photo: z.any().refine((files) => files?.length > 0, 'A photo of your room is required.'),
  stylePreferences: z.string().min(3, 'Please describe your style preference.'),
  colorSchemes: z.string().min(3, 'Please describe your color scheme.'),
});

const layoutSchema = z.object({
  roomDimensions: z.string().min(3, 'Room dimensions are required.'),
  selectedFurniture: z.string().min(10, 'Please list the furniture you have selected.'),
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
        <TabsTrigger value="suggestions">Suggest Furniture</TabsTrigger>
        <TabsTrigger value="layout">Optimize Layout</TabsTrigger>
      </TabsList>
      <TabsContent value="suggestions">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Furniture Suggestions</CardTitle>
            <p className="text-muted-foreground">Upload a photo of your room, and let our AI find the perfect furniture for you.</p>
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
                          <FormLabel>Room Photo</FormLabel>
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
                          <FormLabel>Style Preferences</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Mid-century Modern, Scandinavian" {...field} />
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
                          <FormLabel>Preferred Color Schemes</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Earth tones, pastels, monochrome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={suggestionLoading} className="w-full">
                      {suggestionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                      Get Suggestions
                    </Button>
                  </form>
                </Form>
              </div>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed bg-secondary/30 p-8">
                <AnimatePresence>
                  {suggestionLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                      <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                      <p className="mt-4 font-semibold">Analyzing your space...</p>
                    </motion.div>
                  )}
                  {suggestionResult && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full text-left">
                      <h3 className="font-headline text-xl font-bold">AI Suggestions</h3>
                      <div className="mt-4 space-y-4 text-sm">
                        <div>
                            <h4 className="font-semibold flex items-center"><Lightbulb className="w-4 h-4 mr-2 text-primary" />Reasoning</h4>
                            <p className="text-muted-foreground pl-6">{suggestionResult.reasoning}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold flex items-center"><Wand2 className="w-4 h-4 mr-2 text-primary" />Suggestions</h4>
                            <p className="text-muted-foreground whitespace-pre-wrap pl-6">{suggestionResult.furnitureSuggestions}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {!suggestionLoading && !suggestionResult && (
                    <div className="text-center text-muted-foreground">
                        <Wand2 className="mx-auto h-12 w-12" />
                        <p className="mt-4 font-semibold">Your AI-powered suggestions will appear here.</p>
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
            <CardTitle className="font-headline text-2xl">Layout Optimization</CardTitle>
            <p className="text-muted-foreground">Provide your room details and let our AI find the best furniture arrangement.</p>
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
                          <FormLabel>Room Dimensions</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 12ft x 15ft with 8ft ceiling" {...field} />
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
                          <FormLabel>Selected Furniture & Dimensions</FormLabel>
                          <FormControl>
                            <Textarea placeholder="e.g., Sofa: 7ft x 3ft, Coffee Table: 4ft x 2ft" className="min-h-[100px]" {...field} />
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
                          <FormLabel>Style Preferences (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Open and airy, cozy, functional" {...field} />
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
                          <FormLabel>Room Photo (Optional)</FormLabel>
                           <FormDescription>Providing a photo can improve layout accuracy.</FormDescription>
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
                      {layoutLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                      Optimize Layout
                    </Button>
                  </form>
                </Form>
              </div>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed bg-secondary/30 p-8">
              <AnimatePresence>
                  {layoutLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                      <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                      <p className="mt-4 font-semibold">Optimizing your layout...</p>
                    </motion.div>
                  )}
                  {layoutResult && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full text-left">
                      <h3 className="font-headline text-xl font-bold">Optimized Layout Plan</h3>
                       <div className="mt-4 space-y-4 text-sm prose-p:text-muted-foreground prose-p:m-0 prose-strong:text-foreground">
                         <p className="whitespace-pre-wrap">{layoutResult.layoutDescription}</p>
                       </div>
                    </motion.div>
                  )}
                  {!layoutLoading && !layoutResult && (
                    <div className="text-center text-muted-foreground">
                        <Wand2 className="mx-auto h-12 w-12" />
                        <p className="mt-4 font-semibold">Your optimal furniture layout will appear here.</p>
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
