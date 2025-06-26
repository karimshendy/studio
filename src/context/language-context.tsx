
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import ar from '@/dictionaries/ar.json';
import en from '@/dictionaries/en.json';

type Language = 'ar' | 'en';

type Dictionary = typeof ar;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  dictionary: Dictionary;
}

const dictionaries: Record<Language, Dictionary> = { ar, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const dictionary = dictionaries[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
