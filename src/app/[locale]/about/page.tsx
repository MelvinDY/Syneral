import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import AboutClient from './AboutClient';
import type { Locale } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about');

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function AboutPage() {
  const locale = await getLocale() as Locale;

  return <AboutClient locale={locale} />;
}
