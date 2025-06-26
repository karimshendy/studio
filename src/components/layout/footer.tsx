import Link from 'next/link';
import { Sofa, Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Sofa className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold">منزل</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              نصنع منزل أحلامك بأثاث وتصميمات مخصصة.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">استكشف</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/products" className="hover:text-primary">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link href="/ar-designer" className="hover:text-primary">
                  المصمم الذكي
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-primary">
                  اطلب عرض سعر
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">الشركة</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/#about" className="hover:text-primary">
                  عنا
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  وظائف
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">تابعنا</h3>
            <div className="mt-4 flex space-x-4 rtl:space-x-reverse">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} منزل. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
