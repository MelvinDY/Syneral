'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import ProductComparison from '@/components/features/ProductComparison';
import type { Locale } from '@/lib/types';

interface ProductsClientProps {
  locale: Locale;
}

// Demo products - will be replaced with Sanity data
const demoProducts = [
  {
    id: '1',
    name: { id: 'Syneral 4T Full Synthetic Plus Ester', en: 'Syneral 4T Full Synthetic Plus Ester' },
    slug: { current: 'syneral-4t-full-synthetic-plus-ester' },
    category: '4t' as const,
    viscosity: '10W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MA2',
    volume: 800,
    description: {
      id: 'Oli motor full synthetic dengan teknologi Ester untuk performa maksimal',
      en: 'Full synthetic motor oil with Ester technology for maximum performance'
    },
    features: {
      id: ['Perlindungan maksimal mesin', 'Performa tinggi', 'Teknologi Ester', 'Anti keausan superior'],
      en: ['Maximum engine protection', 'High performance', 'Ester technology', 'Superior anti-wear']
    },
    color: '#009640',
    number: '01',
    tier: 'PREMIUM',
  },
  {
    id: '2',
    name: { id: 'Syneral 4T Synthetic', en: 'Syneral 4T Synthetic' },
    slug: { current: 'syneral-4t-synthetic' },
    category: '4t' as const,
    viscosity: '10W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MA2',
    volume: 800,
    description: {
      id: 'Oli motor synthetic untuk perlindungan harian yang handal',
      en: 'Synthetic motor oil for reliable daily protection'
    },
    features: {
      id: ['Perlindungan harian', 'Ekonomis', 'Performa stabil', 'Anti oksidasi'],
      en: ['Daily protection', 'Economical', 'Stable performance', 'Anti-oxidation']
    },
    color: '#009640',
    number: '02',
    tier: 'STANDARD',
  },
  {
    id: '3',
    name: { id: 'Syneral MATIC Full Synthetic Plus Ester', en: 'Syneral MATIC Full Synthetic Plus Ester' },
    slug: { current: 'syneral-matic-full-synthetic-plus-ester' },
    category: 'matic' as const,
    viscosity: '5W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MB',
    volume: 800,
    description: {
      id: 'Oli motor matic full synthetic untuk perlindungan CVT optimal',
      en: 'Full synthetic scooter oil for optimal CVT protection'
    },
    features: {
      id: ['Perlindungan CVT', 'Transmisi halus', 'Teknologi Ester', 'Untuk matic modern'],
      en: ['CVT protection', 'Smooth transmission', 'Ester technology', 'For modern scooters']
    },
    color: '#00a3e0',
    number: '03',
    tier: 'PREMIUM',
  },
  {
    id: '4',
    name: { id: 'Syneral MATIC Synthetic', en: 'Syneral MATIC Synthetic' },
    slug: { current: 'syneral-matic-synthetic' },
    category: 'matic' as const,
    viscosity: '10W-30',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MB',
    volume: 800,
    description: {
      id: 'Oli motor matic synthetic untuk penggunaan sehari-hari',
      en: 'Synthetic scooter oil for everyday use'
    },
    features: {
      id: ['Penggunaan harian', 'Hemat biaya', 'Transmisi optimal', 'Anti gesekan'],
      en: ['Daily use', 'Cost effective', 'Optimal transmission', 'Anti-friction']
    },
    color: '#00a3e0',
    number: '04',
    tier: 'STANDARD',
  },
  {
    id: '5',
    name: { id: 'Syneral Racing Ester', en: 'Syneral Racing Ester' },
    slug: { current: 'syneral-racing-ester' },
    category: 'specialty' as const,
    viscosity: '10W-50',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MA2',
    volume: 1000,
    description: {
      id: 'Oli racing dengan 100% Ester untuk kondisi ekstrem',
      en: 'Racing oil with 100% Ester for extreme conditions'
    },
    features: {
      id: ['100% Ester', 'Kondisi ekstrem', 'Performa racing', 'Perlindungan suhu tinggi'],
      en: ['100% Ester', 'Extreme conditions', 'Racing performance', 'High temp protection']
    },
    color: '#d4af37',
    number: '05',
    tier: 'RACING',
  },
];

const categories = ['all', '4t', 'matic', 'specialty'] as const;

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
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-black" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,150,64,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,150,64,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Large background text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 racing-number text-[30vw] leading-none text-white/[0.02] pointer-events-none select-none">
          OIL
        </div>

        {/* Racing stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 ${i % 2 === 0 ? 'bg-white' : 'bg-racing-green'}`}
                  />
                ))}
              </div>
              <span className="font-racing text-racing-green text-sm tracking-[0.2em]">
                {locale === 'id' ? 'KATALOG PRODUK' : 'PRODUCT CATALOG'}
              </span>
            </div>
            <h1 className="font-racing text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-4">
              {t('title')}
            </h1>
            <p className="font-racing-alt text-foreground-muted text-lg max-w-xl">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Category Filter - Horizontal tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 flex items-center gap-2 border transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-racing-green border-racing-green'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <span className={`font-racing text-xs ${activeCategory === category ? 'text-white/60' : 'text-foreground-muted'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={`font-racing text-sm tracking-wider ${activeCategory === category ? 'text-white' : 'text-foreground-muted'}`}>
                  {t(`categories.${category}`).toUpperCase()}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Products count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-racing text-sm text-foreground-muted">
              {filteredProducts.length} {locale === 'id' ? 'PRODUK DITEMUKAN' : 'PRODUCTS FOUND'}
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-racing text-xs text-foreground-muted tracking-widest">
                {locale === 'id' ? 'LIHAT PRODUK' : 'VIEW PRODUCTS'}
              </span>
              <svg className="w-6 h-6 text-racing-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="relative py-24 bg-background-secondary">
        {/* Racing stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

        {/* Background pattern */}
        <div className="absolute inset-0 racing-stripes opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Products Grid - Masonry style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pb-24">
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`group ${index === 0 ? 'md:col-span-2' : ''}`}
                >
                  <div className="relative h-full bg-gradient-to-br from-background/95 to-background-secondary/95 border border-white/10 group-hover:border-white/20 transition-all duration-300 overflow-hidden">
                    {/* Top accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: product.color }}
                    />

                    {/* Content */}
                    <div className={`relative p-6 lg:p-8 ${index === 0 ? 'lg:flex lg:gap-8 lg:items-center' : ''}`}>
                      {/* Left side - Product visual */}
                      <div className={`relative ${index === 0 ? 'lg:w-1/3' : ''} mb-6 lg:mb-0`}>
                        {/* Product number - Large watermark */}
                        <div className="absolute -top-4 -left-4 racing-number text-8xl text-white/5 pointer-events-none">
                          {product.number}
                        </div>

                        {/* Bottle visual */}
                        <div className="relative flex justify-center py-8">
                          <div className="relative">
                            <div
                              className="w-28 h-44 rounded-lg relative group-hover:scale-105 transition-transform duration-500"
                              style={{
                                background: `linear-gradient(135deg, ${product.color}25 0%, ${product.color}10 100%)`,
                                border: `2px solid ${product.color}50`,
                              }}
                            >
                              {/* Cap */}
                              <div
                                className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-5 rounded-t-lg"
                                style={{ backgroundColor: product.color }}
                              />
                              {/* Label */}
                              <div className="absolute inset-4 flex flex-col items-center justify-center">
                                <span className="font-racing text-4xl font-black text-white">S</span>
                                <span className="font-racing text-xs text-white/60 mt-1">{product.viscosity}</span>
                              </div>
                            </div>
                            {/* Glow */}
                            <div
                              className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-lg"
                              style={{ backgroundColor: product.color }}
                            />
                          </div>
                        </div>

                        {/* Compare button */}
                        <button
                          onClick={() => toggleComparison(product.id)}
                          className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded transition-all ${
                            comparisonProducts.includes(product.id)
                              ? 'bg-racing-green text-white'
                              : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                          }`}
                        >
                          <span className="font-racing text-xs">
                            {comparisonProducts.includes(product.id) ? 'SELECTED' : 'COMPARE'}
                          </span>
                        </button>
                      </div>

                      {/* Right side - Info */}
                      <div className={`${index === 0 ? 'lg:flex-1' : ''}`}>
                        {/* Category & Tier badges */}
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="px-3 py-1 rounded font-racing text-xs tracking-wider text-white"
                            style={{ backgroundColor: product.color }}
                          >
                            {product.category.toUpperCase()}
                          </div>
                          <div className="px-3 py-1 bg-white/10 rounded font-racing text-xs tracking-wider text-foreground-muted">
                            {product.tier}
                          </div>
                        </div>

                        {/* Product name */}
                        <h3 className="font-racing text-xl lg:text-2xl text-white mb-3 tracking-wide group-hover:text-racing-green transition-colors">
                          {product.name[locale]}
                        </h3>

                        {/* Description */}
                        <p className="font-racing-alt text-foreground-muted text-sm mb-6">
                          {product.description[locale]}
                        </p>

                        {/* Specs grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {[
                            { label: 'VISCOSITY', value: product.viscosity },
                            { label: 'VOLUME', value: `${product.volume}ml` },
                            { label: 'API', value: product.apiStandard },
                            { label: 'JASO', value: product.jasoStandard },
                          ].map((spec) => (
                            <div key={spec.label} className="bg-white/5 rounded px-3 py-2">
                              <div className="font-racing text-[10px] text-foreground-muted tracking-wider">
                                {spec.label}
                              </div>
                              <div className="font-racing text-sm text-white">
                                {spec.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {product.features[locale].slice(0, 3).map((feature, i) => (
                            <span
                              key={i}
                              className="font-racing-alt text-xs text-foreground-muted px-2 py-1 border border-white/10 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 opacity-30"
                      style={{ backgroundColor: product.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom racing stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />
      </section>

      {/* Comparison bar */}
      <AnimatePresence>
        {comparisonProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-t border-racing-green/30"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {/* Count */}
                  <div className="bg-racing-green px-4 py-2 rounded">
                    <span className="font-racing text-white text-lg">{comparisonProducts.length}/3</span>
                  </div>

                  {/* Selected products */}
                  <div className="hidden md:flex items-center gap-2">
                    {selectedProducts.map(product => (
                      <span
                        key={product.id}
                        className="px-3 py-1 bg-white/10 rounded font-racing text-xs text-white"
                      >
                        {product.name[locale].split(' ').slice(0, 2).join(' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setComparisonProducts([])}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors font-racing text-sm text-white"
                  >
                    {t('comparison.clearAll').toUpperCase()}
                  </button>
                  <button
                    onClick={() => setShowComparison(true)}
                    disabled={comparisonProducts.length < 2}
                    className="px-6 py-2 bg-racing-green hover:bg-racing-green-dark rounded transition-colors font-racing text-sm text-white disabled:opacity-50"
                  >
                    {t('comparison.title').toUpperCase()}
                  </button>
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
