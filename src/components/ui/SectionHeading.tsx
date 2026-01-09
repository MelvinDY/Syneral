'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const stripeAlign = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${alignClasses[align]} ${className}`}
    >
      {/* Racing accent line */}
      <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}>
        <div className="flex">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 ${i % 2 === 0 ? 'bg-racing-green' : 'bg-white'}`}
            />
          ))}
        </div>
      </div>

      <h2 className="relative inline-block font-racing text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wide">
        {title}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`absolute -bottom-2 ${stripeAlign[align]} h-1 w-20 bg-gradient-to-r from-racing-green to-racing-green-dark origin-left`}
        />
      </h2>
      {subtitle && (
        <p className="font-racing-alt text-foreground-muted text-lg max-w-2xl mx-auto mt-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
