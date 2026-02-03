import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'

export default function OrbitalSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.orbital-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.orbital-content',
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
      id="modules"
      className="relative py-24 md:py-32 bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent dark:from-gray-900/50 dark:via-transparent dark:to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 orbital-content">
          <span className="inline-block px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-medium mb-4">
            Modüler Yapı
          </span>
          <h2 className="text-3xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            İhtiyacınıza Göre Büyüyen Sistem
          </h2>
          <p className="dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
            CRONBi'nin modüler mimarisi sayesinde, işletmeniz büyüdükçe yeni özellikler
            ekleyebilir ve sisteminizi genişletebilirsiniz. Tüm modüller birbirleriyle
            uyumlu çalışır.
          </p>
        </div>

        {/* Orbital Timeline */}
        <div className="orbital-content">
          <RadialOrbitalTimeline />
        </div>
      </div>
    </section>
  )
}
