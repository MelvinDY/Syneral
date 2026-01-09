'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Locale } from '@/lib/types';

interface Dealer {
  id: string;
  name: string;
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  operatingHours: { id: string; en: string };
}

interface DealerMapProps {
  dealers: Dealer[];
  selectedDealer: string | null;
  onSelectDealer: (id: string) => void;
  locale: Locale;
}

// Custom marker icon
const createCustomIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${isSelected ? '#009640' : '#0a0a0a'};
        border: 3px solid ${isSelected ? '#fff' : '#009640'};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      ">
        <span style="
          transform: rotate(45deg);
          color: ${isSelected ? '#fff' : '#009640'};
          font-weight: bold;
          font-size: 14px;
        ">S</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export default function DealerMap({ dealers, selectedDealer, onSelectDealer, locale }: DealerMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Center on Indonesia
    mapRef.current = L.map(containerRef.current, {
      center: [-2.5, 118],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Dark theme tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    dealers.forEach(dealer => {
      const isSelected = selectedDealer === dealer.id;
      const marker = L.marker([dealer.coordinates.lat, dealer.coordinates.lng], {
        icon: createCustomIcon(isSelected),
      });

      marker.bindPopup(`
        <div style="
          background: #111;
          color: #fff;
          padding: 12px;
          border-radius: 8px;
          min-width: 200px;
        ">
          <h3 style="font-weight: bold; margin-bottom: 8px; color: #009640;">${dealer.name}</h3>
          <p style="font-size: 12px; color: #a0a0a0; margin-bottom: 4px;">${dealer.address}</p>
          <p style="font-size: 12px; color: #a0a0a0;">${dealer.operatingHours[locale]}</p>
        </div>
      `, {
        className: 'custom-popup',
      });

      marker.on('click', () => {
        onSelectDealer(dealer.id);
      });

      marker.addTo(mapRef.current!);
      markersRef.current[dealer.id] = marker;
    });

    // Fit bounds if dealers exist
    if (dealers.length > 0) {
      const bounds = L.latLngBounds(dealers.map(d => [d.coordinates.lat, d.coordinates.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [dealers, locale, onSelectDealer, selectedDealer]);

  // Handle selected dealer change
  useEffect(() => {
    if (!mapRef.current || !selectedDealer) return;

    const marker = markersRef.current[selectedDealer];
    if (marker) {
      const dealer = dealers.find(d => d.id === selectedDealer);
      if (dealer) {
        mapRef.current.setView([dealer.coordinates.lat, dealer.coordinates.lng], 12, {
          animate: true,
        });
        marker.openPopup();
      }
    }

    // Update marker icons
    dealers.forEach(dealer => {
      const m = markersRef.current[dealer.id];
      if (m) {
        m.setIcon(createCustomIcon(dealer.id === selectedDealer));
      }
    });
  }, [selectedDealer, dealers]);

  return (
    <>
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: transparent;
          box-shadow: none;
          padding: 0;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
        }
        .custom-popup .leaflet-popup-tip {
          background: #111;
        }
        .leaflet-container {
          background: #0a0a0a;
        }
      `}</style>
      <div
        ref={containerRef}
        className="w-full h-[500px] rounded-2xl overflow-hidden border border-white/10"
      />
    </>
  );
}
