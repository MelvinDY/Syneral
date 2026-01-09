'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import type { Locale } from '@/lib/types';

interface CTASectionProps {
  locale: Locale;
}

export default function CTASection({ locale }: CTASectionProps) {
  const t = useTranslations('home.cta');

  return (
    <section className="h-screen py-32 relative overflow-hidden bg-black flex flex-col justify-center">
      {/* Racing stripe top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Diagonal racing stripes */}
        <div className="absolute inset-0 racing-stripes opacity-40" />

        {/* Red gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-racing-green/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-racing-green/10 via-transparent to-transparent" />

        {/* Animated speed lines */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '200%', opacity: [0, 0.5, 0.5, 0] }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-racing-green to-transparent"
            style={{
              top: `${25 + i * 15}%`,
              width: '60%',
            }}
          />
        ))}
      </div>

      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.03, scale: 1 }}
          viewport={{ once: true }}
          className="racing-number text-[25vw] leading-none text-white whitespace-nowrap"
        >
          FIND DEALER
        </motion.span>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Checkered flag accent */}
          <div className="flex justify-center mb-8">
            <div className="flex">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-4 h-4 ${i % 2 === 0 ? 'bg-white' : 'bg-racing-green'}`}
                />
              ))}
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-racing text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            {locale === 'id' ? (
              <>
                <span className="block">SIAP UNTUK</span>
                <span className="block text-racing-green">PERFORMA TERBAIK?</span>
              </>
            ) : (
              <>
                <span className="block">READY FOR</span>
                <span className="block text-racing-green">PEAK PERFORMANCE?</span>
              </>
            )}
          </h2>

          {/* Description */}
          <p className="font-racing-alt text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-10">
            {t('description')}
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button href="/dealers" size="lg" className="font-racing text-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t('button')}
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {[
              { value: '100+', label: locale === 'id' ? 'DEALER' : 'DEALERS' },
              { value: '34', label: locale === 'id' ? 'PROVINSI' : 'PROVINCES' },
              { value: '24/7', label: locale === 'id' ? 'DUKUNGAN' : 'SUPPORT' },
            ].map((stat, index) => (
              <div key={stat.label} className="relative group">
                {/* Parallelogram background */}
                <div className="absolute inset-0 bg-white/5 skew-x-[-8deg] group-hover:bg-racing-green/10 transition-colors" />
                <div className="relative py-4 text-center">
                  <div className="font-racing text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="font-racing text-[10px] text-foreground-muted tracking-widest">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Bottom checkered flag */}
          <div className="flex justify-center mt-12">
            <div className="flex">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className={`w-4 h-4 ${i % 2 === 0 ? 'bg-racing-green' : 'bg-white'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Racing stripe bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />
    </section>
  );
}
