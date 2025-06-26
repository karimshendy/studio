
'use client';

import ArToolClient from "@/components/ar/ar-tool-client";
import { useLanguage } from "@/context/language-context";

export default function ArDesignerPage() {
  const { dictionary: t } = useLanguage();
  return (
    <div className="container mx-auto py-12">
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold">{t.arDesignerPage.title}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
          {t.arDesignerPage.description}
        </p>
      </div>
      <div className="mt-12">
        <ArToolClient />
      </div>
    </div>
  );
}
