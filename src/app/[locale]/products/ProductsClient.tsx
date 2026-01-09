'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
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
    name: { id: 'SyneRal Full Synthetic Plus Ester 4T', en: 'SyneRal Full Synthetic Plus Ester 4T' },
    slug: 'syneral-full-synthetic-plus-ester-4t',
    category: 'motorcycle' as const,
    viscosity: '10W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MA2',
    volume: 800,
    image: '/images/products/product-1.png',
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
