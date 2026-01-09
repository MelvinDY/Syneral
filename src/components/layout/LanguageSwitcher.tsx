'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === 'id' ? 'en' : 'id';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="relative flex items-center gap-1 px-3 py-1.5 disabled:opacity-50 group"
    >
      {/* Background with skew */}
      <div className="absolute inset-0 bg-white/5 skew-x-[-8deg] group-hover:bg-white/10 transition-colors border border-white/10" />

      {/* Content */}
      <div className="relative flex items-center gap-2 font-racing text-xs tracking-wider">
        <span className={`transition-colors ${locale === 'id' ? 'text-racing-green' : 'text-foreground-muted'}`}>
          ID
        </span>
        <span className="text-white/30">|</span>
        <span className={`transition-colors ${locale === 'en' ? 'text-racing-green' : 'text-foreground-muted'}`}>
          EN
        </span>
      </div>

      {/* Active indicator dot */}
      <div
        className={`absolute -bottom-1 w-1.5 h-1.5 bg-racing-green transition-all duration-300 ${
          locale === 'id' ? 'left-3' : 'left-[calc(100%-12px)]'
        }`}
      />
    </button>
  );
}
