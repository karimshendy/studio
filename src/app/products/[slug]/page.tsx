import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/lib/data';
import type { Product } from '@/types';
import ProductImageGallery from '@/components/products/product-image-gallery';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
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
              : 'السعر عند الطلب'}
          </div>
          <p className="mt-6 text-lg text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-8 rounded-lg border bg-secondary/30 p-6">
            <h3 className="font-headline text-xl font-semibold">
              تفاصيل المنتج
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <CheckCircle className="me-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <span>
                  <strong>المواد:</strong> {product.details.materials}
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="me-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <span>
                  <strong>الأبعاد:</strong> {product.details.dimensions}
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="me-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <strong>الألوان المتاحة:</strong>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.details.colors.map((color) => (
                      <Badge key={color} variant="outline">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Button asChild size="lg" className="mt-8 w-full md:w-auto">
            <Link href="/quote">اطلب عرض سعر مجاني</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
