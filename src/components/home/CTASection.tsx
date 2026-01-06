'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import SpeedLines from '@/components/ui/SpeedLines';
import type { Locale } from '@/lib/types';

interface CTASectionProps {
  locale: Locale;
}

export default function CTASection({ locale }: CTASectionProps) {
  const t = useTranslations('home.cta');

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-racing-red/20 via-background to-background" />
      <SpeedLines color="red" intensity="medium" direction="left" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-racing-red/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-racing-red/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Racing checkered pattern accent */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 ${i % 2 === 0 ? 'bg-white' : 'bg-racing-red'}`}
                />
              ))}
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>

          <p className="text-lg text-foreground-muted max-w-2xl mx-auto mb-10">
            {t('description')}
          </p>

          <Button href="/dealers" size="lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t('button')}
          </Button>

          {/* Racing checkered pattern accent */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 ${i % 2 === 0 ? 'bg-racing-red' : 'bg-white'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
