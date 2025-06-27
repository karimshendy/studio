'use client';

import { useParams, notFound } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { products } from '@/lib/data';
import type { Product } from '@/types';
import ProductImageGallery from '@/components/products/product-image-gallery';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Check } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function ProductDetailPage() {
  const { dictionary: t } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;
  
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const availableMaterials = React.useMemo(() => product.details.materials.split(',').map(s => s.trim()), [product.details.materials]);

  const [selectedColor, setSelectedColor] = useState<string>(product.details.colors[0]);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(availableMaterials[0]);
  const [customDimensions, setCustomDimensions] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const isConfigurable = product.details.dimensions.includes('قابل للتكوين') || product.details.dimensions.toLowerCase().includes('configurable');

  const getQuoteLink = () => {
    const query = new URLSearchParams();
    query.set('product', product.name);
    query.set('color', selectedColor);
    query.set('material', selectedMaterial);
    
    if (isConfigurable && customDimensions) {
      query.set('dimensions', customDimensions);
    } else if (!isConfigurable) {
      query.set('dimensions', product.details.dimensions);
    }

    if (notes) {
      query.set('notes', notes);
    }
    return `/quote?${query.toString()}`;
  }


  return (
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
          <div className="mt-4 text-2xl font-semibold text-primary">
            {product.price.type === 'fixed'
              ? `$${product.price.value?.toFixed(2)}`
              : t.productDetailsPage.priceOnDemand}
          </div>
          <p className="mt-6 text-lg text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-8 rounded-lg border bg-secondary/30 p-6">
            <h3 className="font-headline text-xl font-semibold">
              {t.productDetailsPage.customizeTitle}
            </h3>
            <div className="mt-4 space-y-6">
              <div>
                <Label className="font-semibold">{t.productDetailsPage.availableColors}</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.details.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? 'default' : 'outline'}
                      onClick={() => setSelectedColor(color)}
                      className="gap-2"
                    >
                      {selectedColor === color && <Check className="h-4 w-4" />}
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="font-semibold">{t.productDetailsPage.materials}</Label>
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
                <Label className="font-semibold">{t.productDetailsPage.dimensions}</Label>
                {isConfigurable ? (
                   <Input 
                      className="mt-2"
                      placeholder={t.productDetailsPage.dimensionsPlaceholder}
                      value={customDimensions}
                      onChange={(e) => setCustomDimensions(e.target.value)}
                    />
                ) : (
                  <p className="mt-2 text-muted-foreground">{product.details.dimensions}</p>
                )}
              </div>
              
               <div>
                  <Label htmlFor="notes" className="font-semibold">{t.productDetailsPage.notesTitle}</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.productDetailsPage.notesPlaceholder}
                    className="mt-2"
                  />
                </div>

            </div>
          </div>
          <Button asChild size="lg" className="mt-8 w-full md:w-auto">
            <Link href={getQuoteLink()}>{t.productDetailsPage.getFreeQuote}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
