"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/Switch"
import { useTheme } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"

export function GlowThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="flex items-center space-x-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          isDark
            ? "text-gray-500 scale-75 rotate-12"
            : "text-gray-900 scale-100 rotate-0"
        )}
      />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
        className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110"
      />
      <Moon
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          !isDark
            ? "text-gray-400 scale-75 rotate-12"
            : "text-white scale-100 rotate-0"
        )}
      />
    </div>
  )
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
}

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

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export function GlowMenuItem({ item, onClick }) {
  return (
    <motion.li className="relative">
      <motion.div
        className="block rounded-xl overflow-visible group relative"
        style={{ perspective: "600px" }}
        whileHover="hover"
        initial="initial"
      >
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          variants={glowVariants}
          style={{
            background: item.gradient,
            opacity: 0,
            borderRadius: "16px",
          }}
        />
        <motion.a
          href={item.href}
          onClick={onClick}
          className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors rounded-xl"
          variants={itemVariants}
          transition={sharedTransition}
          style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
        >
          <span className={cn("transition-colors duration-300", item.iconColor)}>
            {item.icon}
          </span>
          <span className="font-medium">{item.label}</span>
        </motion.a>
        <motion.a
          href={item.href}
          onClick={onClick}
          className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors rounded-xl"
          variants={backVariants}
          transition={sharedTransition}
          style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
        >
          <span className={cn("transition-colors duration-300", item.iconColor)}>
            {item.icon}
          </span>
          <span className="font-medium">{item.label}</span>
        </motion.a>
      </motion.div>
    </motion.li>
  )
}

export function GlowMenuBar({ items, children }) {
  const { isDark } = useTheme()

  return (
    <motion.nav
      className="p-2 rounded-2xl bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-lg border border-gray-200 dark:border-white/10 shadow-lg relative overflow-hidden"
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className={cn(
          "absolute -inset-2 bg-gradient-radial from-transparent to-transparent rounded-3xl z-0 pointer-events-none",
          isDark
            ? "via-gray-400/20 via-50%"
            : "via-gray-400/10 via-50%"
        )}
        variants={navGlowVariants}
      />
      <ul className="flex items-center gap-1 relative z-10">
        {items.map((item) => (
          <GlowMenuItem key={item.label} item={item} />
        ))}
        {children}
      </ul>
    </motion.nav>
  )
}

export default GlowMenuBar
