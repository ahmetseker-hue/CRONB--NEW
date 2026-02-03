import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

// Hazır renk paleti - Logo uyumlu
export const colorPalette = [
  { name: 'Beyaz', value: '#ffffff' },
  { name: 'Siyah', value: '#1a1a1a' },
  { name: 'Gri', value: '#a3a3a3' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
]

export function ThemeProvider({ children }) {
  // LocalStorage'dan başlangıç değerlerini al
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('cronbi-theme')
    return saved ? saved === 'dark' : true
  })

  // Dark mod için partikül rengi
  const [darkModeColor, setDarkModeColor] = useState(() => {
    const saved = localStorage.getItem('cronbi-particle-color-dark')
    return saved || '#ffffff' // Varsayılan: Beyaz (logoya uygun)
  })

  // Light mod için partikül rengi
  const [lightModeColor, setLightModeColor] = useState(() => {
    const saved = localStorage.getItem('cronbi-particle-color-light')
    return saved || '#1a1a1a' // Varsayılan: Siyah (logoya uygun)
  })

  // Aktif partikül rengi (mod'a göre)
  const particleColor = isDark ? darkModeColor : lightModeColor

  // Dark mode değiştiğinde HTML class'ını güncelle
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    localStorage.setItem('cronbi-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  // Renkleri kaydet
  useEffect(() => {
    localStorage.setItem('cronbi-particle-color-dark', darkModeColor)
  }, [darkModeColor])

  useEffect(() => {
    localStorage.setItem('cronbi-particle-color-light', lightModeColor)
  }, [lightModeColor])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  // Aktif mod için renk ayarla
  const setParticleColor = (color) => {
    if (isDark) {
      setDarkModeColor(color)
    } else {
      setLightModeColor(color)
    }
  }

  const value = {
    isDark,
    toggleTheme,
    particleColor,
    setParticleColor,
    darkModeColor,
    setDarkModeColor,
    lightModeColor,
    setLightModeColor,
    colorPalette,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
