"use client"

import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-white dark:text-gray-900" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "bg-gray-900 dark:bg-white",
  titleClassName = "text-gray-900 dark:text-white",
}) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] lg:-skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-white dark:after:from-[#0a0a0a] after:to-transparent after:content-[''] hover:border-gray-900 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/10 hover:z-50 hover:shadow-xl lg:hover:shadow-none lg:hover:z-auto [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className={cn("relative inline-block rounded-full p-1", iconClassName)}>
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg dark:text-white text-gray-900">{description}</p>
      <p className="dark:text-gray-400 text-gray-600">{date}</p>
    </div>
  )
}

export default function DisplayCards({ cards }) {
  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-gray-300 dark:before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 dark:before:bg-black/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-gray-300 dark:before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 dark:before:bg-black/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ]

  const displayCards = cards || defaultCards

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  )
}

export { DisplayCard }
