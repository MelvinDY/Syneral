import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const quickLinks = [
  { href: '/about', key: 'about', num: '01' },
  { href: '/products', key: 'products', num: '02' },
  { href: '/dealers', key: 'dealers', num: '03' },
  { href: '/promotions', key: 'promotions', num: '04' },
  { href: '/contact', key: 'contact', num: '05' },
];

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/syneralindonesia',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/syneralindonesia',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
      </svg>
    )
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@syneralindonesia',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@syneralindonesia',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    )
  },
];

export default function Footer() {
  const t = useTranslations('common');
  const tFooter = useTranslations('footer');

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Top racing stripe */}
      <div className="h-1 bg-gradient-to-r from-racing-red via-gold to-racing-red" />

      {/* Background elements */}
      <div className="absolute inset-0 racing-stripes opacity-30" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-racing-red/5 to-transparent" />

      {/* Large background number */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 racing-number text-[30vw] leading-none text-white/[0.02] pointer-events-none select-none">
        S1
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand - Takes more space */}
          <div className="lg:col-span-5">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-racing-red skew-x-[-8deg] flex items-center justify-center">
                  <span className="font-racing text-white font-black text-3xl skew-x-[8deg]">S</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white skew-x-[-8deg]" />
              </div>
              <div>
                <span className="font-racing text-3xl font-bold text-white tracking-wider">
                  SYNERAL
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${i % 2 === 0 ? 'bg-racing-red' : 'bg-white/30'}`}
                      />
                    ))}
                  </div>
                  <span className="font-racing text-[10px] text-foreground-muted tracking-[0.2em]">
                    INDONESIA
                  </span>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <p className="font-racing-alt text-foreground-muted max-w-sm mb-8 leading-relaxed">
              {tFooter('tagline')}
            </p>

            {/* Social links - Racing style */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-11 h-11 flex items-center justify-center"
                  aria-label={social.name}
                >
                  {/* Skewed background */}
                  <div className="absolute inset-0 bg-white/5 skew-x-[-8deg] group-hover:bg-racing-red transition-colors duration-300" />
                  {/* Racing number */}
                  <span className="absolute -top-2 -left-1 font-racing text-[8px] text-racing-red/50 group-hover:text-white/50 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {/* Icon */}
                  <span className="relative text-foreground-muted group-hover:text-white transition-colors">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 ${i % 2 === 0 ? 'bg-racing-red' : 'bg-white/30'}`}
                  />
                ))}
              </div>
              <h4 className="font-racing text-sm text-white tracking-wider">
                {tFooter('quickLinks').toUpperCase()}
              </h4>
            </div>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 py-1"
                  >
                    {/* Racing number */}
                    <span className="font-racing text-[10px] text-foreground-muted group-hover:text-racing-red transition-colors">
                      {link.num}
                    </span>
                    {/* Divider */}
                    <div className="w-px h-4 bg-white/10 group-hover:bg-racing-red/50 transition-colors" />
                    {/* Label */}
                    <span className="font-racing-alt text-sm text-foreground-muted group-hover:text-white transition-colors tracking-wide">
                      {t(link.key)}
                    </span>
                    {/* Arrow on hover */}
                    <svg
                      className="w-3 h-3 text-racing-red opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 ${i % 2 === 0 ? 'bg-racing-red' : 'bg-white/30'}`}
                  />
                ))}
              </div>
              <h4 className="font-racing text-sm text-white tracking-wider">
                {t('contact').toUpperCase()}
              </h4>
            </div>

            <ul className="space-y-4">
              <li>
                <div className="group flex items-start gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="relative">
                    <div className="w-10 h-10 bg-racing-red/20 skew-x-[-8deg] flex items-center justify-center">
                      <svg className="w-5 h-5 text-racing-red skew-x-[8deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span className="font-racing text-[10px] text-racing-red tracking-wider">LOCATION</span>
                    <p className="font-racing-alt text-sm text-white mt-1">Jakarta, Indonesia</p>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="mailto:info@syneralindonesia.co.id"
                  className="group flex items-start gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-racing-red/20 skew-x-[-8deg] flex items-center justify-center">
                      <svg className="w-5 h-5 text-racing-red skew-x-[8deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span className="font-racing text-[10px] text-racing-red tracking-wider">EMAIL</span>
                    <p className="font-racing-alt text-sm text-white mt-1 group-hover:text-racing-red transition-colors">
                      info@syneralindonesia.co.id
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="font-racing text-xs text-foreground-muted tracking-wider">
              {tFooter('copyright')}
            </p>

            {/* Checkered flag pattern */}
            <div className="flex items-center gap-4">
              <div className="flex">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 ${
                      (Math.floor(i / 2) + i) % 2 === 0 ? 'bg-white/20' : 'bg-racing-red/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom racing stripe */}
      <div className="h-1 bg-gradient-to-r from-racing-red via-gold to-racing-red" />
    </footer>
  );
}
