import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import NewsClient from './NewsClient';
import type { Locale } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('news');

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function NewsPage() {
  const locale = await getLocale() as Locale;

  return <NewsClient locale={locale} />;
}
