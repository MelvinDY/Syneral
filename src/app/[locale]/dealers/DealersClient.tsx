'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Locale } from '@/lib/types';

// Dynamic import for Leaflet map (requires window)
const DealerMap = dynamic(
  () => import('@/components/features/DealerMap'),
  { ssr: false, loading: () => <MapSkeleton /> }
);

function MapSkeleton() {
  return (
    <div className="w-full h-[500px] bg-background-tertiary rounded-2xl animate-pulse flex items-center justify-center">
      <div className="text-foreground-muted">Loading map...</div>
    </div>
  );
}

interface DealersClientProps {
  locale: Locale;
}

// SyneRal authorized dealers
const dealers = [
  {
    id: '1',
    name: 'Sinar Motor by Deon - Bengkel TVS Motor',
    address: 'Bogor, Jawa Barat',
    city: 'Bogor',
    province: 'Jawa Barat',
    coordinates: { lat: -6.594707, lng: 106.7920399 },
    mapsUrl: 'https://maps.app.goo.gl/LcFMY32eayNUPK1G6',
    operatingHours: { id: 'Senin - Sabtu: 08:00 - 17:00', en: 'Mon - Sat: 08:00 - 17:00' },
  },
  {
    id: '2',
    name: 'Vincent Motor',
    address: 'Bogor, Jawa Barat',
    city: 'Bogor',
    province: 'Jawa Barat',
    coordinates: { lat: -6.6278463, lng: 106.8098047 },
    mapsUrl: 'https://maps.app.goo.gl/JRPML7oULG7rgqse8',
    operatingHours: { id: 'Senin - Sabtu: 08:00 - 17:00', en: 'Mon - Sat: 08:00 - 17:00' },
  },
  {
    id: '3',
    name: 'Bike Point Sinar Variasi Motor',
    address: 'Bogor, Jawa Barat',
    city: 'Bogor',
    province: 'Jawa Barat',
    coordinates: { lat: -6.5469309, lng: 106.8244042 },
    mapsUrl: 'https://maps.app.goo.gl/NPE6Kezvcpdmv7nt9',
    operatingHours: { id: 'Senin - Sabtu: 08:00 - 17:00', en: 'Mon - Sat: 08:00 - 17:00' },
  },
  {
    id: '4',
    name: 'Jampang Indah Motor - Bengkel Motor',
    address: 'Bogor, Jawa Barat',
    city: 'Bogor',
    province: 'Jawa Barat',
    coordinates: { lat: -6.4792951, lng: 106.7311638 },
    mapsUrl: 'https://maps.app.goo.gl/9u3zLs2PRnpTSbhL9',
    operatingHours: { id: 'Senin - Sabtu: 08:00 - 17:00', en: 'Mon - Sat: 08:00 - 17:00' },
  },
  {
    id: '5',
    name: 'Bongkot Motor',
    address: 'Bogor, Jawa Barat',
    city: 'Bogor',
    province: 'Jawa Barat',
    coordinates: { lat: -6.5864316, lng: 106.8525727 },
    mapsUrl: 'https://maps.app.goo.gl/5ff5axK1pGyrpCCL9',
    operatingHours: { id: 'Senin - Sabtu: 08:00 - 17:00', en: 'Mon - Sat: 08:00 - 17:00' },
  },
  {
    id: '6',
    name: 'Berkat Motor',
    address: 'Bogor, Jawa Barat',
    city: 'Bogor',
    province: 'Jawa Barat',
    coordinates: { lat: -6.5717565, lng: 106.7879896 },
    mapsUrl: 'https://maps.app.goo.gl/rPNWyxUMBRWga6ED9',
    operatingHours: { id: 'Senin - Sabtu: 08:00 - 17:00', en: 'Mon - Sat: 08:00 - 17:00' },
  },
];

export default function DealersClient({ locale }: DealersClientProps) {
  const t = useTranslations('dealers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDealer, setSelectedDealer] = useState<string | null>(null);

  const filteredDealers = useMemo(() => {
    if (!searchQuery) return dealers;
    const query = searchQuery.toLowerCase();
    return dealers.filter(
      dealer =>
        dealer.name.toLowerCase().includes(query) ||
        dealer.city.toLowerCase().includes(query) ||
        dealer.province.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pl-12 bg-background-secondary border border-white/10 rounded-xl text-white placeholder-foreground-muted focus:outline-none focus:border-racing-green transition-colors"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <DealerMap
              dealers={filteredDealers}
              selectedDealer={selectedDealer}
              onSelectDealer={setSelectedDealer}
              locale={locale}
            />
          </div>

          {/* Dealer List */}
          <div className="order-1 lg:order-2 space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {filteredDealers.length === 0 ? (
              <div className="text-center py-12 text-foreground-muted">
                {t('noResults')}
              </div>
            ) : (
              filteredDealers.map((dealer, index) => (
                <motion.div
                  key={dealer.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedDealer(dealer.id)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                    selectedDealer === dealer.id
                      ? 'bg-racing-green/10 border-racing-green'
                      : 'bg-background-secondary border-white/5 hover:border-white/10'
                  }`}
                >
                  <h3 className="text-lg font-bold text-white mb-2">{dealer.name}</h3>
                  <p className="text-foreground-muted text-sm mb-4">{dealer.address}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-foreground-muted">
                      <svg className="w-4 h-4 text-racing-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{dealer.operatingHours[locale]}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <a
                      href={dealer.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-racing-green rounded-lg hover:bg-racing-green-dark transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {t('directions')}
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
