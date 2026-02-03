import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { Check, Heart, GraduationCap, Package } from 'lucide-react'

const productDetails = [
  {
    id: 'health',
    name: 'CRONBi Health',
    title: 'Sağlık Sektörü için Kapsamlı Çözüm',
    description:
      'Hastane ve kliniklerin tüm operasyonlarını tek bir platformdan yönetin. Hasta kayıtlarından randevu sistemine, e-reçeteden raporlamaya kadar her şey elinizin altında.',
    icon: Heart,
    features: [
      'Hasta kayıt ve takip sistemi',
      'Online randevu yönetimi',
      'E-reçete ve ilaç takibi',
      'Laboratuvar entegrasyonu',
      'Detaylı raporlama araçları',
      'Mobil uygulama desteği',
    ],
  },
  {
    id: 'school',
    name: 'CRONBi School',
    title: 'Modern Eğitim Yönetim Platformu',
    description:
      'Öğrenci bilgilerinden not sistemine, veli portalından online sınavlara kadar eğitimin her aşamasını dijitalleştirin.',
    icon: GraduationCap,
    features: [
      'Öğrenci bilgi sistemi',
      'Not ve sınav yönetimi',
      'Veli iletişim portalı',
      'Online sınav modülü',
      'Devamsızlık takibi',
      'Ders programı planlama',
    ],
  },
  {
    id: 'pim',
    name: 'CRONBi PIM',
    title: 'Ürün Bilgi Yönetiminde Güç',
    description:
      'Tüm ürün verilerinizi merkezi bir sistemde yönetin. Pazaryerleri ve e-ticaret platformlarıyla sorunsuz entegrasyon.',
    icon: Package,
    features: [
      'Merkezi ürün kataloğu',
      'Çoklu kanal senkronizasyonu',
      'Veri zenginleştirme araçları',
      'API entegrasyonları',
      'Toplu düzenleme özellikleri',
      'Versiyon kontrolü',
    ],
  },
]

function ProductSection({ product, index }) {
  const sectionRef = useRef(null)
  const Icon = product.icon
  const isReversed = index % 2 === 1

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
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
    <div
      ref={sectionRef}
      id={product.id}
      className={`grid md:grid-cols-2 gap-12 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Content */}
      <div className={isReversed ? 'md:order-2' : ''}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-medium mb-4">
          <Icon size={16} />
          <span>{product.name}</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-900 mb-4">
          {product.title}
        </h3>

        <p className="dark:text-gray-400 text-gray-600 mb-8">{product.description}</p>

        <ul className="space-y-3">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-white dark:text-gray-900" />
              </div>
              <span className="dark:text-gray-300 text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full font-medium transition-colors"
        >
          Demo Talep Et
        </a>
      </div>

      {/* Visual */}
      <div className={`${isReversed ? 'md:order-1' : ''}`}>
        <div className="aspect-video rounded-2xl border-2 border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-center">
          <Icon size={80} className="dark:text-white/20 text-gray-300" />
        </div>
      </div>
    </div>
  )
}

export default function ProductDetails() {
  return (
    <section id="about" className="py-20 px-6 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto space-y-32">
        {productDetails.map((product, index) => (
          <ProductSection key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}
