import { useRef, useEffect, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { Send, CheckCircle, AlertCircle, Check } from 'lucide-react'

export default function CTASection() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: data.message })
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        setStatus({ type: 'error', message: data.error })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Bir hata oluştu. Lütfen tekrar deneyin.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    'Ücretsiz demo ve danışmanlık',
    '7/24 teknik destek',
    'Özelleştirilebilir çözümler',
  ]

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-6 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl border-2 border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 mb-4">
                Hadi Konuşalım
              </h2>
              <p className="dark:text-gray-400 text-gray-600 mb-8">
                İşletmenizi dönüştürmeye hazır mısınız? Uzman ekibimiz size en
                uygun çözümü bulmak için hazır.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-white dark:text-gray-900" />
                    </div>
                    <span className="dark:text-gray-300 text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm dark:text-gray-400 text-gray-600 mb-2">Adınız</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Adınız Soyadınız"
                    className="w-full bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 dark:text-white text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm dark:text-gray-400 text-gray-600 mb-2">E-posta</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ornek@sirket.com"
                    className="w-full bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 dark:text-white text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm dark:text-gray-400 text-gray-600 mb-2">
                  Şirket <span className="text-gray-400">(Opsiyonel)</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Şirket Adı"
                  className="w-full bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 dark:text-white text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm dark:text-gray-400 text-gray-600 mb-2">Mesajınız</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Projeniz hakkında bilgi verin..."
                  className="w-full bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 dark:text-white text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors resize-none"
                />
              </div>

              {status.message && (
                <div
                  className={`flex items-center gap-2 p-4 rounded-xl ${
                    status.type === 'success'
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 font-medium rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Gönderiliyor...'
                ) : (
                  <>
                    Mesaj Gönder
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
