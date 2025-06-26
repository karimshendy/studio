'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

interface ProductImageGalleryProps {
  images: {
    src: string;
    alt: string;
    aiHint: string;
  }[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="overflow-hidden">
              <CardContent className="relative aspect-square p-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  data-ai-hint={image.aiHint}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
