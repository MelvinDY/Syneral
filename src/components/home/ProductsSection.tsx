'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import type { Locale } from '@/lib/types';

interface ProductsSectionProps {
  locale: Locale;
}

// Demo products - will be replaced with Sanity data
const demoProducts = [
  {
    id: '1',
    name: { id: 'Syneral 4T Full Synthetic', en: 'Syneral 4T Full Synthetic' },
    tagline: { id: 'Plus Ester Technology', en: 'Plus Ester Technology' },
    category: '4T',
    viscosity: '10W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MA2',
    volume: '800ml',
    color: '#009640',
    number: '01',
  },
  {
    id: '2',
    name: { id: 'Syneral MATIC Full Synthetic', en: 'Syneral MATIC Full Synthetic' },
    tagline: { id: 'CVT Protection Formula', en: 'CVT Protection Formula' },
    category: 'MATIC',
    viscosity: '5W-40',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MB',
    volume: '800ml',
    color: '#00a3e0',
    number: '02',
  },
  {
    id: '3',
    name: { id: 'Syneral Racing Ester', en: 'Syneral Racing Ester' },
    tagline: { id: '100% Ester Base', en: '100% Ester Base' },
    category: 'RACING',
    viscosity: '10W-50',
    apiStandard: 'API SN',
    jasoStandard: 'JASO MA2',
    volume: '1000ml',
    color: '#d4af37',
    number: '03',
  },
];

export default function ProductsSection({ locale }: ProductsSectionProps) {
  const t = useTranslations('home.products');
  const tCommon = useTranslations('common');

  return (
    <section className="h-screen py-24 bg-background-secondary relative overflow-hidden flex flex-col justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Large background number */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.02 }}
        viewport={{ once: true }}
        className="absolute right-0 top-1/2 -translate-y-1/2 racing-number text-[30vw] leading-none text-white pointer-events-none select-none"
      >
        S1
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 ${i % 2 === 0 ? 'bg-racing-green' : 'bg-white'}`}
                  />
                ))}
              </div>
              <span className="font-racing text-racing-green text-sm tracking-[0.2em]">
                {locale === 'id' ? 'PRODUK KAMI' : 'OUR PRODUCTS'}
              </span>
            </div>
            <h2 className="font-racing text-4xl md:text-5xl lg:text-6xl font-black text-white">
              {t('title')}
            </h2>
            <p className="font-racing-alt text-foreground-muted mt-4 max-w-xl">
              {t('subtitle')}
            </p>
          </div>

          <Button href="/products" variant="outline" className="font-racing shrink-0">
            {tCommon('viewAll')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {demoProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Product card */}
              <div className="relative h-full">
                {/* Parallelogram background */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background-secondary/95 border border-white/10 skew-x-[-4deg] group-hover:border-white/20 transition-all duration-300" />

                {/* Top color bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 skew-x-[-4deg]"
                  style={{ backgroundColor: product.color }}
                />

                {/* Content */}
                <div className="relative p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    {/* Category badge */}
                    <div
                      className="px-4 py-1 skew-x-[-8deg] font-racing text-xs tracking-wider text-white"
                      style={{ backgroundColor: product.color }}
                    >
                      <span className="skew-x-[8deg] block">{product.category}</span>
                    </div>

                    {/* Product number */}
                    <span className="racing-number text-4xl" style={{ color: `${product.color}40` }}>
                      {product.number}
                    </span>
                  </div>

                  {/* Product visual */}
                  <div className="relative flex-1 flex items-center justify-center py-8">
                    {/* Oil bottle stylized */}
                    <div className="relative">
                      <div
                        className="w-24 h-36 skew-x-[-8deg] relative"
                        style={{
                          background: `linear-gradient(135deg, ${product.color}30 0%, ${product.color}10 100%)`,
                          border: `2px solid ${product.color}50`,
                        }}
                      >
                        {/* Cap */}
                        <div
                          className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5"
                          style={{ backgroundColor: product.color }}
                        />
                        {/* Label */}
                        <div className="absolute inset-3 flex flex-col items-center justify-center skew-x-[8deg]">
                          <span className="font-racing text-3xl font-black text-white">S</span>
                          <span className="font-racing text-xs text-white/80 mt-1">{product.viscosity}</span>
                        </div>
                      </div>

                      {/* Glow */}
                      <div
                        className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                        style={{ backgroundColor: product.color }}
                      />
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="mt-auto">
                    <h3 className="font-racing text-lg text-white mb-1 tracking-wide group-hover:text-racing-green transition-colors">
                      {product.name[locale]}
                    </h3>
                    <p className="font-racing-alt text-sm text-foreground-muted mb-4">
                      {product.tagline[locale]}
                    </p>

                    {/* Specs row */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[product.apiStandard, product.jasoStandard, product.volume].map((spec) => (
                        <div key={spec} className="relative">
                          <div className="absolute inset-0 bg-white/5 skew-x-[-8deg]" />
                          <span className="relative px-3 py-1 font-racing text-[10px] text-foreground-muted tracking-wider">
                            {spec}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div
                      className="flex items-center gap-2 font-racing text-sm tracking-wider group-hover:translate-x-2 transition-transform"
                      style={{ color: product.color }}
                    >
                      {tCommon('learnMore')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-12 h-12 skew-x-[-4deg] opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${product.color} 50%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom racing stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />
    </section>
  );
}
