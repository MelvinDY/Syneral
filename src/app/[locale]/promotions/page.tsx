import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PromotionsClient from './PromotionsClient';
import type { Locale } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('promotions');

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function PromotionsPage() {
  const locale = await getLocale() as Locale;

  return <PromotionsClient locale={locale} />;
}
