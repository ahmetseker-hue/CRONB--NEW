"use client"

import { useRef } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function StickyScrollReveal({
  content,
  contentClassName,
}) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundColors = [
    "var(--bg-1, transparent)",
    "var(--bg-2, transparent)",
    "var(--bg-3, transparent)",
  ]

  const linearGradients = [
    "linear-gradient(to bottom right, transparent, transparent)",
    "linear-gradient(to bottom right, transparent, transparent)",
    "linear-gradient(to bottom right, transparent, transparent)",
  ]

  const [activeCard, setActiveCard] = React.useState(0)

  const cardLength = content.length

  // Her kart için scroll pozisyonu hesapla
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const cardsBreakpoints = content.map((_, index) => index / cardLength)
      const closestBreakpointIndex = cardsBreakpoints.reduce(
        (acc, breakpoint, index) => {
          const distance = Math.abs(latest - breakpoint)
          if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
            return index
          }
          return acc
        },
        0
      )
      setActiveCard(closestBreakpointIndex)
    })
    return () => unsubscribe()
  }, [scrollYProgress, cardLength, content])

  return (
    <motion.div
      ref={containerRef}
      className="relative flex justify-center space-x-10 rounded-md p-10"
    >
      {/* Sol taraf - Metin içeriği */}
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20 first:mt-0">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-gray-600 dark:text-gray-400 max-w-sm mt-4 text-base"
              >
                {item.description}
              </motion.p>
              {item.content && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="mt-6"
                >
                  {item.content}
                </motion.div>
              )}
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>

      {/* Sağ taraf - Sticky görsel */}
      <div
        className={cn(
          "hidden lg:block h-80 w-96 rounded-2xl sticky top-40 overflow-hidden border-2 border-gray-200 dark:border-white/10",
          contentClassName
        )}
      >
        {content.map((item, index) => (
          <motion.div
            key={item.title + index + "image"}
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeCard === index ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                {item.icon && (
                  <item.icon size={80} className="text-gray-300 dark:text-white/20" />
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

import React from "react"

export default StickyScrollReveal
