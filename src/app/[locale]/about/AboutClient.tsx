'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import SpeedLines from '@/components/ui/SpeedLines';
import type { Locale } from '@/lib/types';

interface AboutClientProps {
  locale: Locale;
}

const certifications = [
  { key: 'apiSn', icon: '🏆', color: '#e10600' },
  { key: 'jasoMa2', icon: '⚡', color: '#00a3e0' },
  { key: 'jasoMb', icon: '🛵', color: '#d4af37' },
];

const stats = [
  { value: '2015', labelId: 'Tahun Berdiri', labelEn: 'Established' },
  { value: '100+', labelId: 'Dealer', labelEn: 'Dealers' },
  { value: '5+', labelId: 'Produk', labelEn: 'Products' },
  { value: '1000+', labelId: 'Pelanggan Setia', labelEn: 'Loyal Customers' },
];

export default function AboutClient({ locale }: AboutClientProps) {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-racing-red/10 via-background to-background" />
        <SpeedLines color="red" intensity="light" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-racing-red mb-2">
                  {stat.value}
                </div>
                <div className="text-foreground-muted">
                  {locale === 'id' ? stat.labelId : stat.labelEn}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 racing-stripe pb-4">
                {t('story.title')}
              </h2>
              <p className="text-foreground-muted text-lg leading-relaxed mb-8">
                {t('story.description')}
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-background-secondary p-6 rounded-xl border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-3">{t('mission.title')}</h3>
                  <p className="text-foreground-muted text-sm">{t('mission.description')}</p>
                </div>
                <div className="bg-background-secondary p-6 rounded-xl border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-3">{t('vision.title')}</h3>
                  <p className="text-foreground-muted text-sm">{t('vision.description')}</p>
                </div>
              </div>
            </motion.div>

            {/* Visual element */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-background-secondary to-background-tertiary rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                {/* Decorative oil drop */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-racing-red/20 to-transparent blur-3xl" />
                </div>
                <div className="relative">
                  <div className="w-48 h-72 rounded-2xl bg-gradient-to-br from-racing-red/30 to-racing-red/10 border-2 border-racing-red/50 flex flex-col items-center justify-center">
                    <div className="w-12 h-6 bg-racing-red rounded-t-lg -mt-3" />
                    <span className="text-6xl font-bold text-white mt-4">S</span>
                    <span className="text-sm text-white/60 mt-2">SYNERAL</span>
                    <span className="text-xs text-racing-red mt-1">Premium Oil</span>
                  </div>
                </div>
                {/* Racing stripes */}
                <div className="absolute top-8 left-8 w-32 h-1 bg-gradient-to-r from-racing-red to-transparent" />
                <div className="absolute top-12 left-8 w-24 h-1 bg-gradient-to-r from-electric-blue to-transparent" />
                <div className="absolute bottom-8 right-8 w-32 h-1 bg-gradient-to-l from-racing-red to-transparent" />
                <div className="absolute bottom-12 right-8 w-24 h-1 bg-gradient-to-l from-gold to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('certifications.title')} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-2xl p-8 border border-white/5 text-center hover:border-white/10 transition-colors"
              >
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl"
                  style={{ backgroundColor: `${cert.color}20` }}
                >
                  {cert.icon}
                </div>
                <p className="text-foreground-muted">{t(`certifications.${cert.key}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={locale === 'id' ? 'Nilai-Nilai Kami' : 'Our Values'}
            subtitle={locale === 'id' ? 'Prinsip yang memandu setiap langkah kami' : 'Principles that guide our every step'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🎯',
                titleId: 'Kualitas',
                titleEn: 'Quality',
                descId: 'Standar tertinggi dalam setiap produk',
                descEn: 'Highest standards in every product',
              },
              {
                icon: '🤝',
                titleId: 'Integritas',
                titleEn: 'Integrity',
                descId: 'Jujur dan transparan dalam bisnis',
                descEn: 'Honest and transparent in business',
              },
              {
                icon: '💡',
                titleId: 'Inovasi',
                titleEn: 'Innovation',
                descId: 'Terus berkembang dengan teknologi terbaru',
                descEn: 'Continuously evolving with latest technology',
              },
              {
                icon: '❤️',
                titleId: 'Pelanggan',
                titleEn: 'Customer Focus',
                descId: 'Kepuasan pelanggan adalah prioritas',
                descEn: 'Customer satisfaction is our priority',
              },
            ].map((value, index) => (
              <motion.div
                key={value.titleEn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background-secondary rounded-xl p-6 border border-white/5 hover:border-racing-red/30 transition-colors group"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-racing-red transition-colors">
                  {locale === 'id' ? value.titleId : value.titleEn}
                </h3>
                <p className="text-foreground-muted text-sm">
                  {locale === 'id' ? value.descId : value.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
