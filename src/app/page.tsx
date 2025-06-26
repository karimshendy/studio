import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Sofa,
  CookingPot,
  Shirt,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products } from '@/lib/data';
import ProductCard from '@/components/products/product-card';

const featuredProducts = products.slice(0, 3);

const categoryIcons = {
  'أثاث': <Sofa className="h-10 w-10 text-primary" />,
  'مطابخ': <CookingPot className="h-10 w-10 text-primary" />,
  'غرف ملابس': <Shirt className="h-10 w-10 text-primary" />,
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[500px] w-full">
        <Image
          src="https://placehold.co/1800x900.png"
          alt="Beautifully designed living room"
          data-ai-hint="living room"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-5xl font-bold md:text-7xl">
            منزل
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            منزلك، بتصور جديد.
          </p>
          <p className="mt-2 max-w-2xl text-base md:text-lg">
            أثاث وتصميم داخلي مخصص يروي قصتك.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/products">
                اكتشف مجموعتنا <ArrowLeft className="ms-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/ar-designer">أداة المصمم الذكي</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-headline text-4xl font-bold">
                نصنع المساحات، نخلق الراحة
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                في منزل، نؤمن بأن المنزل هو أكثر من مجرد مكان للعيش؛ إنه ملاذ يعكس شخصيتك وأسلوبك. مهمتنا هي أن نوفر لك أثاثًا عالي الجودة ومصممًا بشكل جميل وحلول تصميم تحول مساحتك إلى منزل حقيقي.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {Object.entries(categoryIcons).map(([category, icon]) => (
                  <div key={category} className="flex flex-col items-center text-center">
                    {icon}
                    <h3 className="mt-2 font-headline text-xl font-semibold">
                      {category}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-full min-h-[400px] w-full">
              <Image
                src="https://placehold.co/600x700.png"
                alt="Close-up of a wooden furniture detail"
                data-ai-hint="wood furniture"
                width={600}
                height={700}
                className="h-full w-full rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto text-center">
          <h2 className="font-headline text-4xl font-bold">
            منتجات مميزة
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
            تصاميم مختارة بعناية تمزج بين الأناقة الخالدة والوظائف العصرية.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Button asChild size="lg" className="mt-12">
            <Link href="/products">
              عرض كل المنتجات <ArrowLeft className="ms-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto">
          <Card className="overflow-hidden bg-primary/90 text-primary-foreground shadow-2xl">
            <div className="grid grid-cols-1 items-center md:grid-cols-2">
              <div className="p-12">
                <h2 className="font-headline text-4xl font-bold">
                  تخيل غرفة أحلامك
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/80">
                  هل تجد صعوبة في تخيل كيف سيبدو أثاثنا في مساحتك؟ تتيح لك أداة الواقع المعزز الثورية والمدعومة بالذكاء الاصطناعي رؤيته قبل الشراء. احصل على اقتراحات، وحسّن التخطيطات، وصمم بثقة.
                </p>
                <Button asChild size="lg" variant="secondary" className="mt-8">
                  <Link href="/ar-designer">
                    جرب المصمم الذكي <ArrowLeft className="ms-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="h-full min-h-[300px] w-full">
                <Image
                  src="https://placehold.co/800x600.png"
                  alt="A tablet showing an augmented reality view of a room with new furniture"
                  data-ai-hint="augmented reality furniture"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
