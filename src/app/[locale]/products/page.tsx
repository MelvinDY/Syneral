import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';
import type { Locale } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('products');

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ProductsPage() {
  const locale = await getLocale() as Locale;

  return <ProductsClient locale={locale} />;
}
