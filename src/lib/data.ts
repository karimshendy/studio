import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    slug: 'modern-oak-sofa',
    name: 'أريكة حديثة من خشب البلوط',
    category: 'أثاث',
    images: [
      { src: 'https://placehold.co/800x600.png', alt: 'Modern Oak Sofa front view', aiHint: 'modern sofa' },
      { src: 'https://placehold.co/800x600.png', alt: 'Modern Oak Sofa side view', aiHint: 'modern sofa side' },
      { src: 'https://placehold.co/800x600.png', alt: 'Modern Oak Sofa in a living room setting', aiHint: 'sofa livingroom' },
    ],
    description:
      'أريكة أنيقة ومريحة تتميز بإطار من خشب البلوط الصلب ووسائد فخمة بألوان محايدة. تصميمها البسيط يناسب تمامًا أي مساحة معيشة عصرية.',
    details: {
      materials: 'خشب البلوط الصلب, نسيج خليط الكتان',
      dimensions: '84" عرض × 35" عمق × 32" ارتفاع',
    },
    price: {
      type: 'fixed',
      value: 1899.99,
    },
  },
  {
    id: 2,
    slug: 'marble-top-dining-table',
    name: 'طاولة طعام بسطح رخامي',
    category: 'أثاث',
    images: [
      { src: 'https://placehold.co/800x600.png', alt: 'Marble Top Dining Table', aiHint: 'marble table' },
      { src: 'https://placehold.co/800x600.png', alt: 'Marble Top Dining Table detail', aiHint: 'marble texture' },
    ],
    description:
      'طاولة طعام أنيقة تتسع لستة أشخاص بشكل مريح. السطح الرخامي الأصلي يرتكز على قاعدة معدنية متينة، مما يخلق نقطة محورية فاخرة لغرفة الطعام الخاصة بك.',
    details: {
      materials: 'رخام كرارا, فولاذ مطلي بالبودرة',
      dimensions: '72" طول × 36" عرض × 30" ارتفاع',
    },
    price: {
      type: 'fixed',
      value: 2500.0,
    },
  },
  {
    id: 3,
    slug: 'bespoke-shaker-kitchen',
    name: 'مطبخ شاكر مخصص',
    category: 'مطابخ',
    images: [
      { src: 'https://placehold.co/800x600.png', alt: 'Full view of a bespoke shaker kitchen', aiHint: 'shaker kitchen' },
      { src: 'https://placehold.co/800x600.png', alt: 'Kitchen island detail', aiHint: 'kitchen island' },
      { src: 'https://placehold.co/800x600.png', alt: 'Custom cabinetry', aiHint: 'kitchen cabinets' },
    ],
    description:
      'مطبخ على طراز شاكر الخالد، مصمم خصيصًا لمواصفاتك. يتميز بخزائن من الخشب الصلب، وأجهزة إغلاق ناعمة، ومجموعة مختارة من أسطح العمل الفاخرة.',
    details: {
      materials: 'خشب القيقب, أسطح كوارتز, مقابض نحاسية',
      dimensions: 'مخصص ليناسب مساحتك',
    },
    price: {
      type: 'on-demand',
    },
  },
  {
    id: 4,
    slug: 'walk-in-wardrobe-system',
    name: 'نظام خزانة ملابس متكامل',
    category: 'غرف ملابس',
    images: [
      { src: 'https://placehold.co/800x600.png', alt: 'Expansive walk-in wardrobe system', aiHint: 'walk-in closet' },
      { src: 'https://placehold.co/800x600.png', alt: 'Detail of shelving and hanging space', aiHint: 'closet organizer' },
    ],
    description:
      'نظام خزانة ملابس معياري وقابل للتخصيص بالكامل. صمم غرفة ملابسك التي تحلم بها مع مجموعة متنوعة من الوحدات للتعليق والرفوف والأدراج.',
    details: {
      materials: 'لوح ألياف عالي الكثافة, قشرة خشبية, ألومنيوم',
      dimensions: 'قابل للتكوين لأي حجم غرفة',
    },
    price: {
      type: 'on-demand',
    },
  },
  {
    id: 5,
    slug: 'minimalist-platform-bed',
    name: 'سرير منصة بسيط',
    category: 'أثاث',
    images: [
        { src: 'https://placehold.co/800x600.png', alt: 'Minimalist Platform Bed', aiHint: 'platform bed' },
        { src: 'https://placehold.co/800x600.png', alt: 'Minimalist Platform Bed headboard detail', aiHint: 'bed headboard' },
    ],
    description: 'سرير منصة منخفض المظهر بجمالية نظيفة وبسيطة. يوفر الهيكل الخشبي الصلب دعمًا ومتانة ممتازين لنوم هانئ.',
    details: {
        materials: 'خشب الأكاسيا',
        dimensions: 'كوين: 63" عرض × 83" طول × 12" ارتفاع، كينج: 79" عرض × 83" طول × 12" ارتفاع',
    },
    price: {
        type: 'fixed',
        value: 1250.00
    }
  },
  {
    id: 6,
    slug: 'italian-modular-kitchen',
    name: 'مطبخ معياري إيطالي',
    category: 'مطابخ',
    images: [
        { src: 'https://placehold.co/800x600.png', alt: 'Sleek Italian modular kitchen', aiHint: 'italian kitchen' },
        { src: 'https://placehold.co/800x600.png', alt: 'Handleless kitchen cabinets', aiHint: 'modern kitchen' },
    ],
    description: 'جرب قمة تصميم المطابخ مع نظامنا المعياري الإيطالي. تشطيبات عالية اللمعان، خزائن بدون مقابض، وحلول تخزين ذكية تخلق مساحة عملية ومذهلة.',
    details: {
        materials: 'MDF مطلي بالورنيش, فولاذ مقاوم للصدأ, أسطح من الجرانيت',
        dimensions: 'مصمم خصيصًا لمساحتك',
    },
    price: {
        type: 'on-demand'
    }
  }
];
