'use client';

import Link from 'next/link';
import { Paintbrush, Twitter, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function Footer() {
  const { dictionary: t } = useLanguage();

  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Paintbrush className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold">{t.footer.title}</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              {t.footer.description}
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">{t.footer.explore}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/products" className="hover:text-primary">
                  {t.footer.products}
                </Link>
              </li>
              <li>
                <Link href="/ar-designer" className="hover:text-primary">
                  {t.footer.arDesigner}
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-primary">
                  {t.footer.getQuote}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">{t.footer.company}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/#about" className="hover:text-primary">
                  {t.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  {t.footer.careers}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  {t.footer.contactUs}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">{t.footer.followUs}</h3>
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
          <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
