"use client"

import { useEffect, useId, useState, useRef } from "react"
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion"
import {
  Heart,
  GraduationCap,
  Package,
  ChevronRight,
  Plus,
  BarChart3,
  Users,
  FileText,
  Building2,
  Truck,
  ShoppingCart
} from "lucide-react"
import { cn } from "@/lib/utils"

const defaultTimelineData = [
  {
    id: 1,
    title: "CRONBi Health",
    description: "Sağlık kurumları için kapsamlı yönetim sistemi",
    icon: Heart,
    color: "from-red-500 to-rose-600",
    borderColor: "border-red-500/50",
    bgColor: "bg-red-500",
    features: ["Hasta Takibi", "Randevu Yönetimi", "Laboratuvar", "Faturalama"],
    stats: "500+ Kurum",
  },
  {
    id: 2,
    title: "CRONBi School",
    description: "Eğitim kurumları için dijital dönüşüm çözümü",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-600",
    borderColor: "border-blue-500/50",
    bgColor: "bg-blue-500",
    features: ["Öğrenci Bilgi", "E-Okul Entegrasyon", "Sınav Sistemi", "Veli Portalı"],
    stats: "1000+ Okul",
  },
  {
    id: 3,
    title: "CRONBi PIM",
    description: "Ürün bilgi yönetimi ve e-ticaret entegrasyonu",
    icon: Package,
    color: "from-emerald-500 to-teal-600",
    borderColor: "border-emerald-500/50",
    bgColor: "bg-emerald-500",
    features: ["Ürün Katalog", "Pazaryeri Entegrasyon", "Stok Yönetimi", "Fiyatlandırma"],
    stats: "10M+ Ürün",
  },
]

const expandableModules = [
  { icon: BarChart3, label: "Raporlama" },
  { icon: Users, label: "CRM" },
  { icon: FileText, label: "Doküman" },
  { icon: Building2, label: "ERP" },
  { icon: Truck, label: "Lojistik" },
  { icon: ShoppingCart, label: "E-Ticaret" },
]

function OrbitRing({ radius, dashed = false, rotating = false, duration = 60 }) {
  return (
    <motion.div
      className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border",
        dashed
          ? "border-dashed border-gray-300 dark:border-gray-700"
          : "border-gray-200 dark:border-gray-800"
      )}
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
      animate={rotating ? { rotate: 360 } : {}}
      transition={rotating ? { duration, repeat: Infinity, ease: "linear" } : {}}
    />
  )
}

function CenterLogo() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="relative">
        {/* Outer glow */}
        <motion.div
          className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Main circle */}
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-white dark:bg-gray-900 shadow-2xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden">
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gray-900 dark:border-white"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          {/* Logo */}
          <img
            src="/images/logo.png"
            alt="CRONBi"
            className="w-12 h-12 md:w-16 md:h-16 object-contain dark:brightness-0 dark:invert"
          />
        </div>
      </div>
    </div>
  )
}

function RotatingOrbit({
  items,
  radius,
  duration = 30,
  reverse = false,
  selectedItem,
  onSelect,
  isMainOrbit = true
}) {
  const [rotation, setRotation] = useState(0)
  const requestRef = useRef()
  const previousTimeRef = useRef()
  const speed = (360 / duration) / 60 // degrees per frame at 60fps

  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        setRotation(prev => {
          const newRotation = prev + (reverse ? -speed : speed)
          return newRotation % 360
        })
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [speed, reverse])

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      {items.map((item, index) => {
        const baseAngle = (index / items.length) * 360
        const currentAngle = (baseAngle + rotation) * (Math.PI / 180)
        const x = Math.cos(currentAngle) * radius
        const y = Math.sin(currentAngle) * radius
        const Icon = item.icon
        const isSelected = selectedItem?.id === item.id

        if (isMainOrbit) {
          return (
            <motion.button
              key={item.id}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                x: x,
                y: y,
              }}
              onClick={() => onSelect(isSelected ? null : item)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={cn(
                  "relative -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-18 md:h-18 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 shadow-lg",
                  "bg-white dark:bg-gray-900",
                  isSelected
                    ? `${item.borderColor} shadow-xl scale-110`
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                )}
                style={{
                  transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                }}
              >
                {/* Gradient background on select */}
                {isSelected && (
                  <div className={cn(
                    "absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br",
                    item.color
                  )} />
                )}
                <Icon
                  className={cn(
                    "w-6 h-6 md:w-7 md:h-7 transition-colors duration-300 relative z-10",
                    isSelected
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                />
              </div>
              {/* Label */}
              <div
                className="absolute top-full mt-2 left-1/2 whitespace-nowrap pointer-events-none"
                style={{
                  transform: `translateX(-50%) rotate(${-rotation}deg)`,
                }}
              >
                <span className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full transition-colors",
                  isSelected
                    ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                    : "text-gray-500 dark:text-gray-500"
                )}>
                  {item.title.replace("CRONBi ", "")}
                </span>
              </div>
            </motion.button>
          )
        } else {
          // Outer orbit - expandable modules
          return (
            <div
              key={item.label}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <div
                className="w-10 h-10 md:w-12 md:h-12 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center opacity-50 hover:opacity-80 transition-opacity"
                style={{
                  transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                }}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

function DetailCard({ item }) {
  if (!item) return null
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="w-full max-w-sm"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xl">
        <div className="flex items-start gap-4 mb-4">
          <div className={cn("p-3 rounded-xl bg-gradient-to-br", item.color)}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
          <span className="text-gray-500 dark:text-gray-400">Aktif Kullanım</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {item.stats}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
            Özellikler
          </p>
          <div className="flex flex-wrap gap-2">
            {item.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
          Detaylı Bilgi
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

function DefaultInfo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center lg:text-left max-w-sm"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400 mb-4">
        <Plus className="w-3 h-3" />
        Modüler Sistem
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        İhtiyacınıza Göre Genişleyin
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
        CRONBi modülleri ihtiyaçlarınıza göre eklenebilir. Temel modüllerle
        başlayın, işletmeniz büyüdükçe yeni özellikler ekleyin.
      </p>
      <div className="flex flex-wrap gap-2">
        {expandableModules.slice(0, 3).map((mod) => (
          <span
            key={mod.label}
            className="px-2.5 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
          >
            + {mod.label}
          </span>
        ))}
        <span className="px-2.5 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          +{expandableModules.length - 3} daha
        </span>
      </div>
    </motion.div>
  )
}

export default function RadialOrbitalTimeline({
  timelineData = defaultTimelineData,
  className,
}) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [innerRadius, setInnerRadius] = useState(120)
  const [outerRadius, setOuterRadius] = useState(200)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setInnerRadius(90)
        setOuterRadius(150)
      } else {
        setInnerRadius(120)
        setOuterRadius(200)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const containerSize = (outerRadius + 80) * 2

  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        {/* Orbital Container */}
        <div
          className="relative flex-shrink-0"
          style={{
            width: containerSize,
            height: containerSize,
          }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent rounded-full" />

          {/* Orbit rings */}
          <OrbitRing radius={innerRadius} />
          <OrbitRing radius={outerRadius} dashed />

          {/* Center Logo */}
          <CenterLogo />

          {/* Main products orbit */}
          <RotatingOrbit
            items={timelineData}
            radius={innerRadius}
            duration={40}
            selectedItem={selectedItem}
            onSelect={setSelectedItem}
            isMainOrbit={true}
          />

          {/* Expandable modules orbit */}
          <RotatingOrbit
            items={expandableModules}
            radius={outerRadius}
            duration={60}
            reverse={true}
            selectedItem={null}
            onSelect={() => {}}
            isMainOrbit={false}
          />
        </div>

        {/* Info Panel */}
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <DetailCard key={selectedItem.id} item={selectedItem} />
            ) : (
              <DefaultInfo key="default" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
