import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import type { Locale } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contact');

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ContactPage() {
  const locale = await getLocale() as Locale;

  return <ContactClient locale={locale} />;
}
