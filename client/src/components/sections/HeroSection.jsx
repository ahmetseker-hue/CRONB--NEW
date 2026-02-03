import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { ArrowRight, Sparkles } from 'lucide-react'
import FlowFieldBackground from '@/components/ui/FlowFieldBackground'
import { GooeyText } from '@/components/ui/GooeyText'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import { useTheme } from '@/context/ThemeContext'

export default function HeroSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const { particleColor, isDark } = useTheme()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
      })

      // Entrance animation
      const tl = gsap.timeline({ delay: 0.3 })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Flow Field Background */}
      <div className="absolute inset-0 z-0">
        <FlowFieldBackground
          color={particleColor}
          trailOpacity={isDark ? 0.08 : 0.15}
          speed={0.8}
          particleCount={800}
          isDark={isDark}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center pointer-events-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 rounded-full text-gray-900 dark:text-white text-sm mb-8">
          <Sparkles size={16} />
          <span>Yeni nesil yazılım çözümleri</span>
        </div>

        {/* Title */}
        <div
          ref={titleRef}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight dark:text-white text-gray-900">
            İşletmenizi
          </h1>
          <GooeyText
            texts={['Dönüştüren', 'Güçlendiren', 'Hızlandıran', 'Dijitalleştiren']}
            morphTime={1.5}
            cooldownTime={2}
            className="h-[1.2em] my-2"
            textClassName="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text"
          />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight dark:text-white text-gray-900">
            Yazılım Çözümleri
          </h1>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl dark:text-gray-400 text-gray-600 max-w-2xl mx-auto mb-10"
        >
          CRONBi Health, School ve PIM ürünleri ile işletmenizin tüm
          süreçlerini dijitalleştirin ve verimliliğinizi artırın.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#products">
            <LiquidGlassButton size="lg">
              <span className="flex items-center gap-2">
                Ürünleri Keşfet
                <ArrowRight size={18} />
              </span>
            </LiquidGlassButton>
          </a>
          <a href="#contact">
            <LiquidGlassButton size="lg">
              <span className="flex items-center gap-2">
                Bize Ulaşın
              </span>
            </LiquidGlassButton>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-10 dark:border-white/10 border-black/10 border-t">
          <div>
            <div className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900">500+</div>
            <div className="text-gray-500 text-sm mt-1">Mutlu Müşteri</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900">99.9%</div>
            <div className="text-gray-500 text-sm mt-1">Uptime</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900">7/24</div>
            <div className="text-gray-500 text-sm mt-1">Destek</div>
          </div>
        </div>
      </div>
    </section>
  )
}
