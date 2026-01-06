import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ProductsSection from '@/components/home/ProductsSection';
import CTASection from '@/components/home/CTASection';
import type { Locale } from '@/lib/types';

export default async function HomePage() {
  const locale = await getLocale() as Locale;

  return (
    <>
      <HeroSection locale={locale} />
      <FeaturesSection locale={locale} />
      <ProductsSection locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}
