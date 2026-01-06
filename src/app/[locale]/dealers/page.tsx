import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import DealersClient from './DealersClient';
import type { Locale } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('dealers');

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function DealersPage() {
  const locale = await getLocale() as Locale;

  return <DealersClient locale={locale} />;
}
