
'use client';

import Link from 'next/link';
import { Menu, X, Sofa } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './language-switcher';
import { useLanguage } from '@/context/language-context';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dictionary: t, language } = useLanguage();

  const navLinks = [
    { href: '/', label: t.header.home },
    { href: '/products', label: t.header.products },
    { href: '/ar-designer', label: t.header.arDesigner },
    { href: '/admin', label: t.header.admin },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className={cn("me-4 flex", language === 'en' && 'mr-4')}>
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Sofa className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold">{t.header.title}</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 rtl:space-x-reverse">
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
           <div className="flex items-center gap-2">
            <div className="hidden md:flex">
              <Button asChild>
                <Link href="/quote">{t.header.getQuote}</Link>
              </Button>
            </div>
            <LanguageSwitcher />
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container absolute w-full bg-background pb-4 shadow-lg md:hidden">
          <nav className="flex flex-col space-y-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-4" onClick={() => setIsMenuOpen(false)}>
              <Link href="/quote">{t.header.getQuote}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
