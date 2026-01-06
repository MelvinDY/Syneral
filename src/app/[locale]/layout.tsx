import type { Metadata } from 'next';
import { Inter, Orbitron, Chakra_Petch } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Racing-style font similar to F1 (free for commercial use)
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-racing',
  weight: ['400', '500', '600', '700', '800', '900'],
});

// Secondary racing font
const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  variable: '--font-racing-alt',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Syneral Indonesia | Premium Guaranteed Lubricant',
    template: '%s | Syneral Indonesia',
  },
  description: 'PT Syneral Indonesia - Produsen oli motor premium Indonesia dengan teknologi terdepan untuk performa maksimal mesin Anda.',
  keywords: ['oli motor', 'lubricant', 'motor oil', 'syneral', 'indonesia', 'premium oil', '4T oil', 'matic oil'],
  authors: [{ name: 'PT Syneral Indonesia' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://syneralindonesia.co.id',
    siteName: 'Syneral Indonesia',
    title: 'Syneral Indonesia | Premium Guaranteed Lubricant',
    description: 'Oli motor premium buatan Indonesia dengan teknologi terdepan untuk performa maksimal mesin Anda.',
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'id' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${inter.variable} ${orbitron.variable} ${chakraPetch.variable} antialiased bg-background text-foreground`}>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
