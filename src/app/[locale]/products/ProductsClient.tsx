'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
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
    color: '#e10600',
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
    color: '#e10600',
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
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-racing-red text-white'
                  : 'bg-white/5 text-foreground-muted hover:bg-white/10 hover:text-white'
              }`}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>

        {/* Comparison bar */}
        <AnimatePresence>
          {comparisonProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-0 left-0 right-0 z-40 bg-background-secondary/95 backdrop-blur-lg border-t border-white/10 p-4"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">
                    {comparisonProducts.length} {t('comparison.selectProducts')}
                  </span>
                  <div className="flex gap-2">
                    {selectedProducts.map(product => (
                      <span
                        key={product.id}
                        className="px-3 py-1 bg-racing-red/20 text-racing-red text-sm rounded-full"
                      >
                        {product.name[locale].split(' ').slice(0, 2).join(' ')}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setComparisonProducts([])}
                  >
                    {t('comparison.clearAll')}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowComparison(true)}
                    disabled={comparisonProducts.length < 2}
                  >
                    {t('comparison.title')}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          <AnimatePresence mode="wait">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-background-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 h-full flex flex-col">
                  {/* Product image placeholder */}
                  <div className="relative aspect-square bg-gradient-to-br from-background-tertiary to-background p-8 flex items-center justify-center">
                    {/* Oil bottle illustration */}
                    <div className="relative">
                      <div
                        className="w-28 h-40 rounded-lg transition-transform group-hover:scale-110 duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${product.color}20 0%, ${product.color}40 100%)`,
                          border: `2px solid ${product.color}60`,
                        }}
                      >
                        <div
                          className="absolute top-2 left-1/2 -translate-x-1/2 w-7 h-3 rounded-t-lg"
                          style={{ backgroundColor: product.color }}
                        />
                        <div className="absolute inset-3 flex flex-col items-center justify-center text-center">
                          <span className="text-xl font-bold text-white">S</span>
                          <span className="text-[10px] text-white/80 mt-1">{product.viscosity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full text-white"
                        style={{ backgroundColor: `${product.color}cc` }}
                      >
                        {product.category}
                      </span>
                    </div>

                    {/* Compare checkbox */}
                    <button
                      onClick={() => toggleComparison(product.id)}
                      className={`absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        comparisonProducts.includes(product.id)
                          ? 'bg-racing-red text-white'
                          : 'bg-white/10 text-white/50 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {comparisonProducts.includes(product.id) ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-racing-red transition-colors">
                      {product.name[locale]}
                    </h3>
                    <p className="text-foreground-muted text-sm mb-4 flex-1">
                      {product.description[locale]}
                    </p>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="px-3 py-2 bg-white/5 rounded-lg">
                        <div className="text-xs text-foreground-muted">Viscosity</div>
                        <div className="text-sm font-medium text-white">{product.viscosity}</div>
                      </div>
                      <div className="px-3 py-2 bg-white/5 rounded-lg">
                        <div className="text-xs text-foreground-muted">Volume</div>
                        <div className="text-sm font-medium text-white">{product.volume}ml</div>
                      </div>
                    </div>

                    {/* Standards */}
                    <div className="flex gap-2">
                      <span className="px-2 py-1 text-xs bg-racing-red/10 text-racing-red rounded">
                        {product.apiStandard}
                      </span>
                      <span className="px-2 py-1 text-xs bg-electric-blue/10 text-electric-blue rounded">
                        {product.jasoStandard}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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
    </div>
  );
}
