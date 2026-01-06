'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import type { Locale } from '@/lib/types';

interface HeroSectionProps {
  locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('home.hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-black" />

      {/* Racing grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Diagonal racing stripes */}
      <div className="absolute inset-0 racing-stripes opacity-50" />

      {/* Large background number */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.03, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 racing-number text-[40vw] leading-none text-white pointer-events-none select-none"
      >
        01
      </motion.div>

      {/* Red accent glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-racing-red/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-racing-red/20 to-transparent blur-3xl" />

      {/* Speed lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '200%', opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="absolute h-[2px] bg-gradient-to-r from-transparent via-racing-red to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              width: '50%',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12 lg:gap-20">
          {/* Left side - Text content */}
          <div className="relative z-10 lg:max-w-[48%] xl:max-w-[45%]">
            {/* Checkered flag accent */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="flex">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 ${i % 2 === 0 ? 'bg-white' : 'bg-racing-red'}`}
                  />
                ))}
              </div>
              <span className="font-racing text-racing-red text-sm tracking-[0.2em]">
                {t('subtitle')}
              </span>
            </motion.div>

            {/* Main heading with racing style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-racing text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] mb-2">
                <span className="block">{locale === 'id' ? 'PERFORMA' : 'PERFORMANCE'}</span>
                <span className="block text-racing-red">{locale === 'id' ? 'TANPA' : 'WITHOUT'}</span>
                <span className="block relative">
                  {locale === 'id' ? 'KOMPROMI' : 'COMPROMISE'}
                  {/* Underline accent */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 h-2 bg-racing-red origin-left"
                    style={{ width: '60%' }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-racing-alt text-lg sm:text-xl text-foreground-muted max-w-lg mt-8 mb-10"
            >
              {t('description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Button href="/products" size="lg" className="font-racing">
                {t('cta')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button href="/dealers" variant="outline" size="lg" className="font-racing">
                {locale === 'id' ? 'CARI DEALER' : 'FIND DEALER'}
              </Button>
            </motion.div>
          </div>

          {/* Right side - Racing stats display (Parallelogram) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-full lg:w-[380px] xl:w-[420px] lg:flex-shrink-0"
          >
            {/* Stats card - Parallelogram shape */}
            <div className="relative">
              {/* Parallelogram background */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-background-secondary/90 to-background/90 backdrop-blur-sm border border-white/10 skew-x-[-8deg]"
              />

              {/* Racing number badge - positioned outside the skew */}
              <div className="absolute -top-6 left-4 z-20">
                <div className="w-16 h-16 bg-racing-red skew-x-[-8deg] flex items-center justify-center">
                  <span className="racing-number text-2xl text-white skew-x-[8deg]">S1</span>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden skew-x-[-8deg]">
                <div className="absolute top-0 right-0 w-full h-full bg-racing-red clip-corner" />
              </div>

              {/* Content (un-skewed) */}
              <div className="relative z-10 p-6 pt-14">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'API SN', label: locale === 'id' ? 'STANDAR KUALITAS' : 'QUALITY STANDARD' },
                    { value: 'JASO MA2', label: locale === 'id' ? 'SERTIFIKASI' : 'CERTIFICATION' },
                    { value: '100%', label: locale === 'id' ? 'FULL SYNTHETIC' : 'FULL SYNTHETIC' },
                    { value: '+ESTER', label: locale === 'id' ? 'TEKNOLOGI' : 'TECHNOLOGY' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      className="relative text-center p-4"
                    >
                      {/* Individual stat parallelogram background */}
                      <div className="absolute inset-0 bg-black/40 border border-white/5 skew-x-[-8deg]" />
                      <div className="relative">
                        <div className="font-racing text-xl sm:text-2xl font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="font-racing text-[9px] text-foreground-muted tracking-widest">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom racing stripe - skewed */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-red via-gold to-racing-red skew-x-[-8deg]" />

              {/* Side accent lines */}
              <div className="absolute top-0 bottom-0 -right-2 w-1 bg-racing-red skew-x-[-8deg]" />
              <div className="absolute top-0 bottom-0 -right-4 w-0.5 bg-racing-red/50 skew-x-[-8deg]" />
            </div>

            {/* Floating glow element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-8 -right-8 w-32 h-32 bg-racing-red/20 rounded-full blur-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom checkered flag border */}
      <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
        <div className="checkered-flag w-full h-full opacity-20" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-racing text-xs text-foreground-muted tracking-widest">SCROLL</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-racing-red rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .clip-corner {
          clip-path: polygon(100% 0, 0 0, 100% 100%);
        }
      `}</style>
    </section>
  );
}
