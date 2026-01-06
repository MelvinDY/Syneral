'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import type { Locale } from '@/lib/types';

interface ProductsSectionProps {
  locale: Locale;
}

// Demo products - will be replaced with Sanity data
const demoProducts = [
  {
    id: '1',
    name: { id: 'Syneral 4T Full Synthetic Plus Ester', en: 'Syneral 4T Full Synthetic Plus Ester' },
    category: '4t',
    viscosity: '10W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MA2',
    volume: 800,
    description: {
      id: 'Oli motor full synthetic dengan teknologi Ester untuk performa maksimal',
      en: 'Full synthetic motor oil with Ester technology for maximum performance'
    },
    color: '#e10600',
  },
  {
    id: '2',
    name: { id: 'Syneral MATIC Full Synthetic Plus Ester', en: 'Syneral MATIC Full Synthetic Plus Ester' },
    category: 'matic',
    viscosity: '5W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MB',
    volume: 800,
    description: {
      id: 'Oli motor matic full synthetic untuk perlindungan CVT optimal',
      en: 'Full synthetic scooter oil for optimal CVT protection'
    },
    color: '#00a3e0',
  },
  {
    id: '3',
    name: { id: 'Syneral Racing Ester', en: 'Syneral Racing Ester' },
    category: 'specialty',
    viscosity: '10W-50',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MA2',
    volume: 1000,
    description: {
      id: 'Oli racing dengan 100% Ester untuk kondisi ekstrem',
      en: 'Racing oil with 100% Ester for extreme conditions'
    },
    color: '#d4af37',
  },
];

export default function ProductsSection({ locale }: ProductsSectionProps) {
  const t = useTranslations('home.products');
  const tCommon = useTranslations('common');

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {demoProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-background-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300">
                {/* Product image placeholder */}
                <div className="relative aspect-square bg-gradient-to-br from-background-tertiary to-background p-8 flex items-center justify-center">
                  {/* Oil bottle illustration */}
                  <div className="relative">
                    <div
                      className="w-32 h-48 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${product.color}20 0%, ${product.color}40 100%)`,
                        border: `2px solid ${product.color}60`,
                      }}
                    >
                      <div
                        className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-4 rounded-t-lg"
                        style={{ backgroundColor: product.color }}
                      />
                      <div className="absolute inset-4 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-bold text-white">S</span>
                        <span className="text-xs text-white/80 mt-1">{product.viscosity}</span>
                      </div>
                    </div>
                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                      style={{ backgroundColor: `${product.color}30` }}
                    />
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
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-racing-red transition-colors">
                    {product.name[locale]}
                  </h3>
                  <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                    {product.description[locale]}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 text-xs bg-white/5 rounded text-foreground-muted">
                      {product.apiStandard}
                    </span>
                    <span className="px-2 py-1 text-xs bg-white/5 rounded text-foreground-muted">
                      {product.jasoStandard}
                    </span>
                    <span className="px-2 py-1 text-xs bg-white/5 rounded text-foreground-muted">
                      {product.volume}ml
                    </span>
                  </div>

                  {/* Link */}
                  <div className="flex items-center text-sm font-medium text-racing-red group-hover:translate-x-2 transition-transform">
                    {tCommon('learnMore')}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/products" variant="outline" size="lg">
            {tCommon('viewAll')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
