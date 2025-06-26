import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    slug: 'modern-oak-sofa',
    name: 'Modern Oak Sofa',
    category: 'Furniture',
    images: [
      { src: 'https://placehold.co/800x600.png', alt: 'Modern Oak Sofa front view', aiHint: 'modern sofa' },
      { src: 'https://placehold.co/800x600.png', alt: 'Modern Oak Sofa side view', aiHint: 'modern sofa side' },
      { src: 'https://placehold.co/800x600.png', alt: 'Modern Oak Sofa in a living room setting', aiHint: 'sofa livingroom' },
    ],
    description:
      'A sleek and comfortable sofa featuring a solid oak frame and plush, neutral-toned cushions. Its minimalist design fits perfectly in any contemporary living space.',
    details: {
      materials: 'Solid Oak, Linen-blend Fabric',
      dimensions: '84" W x 35" D x 32" H',
      colors: ['Beige', 'Charcoal Gray', 'Navy Blue'],
    },
    price: {
      type: 'fixed',
      value: 1899.99,
    },
  },
  {
    id: 2,
    slug: 'marble-top-dining-table',
    name: 'Marble Top Dining Table',
    category: 'Furniture',
    images: [
      { src: 'https://placehold.co/800x600.png', alt: 'Marble Top Dining Table', aiHint: 'marble table' },
      { src: 'https://placehold.co/800x600.png', alt: 'Marble Top Dining Table detail', aiHint: 'marble texture' },
    ],
    description:
      'An elegant dining table that seats six comfortably. The genuine marble top rests on a sturdy metal base, creating a luxurious focal point for your dining room.',
    details: {
      materials: 'Carrara Marble, Powder-coated Steel',
      dimensions: '72" L x 36" W x 30" H',
      colors: ['White Marble with Black Base', 'White Marble with Gold Base'],
    },
    price: {
      type: 'fixed',
      value: 2500.0,
    },
  },
  {
    id: 3,
    slug: 'bespoke-shaker-kitchen',
    name: 'Bespoke Shaker Kitchen',
    category: 'Kitchens',
    images: [
      { src: 'https://placehold.co/800x600.png', alt: 'Full view of a bespoke shaker kitchen', aiHint: 'shaker kitchen' },
      { src: 'https://placehold.co/800x600.png', alt: 'Kitchen island detail', aiHint: 'kitchen island' },
      { src: 'https://placehold.co/800x600.png', alt: 'Custom cabinetry', aiHint: 'kitchen cabinets' },
    ],
    description:
      'A timeless Shaker-style kitchen, custom-built to your specifications. Features solid wood cabinetry, soft-close hardware, and a choice of premium countertops.',
    details: {
      materials: 'Maple Wood, Quartz Countertops, Brass Hardware',
      dimensions: 'Custom-fit to your space',
      colors: ['Cloud White', 'Pebble Gray', 'Forest Green', 'Deep Ocean Blue'],
    },
    price: {
      type: 'on-demand',
    },
  },
  {
    id: 4,
    slug: 'walk-in-wardrobe-system',
    name: 'Walk-in Wardrobe System',
    category: 'Dressing Rooms',
    images: [
      { src: 'https://placehold.co/800x600.png', alt: 'Expansive walk-in wardrobe system', aiHint: 'walk-in closet' },
      { src: 'https://placehold.co/800x600.png', alt: 'Detail of shelving and hanging space', aiHint: 'closet organizer' },
    ],
    description:
      'A modular and fully customizable walk-in wardrobe system. Design your dream dressing room with a variety of modules for hanging, shelving, and drawers.',
    details: {
      materials: 'High-density Fiberboard, Veneer, Aluminum',
      dimensions: 'Configurable to any room size',
      colors: ['Light Oak', 'Walnut', 'Matte White'],
    },
    price: {
      type: 'on-demand',
    },
  },
  {
    id: 5,
    slug: 'minimalist-platform-bed',
    name: 'Minimalist Platform Bed',
    category: 'Furniture',
    images: [
        { src: 'https://placehold.co/800x600.png', alt: 'Minimalist Platform Bed', aiHint: 'platform bed' },
        { src: 'https://placehold.co/800x600.png', alt: 'Minimalist Platform Bed headboard detail', aiHint: 'bed headboard' },
    ],
    description: 'A low-profile platform bed with a clean, simple aesthetic. The solid wood construction provides excellent support and durability for a restful night\'s sleep.',
    details: {
        materials: 'Acacia Wood',
        dimensions: 'Queen: 63" W x 83" L x 12" H, King: 79" W x 83" L x 12" H',
        colors: ['Natural Finish', 'Dark Walnut Stain'],
    },
    price: {
        type: 'fixed',
        value: 1250.00
    }
  },
  {
    id: 6,
    slug: 'italian-modular-kitchen',
    name: 'Italian Modular Kitchen',
    category: 'Kitchens',
    images: [
        { src: 'https://placehold.co/800x600.png', alt: 'Sleek Italian modular kitchen', aiHint: 'italian kitchen' },
        { src: 'https://placehold.co/800x600.png', alt: 'Handleless kitchen cabinets', aiHint: 'modern kitchen' },
    ],
    description: 'Experience the pinnacle of kitchen design with our Italian modular system. High-gloss finishes, handleless cabinets, and smart storage solutions create a space that is both functional and stunning.',
    details: {
        materials: 'Lacquered MDF, Stainless Steel, Granite Countertops',
        dimensions: 'Custom-designed for your space',
        colors: ['Gloss White', 'Matte Black', 'Metallic Grey'],
    },
    price: {
        type: 'on-demand'
    }
  }
];
