import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Heart, GraduationCap, Package, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/ui/Logo'
import { GlowMenuItem, GlowThemeToggle } from '@/components/ui/GlowMenu'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    icon: <Heart className="h-4 w-4" />,
    label: "Health",
    href: "#health",
    gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "group-hover:text-red-500",
  },
  {
    icon: <GraduationCap className="h-4 w-4" />,
    label: "School",
    href: "#school",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "group-hover:text-blue-500",
  },
  {
    icon: <Package className="h-4 w-4" />,
    label: "PIM",
    href: "#pim",
    gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "group-hover:text-green-500",
  },
  {
    icon: <Mail className="h-4 w-4" />,
    label: "İletişim",
    href: "#contact",
    gradient: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
    iconColor: "group-hover:text-purple-500",
  },
]

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDark } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      {/* Desktop - Unified Glow Header */}
      <motion.div
        className="hidden lg:flex items-center gap-1 p-2 rounded-2xl bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-lg relative overflow-hidden"
        initial="initial"
        whileHover="hover"
      >
        {/* Glow Effect */}
        <motion.div
          className={cn(
            "absolute -inset-2 rounded-3xl z-0 pointer-events-none",
            isDark
              ? "bg-gradient-radial from-transparent via-white/10 to-transparent"
              : "bg-gradient-radial from-transparent via-gray-400/10 to-transparent"
          )}
          variants={navGlowVariants}
        />

        {/* Logo */}
        <Link to="/" className="flex items-center px-3 relative z-10">
          <Logo size="small" />
        </Link>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 dark:bg-white/10 mx-1" />

        {/* Menu Items */}
        <ul className="flex items-center gap-1 relative z-10">
          {menuItems.map((item) => (
            <GlowMenuItem key={item.label} item={item} />
          ))}
        </ul>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 dark:bg-white/10 mx-1" />

        {/* CTA Button */}
        <div className="relative z-10">
          <a href="#contact">
            <LiquidGlassButton size="default">
              Demo Talep Et
            </LiquidGlassButton>
          </a>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 dark:bg-white/10 mx-1" />

        {/* Theme Toggle */}
        <div className="px-2 relative z-10">
          <GlowThemeToggle />
        </div>
      </motion.div>

      {/* Mobile Header */}
      <div className="lg:hidden w-full">
        <motion.div
          className="flex items-center justify-between p-3 rounded-2xl bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-lg"
          initial="initial"
          whileHover="hover"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="small" />
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <GlowThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-900 dark:text-white rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mt-2 p-3 rounded-2xl bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-lg"
            >
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={item.iconColor.replace('group-hover:', '')}>{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-white/10">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block">
                  <LiquidGlassButton size="default" className="w-full justify-center">
                    Demo Talep Et
                  </LiquidGlassButton>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
