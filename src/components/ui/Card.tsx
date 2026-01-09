'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { urlFor } from '@/lib/sanity/client';
import type { Product, Promotion } from '@/lib/types';
import type { Locale } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  locale: Locale;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const name = product.name[locale] || product.name.en;
  const description = product.description?.[locale] || product.description?.en || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/products/${product.slug.current}`}
        className="group block bg-background-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-racing-green/30 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-br from-background-tertiary to-background overflow-hidden">
          {product.image && (
            <Image
              src={urlFor(product.image).width(400).height(400).url()}
              alt={name}
              fill
              className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
            />
          )}
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-racing-green/90 text-white rounded-full">
              {product.category}
            </span>
          </div>
          {/* Specs overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex justify-between text-sm">
              <span className="text-white/80">{product.viscosity}</span>
              <span className="text-racing-green">{product.apiStandard}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-racing-green transition-colors">
            {name}
          </h3>
          <p className="text-foreground-muted text-sm line-clamp-2">
            {description}
          </p>

          {/* Specs row */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-foreground-muted">{product.jasoStandard}</span>
            <span className="text-electric-blue">{product.volume}ml</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface PromotionCardProps {
  promotion: Promotion;
  locale: Locale;
}

export function PromotionCard({ promotion, locale }: PromotionCardProps) {
  const title = promotion.title[locale] || promotion.title.en;
  const description = promotion.description?.[locale] || promotion.description?.en || '';
  const endDate = new Date(promotion.endDate);
  const isExpired = endDate < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/promotions/${promotion.slug.current}`}
        className={`group block bg-background-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-300 ${
          isExpired ? 'opacity-60' : ''
        }`}
      >
        {/* Image */}
        <div className="relative aspect-video bg-gradient-to-br from-background-tertiary to-background overflow-hidden">
          {promotion.image && (
            <Image
              src={urlFor(promotion.image).width(600).height(340).url()}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${
                isExpired
                  ? 'bg-foreground-muted/50 text-white/70'
                  : 'bg-gold text-black'
              }`}
            >
              {isExpired ? 'Ended' : 'Active'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors">
            {title}
          </h3>
          <p className="text-foreground-muted text-sm line-clamp-2">
            {description}
          </p>

          {/* Date */}
          <div className="mt-4 pt-4 border-t border-white/5 text-xs text-foreground-muted">
            Valid until: {endDate.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US')}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
