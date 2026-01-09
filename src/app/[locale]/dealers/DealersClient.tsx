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

// Demo dealers - will be replaced with Sanity data
const demoDealers = [
  {
    id: '1',
    name: 'Syneral Jakarta Pusat',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat',
    city: 'Jakarta Pusat',
    province: 'DKI Jakarta',
    coordinates: { lat: -6.2088, lng: 106.8456 },
    phone: '+62 21 1234567',
    whatsapp: '+62 812 3456 7890',
    operatingHours: { id: 'Senin - Sabtu: 08:00 - 17:00', en: 'Mon - Sat: 08:00 - 17:00' },
  },
  {
    id: '2',
    name: 'Syneral Bandung',
    address: 'Jl. Asia Afrika No. 45, Bandung',
    city: 'Bandung',
    province: 'Jawa Barat',
    coordinates: { lat: -6.9175, lng: 107.6191 },
    phone: '+62 22 7654321',
    whatsapp: '+62 813 4567 8901',
    operatingHours: { id: 'Senin - Sabtu: 09:00 - 18:00', en: 'Mon - Sat: 09:00 - 18:00' },
  },
  {
    id: '3',
    name: 'Syneral Surabaya',
    address: 'Jl. Pemuda No. 78, Surabaya',
    city: 'Surabaya',
    province: 'Jawa Timur',
    coordinates: { lat: -7.2575, lng: 112.7521 },
    phone: '+62 31 8765432',
    whatsapp: '+62 814 5678 9012',
    operatingHours: { id: 'Senin - Minggu: 08:00 - 20:00', en: 'Mon - Sun: 08:00 - 20:00' },
  },
  {
    id: '4',
    name: 'Syneral Yogyakarta',
    address: 'Jl. Malioboro No. 56, Yogyakarta',
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
    coordinates: { lat: -7.7956, lng: 110.3695 },
    phone: '+62 274 987654',
    whatsapp: '+62 815 6789 0123',
    operatingHours: { id: 'Senin - Sabtu: 08:30 - 17:30', en: 'Mon - Sat: 08:30 - 17:30' },
  },
  {
    id: '5',
    name: 'Syneral Medan',
    address: 'Jl. Gatot Subroto No. 89, Medan',
    city: 'Medan',
    province: 'Sumatera Utara',
    coordinates: { lat: 3.5952, lng: 98.6722 },
    phone: '+62 61 1122334',
    whatsapp: '+62 816 7890 1234',
    operatingHours: { id: 'Senin - Sabtu: 09:00 - 17:00', en: 'Mon - Sat: 09:00 - 17:00' },
  },
];

export default function DealersClient({ locale }: DealersClientProps) {
  const t = useTranslations('dealers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDealer, setSelectedDealer] = useState<string | null>(null);

  const filteredDealers = useMemo(() => {
    if (!searchQuery) return demoDealers;
    const query = searchQuery.toLowerCase();
    return demoDealers.filter(
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${dealer.phone}`} className="hover:text-racing-green transition-colors">
                        {dealer.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-foreground-muted">
                      <svg className="w-4 h-4 text-racing-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{dealer.operatingHours[locale]}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${dealer.coordinates.lat},${dealer.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 text-sm font-medium text-center text-white bg-racing-green rounded-lg hover:bg-racing-green-dark transition-colors"
                    >
                      {t('directions')}
                    </a>
                    <a
                      href={`https://wa.me/${dealer.whatsapp?.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 text-sm font-medium text-center text-racing-green bg-racing-green/10 rounded-lg hover:bg-racing-green/20 transition-colors"
                    >
                      WhatsApp
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
