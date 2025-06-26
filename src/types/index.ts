export type ProductCategory = 'أثاث' | 'مطابخ' | 'غرف ملابس';

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  images: {
    src: string;
    alt: string;
    aiHint: string;
  }[];
  description: string;
  details: {
    materials: string;
    dimensions: string;
    colors: string[];
  };
  price: {
    type: 'fixed' | 'on-demand';
    value?: number;
  };
};
