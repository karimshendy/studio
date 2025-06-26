import ProductList from '@/components/products/product-list';
import { products } from '@/lib/data';

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold">مجموعتنا</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
          اكتشف مجموعتنا المختارة من الأثاث والحلول المخصصة. كل قطعة مصممة بشغف ومصنوعة بإتقان، جاهزة لتحويل رؤيتك إلى حقيقة.
        </p>
      </div>
      <div className="mt-12">
        <ProductList products={products} />
      </div>
    </div>
  );
}
