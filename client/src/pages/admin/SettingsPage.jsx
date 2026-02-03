import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Sun, Moon, Check, Palette, ExternalLink } from 'lucide-react'
import { useTheme, colorPalette } from '@/context/ThemeContext'

export default function SettingsPage() {
  const navigate = useNavigate()
  const {
    isDark,
    toggleTheme,
    darkModeColor,
    setDarkModeColor,
    lightModeColor,
    setLightModeColor,
  } = useTheme()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [navigate])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="p-6 md:p-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Ayarlar
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Tema ve görünüm ayarlarını yönetin.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Theme Mode */}
        <SettingsCard>
          <div className="flex items-center gap-3 mb-6">
            {isDark ? (
              <Moon size={24} className="text-gray-900 dark:text-white" />
            ) : (
              <Sun size={24} className="text-yellow-500" />
            )}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tema Modu</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Açık veya koyu tema seçin</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => isDark && toggleTheme()}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                !isDark
                  ? 'border-gray-900 dark:border-white bg-gray-100 dark:bg-white/10'
                  : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Sun size={24} className={!isDark ? 'text-yellow-500' : 'text-gray-400'} />
                <span className={!isDark ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}>
                  Açık Mod
                </span>
                {!isDark && <Check size={18} className="text-green-500" />}
              </div>
            </button>

            <button
              onClick={() => !isDark && toggleTheme()}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                isDark
                  ? 'border-gray-900 dark:border-white bg-gray-100 dark:bg-white/10'
                  : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Moon size={24} className={isDark ? 'text-gray-900 dark:text-white' : 'text-gray-400'} />
                <span className={isDark ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}>
                  Koyu Mod
                </span>
                {isDark && <Check size={18} className="text-green-500" />}
              </div>
            </button>
          </div>
        </SettingsCard>

        {/* Dark Mode Color */}
        <ColorPicker
          title="Koyu Mod Rengi"
          subtitle="Dark tema için partikül rengi"
          icon={Moon}
          selectedColor={darkModeColor}
          onSelect={setDarkModeColor}
          bgPreview="#0a0a0a"
        />

        {/* Light Mode Color */}
        <ColorPicker
          title="Açık Mod Rengi"
          subtitle="Light tema için partikül rengi"
          icon={Sun}
          selectedColor={lightModeColor}
          onSelect={setLightModeColor}
          bgPreview="#ffffff"
        />

        {/* Go to Homepage */}
        <SettingsCard>
          <div className="flex items-center gap-3 mb-4">
            <Palette size={24} className="text-gray-900 dark:text-white" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Canlı Önizleme</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Değişiklikleri görmek için ana sayfayı ziyaret edin. Tema geçişi otomatik olarak uygulanır.
          </p>
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl font-medium transition-colors"
          >
            Ana Sayfaya Git
            <ExternalLink size={16} />
          </Link>
        </SettingsCard>
      </div>
    </div>
  )
}

function SettingsCard({ children }) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6">
      {children}
    </div>
  )
}

function ColorPicker({ title, subtitle, icon: Icon, selectedColor, onSelect, bgPreview }) {
  return (
    <SettingsCard>
      <div className="flex items-center gap-3 mb-6">
        <Icon size={24} className="text-gray-900 dark:text-white" />
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {colorPalette.map((color) => (
          <button
            key={color.value}
            onClick={() => onSelect(color.value)}
            className={`relative aspect-square rounded-xl transition-all border-2 ${
              selectedColor === color.value
                ? 'border-gray-900 dark:border-white scale-110 shadow-lg'
                : 'border-transparent hover:scale-105'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {selectedColor === color.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check size={20} className="text-white drop-shadow-lg" style={{
                  filter: color.value === '#ffffff' ? 'invert(1)' : 'none'
                }} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Mini Preview */}
      <div className="mt-4 flex items-center gap-4">
        <div
          className="flex-1 h-16 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/10"
          style={{ background: bgPreview }}
        >
          <div className="flex gap-1.5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: selectedColor,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-900 dark:text-white text-sm font-medium">
            {colorPalette.find((c) => c.value === selectedColor)?.name || 'Özel'}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs font-mono">{selectedColor}</p>
        </div>
      </div>
    </SettingsCard>
  )
}
