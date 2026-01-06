'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Locale } from '@/lib/types';

interface FeaturesSectionProps {
  locale: Locale;
}

const features = [
  {
    key: 'quality',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    color: 'racing-red',
  },
  {
    key: 'performance',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'electric-blue',
  },
  {
    key: 'protection',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'gold',
  },
];

export default function FeaturesSection({ locale }: FeaturesSectionProps) {
  const t = useTranslations('home.features');

  return (
    <section className="py-24 bg-background-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-racing-red/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-racing-red/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-background rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300 h-full">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-6 text-${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  style={{
                    backgroundColor: feature.color === 'racing-red' ? 'rgba(225, 6, 0, 0.1)' :
                                    feature.color === 'electric-blue' ? 'rgba(0, 163, 224, 0.1)' :
                                    'rgba(212, 175, 55, 0.1)',
                    color: feature.color === 'racing-red' ? '#e10600' :
                           feature.color === 'electric-blue' ? '#00a3e0' :
                           '#d4af37',
                  }}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  {t(`${feature.key}.description`)}
                </p>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{
                    backgroundColor: feature.color === 'racing-red' ? '#e10600' :
                                    feature.color === 'electric-blue' ? '#00a3e0' :
                                    '#d4af37',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
