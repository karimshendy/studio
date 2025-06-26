
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-context';

export const metadata: Metadata = {
  title: 'منزل - منزلك، بتصور جديد | Manzel - Your Home, Reimagined',
  description:
    'اكتشف أثاثًا وتصميمات مخصصة مع منزل. استخدم أدواتنا المدعومة بالذكاء الاصطناعي لتتخيل مساحتك المثالية. | Discover custom furniture and designs with Manzel. Use our AI-powered tools to visualize your perfect space.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body text-foreground antialiased'
        )}
      >
        <LanguageProvider>
            <div className="relative flex min-h-dvh flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
