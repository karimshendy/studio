
'use client';

import { useState } from 'react';
import type { Product, ProductCategory } from '@/types';
import ProductCard from './product-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/language-context';

interface ProductListProps {
  products: Product[];
}

const categoriesAr: ['الكل', ...ProductCategory[]] = [
  'الكل',
  'أثاث',
  'مطابخ',
  'غرف ملابس',
];

const categoriesEn: string[] = [
  'All',
  'Furniture',
  'Kitchens',
  'Wardrobes',
];

const categoryMap: Record<string, ProductCategory | 'الكل'> = {
  'All': 'الكل',
  'Furniture': 'أثاث',
  'Kitchens': 'مطابخ',
  'Wardrobes': 'غرف ملابس',
  'الكل': 'الكل',
  'أثاث': 'أثاث',
  'مطابخ': 'مطابخ',
  'غرف ملابس': 'غرف ملابس',
};


export default function ProductList({ products }: ProductListProps) {
  const { dictionary: t, language } = useLanguage();
  const categories = language === 'ar' ? categoriesAr : categoriesEn;
  const [activeTab, setActiveTab] = useState<string>(categories[0]);

  const filteredProducts =
    categoryMap[activeTab] === 'الكل'
      ? products
      : products.filter((product) => product.category === categoryMap[activeTab]);

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
            <h3 className="font-headline text-2xl">{t.productList.noProductsFound}</h3>
            <p className="text-muted-foreground">{t.productList.tryAnotherCategory}</p>
          </div>
        )}
    </Tabs>
  );
}
