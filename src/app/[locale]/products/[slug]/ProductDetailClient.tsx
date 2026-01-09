'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import type { Locale } from '@/lib/types';

interface Product {
  id: string;
  slug: string;
  name: { id: string; en: string };
  category: string;
  viscosity: string;
  apiStandard: string;
  jasoStandard: string;
  volume: number[];
  image: string;
  description: { id: string; en: string };
  features: { id: string[]; en: string[] };
  recommended: { id: string; en: string };
}

interface ProductDetailClientProps {
  product: Product;
  locale: Locale;
}

const categoryLabels: Record<string, { id: string; en: string }> = {
  motorcycle: { id: 'Motor', en: 'Motorcycle' },
  grease: { id: 'Gemuk & Spesial', en: 'Grease & Specialty' },
  commercial: { id: 'Komersial & Marine', en: 'Commercial & Marine' },
  industrial: { id: 'Industri', en: 'Industrial' },
};

export default function ProductDetailClient({ product, locale }: ProductDetailClientProps) {
  const t = useTranslations('products');

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href={`/${locale}`} className="text-foreground-muted hover:text-white transition-colors">
              {locale === 'id' ? 'Beranda' : 'Home'}
            </Link>
            <span className="text-foreground-muted">/</span>
            <Link href={`/${locale}/products`} className="text-foreground-muted hover:text-white transition-colors">
              {t('title')}
            </Link>
            <span className="text-foreground-muted">/</span>
            <span className="text-racing-green">{product.name[locale]}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                <div className="relative w-64 h-80">
                  <Image
                    src={product.image}
                    alt={product.name[locale]}
                    fill
                    className="object-contain"
                    sizes="256px"
                    priority
                  />
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-racing-green text-white font-racing text-sm rounded-lg">
                  {categoryLabels[product.category]?.[locale] || product.category}
                </span>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Product Name */}
              <h1 className="font-racing text-3xl md:text-4xl text-white mb-4">
                {product.name[locale]}
              </h1>

              {/* Description */}
              <p className="text-foreground-muted text-lg mb-8">
                {product.description[locale]}
              </p>

              {/* Specifications */}
              <div className="bg-background-secondary rounded-xl p-6 mb-8">
                <h3 className="font-racing text-lg text-white mb-4">
                  {t('detail.specifications')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-foreground-muted">{t('specs.viscosity')}</span>
                    <span className="text-white font-medium">{product.viscosity}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-foreground-muted">{t('specs.api')}</span>
                    <span className="text-white font-medium">{product.apiStandard}</span>
                  </div>
                  {product.jasoStandard !== '-' && (
                    <div className="flex justify-between py-3 border-b border-white/10">
                      <span className="text-foreground-muted">{t('specs.jaso')}</span>
                      <span className="text-white font-medium">{product.jasoStandard}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-foreground-muted">{t('specs.volume')}</span>
                    <span className="text-white font-medium">
                      {product.volume.map(v => v >= 1000 ? `${v/1000}L` : `${v}ml`).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-racing text-lg text-white mb-4">
                  {t('detail.features')}
                </h3>
                <ul className="space-y-3">
                  {product.features[locale].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-racing-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-foreground-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended For */}
              <div className="bg-racing-green/10 border border-racing-green/30 rounded-xl p-6 mb-8">
                <h3 className="font-racing text-lg text-racing-green mb-2">
                  {t('detail.recommended')}
                </h3>
                <p className="text-foreground-muted">
                  {product.recommended[locale]}
                </p>
              </div>

              {/* Buy Links */}
              <div>
                <h3 className="font-racing text-sm text-foreground-muted mb-4">
                  {locale === 'id' ? 'BELI DI MARKETPLACE' : 'BUY ON MARKETPLACE'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.tokopedia.com/syneral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Tokopedia
                  </a>
                  <a
                    href="https://www.shopee.co.id/syneral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Shopee
                  </a>
                  <a
                    href="https://www.bukalapak.com/syneral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Bukalapak
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back to Products */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}/products`}>
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {locale === 'id' ? 'Kembali ke Produk' : 'Back to Products'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
