'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import SpeedLines from '@/components/ui/SpeedLines';
import type { Locale } from '@/lib/types';

interface ContactClientProps {
  locale: Locale;
}

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    key: 'address',
    value: 'Jakarta, Indonesia',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    key: 'email',
    value: 'info@syneralindonesia.co.id',
    href: 'mailto:info@syneralindonesia.co.id',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    key: 'phone',
    value: '+62 21 1234567',
    href: 'tel:+622112345678',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    key: 'hours',
    valueId: 'Senin - Sabtu: 08:00 - 17:00',
    valueEn: 'Mon - Sat: 08:00 - 17:00',
  },
];

export default function ContactClient({ locale }: ContactClientProps) {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground-muted mb-2">
                  {t('form.name')} *
                </label>
                <input
                  {...register('name')}
                  className="w-full px-4 py-3 bg-background-secondary border border-white/10 rounded-xl text-white placeholder-foreground-muted focus:outline-none focus:border-racing-red transition-colors"
                  placeholder={locale === 'id' ? 'Nama lengkap Anda' : 'Your full name'}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-racing-red">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground-muted mb-2">
                  {t('form.email')} *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-3 bg-background-secondary border border-white/10 rounded-xl text-white placeholder-foreground-muted focus:outline-none focus:border-racing-red transition-colors"
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-racing-red">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground-muted mb-2">
                  {t('form.phone')}
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-4 py-3 bg-background-secondary border border-white/10 rounded-xl text-white placeholder-foreground-muted focus:outline-none focus:border-racing-red transition-colors"
                  placeholder="+62 812 3456 7890"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-foreground-muted mb-2">
                  {t('form.subject')} *
                </label>
                <input
                  {...register('subject')}
                  className="w-full px-4 py-3 bg-background-secondary border border-white/10 rounded-xl text-white placeholder-foreground-muted focus:outline-none focus:border-racing-red transition-colors"
                  placeholder={locale === 'id' ? 'Subjek pesan' : 'Message subject'}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-racing-red">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-foreground-muted mb-2">
                  {t('form.message')} *
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="w-full px-4 py-3 bg-background-secondary border border-white/10 rounded-xl text-white placeholder-foreground-muted focus:outline-none focus:border-racing-red transition-colors resize-none"
                  placeholder={locale === 'id' ? 'Tulis pesan Anda di sini...' : 'Write your message here...'}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-racing-red">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
                {t('form.submit')}
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-500 text-center"
                >
                  {t('form.success')}
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-racing-red text-center"
                >
                  {t('form.error')}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-background-secondary rounded-2xl p-8 border border-white/5 relative overflow-hidden">
              <SpeedLines color="red" intensity="light" />

              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-8 racing-stripe pb-4">
                  {locale === 'id' ? 'Informasi Kontak' : 'Contact Information'}
                </h3>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-racing-red/10 text-racing-red flex items-center justify-center flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-sm text-foreground-muted mb-1">
                          {t(`info.${info.key}`)}
                        </div>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-white hover:text-racing-red transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-white">
                            {info.valueId ? (locale === 'id' ? info.valueId : info.valueEn) : info.value}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-white/5">
                  <h4 className="text-sm font-medium text-foreground-muted mb-4">
                    {locale === 'id' ? 'Ikuti Kami' : 'Follow Us'}
                  </h4>
                  <div className="flex gap-4">
                    {['facebook', 'instagram', 'youtube', 'tiktok'].map((social) => (
                      <a
                        key={social}
                        href={`https://${social}.com/syneralindonesia`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-racing-red/20 hover:text-racing-red transition-colors flex items-center justify-center text-foreground-muted"
                        aria-label={social}
                      >
                        <span className="text-xs uppercase">{social[0]}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
