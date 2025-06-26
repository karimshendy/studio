
'use client';

import QuoteForm from '@/components/quote/quote-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';

export default function QuotePage() {
  const { dictionary: t } = useLanguage();
  
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center py-12">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-4xl">{t.quotePage.title}</CardTitle>
          <CardDescription className="text-lg">
            {t.quotePage.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuoteForm />
        </CardContent>
      </Card>
    </div>
  );
}
