import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import {
  Heart,
  GraduationCap,
  Package,
  Zap,
  Shield,
  BarChart3,
  Clock
} from 'lucide-react'
import DisplayCards from '@/components/ui/DisplayCards'

const stats = [
  { icon: Zap, label: 'Hızlı Kurulum', value: '24 Saat' },
  { icon: Shield, label: 'Güvenli Altyapı', value: '%99.9' },
  { icon: BarChart3, label: 'Verimlilik Artışı', value: '+40%' },
  { icon: Clock, label: 'Destek Süresi', value: '7/24' },
]

// DisplayCards için siyah/beyaz tema uyumlu veriler
const displayCardsData = [
  {
    icon: <Heart className="size-4 text-white dark:text-gray-900" />,
    title: "Health",
    description: "Sağlık yönetim sistemi",
    date: "500+ Kurum",
    iconClassName: "bg-gray-900 dark:bg-white",
    titleClassName: "text-gray-900 dark:text-white",
    className: "[grid-area:stack] hover:-translate-y-4 lg:hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-gray-300 dark:before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 dark:before:bg-black/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <GraduationCap className="size-4 text-white dark:text-gray-900" />,
    title: "School",
    description: "Eğitim yönetim sistemi",
    date: "1000+ Okul",
    iconClassName: "bg-gray-900 dark:bg-white",
    titleClassName: "text-gray-900 dark:text-white",
    className: "[grid-area:stack] translate-y-10 hover:translate-y-6 lg:translate-x-16 lg:translate-y-10 lg:hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-gray-300 dark:before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 dark:before:bg-black/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Package className="size-4 text-white dark:text-gray-900" />,
    title: "PIM",
    description: "Ürün bilgi yönetimi",
    date: "10M+ Ürün",
    iconClassName: "bg-gray-900 dark:bg-white",
    titleClassName: "text-gray-900 dark:text-white",
    className: "[grid-area:stack] translate-y-20 hover:translate-y-16 lg:translate-x-32 lg:translate-y-20 lg:hover:translate-y-10",
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-24 md:py-32 bg-white dark:bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-medium mb-4">
            Ürünlerimiz
          </span>
          <h2 className="text-3xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            İşletmenize Özel Çözümler
          </h2>
          <p className="dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
            Sektörünüze özel geliştirdiğimiz yazılım çözümleriyle iş süreçlerinizi
            dijitalleştirin ve verimliliğinizi artırın.
          </p>
        </div>

        {/* Main Content - Side by Side Layout */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-32 lg:gap-48 mb-20">
          {/* Display Cards */}
          <div className="flex-shrink-0">
            <DisplayCards cards={displayCardsData} />
          </div>

          {/* Dashboard Screenshot */}
          <div className="flex-shrink-0 w-full max-w-2xl p-1.5 rounded-2xl bg-gradient-to-br from-black/5 to-black/[0.02] dark:from-white/5 dark:to-white/[0.02] border border-black/10 dark:border-white/10 shadow-[0_8px_16px_rgb(0_0_0_/_0.08)] dark:shadow-[0_8px_16px_rgb(0_0_0_/_0.25)]">
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-black/[0.02] to-transparent dark:from-white/[0.05] dark:to-transparent border border-black/[0.05] dark:border-white/[0.05]">
              <img
                src="/images/cronbiscreen.png"
                alt="CRONBi Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="stat-item text-center p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-gray-900 dark:hover:border-white transition-colors"
              >
                <div className="inline-flex p-3 rounded-xl bg-gray-900 dark:bg-white mb-4">
                  <Icon className="w-5 h-5 text-white dark:text-gray-900" />
                </div>
                <div className="text-2xl md:text-3xl font-bold dark:text-white text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="dark:text-gray-400 text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
