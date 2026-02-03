import { cn } from '@/lib/utils'

export default function Logo({ className, size = 'default' }) {
  const sizeClasses = {
    small: 'h-10 md:h-12',
    default: 'h-14 md:h-[75px]', // 75px yükseklik
    large: 'h-16 md:h-20',
  }

  return (
    <img
      src="/images/logo.png"
      alt="CRONBi Logo"
      className={cn(
        sizeClasses[size],
        'w-auto', // Genişlik otomatik (aspect ratio korunur)
        // Dark modda logoyu beyaza çevir
        'dark:invert dark:brightness-100',
        className
      )}
    />
  )
}

// Text tabanlı logo (yedek)
export function LogoText({ className, size = 'default' }) {
  const sizeClasses = {
    small: 'text-lg',
    default: 'text-xl',
    large: 'text-2xl',
  }

  return (
    <span className={cn('font-bold tracking-tight', sizeClasses[size], className)}>
      <span className="px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full">
        cron
      </span>
      <span className="text-gray-900 dark:text-white ml-0.5">BI</span>
    </span>
  )
}
