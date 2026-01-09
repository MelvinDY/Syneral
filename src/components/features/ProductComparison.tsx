'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/types';

interface Product {
  id: string;
  name: { id: string; en: string };
  category: string;
  viscosity: string;
  apiStandard: string;
  jasoStandard: string;
  volume: number;
  features?: { id: string[]; en: string[] };
  color?: string;
}

interface ProductComparisonProps {
  products: Product[];
  locale: Locale;
  onClose: () => void;
}

type SpecKey = 'viscosity' | 'apiStandard' | 'jasoStandard' | 'volume';

const getSpecValue = (product: Product, key: SpecKey): string | number => {
  return product[key];
};

export default function ProductComparison({ products, locale, onClose }: ProductComparisonProps) {
  const t = useTranslations('products');

  const specs: { key: SpecKey; label: string; suffix?: string }[] = [
    { key: 'viscosity', label: t('specs.viscosity') },
    { key: 'apiStandard', label: t('specs.api') },
    { key: 'jasoStandard', label: t('specs.jaso') },
    { key: 'volume', label: t('specs.volume'), suffix: 'ml' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-background-secondary rounded-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">{t('comparison.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 text-foreground-muted hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-100px)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-4 text-foreground-muted font-medium text-sm"></th>
                  {products.map(product => (
                    <th key={product.id} className="p-4 text-center">
                      <div className="flex flex-col items-center gap-3">
                        {/* Product icon */}
                        <div
                          className="w-16 h-24 rounded-lg flex items-center justify-center bg-gradient-to-b from-racing-green/20 to-racing-green/40 border-2 border-racing-green/60"
                        >
                          <span className="text-2xl font-bold text-white">S</span>
                        </div>
                        <span className="text-white font-semibold text-sm">
                          {product.name[locale]}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Specs rows */}
                {specs.map((spec, index) => (
                  <tr
                    key={spec.key}
                    className={index % 2 === 0 ? 'bg-white/5' : ''}
                  >
                    <td className="p-4 text-foreground-muted font-medium text-sm">
                      {spec.label}
                    </td>
                    {products.map(product => (
                      <td key={product.id} className="p-4 text-center text-white">
                        {getSpecValue(product, spec.key)}
                        {spec.suffix || ''}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Features row */}
                <tr className="bg-white/5">
                  <td className="p-4 text-foreground-muted font-medium text-sm align-top">
                    {t('detail.features')}
                  </td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 align-top">
                      <ul className="space-y-2">
                        {product.features?.[locale]?.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white">
                            <svg
                              className="w-4 h-4 text-racing-green flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
