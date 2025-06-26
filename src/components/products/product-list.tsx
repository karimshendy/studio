'use client';

import { useState } from 'react';
import type { Product, ProductCategory } from '@/types';
import ProductCard from './product-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductListProps {
  products: Product[];
}

const categories: ['الكل', ...ProductCategory[]] = [
  'الكل',
  'أثاث',
  'مطابخ',
  'غرف ملابس',
];

export default function ProductList({ products }: ProductListProps) {
  const [activeTab, setActiveTab] = useState<string>('الكل');

  const filteredProducts =
    activeTab === 'الكل'
      ? products
      : products.filter((product) => product.category === activeTab);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mx-auto mb-10 grid h-auto w-full max-w-lg grid-cols-2 md:grid-cols-4">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category} className="py-2">
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
       {filteredProducts.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <h3 className="font-headline text-2xl">لم يتم العثور على منتجات</h3>
            <p className="text-muted-foreground">حاول تحديد فئة أخرى.</p>
          </div>
        )}
    </Tabs>
  );
}
