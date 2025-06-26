'use client';

import { useState } from 'react';
import type { Product, ProductCategory } from '@/types';
import ProductCard from './product-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductListProps {
  products: Product[];
}

const categories: ['All', ...ProductCategory[]] = [
  'All',
  'Furniture',
  'Kitchens',
  'Dressing Rooms',
];

export default function ProductList({ products }: ProductListProps) {
  const [activeTab, setActiveTab] = useState<string>('All');

  const filteredProducts =
    activeTab === 'All'
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
            <h3 className="font-headline text-2xl">No products found</h3>
            <p className="text-muted-foreground">Try selecting another category.</p>
          </div>
        )}
    </Tabs>
  );
}
