'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/types';

interface AboutClientProps {
  locale: Locale;
}

const certifications = [
  {
    name: 'API SN',
    fullName: 'American Petroleum Institute',
    description: {
      id: 'Standar kualitas oli motor tertinggi dari Amerika untuk perlindungan mesin optimal',
      en: 'Highest motor oil quality standard from America for optimal engine protection'
    },
    color: '#009640',
    number: '01',
  },
  {
    name: 'JASO MA2',
    fullName: 'Japanese Automobile Standards',
    description: {
      id: 'Sertifikasi Jepang untuk oli motor 4-tak dengan kopling basah performa tinggi',
      en: 'Japanese certification for high-performance 4-stroke wet clutch motorcycles'
    },
    color: '#00a3e0',
    number: '02',
  },
  {
    name: 'JASO MB',
    fullName: 'Japanese Automobile Standards',
    description: {
      id: 'Standar khusus untuk motor matic dengan sistem CVT modern',
      en: 'Special standard for automatic scooters with modern CVT systems'
    },
    color: '#d4af37',
    number: '03',
  },
];

const stats = [
  { value: '2015', labelId: 'TAHUN BERDIRI', labelEn: 'ESTABLISHED' },
  { value: '100+', labelId: 'DEALER RESMI', labelEn: 'OFFICIAL DEALERS' },
  { value: '34', labelId: 'PROVINSI', labelEn: 'PROVINCES' },
  { value: '1000+', labelId: 'PELANGGAN SETIA', labelEn: 'LOYAL CUSTOMERS' },
];

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    titleId: 'KUALITAS PREMIUM',
    titleEn: 'PREMIUM QUALITY',
    descId: 'Standar internasional dalam setiap tetes oli',
    descEn: 'International standards in every drop of oil',
    number: '01',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    titleId: 'TEKNOLOGI ESTER',
    titleEn: 'ESTER TECHNOLOGY',
    descId: 'Formula canggih untuk performa maksimal',
    descEn: 'Advanced formula for maximum performance',
    number: '02',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    titleId: 'PERLINDUNGAN TOTAL',
    titleEn: 'TOTAL PROTECTION',
    descId: 'Menjaga mesin dalam kondisi prima',
    descEn: 'Keeping your engine in prime condition',
    number: '03',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    titleId: 'KOMUNITAS RIDER',
    titleEn: 'RIDER COMMUNITY',
    descId: 'Mendukung komunitas motor Indonesia',
    descEn: 'Supporting Indonesian motorcycle community',
    number: '04',
  },
];

export default function AboutClient({ locale }: AboutClientProps) {
  const t = useTranslations('about');

  return (
    <div className="bg-black">
      {/* Hero Section - Full viewport */}
      <section className="h-screen relative overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 racing-stripes opacity-30" />

        {/* Large background text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 racing-number text-[25vw] leading-none text-white/[0.02] pointer-events-none select-none">
          S1
        </div>

        {/* Red accent */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-racing-green/10 to-transparent" />

        {/* Racing stripe top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Checkered accent */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 ${i % 2 === 0 ? 'bg-white' : 'bg-racing-green'}`}
                    />
                  ))}
                </div>
                <span className="font-racing text-racing-green text-sm tracking-[0.2em]">
                  {locale === 'id' ? 'TENTANG KAMI' : 'ABOUT US'}
                </span>
              </div>

              <h1 className="font-racing text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-6">
                <span className="block">PREMIUM</span>
                <span className="block text-racing-green">GUARANTEED</span>
                <span className="block">LUBRICANT</span>
              </h1>

              <p className="font-racing-alt text-lg text-foreground-muted max-w-lg mb-8">
                {locale === 'id'
                  ? 'PT Syneral Indonesia adalah produsen oli motor premium Indonesia dengan teknologi Ester untuk performa mesin maksimal dan perlindungan optimal.'
                  : 'PT Syneral Indonesia is an Indonesian premium motor oil manufacturer with Ester technology for maximum engine performance and optimal protection.'}
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-white/5 skew-x-[-8deg] group-hover:bg-racing-green/10 transition-colors" />
                    <div className="relative py-3 text-center">
                      <div className="font-racing text-2xl font-bold text-racing-green">
                        {stat.value}
                      </div>
                      <div className="font-racing text-[8px] text-foreground-muted tracking-wider">
                        {locale === 'id' ? stat.labelId : stat.labelEn}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Parallelogram frame */}
                <div className="absolute inset-0 border-2 border-racing-green/30 skew-x-[-8deg]" />

                {/* Oil bottle visual */}
                <div className="relative p-12 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-40 h-60 skew-x-[-8deg] bg-gradient-to-br from-racing-green/20 to-racing-green/5 border-2 border-racing-green/40 relative">
                      {/* Cap */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-6 bg-racing-green" />
                      {/* Label */}
                      <div className="absolute inset-4 flex flex-col items-center justify-center skew-x-[8deg]">
                        <span className="font-racing text-6xl font-black text-white">S</span>
                        <span className="font-racing text-sm text-white/60 mt-2">SYNERAL</span>
                        <span className="font-racing text-xs text-racing-green mt-1">PREMIUM OIL</span>
                      </div>
                    </div>
                    {/* Glow */}
                    <div className="absolute inset-0 blur-3xl bg-racing-green/20" />
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-racing-green" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-racing-green" />
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
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-racing text-xs text-foreground-muted tracking-widest">SCROLL</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-racing-green rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section - Full viewport */}
      <section className="h-screen relative overflow-hidden flex items-center bg-background-secondary">
        {/* Racing stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

        {/* Background */}
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 ${i % 2 === 0 ? 'bg-racing-green' : 'bg-white'}`}
                    />
                  ))}
                </div>
                <span className="font-racing text-racing-green text-sm tracking-[0.2em]">
                  {locale === 'id' ? 'CERITA KAMI' : 'OUR STORY'}
                </span>
              </div>

              <h2 className="font-racing text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8">
                {locale === 'id' ? 'MISI & VISI' : 'MISSION & VISION'}
              </h2>

              {/* Mission card */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-background/80 border border-white/10 skew-x-[-4deg]" />
                <div className="relative p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-racing-green skew-x-[-8deg] flex items-center justify-center">
                      <span className="font-racing text-white skew-x-[8deg]">M</span>
                    </div>
                    <h3 className="font-racing text-xl text-white">{t('mission.title')}</h3>
                  </div>
                  <p className="font-racing-alt text-foreground-muted">
                    {t('mission.description')}
                  </p>
                </div>
              </div>

              {/* Vision card */}
              <div className="relative">
                <div className="absolute inset-0 bg-background/80 border border-white/10 skew-x-[-4deg]" />
                <div className="relative p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gold skew-x-[-8deg] flex items-center justify-center">
                      <span className="font-racing text-black skew-x-[8deg]">V</span>
                    </div>
                    <h3 className="font-racing text-xl text-white">{t('vision.title')}</h3>
                  </div>
                  <p className="font-racing-alt text-foreground-muted">
                    {t('vision.description')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-racing text-2xl text-white mb-6">
                {locale === 'id' ? 'NILAI-NILAI KAMI' : 'OUR VALUES'}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.titleEn}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-background/60 border border-white/10 skew-x-[-4deg] group-hover:border-racing-green/30 transition-colors" />
                    <div className="relative p-4">
                      {/* Number */}
                      <span className="absolute top-2 right-2 racing-number text-2xl text-white/10">
                        {value.number}
                      </span>

                      <div className="text-racing-green mb-3">{value.icon}</div>
                      <h4 className="font-racing text-sm text-white mb-1">
                        {locale === 'id' ? value.titleId : value.titleEn}
                      </h4>
                      <p className="font-racing-alt text-xs text-foreground-muted">
                        {locale === 'id' ? value.descId : value.descEn}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section - Full viewport */}
      <section className="h-screen relative overflow-hidden flex items-center bg-black">
        {/* Racing stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

        {/* Background */}
        <div className="absolute inset-0 racing-stripes opacity-20" />

        {/* Large background text */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 racing-number text-[15vw] leading-none text-white/[0.02] pointer-events-none select-none">
          CERTIFIED
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 ${i % 2 === 0 ? 'bg-racing-green' : 'bg-white'}`}
                  />
                ))}
              </div>
              <span className="font-racing text-racing-green text-sm tracking-[0.2em]">
                {locale === 'id' ? 'SERTIFIKASI' : 'CERTIFICATIONS'}
              </span>
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 ${i % 2 === 0 ? 'bg-white' : 'bg-racing-green'}`}
                  />
                ))}
              </div>
            </div>
            <h2 className="font-racing text-4xl md:text-5xl lg:text-6xl font-black text-white">
              {locale === 'id' ? 'STANDAR INTERNASIONAL' : 'INTERNATIONAL STANDARDS'}
            </h2>
          </motion.div>

          {/* Certifications grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative">
                  {/* Parallelogram background */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-background-secondary/90 to-background/90 border border-white/10 skew-x-[-4deg] group-hover:border-opacity-50 transition-all"
                    style={{ borderColor: `${cert.color}30` }}
                  />

                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 skew-x-[-4deg]"
                    style={{ backgroundColor: cert.color }}
                  />

                  <div className="relative p-8 text-center">
                    {/* Number */}
                    <div className="absolute -top-4 -right-2 z-10">
                      <div
                        className="w-12 h-12 flex items-center justify-center skew-x-[-8deg]"
                        style={{ backgroundColor: cert.color }}
                      >
                        <span className="racing-number text-lg text-white skew-x-[8deg]">
                          {cert.number}
                        </span>
                      </div>
                    </div>

                    {/* Cert name */}
                    <div
                      className="font-racing text-4xl font-black mb-2"
                      style={{ color: cert.color }}
                    >
                      {cert.name}
                    </div>
                    <div className="font-racing text-xs text-foreground-muted tracking-wider mb-4">
                      {cert.fullName}
                    </div>

                    {/* Divider */}
                    <div className="w-16 h-0.5 mx-auto mb-4" style={{ backgroundColor: cert.color }} />

                    {/* Description */}
                    <p className="font-racing-alt text-sm text-foreground-muted">
                      {cert.description[locale]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom racing stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />
      </section>
    </div>
  );
}
