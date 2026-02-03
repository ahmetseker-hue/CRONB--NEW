'use client'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Heart,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { Boxes } from '@/components/ui/background-boxes'

const footerLinks = [
  {
    label: 'Ürünler',
    links: [
      { title: 'CRONBi Health', href: '#health' },
      { title: 'CRONBi School', href: '#school' },
      { title: 'CRONBi PIM', href: '#pim' },
      { title: 'Özellikler', href: '#features' },
    ],
  },
  {
    label: 'Şirket',
    links: [
      { title: 'Hakkımızda', href: '#about' },
      { title: 'Blog', href: '#blog' },
      { title: 'Kariyer', href: '#' },
      { title: 'İletişim', href: '#contact' },
    ],
  },
  {
    label: 'Kaynaklar',
    links: [
      { title: 'SSS', href: '#' },
      { title: 'Dokümantasyon', href: '#' },
      { title: 'Gizlilik Politikası', href: '#' },
      { title: 'Kullanım Şartları', href: '#' },
    ],
  },
  {
    label: 'Sosyal Medya',
    links: [
      { title: 'LinkedIn', href: '#', icon: Linkedin },
      { title: 'Instagram', href: '#', icon: Instagram },
      { title: 'YouTube', href: '#', icon: Youtube },
      { title: 'Twitter', href: '#', icon: Twitter },
    ],
  },
]

function AnimatedContainer({ className, delay = 0.1, children }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Footer() {
  return (
    <footer className="relative w-full bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 overflow-hidden">
      {/* Background Boxes */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Boxes />
        {/* Mask overlay for readability */}
        <div className="absolute inset-0 bg-white/90 dark:bg-black/90 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white_70%)] pointer-events-none" />
      </div>

      {/* Top Glow Line */}
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm bg-gray-400/30 dark:bg-white/30 z-10" />

      {/* Inner Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 lg:py-16 pointer-events-none">
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <AnimatedContainer className="space-y-4">
            <Logo size="small" />
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs mt-4">
              İşletmenizi dönüştüren akıllı yazılım çözümleri. Sağlık, eğitim ve e-ticaret sektörlerinde dijital inovasyon.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <a
                href="mailto:info@cronbi.com"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300 pointer-events-auto"
              >
                <Mail className="size-4" />
                info@cronbi.com
              </a>
              <a
                href="tel:+902121234567"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300 pointer-events-auto"
              >
                <Phone className="size-4" />
                +90 (212) 123 45 67
              </a>
              <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <MapPin className="size-4" />
                İstanbul, Türkiye
              </p>
            </div>

            <p className="text-gray-400 dark:text-gray-600 text-sm pt-4">
              © {new Date().getFullYear()} CRONBi. Tüm hakları saklıdır.
            </p>
          </AnimatedContainer>

          {/* Links Grid */}
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div className="mb-10 md:mb-0">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                    {section.label}
                  </h3>
                  <ul className="text-gray-500 dark:text-gray-400 mt-4 space-y-2 text-sm">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          className="hover:text-gray-900 dark:hover:text-white inline-flex items-center transition-all duration-300 pointer-events-auto"
                        >
                          {link.icon && <link.icon className="me-2 size-4" />}
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <AnimatedContainer
          delay={0.5}
          className="w-full mt-12 pt-8 border-t border-gray-200 dark:border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quick Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-all duration-300 pointer-events-auto"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>

            {/* Made with love */}
            <p className="text-gray-500 dark:text-gray-500 text-sm flex items-center gap-1.5">
              Made with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> in Turkey
            </p>
          </div>
        </AnimatedContainer>
      </div>
    </footer>
  )
}
