import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const blogPosts = [
  {
    id: 1,
    title: "Dijital Dönüşümde Sağlık Sektörü",
    excerpt: "Sağlık sektöründe dijital dönüşümün önemi ve CRONBi Health'in sunduğu yenilikçi çözümler hakkında detaylı bilgi.",
    category: "Health",
    date: "15 Ocak 2026",
    readTime: "5 dk",
    gradient: { from: "from-red-500", to: "to-pink-600" },
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Eğitimde Teknoloji Entegrasyonu",
    excerpt: "Modern eğitim kurumlarının dijital araçlarla nasıl daha verimli hale gelebileceğini keşfedin.",
    category: "School",
    date: "12 Ocak 2026",
    readTime: "7 dk",
    gradient: { from: "from-blue-500", to: "to-cyan-600" },
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Ürün Bilgi Yönetiminin Gücü",
    excerpt: "E-ticaret ve perakende sektöründe PIM sistemlerinin satışları nasıl artırdığını öğrenin.",
    category: "PIM",
    date: "8 Ocak 2026",
    readTime: "6 dk",
    gradient: { from: "from-green-500", to: "to-emerald-600" },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
  },
]

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

const generateRandomString = (length) => {
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function BlogCard({ post, index }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const maskImage = useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={onMouseMove}
      className="group relative h-[420px] rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden cursor-pointer"
    >
      {/* Hover Gradient Effect */}
      <motion.div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
          post.gradient.from,
          post.gradient.to
        )}
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />

      {/* Random Characters Background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 overflow-hidden"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <p className="text-[8px] text-white font-mono break-all whitespace-pre-wrap leading-none">
          {generateRandomString(2000)}
        </p>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* Image */}
        <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Category Badge */}
          <span className={cn(
            "absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full text-white bg-gradient-to-r",
            post.gradient.from,
            post.gradient.to
          )}>
            {post.category}
          </span>
        </div>

        {/* Text Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-white transition-colors duration-300">
            {post.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 group-hover:text-white/80 transition-colors duration-300">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 group-hover:text-white/70 transition-colors duration-300">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>

            <motion.div
              className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              <span>Oku</span>
              <ArrowRight size={14} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Corner Icons */}
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gray-200 dark:border-white/20 rounded-tr-lg group-hover:border-white/50 transition-colors" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gray-200 dark:border-white/20 rounded-bl-lg group-hover:border-white/50 transition-colors" />
    </motion.div>
  )
}

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 px-6 bg-gray-50 dark:bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 rounded-full text-gray-900 dark:text-white text-sm mb-6">
            <Sparkles size={16} />
            <span>Blog & Haberler</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Son Yazılarımız
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Dijital dönüşüm, teknoloji trendleri ve sektörel gelişmeler hakkında
            en güncel içerikleri keşfedin.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl font-medium transition-colors"
          >
            Tüm Yazıları Gör
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
