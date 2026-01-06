'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/products', key: 'products' },
  { href: '/dealers', key: 'dealers' },
  { href: '/promotions', key: 'promotions' },
  { href: '/contact', key: 'contact' },
];

export default function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-racing-red/20'
          : 'bg-transparent'
      }`}
    >
      {/* Top racing stripe */}
      <div className="h-1 bg-gradient-to-r from-racing-red via-gold to-racing-red" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Racing number style logo */}
            <div className="relative">
              <div className="w-12 h-12 bg-racing-red skew-x-[-8deg] flex items-center justify-center group-hover:bg-racing-red-dark transition-colors">
                <span className="font-racing text-white font-black text-2xl skew-x-[8deg]">S</span>
              </div>
              {/* Corner accent */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white skew-x-[-8deg]" />
            </div>
            <div className="hidden sm:block">
              <span className="font-racing text-2xl font-bold text-white tracking-wider group-hover:text-racing-red transition-colors">
                SYNERAL
              </span>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 ${i % 2 === 0 ? 'bg-racing-red' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
                <span className="font-racing text-[9px] text-foreground-muted tracking-[0.3em]">
                  PREMIUM GUARANTEED
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="relative group"
                >
                  <div
                    className={`px-5 py-2 font-racing text-sm tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'text-racing-red'
                        : 'text-foreground-muted hover:text-white'
                    }`}
                  >
                    {/* Racing number prefix for active */}
                    {isActive && (
                      <span className="absolute -left-1 top-1/2 -translate-y-1/2 text-[10px] text-racing-red/50 font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    )}
                    {t(item.key).toUpperCase()}
                  </div>

                  {/* Active indicator - racing style */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-2 right-2 h-[3px] bg-racing-red"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Hover effect */}
                  <div className="absolute bottom-0 left-2 right-2 h-[3px] bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Racing flag indicator */}
            <div className="hidden md:flex items-center gap-1 mr-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 ${i % 2 === 0 ? 'bg-white/20' : 'bg-racing-red/40'}`}
                />
              ))}
            </div>

            <LanguageSwitcher />

            {/* Mobile menu button - racing style */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center group"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-racing-red/10 skew-x-[-8deg] group-hover:bg-racing-red/20 transition-colors" />
              <div className="relative flex flex-col gap-1.5">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-white block"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-0.5 bg-racing-red block"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-white block"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-t border-racing-red/20"
          >
            {/* Racing stripes accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-racing-red/50 to-transparent" />

            <nav className="max-w-7xl mx-auto px-4 py-6 space-y-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;

                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3 rounded transition-all ${
                        isActive
                          ? 'bg-racing-red/10'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      {/* Racing number */}
                      <span className={`font-racing text-xs ${isActive ? 'text-racing-red' : 'text-foreground-muted'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Divider */}
                      <div className={`w-px h-6 ${isActive ? 'bg-racing-red' : 'bg-white/10'}`} />

                      {/* Label */}
                      <span className={`font-racing text-sm tracking-wider ${
                        isActive ? 'text-racing-red' : 'text-white'
                      }`}>
                        {t(item.key).toUpperCase()}
                      </span>

                      {/* Arrow for active */}
                      {isActive && (
                        <svg className="w-4 h-4 ml-auto text-racing-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom racing stripe */}
            <div className="h-1 bg-gradient-to-r from-racing-red via-gold to-racing-red" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
