'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/types';

interface NewsClientProps {
  locale: Locale;
}

// News articles from SyneRal Indonesia
const newsArticles = [
  {
    id: '1',
    slug: 'suzuki-gsx-club-indonesia-visit',
    title: {
      id: 'SyneRal Kedatangan Tamu dari Komunitas Suzuki GSX Club Indonesia',
      en: 'SyneRal Welcomes Visitors from Suzuki GSX Club Indonesia Community',
    },
    date: '2018-11-27',
    summary: {
      id: 'Komunitas pemilik Suzuki GSX yaitu GSX Club Indonesia (GCI) pada 12 November 2018 lalu melakukan kunjungan ke kantor pusat pelumas SyneRal. Kunjungan ini mempererat hubungan antara SyneRal dengan komunitas motor di Indonesia.',
      en: 'The Suzuki GSX owners community, GSX Club Indonesia (GCI), visited SyneRal lubricant headquarters on November 12, 2018. This visit strengthened the relationship between SyneRal and motorcycle communities in Indonesia.',
    },
    image: '/images/news/news-1.jpg',
    category: { id: 'Komunitas', en: 'Community' },
  },
  {
    id: '2',
    slug: 'enduro-bandung-bagja-sponsorship',
    title: {
      id: 'SyneRal, Pelumas Indonesia Sponsori Balap Enduro Bandung Bagja',
      en: 'SyneRal, Indonesian Lubricant Sponsors Enduro Racing Bandung Bagja',
    },
    date: '2018-11-15',
    summary: {
      id: 'Pelumas berkualitas buatan Indonesia, SyneRal, mensponsori acara kompetisi balap Enduro Exhibition Bandung Bagja. Keikutsertaan ini menunjukkan komitmen SyneRal dalam mendukung olahraga balap motor di Indonesia.',
      en: 'Quality Indonesian-made lubricant, SyneRal, sponsored the Enduro Exhibition Bandung Bagja racing competition. This participation demonstrates SyneRal\'s commitment to supporting motorcycle racing sports in Indonesia.',
    },
    image: '/images/news/news-2.jpg',
    category: { id: 'Event', en: 'Event' },
  },
  {
    id: '3',
    slug: 'pengenalan-oli-ester',
    title: {
      id: 'Pengenalan Oli Ester',
      en: 'Introduction to Ester Oil',
    },
    date: '2018-07-25',
    summary: {
      id: 'Oli full synthetic ester adalah pilihan terbaik untuk mesin performa tinggi dan aplikasi balap yang membutuhkan operasi RPM tinggi secara berkelanjutan. Teknologi ester memberikan perlindungan superior pada kondisi ekstrem.',
      en: 'Full synthetic ester oil is the best choice for high-performance engines and racing applications requiring sustained high RPM operation. Ester technology provides superior protection under extreme conditions.',
    },
    image: '/images/news/news-3.jpg',
    category: { id: 'Edukasi', en: 'Education' },
  },
  {
    id: '4',
    slug: 'penggunaan-di-arena-balap',
    title: {
      id: 'Penggunaan di Arena Balap',
      en: 'Usage in Racing Arena',
    },
    date: '2018-07-25',
    summary: {
      id: 'Tren konsumsi oli premium di kalangan pengendara motor di kota-kota besar terus meningkat. Pembalap mencari pelumas berperforma tinggi yang mampu menjaga mesin dalam kondisi optimal di arena balap.',
      en: 'Premium oil consumption trends among motorcycle riders in major cities continue to rise. Racers seek high-performance lubricants capable of keeping engines in optimal condition on the racing track.',
    },
    image: '/images/news/news-4.jpg',
    category: { id: 'Balap', en: 'Racing' },
  },
  {
    id: '5',
    slug: 'oli-sintetis-vs-oli-biasa',
    title: {
      id: 'Oli Sintetis vs Oli Biasa',
      en: 'Synthetic Oil vs Regular Oil',
    },
    date: '2018-07-25',
    summary: {
      id: 'Oli sintetis memiliki lima keunggulan utama dibanding oli mineral biasa: ketahanan suhu lebih baik, interval ganti oli lebih panjang, perlindungan mesin superior, efisiensi bahan bakar, dan performa optimal di segala kondisi.',
      en: 'Synthetic oil has five key advantages over regular mineral oil: better temperature resistance, longer oil change intervals, superior engine protection, fuel efficiency, and optimal performance in all conditions.',
    },
    image: '/images/news/news-5.jpg',
    category: { id: 'Edukasi', en: 'Education' },
  },
];

function formatDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', options);
}

export default function NewsClient({ locale }: NewsClientProps) {
  const t = useTranslations('news');

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 racing-stripes opacity-10" />

        {/* Racing stripe top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Checkered accent */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 ${i % 2 === 0 ? 'bg-racing-green' : 'bg-white'}`}
                  />
                ))}
              </div>
              <span className="font-racing text-racing-green text-sm tracking-[0.2em]">
                {t('label')}
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

            <h1 className="font-racing text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              {t('title')}
            </h1>
            <p className="font-racing-alt text-foreground-muted text-lg max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* All Articles Grid - Same Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Link href={`/${locale}/news/${article.slug}`} className="group block h-full">
                  <div className="h-full rounded-xl overflow-hidden bg-background-secondary border border-white/10 hover:border-racing-green/50 transition-all flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <Image
                        src={article.image}
                        alt={article.title[locale]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-racing-green text-white text-xs font-racing rounded">
                          {article.category[locale]}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-racing-green text-sm font-medium">
                        {formatDate(article.date, locale)}
                      </span>
                      <h3 className="font-racing text-lg text-white mt-2 mb-3 group-hover:text-racing-green transition-colors line-clamp-2">
                        {article.title[locale]}
                      </h3>
                      <p className="font-racing-alt text-foreground-muted text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                        {article.summary[locale]}
                      </p>
                      <div className="flex items-center gap-2 text-racing-green font-racing text-sm group-hover:translate-x-2 transition-transform mt-auto">
                        {t('readMore')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom racing stripe */}
      <div className="h-1 bg-gradient-to-r from-racing-green via-gold to-racing-green" />
    </div>
  );
}
