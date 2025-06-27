'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { products } from '@/lib/data';
import type { Product } from '@/types';
import ProductImageGallery from '@/components/products/product-image-gallery';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/language-context';
import Image from 'next/image';
import { Camera, X } from 'lucide-react';
import CameraCaptureDialog from '@/components/camera-capture-dialog';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const { dictionary: t } = useLanguage();
  const T = t.productDetailsPage;
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const slug = params.slug as string;
  
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const availableMaterials = React.useMemo(() => product.details.materials.split(',').map(s => s.trim()), [product.details.materials]);

  const [selectedMaterial, setSelectedMaterial] = useState<string>(availableMaterials[0]);
  const [customDimensions, setCustomDimensions] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [roomImageDataUri, setRoomImageDataUri] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const isConfigurable = product.details.dimensions.includes('قابل للتكوين') || product.details.dimensions.toLowerCase().includes('configurable');

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        try {
            const dataUri = await fileToDataUri(e.target.files[0]);
            setRoomImageDataUri(dataUri);
        } catch (error) {
            console.error('Error converting file to data URI:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not process the image.' });
        }
    }
  };

  const handleGetQuote = async () => {
    if (roomImageDataUri) {
        sessionStorage.setItem('roomImageForQuote', roomImageDataUri);
    } else {
      sessionStorage.removeItem('roomImageForQuote');
    }

    const query = new URLSearchParams();
    query.set('product', product.name);
    query.set('material', selectedMaterial);
    
    if (isConfigurable && customDimensions) {
      query.set('dimensions', customDimensions);
    } else if (!isConfigurable) {
      query.set('dimensions', product.details.dimensions);
    }

    if (notes) {
      query.set('notes', notes);
    }
    router.push(`/quote?${query.toString()}`);
  }


  return (
    <>
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <ProductImageGallery images={product.images} />
          </div>
          <div>
            <Badge variant="secondary">{product.category}</Badge>
            <h1 className="mt-2 font-headline text-5xl font-bold">
              {product.name}
            </h1>
            <div className="mt-4 text-2xl font-semibold text-primary h-8" />
            <p className="mt-6 text-lg text-muted-foreground">
              {product.description}
            </p>
            <div className="mt-8 rounded-lg border bg-secondary/30 p-6">
              <h3 className="font-headline text-xl font-semibold">
                {T.customizeTitle}
              </h3>
              <div className="mt-4 space-y-6">
                <div>
                  <Label className="font-semibold">{T.materials}</Label>
                  <RadioGroup
                      value={selectedMaterial}
                      onValueChange={setSelectedMaterial}
                      className="mt-2 space-y-1"
                    >
                      {availableMaterials.map((material) => (
                        <div key={material} className="flex items-center space-x-2 rtl:space-x-reverse">
                          <RadioGroupItem value={material} id={`${product.id}-${material}`} />
                          <Label htmlFor={`${product.id}-${material}`} className="cursor-pointer font-normal">{material}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                </div>

                <div>
                  <Label className="font-semibold">{T.dimensions}</Label>
                  {isConfigurable ? (
                    <Input 
                        className="mt-2"
                        placeholder={T.dimensionsPlaceholder}
                        value={customDimensions}
                        onChange={(e) => setCustomDimensions(e.target.value)}
                      />
                  ) : (
                    <p className="mt-2 text-muted-foreground">{product.details.dimensions}</p>
                  )}
                </div>
                
                <div>
                  <Label className="font-semibold">{T.uploadRoomImage}</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      id="room-image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="flex-grow"
                    />
                    <Button type="button" variant="outline" onClick={() => setIsCameraOpen(true)}>
                      <Camera className="h-4 w-4 me-2" />
                      {T.cameraButton}
                    </Button>
                  </div>
                  {roomImageDataUri && (
                      <div className="mt-4 relative w-40 h-40">
                          <Image src={roomImageDataUri} alt="معاينة صورة الغرفة" fill className="rounded-md object-cover border"/>
                          <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 rtl:right-auto rtl:left-1 h-6 w-6 z-10"
                              onClick={() => setRoomImageDataUri(null)}
                              aria-label="Remove image"
                          >
                              <X className="h-4 w-4"/>
                          </Button>
                      </div>
                  )}
                </div>


                <div>
                    <Label htmlFor="notes" className="font-semibold">{T.notesTitle}</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={T.notesPlaceholder}
                      className="mt-2"
                    />
                  </div>

              </div>
            </div>
            <Button onClick={handleGetQuote} size="lg" className="mt-8 w-full md:w-auto">
              {T.getFreeQuote}
            </Button>
          </div>
        </div>
      </div>
      <CameraCaptureDialog 
          open={isCameraOpen}
          onOpenChange={setIsCameraOpen}
          onCapture={(dataUri) => {
              setRoomImageDataUri(dataUri);
              setIsCameraOpen(false);
          }}
      />
    </>
  );
}
