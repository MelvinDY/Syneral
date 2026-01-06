'use client';

import { motion } from 'framer-motion';

interface SpeedLinesProps {
  className?: string;
  color?: 'red' | 'blue' | 'white';
  direction?: 'left' | 'right';
  intensity?: 'light' | 'medium' | 'strong';
}

export default function SpeedLines({
  className = '',
  color = 'red',
  direction = 'right',
  intensity = 'medium',
}: SpeedLinesProps) {
  const colors = {
    red: 'rgba(225, 6, 0, VAR)',
    blue: 'rgba(0, 163, 224, VAR)',
    white: 'rgba(255, 255, 255, VAR)',
  };

  const intensities = {
    light: 0.03,
    medium: 0.06,
    strong: 0.1,
  };

  const baseColor = colors[color].replace('VAR', String(intensities[intensity]));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Main speed lines */}
      <motion.div
        initial={{ x: direction === 'right' ? '-100%' : '100%' }}
        animate={{ x: direction === 'right' ? '100%' : '-100%' }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            ${direction === 'right' ? '90deg' : '270deg'},
            transparent,
            transparent 60px,
            ${baseColor} 60px,
            ${baseColor} 62px
          )`,
          transform: 'skewX(-15deg)',
        }}
      />

      {/* Secondary lines (offset) */}
      <motion.div
        initial={{ x: direction === 'right' ? '-50%' : '50%' }}
        animate={{ x: direction === 'right' ? '150%' : '-150%' }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            ${direction === 'right' ? '90deg' : '270deg'},
            transparent,
            transparent 100px,
            ${baseColor} 100px,
            ${baseColor} 101px
          )`,
          transform: 'skewX(-20deg)',
        }}
      />

      {/* Accent dots */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${baseColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
