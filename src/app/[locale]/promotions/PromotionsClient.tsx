'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
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
    number: '01',
    discount: '20%',
    tag: { id: 'DISKON', en: 'DISCOUNT' },
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
    number: '02',
    discount: 'FREE',
    tag: { id: 'BONUS', en: 'BONUS' },
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
    number: '03',
    discount: '15%',
    tag: { id: 'MEMBER', en: 'MEMBER' },
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
    number: '04',
    discount: 'BUNDLE',
    tag: { id: 'PAKET', en: 'BUNDLE' },
  },
];

export default function PromotionsClient({ locale }: PromotionsClientProps) {
  const t = useTranslations('promotions');

  const activePromos = demoPromotions.filter(p => p.isActive);
  const expiredPromos = demoPromotions.filter(p => !p.isActive);

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section - Ticker/Billboard Style */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        {/* Animated diagonal stripes background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 40px,
                rgba(0, 150, 64, 0.5) 40px,
                rgba(0, 150, 64, 0.5) 80px
              )`,
            }}
          />
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-racing-green/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[100px]" />

        {/* Racing stripe top */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

        {/* Ticker tape effect at top */}
        <div className="absolute top-16 left-0 right-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="font-racing text-racing-green/20 text-xl mx-8 tracking-[0.3em]">
                SPECIAL OFFER • PROMO • DISCOUNT • LIMITED TIME •
              </span>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Main headline */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Tag */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-racing-green animate-pulse rounded-full" />
                  <div className="relative px-4 py-2 bg-racing-green rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                    <span className="font-racing text-white text-sm tracking-wider">
                      {activePromos.length} {locale === 'id' ? 'PROMO AKTIF' : 'ACTIVE DEALS'}
                    </span>
                  </div>
                </div>
              </motion.div>

              <h1 className="font-racing text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] mb-6">
                <span className="block">{locale === 'id' ? 'PROMO' : 'HOT'}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-racing-green via-gold to-racing-green">
                  {locale === 'id' ? 'TERBATAS' : 'DEALS'}
                </span>
              </h1>

              <p className="font-racing-alt text-foreground-muted text-lg max-w-md mb-8">
                {t('subtitle')}
              </p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <a
                  href="#promos"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-racing-green text-white font-racing tracking-wider overflow-hidden"
                >
                  <span className="relative z-10">{locale === 'id' ? 'LIHAT PROMO' : 'VIEW DEALS'}</span>
                  <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="absolute inset-0 bg-racing-green-dark translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right - Big Discount Display */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-racing-green/20 blur-[100px] rounded-full" />

                {/* Main container */}
                <div className="relative border-2 border-racing-green/30 bg-black/50 backdrop-blur-sm p-12">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-racing-green" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-racing-green" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-racing-green" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-racing-green" />

                  {/* Content */}
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="font-racing text-racing-green text-sm tracking-[0.3em] block mb-4">
                        {locale === 'id' ? 'HEMAT HINGGA' : 'SAVE UP TO'}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: 'spring', stiffness: 150 }}
                    >
                      <span className="font-racing text-8xl md:text-9xl font-black text-white block leading-none">
                        20<span className="text-racing-green">%</span>
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="mt-6"
                    >
                      <span className="font-racing text-foreground-muted text-sm tracking-wider block mb-6">
                        {locale === 'id' ? 'UNTUK PRODUK PILIHAN' : 'ON SELECTED PRODUCTS'}
                      </span>

                      {/* Mini promo tags */}
                      <div className="flex justify-center gap-3">
                        {activePromos.slice(0, 3).map((promo, index) => (
                          <motion.div
                            key={promo.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 + index * 0.1 }}
                            className="px-3 py-1.5 font-racing text-xs text-white"
                            style={{ backgroundColor: promo.color }}
                          >
                            {promo.discount}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Animated border line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, rotate: -12, y: 20 }}
                  animate={{ opacity: 1, rotate: -12, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="absolute -top-6 -right-6 bg-gold px-4 py-2"
                >
                  <span className="font-racing text-black text-sm font-bold">
                    {locale === 'id' ? 'TERBATAS!' : 'LIMITED!'}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-racing-green rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Active Promotions - Magazine Layout */}
      <section id="promos" className="relative py-24 bg-background-secondary overflow-hidden">
        {/* Racing stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

        {/* Large background number */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 racing-number text-[40vw] leading-none text-white/[0.02] pointer-events-none select-none">
          %
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-16"
          >
            <div>
              <span className="font-racing text-racing-green text-sm tracking-[0.3em] block mb-2">
                {locale === 'id' ? 'JANGAN LEWATKAN' : "DON'T MISS OUT"}
              </span>
              <h2 className="font-racing text-4xl md:text-5xl font-black text-white">
                {t('active')}
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-12 h-1 bg-racing-green" />
              <div className="w-4 h-1 bg-gold" />
              <div className="w-2 h-1 bg-white/50" />
            </div>
          </motion.div>

          {/* Promotions - Alternating Layout */}
          <div className="space-y-8">
            {activePromos.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-stretch`}
              >
                {/* Discount side */}
                <div
                  className="md:w-1/3 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${promo.color}30 0%, ${promo.color}10 100%)` }}
                >
                  <div className="absolute inset-0 opacity-20">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 10px,
                          ${promo.color}20 10px,
                          ${promo.color}20 20px
                        )`,
                      }}
                    />
                  </div>

                  <div className="relative p-8 md:p-12 flex flex-col justify-center items-center text-center h-full min-h-[200px]">
                    {/* Tag */}
                    <span
                      className="px-3 py-1 text-xs font-racing tracking-wider mb-4"
                      style={{ backgroundColor: promo.color, color: 'white' }}
                    >
                      {promo.tag[locale]}
                    </span>

                    {/* Discount */}
                    <span
                      className="font-racing text-6xl md:text-7xl font-black leading-none"
                      style={{ color: promo.color }}
                    >
                      {promo.discount}
                    </span>

                    {/* Number */}
                    <span className="absolute bottom-4 right-4 racing-number text-6xl text-white/10">
                      {promo.number}
                    </span>
                  </div>

                  {/* Diagonal corner */}
                  <div
                    className={`absolute ${index % 2 === 0 ? '-right-6' : '-left-6'} top-1/2 -translate-y-1/2 w-12 h-24`}
                    style={{
                      background: promo.color,
                      clipPath: index % 2 === 0
                        ? 'polygon(0 0, 100% 50%, 0 100%)'
                        : 'polygon(100% 0, 0 50%, 100% 100%)',
                    }}
                  />
                </div>

                {/* Content side */}
                <div className="md:w-2/3 bg-background/80 border border-white/10 p-8 md:p-12 flex flex-col justify-center group-hover:border-white/20 transition-colors">
                  <h3 className="font-racing text-2xl md:text-3xl text-white mb-4 group-hover:translate-x-2 transition-transform">
                    {promo.title[locale]}
                  </h3>

                  <p className="font-racing-alt text-foreground-muted mb-6 max-w-lg">
                    {promo.description[locale]}
                  </p>

                  {/* Footer */}
                  <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
                    {/* Valid until */}
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        style={{ color: promo.color }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-racing text-sm text-foreground-muted">
                        {t('validUntil')}: <span className="text-white">{new Date(promo.endDate).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US')}</span>
                      </span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-racing-green opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-racing-green" />
                      </span>
                      <span className="font-racing text-sm text-racing-green">
                        {locale === 'id' ? 'MASIH BERLAKU' : 'STILL VALID'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expired Promotions */}
      {expiredPromos.length > 0 && (
        <section className="relative py-16 bg-black">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-racing text-xl text-foreground-muted mb-8 flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('expired')}
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
              {expiredPromos.map((promo) => (
                <div
                  key={promo.id}
                  className="flex-shrink-0 w-64 p-4 bg-white/5 border border-white/5 opacity-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-racing text-2xl text-white/30">{promo.discount}</span>
                    <span className="px-2 py-0.5 bg-white/10 font-racing text-[10px] text-foreground-muted">
                      EXPIRED
                    </span>
                  </div>
                  <h3 className="font-racing text-sm text-foreground-muted">{promo.title[locale]}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stripe */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />
        </section>
      )}

      {/* Empty State */}
      {demoPromotions.length === 0 && (
        <section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-12 h-12 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-racing text-foreground-muted text-lg">
              {locale === 'id' ? 'Belum ada promosi saat ini.' : 'No promotions available at the moment.'}
            </p>
            <p className="font-racing-alt text-foreground-muted/50 text-sm mt-2">
              {locale === 'id' ? 'Kunjungi lagi nanti!' : 'Check back soon!'}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
