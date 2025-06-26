
'use client';

import ProductList from '@/components/products/product-list';
import { products } from '@/lib/data';
import { useLanguage } from '@/context/language-context';

export default function ProductsPage() {
  const { dictionary: t } = useLanguage();
  return (
    <div className="container mx-auto py-12">
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold">{t.productsPage.title}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
          {t.productsPage.description}
        </p>
      </div>
      <div className="mt-12">
        <ProductList products={products} />
      </div>
    </div>
  );
}
