'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { Locale } from '@/lib/types';

// Product images for slideshow
const productSlides = [
  { id: 1, image: '/images/products/product-1.png', name: 'Full Synthetic Plus Ester 4T' },
  { id: 2, image: '/images/products/product-2.png', name: 'Synthetic 4T' },
  { id: 3, image: '/images/products/product-3.png', name: 'Full Synthetic Plus Ester MATIC' },
  { id: 4, image: '/images/products/product-4.png', name: 'Synthetic MATIC' },
];

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
  { value: '2006', labelId: 'TAHUN BERDIRI', labelEn: 'ESTABLISHED' },
  { value: '3000', labelId: 'M² PABRIK', labelEn: 'M² FACTORY' },
  { value: '10M+', labelId: 'LITER/TAHUN', labelEn: 'LITERS/YEAR' },
  { value: '18+', labelId: 'TAHUN PENGALAMAN', labelEn: 'YEARS EXPERIENCE' },
];

const history = [
  { year: '2006', descId: 'PT SyneRal Indonesia didirikan sebagai perusahaan yang memasarkan pelumas industri dengan merek SyneRal.', descEn: 'PT SyneRal Indonesia was established as a company marketing industrial lubricants under the SyneRal brand.' },
  { year: '2009', descId: 'Memasarkan pelumas kemasan botol untuk sepeda motor dan mobil, serta produk kimia perawatan mesin.', descEn: 'Started marketing bottled lubricants for motorcycles and cars, plus engine care chemical products.' },
  { year: '2010', descId: 'Mendirikan gedung kantor dan pabrik dengan luas 3000 m².', descEn: 'Built office building and factory with 3000 m² area.' },
  { year: 'NOW', descId: 'Memproduksi pelumas dengan kapasitas ± 10.000.000 Liter/tahun.', descEn: 'Producing lubricants with capacity of ± 10,000,000 Liters/year.' },
];

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    titleId: 'FEEDBACK KONSUMEN',
    titleEn: 'CONSUMER FEEDBACK',
    descId: 'Mendengarkan dan merespons kebutuhan pelanggan',
    descEn: 'Listening and responding to customer needs',
    number: '01',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    titleId: 'INOVASI',
    titleEn: 'INNOVATION',
    descId: 'Terus mengembangkan formula terbaik',
    descEn: 'Continuously developing the best formulas',
    number: '02',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    titleId: 'KONSISTENSI',
    titleEn: 'CONSISTENCY',
    descId: 'Kualitas terjaga di setiap produksi',
    descEn: 'Quality maintained in every production',
    number: '03',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    titleId: 'KEMITRAAN',
    titleEn: 'PARTNERSHIP',
    descId: 'Mengembangkan mitra usaha bersama',
    descEn: 'Developing business partners together',
    number: '04',
  },
];

export default function AboutClient({ locale }: AboutClientProps) {
  const t = useTranslations('about');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
                  ? 'PT SyneRal Indonesia beroperasi di kawasan industri Cikarang, memproduksi pelumas berkualitas premium melalui proses pengujian laboratorium dan arena kompetisi untuk sektor industri dan ritel.'
                  : 'PT SyneRal Indonesia operates in the Cikarang industrial area, producing premium quality lubricants through laboratory testing and competition arena for industrial and retail sectors.'}
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

            {/* Right - Product Slideshow */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Parallelogram frame */}
                <div className="absolute inset-0 border-2 border-racing-green/30 skew-x-[-8deg]" />

                {/* Product slideshow */}
                <div className="relative p-8 flex flex-col items-center justify-center min-h-[400px]">
                  {/* Product image */}
                  <div className="relative w-48 h-72 mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={productSlides[currentSlide].image}
                          alt={productSlides[currentSlide].name}
                          fill
                          className="object-contain"
                          sizes="192px"
                        />
                      </motion.div>
                    </AnimatePresence>
                    {/* Glow effect */}
                    <div className="absolute inset-0 blur-3xl bg-racing-green/20" />
                  </div>

                  {/* Product name */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <span className="font-racing text-sm text-racing-green tracking-wider">
                        {productSlides[currentSlide].name}
                      </span>
                    </motion.div>
                  </AnimatePresence>

                  {/* Slide indicators */}
                  <div className="flex gap-2 mt-6">
                    {productSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 skew-x-[-8deg] transition-all ${
                          index === currentSlide
                            ? 'bg-racing-green w-6'
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
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
      <section className="min-h-screen relative overflow-hidden flex items-center bg-background-secondary py-24">
        {/* Racing stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

        {/* Background */}
        <div className="absolute inset-0 racing-stripes opacity-10" />

        {/* Large background text */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 racing-number text-[20vw] leading-none text-white/[0.02] pointer-events-none select-none">
          MV
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left - Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
                  {locale === 'id' ? 'CERITA KAMI' : 'OUR STORY'}
                </span>
              </div>

              <h2 className="font-racing text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] mb-10">
                <span className="block">{locale === 'id' ? 'MISI' : 'MISSION'}</span>
                <span className="block text-racing-green">&</span>
                <span className="block">{locale === 'id' ? 'VISI' : 'VISION'}</span>
              </h2>

              {/* Mission card */}
              <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-r from-racing-green/20 to-racing-green/5 border-2 border-racing-green/40 skew-x-[-4deg]" />
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-racing-green" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-racing-green" />
                <div className="relative p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-racing-green skew-x-[-8deg] flex items-center justify-center">
                      <span className="font-racing text-xl font-black text-white skew-x-[8deg]">M</span>
                    </div>
                    <h3 className="font-racing text-xl text-white">{t('mission.title')}</h3>
                  </div>
                  <p className="font-racing-alt text-foreground-muted leading-relaxed">
                    {t('mission.description')}
                  </p>
                </div>
              </div>

              {/* Vision card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-gold/5 border-2 border-gold/40 skew-x-[-4deg]" />
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-gold" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-gold" />
                <div className="relative p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gold skew-x-[-8deg] flex items-center justify-center">
                      <span className="font-racing text-xl font-black text-black skew-x-[8deg]">V</span>
                    </div>
                    <h3 className="font-racing text-xl text-white">{t('vision.title')}</h3>
                  </div>
                  <p className="font-racing-alt text-foreground-muted leading-relaxed">
                    {t('vision.description')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right - Values */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Checkered accent */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 ${i % 2 === 0 ? 'bg-racing-green' : 'bg-white'}`}
                    />
                  ))}
                </div>
                <span className="font-racing text-racing-green text-sm tracking-[0.2em]">
                  {locale === 'id' ? 'NILAI-NILAI' : 'VALUES'}
                </span>
              </div>

              <h3 className="font-racing text-3xl md:text-4xl font-black text-white mb-8">
                {locale === 'id' ? 'NILAI-NILAI KAMI' : 'OUR VALUES'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.titleEn}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-white/5 skew-x-[-8deg] group-hover:bg-racing-green/10 transition-colors" />
                    <div className="relative p-6 md:p-8">
                      {/* Number */}
                      <span className="absolute top-4 right-4 racing-number text-5xl md:text-6xl text-white/10 group-hover:text-racing-green/20 transition-colors">
                        {value.number}
                      </span>

                      <div className="text-racing-green mb-4 group-hover:scale-110 transition-transform origin-left [&>svg]:w-10 [&>svg]:h-10 md:[&>svg]:w-12 md:[&>svg]:h-12">
                        {value.icon}
                      </div>
                      <h4 className="font-racing text-lg md:text-xl text-white mb-3">
                        {locale === 'id' ? value.titleId : value.titleEn}
                      </h4>
                      <p className="font-racing-alt text-sm md:text-base text-foreground-muted leading-relaxed">
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

      {/* History Section */}
      <section className="py-24 relative overflow-hidden bg-black">
        {/* Racing stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

        {/* Background */}
        <div className="absolute inset-0 racing-stripes opacity-10" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-racing text-racing-green text-sm tracking-[0.3em] block mb-3">
              {locale === 'id' ? 'PERJALANAN KAMI' : 'OUR JOURNEY'}
            </span>
            <h2 className="font-racing text-4xl md:text-5xl font-black text-white">
              {locale === 'id' ? 'SEJARAH SYNERAL' : 'SYNERAL HISTORY'}
            </h2>
          </motion.div>

          {/* Timeline Cards */}
          <div className="space-y-6">
            {history.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl ${item.year === 'NOW' ? 'bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/30' : 'bg-background-secondary border border-white/10'}`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-6 md:p-8">
                  {/* Large Year */}
                  <div className="flex-shrink-0">
                    <span className={`font-racing text-5xl md:text-7xl font-black ${item.year === 'NOW' ? 'text-gold' : 'text-racing-green'}`}>
                      {item.year}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className={`hidden md:block w-px h-16 ${item.year === 'NOW' ? 'bg-gold/30' : 'bg-white/20'}`} />

                  {/* Content */}
                  <div className="flex-1">
                    <p className="font-racing-alt text-foreground-muted text-lg leading-relaxed">
                      {locale === 'id' ? item.descId : item.descEn}
                    </p>
                  </div>

                  {/* Index number */}
                  <div className="absolute top-4 right-4 md:static">
                    <span className={`font-racing text-xs ${item.year === 'NOW' ? 'text-gold/50' : 'text-white/20'}`}>
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section - Full viewport */}
      <section className="h-screen relative overflow-hidden flex items-center bg-background-secondary">
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
