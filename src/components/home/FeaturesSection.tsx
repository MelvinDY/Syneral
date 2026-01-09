'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/types';

interface FeaturesSectionProps {
  locale: Locale;
}

const features = [
  {
    key: 'quality',
    number: '01',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    color: '#009640',
  },
  {
    key: 'performance',
    number: '02',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: '#00a3e0',
  },
  {
    key: 'protection',
    number: '03',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: '#d4af37',
  },
];

export default function FeaturesSection({ locale }: FeaturesSectionProps) {
  const t = useTranslations('home.features');

  return (
    <section className="py-16 sm:py-24 lg:h-screen bg-black relative overflow-hidden flex flex-col justify-center">
      {/* Racing stripe top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

      {/* Background elements */}
      <div className="absolute inset-0 racing-stripes opacity-30" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-racing-green/5 to-transparent" />

      {/* Large background text */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 racing-number text-[20vw] leading-none text-white/[0.02] pointer-events-none select-none hidden sm:block">
        WHY
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 sm:w-3 sm:h-3 ${i % 2 === 0 ? 'bg-racing-green' : 'bg-white'}`}
                />
              ))}
            </div>
            <span className="font-racing text-racing-green text-xs sm:text-sm tracking-[0.2em]">
              {locale === 'id' ? 'KEUNGGULAN' : 'ADVANTAGES'}
            </span>
          </div>
          <h2 className="font-racing text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white">
            {t('title')}
          </h2>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Card with parallelogram shape */}
              <div className="relative h-full">
                {/* Parallelogram background */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-background-secondary/90 to-background/90 border border-white/10 skew-x-[-4deg] group-hover:border-opacity-30 transition-all duration-300"
                  style={{ borderColor: `${feature.color}30` }}
                />

                {/* Content */}
                <div className="relative p-5 sm:p-8 h-full">
                  {/* Racing number */}
                  <div className="absolute -top-4 -right-2 z-10">
                    <div
                      className="w-14 h-14 flex items-center justify-center skew-x-[-8deg]"
                      style={{ backgroundColor: feature.color }}
                    >
                      <span className="racing-number text-xl text-white skew-x-[8deg]">
                        {feature.number}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-16 h-16 flex items-center justify-center mb-6 skew-x-[-8deg] group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: `${feature.color}20`,
                      color: feature.color,
                    }}
                  >
                    <div className="skew-x-[8deg]">{feature.icon}</div>
                  </div>

                  {/* Text */}
                  <h3 className="font-racing text-xl text-white mb-3 tracking-wide">
                    {t(`${feature.key}.title`)}
                  </h3>
                  <p className="font-racing-alt text-foreground-muted leading-relaxed text-sm">
                    {t(`${feature.key}.description`)}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 skew-x-[-4deg] opacity-50 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: feature.color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Racing stripe bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
