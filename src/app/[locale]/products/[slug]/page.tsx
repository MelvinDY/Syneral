import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import ProductDetailClient from './ProductDetailClient';
import type { Locale } from '@/lib/types';

// Product data - same as in ProductsClient but with full details
const products = [
  {
    id: '1',
    slug: 'syneral-full-synthetic-plus-ester-4t',
    name: { id: 'SyneRal Full Synthetic Plus Ester 4T', en: 'SyneRal Full Synthetic Plus Ester 4T' },
    category: 'motorcycle',
    viscosity: '10W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MA2',
    volume: [800, 1000],
    image: '/images/products/product-1.png',
    description: {
      id: 'Pelumas motor yang diformulasikan khusus untuk motor 4T modern. Menggunakan "MULTI ACTIVE TECHNOLOGY" untuk menjaga kekentalan pelumas pada kondisi panas mesin yang ekstrem. Cocok untuk aplikasi racing, touring, dan motor standar.',
      en: 'Specially formulated motorcycle lubricant for modern 4T motorcycles. Uses "MULTI ACTIVE TECHNOLOGY" to maintain lubricant viscosity during extreme engine heat conditions. Suits racing, touring, and standard motorcycle applications.'
    },
    features: {
      id: [
        'Menggunakan base oil dan aditif unggulan dibanding produk kompetitor di kelasnya',
        'Menjaga stabilitas kekentalan (tahan terhadap penipisan)',
        'Tahan terhadap suhu tinggi secara efektif',
        'Memperpanjang masa pakai pelumas'
      ],
      en: [
        'Uses superior base oil and additives compared to competing products in its class',
        'Maintains viscosity stability (resistant to thinning)',
        'Withstands high temperatures effectively',
        'Extends lubricant service life'
      ]
    },
    recommended: {
      id: 'Cocok untuk semua mesin motor 4T dan kompatibel dengan klasifikasi API Service SN, SM, SL, dan SJ.',
      en: 'Works with all 4T motorcycle engines and is compatible with API Service classifications SN, SM, SL, and SJ standards.'
    }
  },
  {
    id: '2',
    slug: 'syneral-synthetic-4t',
    name: { id: 'SyneRal Synthetic 4T', en: 'SyneRal Synthetic 4T' },
    category: 'motorcycle',
    viscosity: '10W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MA2',
    volume: [800, 1000],
    image: '/images/products/product-2.png',
    description: {
      id: 'Pelumas sintetis berkualitas tinggi untuk motor 4T dengan teknologi MULTI ACTIVE untuk perlindungan mesin harian yang handal.',
      en: 'High quality synthetic lubricant for 4T motorcycles with MULTI ACTIVE technology for reliable daily engine protection.'
    },
    features: {
      id: [
        'Teknologi MULTI ACTIVE untuk perlindungan optimal',
        'Performa stabil di berbagai kondisi',
        'Anti oksidasi dan anti keausan',
        'Cocok untuk penggunaan harian'
      ],
      en: [
        'MULTI ACTIVE technology for optimal protection',
        'Stable performance in various conditions',
        'Anti-oxidation and anti-wear',
        'Suitable for daily use'
      ]
    },
    recommended: {
      id: 'Direkomendasikan untuk motor 4T harian dengan standar API SN dan JASO MA2.',
      en: 'Recommended for daily 4T motorcycles with API SN and JASO MA2 standards.'
    }
  },
  {
    id: '3',
    slug: 'syneral-full-synthetic-plus-ester-matic',
    name: { id: 'SyneRal Full Synthetic Plus Ester MATIC', en: 'SyneRal Full Synthetic Plus Ester MATIC' },
    category: 'motorcycle',
    viscosity: '5W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MB',
    volume: [800],
    image: '/images/products/product-3.png',
    description: {
      id: 'Pelumas full synthetic premium untuk motor matic dengan teknologi Ester. Dirancang khusus untuk sistem CVT modern dengan perlindungan maksimal.',
      en: 'Premium full synthetic lubricant for automatic scooters with Ester technology. Specially designed for modern CVT systems with maximum protection.'
    },
    features: {
      id: [
        'Teknologi Full Synthetic Plus Ester',
        'Perlindungan CVT optimal',
        'Transmisi halus dan responsif',
        'Cocok untuk motor matic modern'
      ],
      en: [
        'Full Synthetic Plus Ester technology',
        'Optimal CVT protection',
        'Smooth and responsive transmission',
        'Suitable for modern automatic scooters'
      ]
    },
    recommended: {
      id: 'Ideal untuk motor matic dengan sistem CVT modern, memenuhi standar JASO MB.',
      en: 'Ideal for automatic scooters with modern CVT systems, meets JASO MB standard.'
    }
  },
  {
    id: '4',
    slug: 'syneral-synthetic-matic',
    name: { id: 'SyneRal Synthetic MATIC', en: 'SyneRal Synthetic MATIC' },
    category: 'motorcycle',
    viscosity: '10W-30',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MB',
    volume: [800],
    image: '/images/products/product-4.png',
    description: {
      id: 'Pelumas sintetis untuk motor matic dengan teknologi MULTI ACTIVE. Memberikan perlindungan harian yang handal untuk sistem CVT.',
      en: 'Synthetic lubricant for automatic scooters with MULTI ACTIVE technology. Provides reliable daily protection for CVT systems.'
    },
    features: {
      id: [
        'Teknologi MULTI ACTIVE',
        'Transmisi CVT optimal',
        'Anti gesekan tinggi',
        'Ekonomis untuk harian'
      ],
      en: [
        'MULTI ACTIVE technology',
        'Optimal CVT transmission',
        'High anti-friction',
        'Economical for daily use'
      ]
    },
    recommended: {
      id: 'Cocok untuk motor matic harian dengan kebutuhan pelumas berkualitas.',
      en: 'Suitable for daily automatic scooters requiring quality lubricants.'
    }
  },
  {
    id: '5',
    slug: 'syneral-grease-calcium',
    name: { id: 'SyneRal Grease Calcium', en: 'SyneRal Grease Calcium' },
    category: 'grease',
    viscosity: 'NLGI 3',
    apiStandard: '-',
    jasoStandard: '-',
    volume: [500],
    image: '/images/products/product-5.png',
    description: {
      id: 'Gemuk berbasis kalsium untuk aplikasi umum dengan ketahanan air yang baik. Ideal untuk pelumasan bearing dan komponen mesin.',
      en: 'Calcium-based grease for general applications with good water resistance. Ideal for bearing and machine component lubrication.'
    },
    features: {
      id: [
        'Tahan air',
        'Aplikasi umum serbaguna',
        'Pelumasan tahan lama',
        'Harga ekonomis'
      ],
      en: [
        'Water resistant',
        'Versatile general application',
        'Long-lasting lubrication',
        'Economical price'
      ]
    },
    recommended: {
      id: 'Untuk aplikasi umum bearing, chassis, dan komponen mesin yang membutuhkan pelumasan tahan air.',
      en: 'For general bearing, chassis, and machine component applications requiring water-resistant lubrication.'
    }
  },
  {
    id: '6',
    slug: 'syneral-grease-lithium-ep',
    name: { id: 'SyneRal Grease Lithium EP', en: 'SyneRal Grease Lithium EP' },
    category: 'grease',
    viscosity: 'NLGI 2',
    apiStandard: '-',
    jasoStandard: '-',
    volume: [500],
    image: '/images/products/product-6.png',
    description: {
      id: 'Gemuk lithium extreme pressure untuk aplikasi beban berat dan suhu tinggi. Memberikan perlindungan superior untuk komponen industri.',
      en: 'Lithium extreme pressure grease for heavy load and high temperature applications. Provides superior protection for industrial components.'
    },
    features: {
      id: [
        'Extreme Pressure (EP) additive',
        'Tahan beban berat',
        'Stabil di suhu tinggi',
        'Anti keausan tinggi'
      ],
      en: [
        'Extreme Pressure (EP) additive',
        'Heavy load resistant',
        'Stable at high temperatures',
        'High anti-wear'
      ]
    },
    recommended: {
      id: 'Untuk aplikasi industri dengan beban berat seperti bearing, gear, dan komponen mesin berat.',
      en: 'For industrial applications with heavy loads such as bearings, gears, and heavy machine components.'
    }
  },
  {
    id: '7',
    slug: 'syneral-diesel-engine-oil',
    name: { id: 'SyneRal Diesel Engine Oil', en: 'SyneRal Diesel Engine Oil' },
    category: 'commercial',
    viscosity: '15W-40',
    apiStandard: 'API CI-4',
    jasoStandard: '-',
    volume: [5000, 20000],
    image: '/images/products/product-7.png',
    description: {
      id: 'Pelumas mesin diesel untuk kendaraan komersial dan alat berat. Diformulasikan untuk interval penggantian panjang dengan perlindungan mesin maksimal.',
      en: 'Diesel engine lubricant for commercial vehicles and heavy equipment. Formulated for extended drain intervals with maximum engine protection.'
    },
    features: {
      id: [
        'Heavy duty untuk diesel',
        'Interval penggantian panjang',
        'Anti deposit dan sludge',
        'Perlindungan mesin total'
      ],
      en: [
        'Heavy duty for diesel',
        'Extended drain intervals',
        'Anti-deposit and sludge',
        'Total engine protection'
      ]
    },
    recommended: {
      id: 'Untuk truk, bus, alat berat, dan kendaraan komersial bermesin diesel.',
      en: 'For trucks, buses, heavy equipment, and diesel-powered commercial vehicles.'
    }
  },
  {
    id: '8',
    slug: 'syneral-hydraulic-oil',
    name: { id: 'SyneRal Hydraulic Oil', en: 'SyneRal Hydraulic Oil' },
    category: 'industrial',
    viscosity: 'ISO VG 46',
    apiStandard: '-',
    jasoStandard: '-',
    volume: [20000],
    image: '/images/products/product-8.png',
    description: {
      id: 'Pelumas hidrolik untuk sistem hidrolik industri. Memberikan stabilitas oksidasi tinggi dan perlindungan anti-wear untuk komponen hidrolik.',
      en: 'Hydraulic lubricant for industrial hydraulic systems. Provides high oxidation stability and anti-wear protection for hydraulic components.'
    },
    features: {
      id: [
        'Anti wear tinggi',
        'Stabilitas oksidasi superior',
        'Indeks viskositas tinggi',
        'Anti busa'
      ],
      en: [
        'High anti-wear',
        'Superior oxidation stability',
        'High viscosity index',
        'Anti-foam'
      ]
    },
    recommended: {
      id: 'Untuk sistem hidrolik industri, mesin press, excavator, dan peralatan hidrolik lainnya.',
      en: 'For industrial hydraulic systems, press machines, excavators, and other hydraulic equipment.'
    }
  },
];

interface Props {
  params: Promise<{ locale: Locale; slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = products.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} locale={locale} />;
}

export function generateStaticParams() {
  return products.flatMap(product => [
    { locale: 'id', slug: product.slug },
    { locale: 'en', slug: product.slug },
  ]);
}
