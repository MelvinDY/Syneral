'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Locale } from '@/lib/types';

interface PromotionsClientProps {
  locale: Locale;
}

// Demo promotions - will be replaced with Sanity data
const demoPromotions = [
  {
    id: '1',
    title: {
      id: 'Promo Tahun Baru 2024',
      en: 'New Year 2024 Promo'
    },
    description: {
      id: 'Dapatkan diskon 20% untuk pembelian 2 botol oli Syneral 4T Full Synthetic Plus Ester.',
      en: 'Get 20% discount for purchasing 2 bottles of Syneral 4T Full Synthetic Plus Ester oil.'
    },
    endDate: '2024-12-31',
    isActive: true,
    color: '#009640',
  },
  {
    id: '2',
    title: {
      id: 'Gratis Merchandise',
      en: 'Free Merchandise'
    },
    description: {
      id: 'Beli 3 botol oli Syneral MATIC dan dapatkan kaos eksklusif Syneral gratis!',
      en: 'Buy 3 bottles of Syneral MATIC oil and get an exclusive Syneral t-shirt for free!'
    },
    endDate: '2024-11-30',
    isActive: true,
    color: '#00a3e0',
  },
  {
    id: '3',
    title: {
      id: 'Diskon Member Komunitas',
      en: 'Community Member Discount'
    },
    description: {
      id: 'Member komunitas motor resmi mendapat diskon khusus 15% di semua dealer Syneral.',
      en: 'Official motorcycle community members get special 15% discount at all Syneral dealers.'
    },
    endDate: '2024-12-15',
    isActive: true,
    color: '#d4af37',
  },
  {
    id: '4',
    title: {
      id: 'Bundling Service',
      en: 'Service Bundle'
    },
    description: {
      id: 'Paket ganti oli + servis ringan dengan harga spesial di bengkel partner Syneral.',
      en: 'Oil change + light service package at special price at Syneral partner workshops.'
    },
    endDate: '2024-10-31',
    isActive: false,
    color: '#666666',
  },
];

export default function PromotionsClient({ locale }: PromotionsClientProps) {
  const t = useTranslations('promotions');

  const activePromos = demoPromotions.filter(p => p.isActive);
  const expiredPromos = demoPromotions.filter(p => !p.isActive);

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        {/* Active Promotions */}
        {activePromos.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              {t('active')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activePromos.map((promo, index) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="bg-background-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 h-full flex flex-col">
                    {/* Banner */}
                    <div
                      className="h-40 relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${promo.color}40 0%, ${promo.color}20 100%)` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white/20">%</span>
                      </div>
                      {/* Racing accent */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-1"
                        style={{ backgroundColor: promo.color }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3
                        className="text-xl font-bold mb-3 transition-colors"
                        style={{ color: promo.color }}
                      >
                        {promo.title[locale]}
                      </h3>
                      <p className="text-foreground-muted flex-1 mb-4">
                        {promo.description[locale]}
                      </p>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-foreground-muted pt-4 border-t border-white/5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {t('validUntil')}: {new Date(promo.endDate).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US')}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Expired Promotions */}
        {expiredPromos.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground-muted mb-8">
              {t('expired')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-60">
              {expiredPromos.map((promo, index) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-background-secondary rounded-2xl overflow-hidden border border-white/5 h-full flex flex-col">
                    {/* Banner */}
                    <div className="h-32 relative overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white/10">%</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1">
                      <h3 className="text-lg font-bold text-foreground-muted mb-2">
                        {promo.title[locale]}
                      </h3>
                      <p className="text-foreground-muted/70 text-sm">
                        {promo.description[locale]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {demoPromotions.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎁</div>
            <p className="text-foreground-muted text-lg">
              {locale === 'id' ? 'Belum ada promosi saat ini.' : 'No promotions available at the moment.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
