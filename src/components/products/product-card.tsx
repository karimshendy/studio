import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, slug, images, category, price } = product;
  const primaryImage = images[0] || { src: 'https://placehold.co/600x400.png', alt: 'Placeholder', aiHint: 'placeholder' };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/products/${slug}`} className="block">
          <div className="relative h-64 w-full">
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              data-ai-hint={primaryImage.aiHint}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <Badge variant="secondary" className="mb-2">{category}</Badge>
        <CardTitle className="font-headline text-2xl">
          <Link href={`/products/${slug}`} className="hover:text-primary">
            {name}
          </Link>
        </CardTitle>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-6 pt-0">
        <div className="text-lg font-semibold">
          {price.type === 'fixed'
            ? `$${price.value?.toFixed(2)}`
            : 'عند الطلب'}
        </div>
        <Link href={`/products/${slug}`} className="flex items-center text-sm font-semibold text-primary hover:underline">
          عرض التفاصيل <ArrowLeft className="ms-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
