'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ProductComparison from '@/components/features/ProductComparison';
import type { Locale } from '@/lib/types';

// Terminology icons as SVG components
const TerminologyIcons = {
  sae: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  ),
  additive: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  api: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  jaso: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  motorcycle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 18a2 2 0 100-4 2 2 0 000 4zM18 18a2 2 0 100-4 2 2 0 000 4zM10 16h4M6 16H4a1 1 0 01-1-1v-2a1 1 0 011-1h3l2-3h4l1 2h3a1 1 0 011 1v1" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 9l1-2M9 10l-2 3" />
    </svg>
  ),
  scooter: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18a2 2 0 100-4 2 2 0 000 4zM18 18a2 2 0 100-4 2 2 0 000 4z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16h8M4 16h-.5a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5H7l2-4h6l1 4h4.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H20" />
    </svg>
  ),
  lightbulb: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

// Terminology data
const terminologyData = [
  {
    id: 'sae',
    term: 'SAE',
    fullName: 'Society of Automotive Engineer',
    description: {
      id: 'Fungsinya menunjukkan indeks kekentalan oli. Angka yang lebih rendah (contoh: 5W) menunjukkan viskositas lebih rendah pada suhu dingin, sedangkan angka yang lebih tinggi (contoh: 40) menunjukkan viskositas pada suhu operasi.',
      en: 'Shows the viscosity index of oil. Lower numbers (e.g., 5W) indicate lower viscosity at cold temperatures, while higher numbers (e.g., 40) indicate viscosity at operating temperature.'
    },
    iconKey: 'sae' as const
  },
  {
    id: 'additive',
    term: 'Additive',
    fullName: { id: 'Aditif', en: 'Additive' },
    description: {
      id: 'Bahan kimia yang ditambahkan untuk meningkatkan kualitas pelumas. Termasuk anti-wear agents, detergent, dispersant, dan friction modifiers untuk performa optimal.',
      en: 'Chemical compounds added to improve lubricant quality. Includes anti-wear agents, detergents, dispersants, and friction modifiers for optimal performance.'
    },
    iconKey: 'additive' as const
  },
  {
    id: 'api',
    term: 'API',
    fullName: 'American Petroleum Institute',
    description: {
      id: 'Organisasi internasional yang mengklasifikasikan pelumas mesin berdasarkan test engine dan performance level (tingkat daya guna/kinerja) pada beberapa mesin tertentu. Standar terbaru untuk bensin adalah API SN.',
      en: 'International organization that classifies engine lubricants based on engine tests and performance levels on specific engines. The latest standard for gasoline is API SN.'
    },
    iconKey: 'api' as const
  },
  {
    id: 'jaso',
    term: 'JASO',
    fullName: 'Japan Automotive Standard Organization',
    description: {
      id: 'Lembaga di Jepang yang menguji kualitas oli. JASO memperkenalkan standar MA dan MB untuk sepeda motor.',
      en: 'Japanese organization that tests oil quality. JASO introduced MA and MB standards for motorcycles.'
    },
    iconKey: 'jaso' as const
  },
  {
    id: 'jaso-ma',
    term: 'JASO MA / MA2',
    fullName: { id: 'Gesekan Tinggi - Kopling Basah', en: 'High Friction - Wet Clutch' },
    description: {
      id: 'Untuk sepeda motor dengan kopling basah (rumah kopling terendam oli). Standar untuk motor bebek dan sport. MA2 memiliki kemampuan melumasi jauh lebih baik dari MA tanpa mengganggu kinerja kopling - kampas kopling tetap tidak mudah selip.',
      en: 'For motorcycles with wet clutch (clutch housing submerged in oil). Standard for underbone and sport bikes. MA2 has much better lubrication capability than MA without affecting clutch performance - clutch plates remain slip-resistant.'
    },
    iconKey: 'motorcycle' as const,
    highlight: true
  },
  {
    id: 'jaso-mb',
    term: 'JASO MB',
    fullName: { id: 'Gesekan Rendah - Kopling Kering', en: 'Low Friction - Dry Clutch' },
    description: {
      id: 'Untuk sepeda motor dengan kopling kering, seperti skutik (scooter matic) yang koplingnya tidak terendam oli. Dirancang untuk efisiensi bahan bakar optimal pada motor matic.',
      en: 'For motorcycles with dry clutch, like automatic scooters where the clutch is not submerged in oil. Designed for optimal fuel efficiency on automatic scooters.'
    },
    iconKey: 'scooter' as const,
    highlight: true
  }
];

interface ProductsClientProps {
  locale: Locale;
}

// Demo products - will be replaced with Sanity data
const demoProducts = [
  {
    id: '1',
    name: { id: 'SyneRal Full Synthetic Plus Ester 4T', en: 'SyneRal Full Synthetic Plus Ester 4T' },
    slug: 'syneral-full-synthetic-plus-ester-4t',
    category: 'motorcycle' as const,
    viscosity: '10W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MA2',
    volume: 800,
    image: '/images/products/product-1.png',
    features: {
      id: [
        'Teknologi Full Synthetic + Ester',
        'Perlindungan mesin maksimal',
        'Akselerasi responsif & bertenaga',
        'Cocok untuk motor sport & bebek',
        'Interval ganti oli lebih panjang',
      ],
      en: [
        'Full Synthetic + Ester Technology',
        'Maximum engine protection',
        'Responsive & powerful acceleration',
        'Suitable for sport & underbone bikes',
        'Extended oil change interval',
      ],
    },
  },
  {
    id: '2',
    name: { id: 'SyneRal Synthetic 4T', en: 'SyneRal Synthetic 4T' },
    slug: 'syneral-synthetic-4t',
    category: 'motorcycle' as const,
    viscosity: '10W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MA2',
    volume: 800,
    image: '/images/products/product-2.png',
    features: {
      id: [
        'Formulasi sintetis berkualitas',
        'Performa harian yang handal',
        'Perlindungan kopling basah optimal',
        'Harga ekonomis',
        'Cocok untuk pemakaian sehari-hari',
      ],
      en: [
        'Quality synthetic formulation',
        'Reliable daily performance',
        'Optimal wet clutch protection',
        'Economical price',
        'Suitable for daily use',
      ],
    },
  },
  {
    id: '3',
    name: { id: 'SyneRal Full Synthetic Plus Ester MATIC', en: 'SyneRal Full Synthetic Plus Ester MATIC' },
    slug: 'syneral-full-synthetic-plus-ester-matic',
    category: 'motorcycle' as const,
    viscosity: '5W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MB',
    volume: 800,
    image: '/images/products/product-3.png',
    features: {
      id: [
        'Khusus untuk motor matic/CVT',
        'Teknologi Full Synthetic + Ester',
        'Efisiensi bahan bakar optimal',
        'Perlindungan CVT maksimal',
        'Tarikan halus & responsif',
      ],
      en: [
        'Specially for automatic/CVT scooters',
        'Full Synthetic + Ester Technology',
        'Optimal fuel efficiency',
        'Maximum CVT protection',
        'Smooth & responsive acceleration',
      ],
    },
  },
  {
    id: '4',
    name: { id: 'SyneRal Synthetic MATIC', en: 'SyneRal Synthetic MATIC' },
    slug: 'syneral-synthetic-matic',
    category: 'motorcycle' as const,
    viscosity: '10W-30',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MB',
    volume: 800,
    image: '/images/products/product-4.png',
    features: {
      id: [
        'Untuk motor matic harian',
        'Formulasi sintetis berkualitas',
        'Hemat bahan bakar',
        'Perlindungan mesin & CVT',
        'Harga terjangkau',
      ],
      en: [
        'For daily automatic scooters',
        'Quality synthetic formulation',
        'Fuel efficient',
        'Engine & CVT protection',
        'Affordable price',
      ],
    },
  },
  {
    id: '5',
    name: { id: 'SyneRal Grease Calcium', en: 'SyneRal Grease Calcium' },
    slug: 'syneral-grease-calcium',
    category: 'grease' as const,
    viscosity: 'NLGI 3',
    apiStandard: '-',
    jasoStandard: '-',
    volume: 500,
    image: '/images/products/product-5.png',
    features: {
      id: [
        'Gemuk berbasis kalsium',
        'Tahan air & kelembaban',
        'Untuk bearing & chassis',
        'Perlindungan anti karat',
        'Aplikasi umum',
      ],
      en: [
        'Calcium-based grease',
        'Water & moisture resistant',
        'For bearings & chassis',
        'Anti-rust protection',
        'General application',
      ],
    },
  },
  {
    id: '6',
    name: { id: 'SyneRal Grease Lithium EP', en: 'SyneRal Grease Lithium EP' },
    slug: 'syneral-grease-lithium-ep',
    category: 'grease' as const,
    viscosity: 'NLGI 2',
    apiStandard: '-',
    jasoStandard: '-',
    volume: 500,
    image: '/images/products/product-6.png',
    features: {
      id: [
        'Gemuk lithium extreme pressure',
        'Tahan beban berat',
        'Untuk aplikasi industri',
        'Stabilitas suhu tinggi',
        'Perlindungan anti-wear',
      ],
      en: [
        'Lithium extreme pressure grease',
        'Heavy load resistant',
        'For industrial applications',
        'High temperature stability',
        'Anti-wear protection',
      ],
    },
  },
  {
    id: '7',
    name: { id: 'SyneRal Diesel Engine Oil', en: 'SyneRal Diesel Engine Oil' },
    slug: 'syneral-diesel-engine-oil',
    category: 'commercial' as const,
    viscosity: '15W-40',
    apiStandard: 'API CI-4',
    jasoStandard: '-',
    volume: 5000,
    image: '/images/products/product-7.png',
    features: {
      id: [
        'Untuk mesin diesel berat',
        'Standar API CI-4',
        'Kontrol deposit & jelaga',
        'Perlindungan mesin maksimal',
        'Interval ganti oli panjang',
      ],
      en: [
        'For heavy diesel engines',
        'API CI-4 standard',
        'Deposit & soot control',
        'Maximum engine protection',
        'Extended oil change interval',
      ],
    },
  },
  {
    id: '8',
    name: { id: 'SyneRal Hydraulic Oil', en: 'SyneRal Hydraulic Oil' },
    slug: 'syneral-hydraulic-oil',
    category: 'industrial' as const,
    viscosity: 'ISO VG 46',
    apiStandard: '-',
    jasoStandard: '-',
    volume: 20000,
    image: '/images/products/product-8.png',
    features: {
      id: [
        'Oli hidrolik industri',
        'Stabilitas oksidasi tinggi',
        'Perlindungan anti-wear',
        'Kontrol busa & emulsi',
        'Untuk sistem hidrolik berat',
      ],
      en: [
        'Industrial hydraulic oil',
        'High oxidation stability',
        'Anti-wear protection',
        'Foam & emulsion control',
        'For heavy hydraulic systems',
      ],
    },
  },
];

const categories = ['all', 'motorcycle', 'grease', 'commercial', 'industrial'] as const;

export default function ProductsClient({ locale }: ProductsClientProps) {
  const t = useTranslations('products');
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('all');
  const [comparisonProducts, setComparisonProducts] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const filteredProducts = activeCategory === 'all'
    ? demoProducts
    : demoProducts.filter(p => p.category === activeCategory);

  const toggleComparison = (productId: string) => {
    setComparisonProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, productId];
    });
  };

  const selectedProducts = demoProducts.filter(p => comparisonProducts.includes(p.id));

  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-racing text-4xl md:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="font-racing-alt text-foreground-muted text-lg max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-racing text-sm tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-racing-green text-white'
                    : 'bg-background-secondary text-foreground-muted hover:bg-background-tertiary hover:text-white border border-white/10'
                }`}
              >
                {t(`categories.${category}`)}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-background-secondary rounded-xl border border-white/5 hover:border-racing-green/50 transition-all duration-300 overflow-hidden h-full flex flex-col relative">
                    {/* Compare checkbox - positioned absolute so it doesn't interfere with link */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleComparison(product.id);
                      }}
                      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        comparisonProducts.includes(product.id)
                          ? 'bg-racing-green text-white'
                          : 'bg-black/20 text-white hover:bg-black/40'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>

                    <Link href={`/${locale}/products/${product.slug}`} className="flex flex-col h-full">
                      {/* Product Image Area */}
                      <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 p-4 flex items-center justify-center min-h-[220px]">
                        {/* Product Image */}
                        <div className="relative w-32 h-44 group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src={product.image}
                            alt={product.name[locale]}
                            fill
                            className="object-contain"
                            sizes="128px"
                          />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5 flex-1 flex flex-col">
                        {/* Category badge */}
                        <span className="inline-block w-fit px-2 py-1 bg-racing-green/20 text-racing-green text-xs font-racing rounded mb-3">
                          {t(`categories.${product.category}`)}
                        </span>

                        {/* Product name */}
                        <h3 className="font-racing text-white text-base mb-3 group-hover:text-racing-green transition-colors line-clamp-2">
                          {product.name[locale]}
                        </h3>

                        {/* Specs */}
                        <div className="mt-auto space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-foreground-muted">{t('specs.viscosity')}</span>
                            <span className="text-white font-medium">{product.viscosity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground-muted">{t('specs.api')}</span>
                            <span className="text-white font-medium">{product.apiStandard}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground-muted">{t('specs.volume')}</span>
                            <span className="text-white font-medium">{product.volume}ml</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-foreground-muted">{locale === 'id' ? 'Tidak ada produk ditemukan' : 'No products found'}</p>
            </div>
          )}
        </div>
      </section>

      {/* Terminology Guide Section */}
      <section className="pb-24 relative overflow-hidden">
        {/* Racing stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 ${i % 2 === 0 ? 'bg-racing-green' : 'bg-white'}`}
                  />
                ))}
              </div>
              <span className="font-racing text-racing-green text-sm tracking-[0.2em]">
                {locale === 'id' ? 'PANDUAN' : 'GUIDE'}
              </span>
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 ${i % 2 === 0 ? 'bg-white' : 'bg-racing-green'}`}
                  />
                ))}
              </div>
            </div>
            <h2 className="font-racing text-3xl md:text-4xl font-black text-white mb-4">
              {locale === 'id' ? 'TERMINOLOGI PENTING' : 'IMPORTANT TERMINOLOGY'}
            </h2>
            <p className="font-racing-alt text-foreground-muted max-w-2xl mx-auto">
              {locale === 'id'
                ? 'Pahami istilah-istilah penting dalam dunia pelumas untuk memilih produk yang tepat'
                : 'Understand important terms in the lubricant world to choose the right product'}
            </p>
          </motion.div>

          {/* Terminology Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {terminologyData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group ${item.highlight ? 'md:col-span-1' : ''}`}
              >
                <div className={`h-full rounded-xl border ${
                  item.highlight
                    ? 'bg-gradient-to-br from-racing-green/20 to-racing-green/5 border-racing-green/40'
                    : 'bg-background-secondary border-white/10'
                } p-6 hover:border-racing-green/50 transition-all`}>
                  {/* Icon & Term */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      item.highlight ? 'bg-racing-green/30 text-racing-green' : 'bg-white/5 text-foreground-muted'
                    }`}>
                      {TerminologyIcons[item.iconKey]}
                    </div>
                    <div>
                      <h3 className="font-racing text-xl text-white">{item.term}</h3>
                      <p className="text-racing-green text-sm font-medium">
                        {typeof item.fullName === 'string' ? item.fullName : item.fullName[locale]}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-racing-alt text-foreground-muted text-sm leading-relaxed">
                    {item.description[locale]}
                  </p>

                  {/* Highlight badge */}
                  {item.highlight && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-racing-green text-white text-[10px] font-racing rounded">
                        {locale === 'id' ? 'PENTING' : 'KEY'}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Reference Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="bg-background-secondary rounded-xl border border-white/10 p-6 md:p-8">
              <h3 className="font-racing text-xl text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center text-gold">
                  {TerminologyIcons.lightbulb}
                </span>
                {locale === 'id' ? 'Panduan Cepat Pemilihan Oli' : 'Quick Oil Selection Guide'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* For 4T / Manual Bikes */}
                <div className="bg-white/5 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-racing-green/20 rounded-lg flex items-center justify-center text-racing-green">
                      {TerminologyIcons.motorcycle}
                    </div>
                    <div>
                      <h4 className="font-racing text-white">
                        {locale === 'id' ? 'Motor Bebek & Sport' : 'Underbone & Sport Bikes'}
                      </h4>
                      <span className="text-racing-green text-sm">{locale === 'id' ? 'Kopling Basah' : 'Wet Clutch'}</span>
                    </div>
                  </div>
                  <p className="text-foreground-muted text-sm mb-3">
                    {locale === 'id'
                      ? 'Gunakan oli dengan standar JASO MA atau MA2'
                      : 'Use oil with JASO MA or MA2 standard'}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-racing-green/20 text-racing-green text-xs font-racing rounded">JASO MA2</span>
                    <span className="text-foreground-muted text-xs">{locale === 'id' ? 'Direkomendasikan' : 'Recommended'}</span>
                  </div>
                </div>

                {/* For Matic Scooters */}
                <div className="bg-white/5 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-racing-green/20 rounded-lg flex items-center justify-center text-racing-green">
                      {TerminologyIcons.scooter}
                    </div>
                    <div>
                      <h4 className="font-racing text-white">
                        {locale === 'id' ? 'Motor Matic / Skutik' : 'Automatic Scooters'}
                      </h4>
                      <span className="text-racing-green text-sm">{locale === 'id' ? 'Kopling Kering' : 'Dry Clutch'}</span>
                    </div>
                  </div>
                  <p className="text-foreground-muted text-sm mb-3">
                    {locale === 'id'
                      ? 'Gunakan oli dengan standar JASO MB untuk efisiensi optimal'
                      : 'Use oil with JASO MB standard for optimal efficiency'}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-racing-green/20 text-racing-green text-xs font-racing rounded">JASO MB</span>
                    <span className="text-foreground-muted text-xs">{locale === 'id' ? 'Direkomendasikan' : 'Recommended'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison bar */}
      <AnimatePresence>
        {comparisonProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-background-secondary/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-racing text-white">
                    {comparisonProducts.length} {locale === 'id' ? 'produk dipilih' : 'products selected'}
                  </span>
                  <div className="hidden md:flex items-center gap-2">
                    {selectedProducts.map(product => (
                      <span
                        key={product.id}
                        className="px-3 py-1 bg-white/10 rounded text-xs text-white"
                      >
                        {product.name[locale].split(' ').slice(-1)[0]}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setComparisonProducts([])}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-white"
                  >
                    {t('comparison.clearAll')}
                  </button>
                  <Button
                    onClick={() => setShowComparison(true)}
                    disabled={comparisonProducts.length < 2}
                    size="sm"
                  >
                    {t('comparison.title')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showComparison && selectedProducts.length >= 2 && (
          <ProductComparison
            products={selectedProducts}
            locale={locale}
            onClose={() => setShowComparison(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
