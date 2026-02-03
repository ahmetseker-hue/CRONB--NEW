import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 hover:bg-black/10 transition-colors"
      aria-label={isDark ? 'Açık moda geç' : 'Koyu moda geç'}
    >
      {isDark ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-gray-700" />
      )}
    </button>
  )
}
