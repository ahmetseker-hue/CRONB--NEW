import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '@/lib/gsap'
import { Heart, GraduationCap, Package, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const products = [
  {
    id: 'health',
    name: 'Health',
    icon: Heart,
    // Kendi ekran görüntünüzü buraya ekleyin:
    image: '/images/screenshots/health.png',
    // Veya placeholder olarak Unsplash:
    fallback: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
  },
  {
    id: 'school',
    name: 'School',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80&auto=format&fit=crop',
  },
  {
    id: 'pim',
    name: 'PIM',
    icon: Package,
    image: '/images/screenshots/pim.png',
    fallback: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
  },
]

export default function TabsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState({})
  const sectionRef = useRef(null)

  const activeProduct = products[activeIndex]

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))
  }

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.showcase-container',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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
      className="py-20 md:py-32 px-6 bg-white dark:bg-[#0a0a0a]"
    >
      <div className="max-w-6xl mx-auto showcase-container">
        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {products.map((product, index) => {
            const Icon = product.icon
            return (
              <button
                key={product.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300",
                  activeIndex === index
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20"
                )}
              >
                <Icon size={18} />
                <span>{product.name}</span>
              </button>
            )
          })}
        </div>

        {/* Screenshot Display */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 dark:bg-gray-900/90 shadow-lg hover:bg-white dark:hover:bg-gray-900 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-900 dark:text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 dark:bg-gray-900/90 shadow-lg hover:bg-white dark:hover:bg-gray-900 transition-colors"
          >
            <ChevronRight size={24} className="text-gray-900 dark:text-white" />
          </button>

          {/* Image Container */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={imageErrors[activeProduct.id] ? activeProduct.fallback : activeProduct.image}
                  alt={`CRONBi ${activeProduct.name} Screenshot`}
                  onError={() => handleImageError(activeProduct.id)}
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>

            {/* Product Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg">
              <activeProduct.icon size={18} className="text-gray-900 dark:text-white" />
              <span className="font-medium text-gray-900 dark:text-white">
                CRONBi {activeProduct.name}
              </span>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? "w-8 bg-gray-900 dark:bg-white"
                    : "bg-gray-300 dark:bg-white/30 hover:bg-gray-400 dark:hover:bg-white/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
