import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { Heart, GraduationCap, Package, ArrowRight } from 'lucide-react'

const products = [
  {
    id: 'health',
    name: 'CRONBi Health',
    description: 'Hastane ve klinikler için kapsamlı sağlık yönetim sistemi',
    icon: Heart,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
  },
  {
    id: 'school',
    name: 'CRONBi School',
    description: 'Okullar için modern eğitim yönetim platformu',
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'pim',
    name: 'CRONBi PIM',
    description: 'E-ticaret için güçlü ürün bilgi yönetimi',
    icon: Package,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
]

function ProductCard({ product, index }) {
  const cardRef = useRef(null)
  const Icon = product.icon

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.15,
        }
      )
    }, cardRef)
    return () => ctx.revert()
  }, [index])

  return (
    <a
      ref={cardRef}
      href={`#${product.id}`}
      className={`group glass-card p-8 hover:border-white/20 transition-all duration-300`}
    >
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl ${product.bgColor} border ${product.borderColor} flex items-center justify-center mb-6`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-3">{product.name}</h3>
      <p className="text-gray-400 mb-6">{product.description}</p>

      {/* Link */}
      <div className="flex items-center gap-2 text-cronbi-primary group-hover:gap-3 transition-all">
        <span className="text-sm font-medium">Detayları Gör</span>
        <ArrowRight size={16} />
      </div>
    </a>
  )
}

export default function ProductShowcase() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="products" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ürünlerimiz
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Her sektöre özel, güçlü ve kullanımı kolay yazılım çözümleri
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
