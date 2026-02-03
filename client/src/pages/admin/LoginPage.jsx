import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        localStorage.setItem('adminToken', data.token)
        navigate('/admin/dashboard')
      } else {
        setError(data.error || 'Giriş başarısız!')
      }
    } catch (err) {
      setError('Sunucuya bağlanılamadı!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cronbi-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cronbi-primary to-cronbi-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Paneli</h1>
          <p className="text-gray-500 mt-2">Yönetim paneline giriş yapın</p>
        </div>

        {/* Form */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 text-red-400">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Kullanıcı Adı</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  placeholder="admin"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cronbi-primary transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Şifre</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-cronbi-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cronbi-primary to-cronbi-accent text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cronbi-primary/25 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-500 text-sm">
              Varsayılan: <span className="text-gray-400">admin</span> / <span className="text-gray-400">cronbi2024</span>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <a href="/" className="text-gray-500 hover:text-white transition-colors">
            ← Ana sayfaya dön
          </a>
        </div>
      </div>
    </div>
  )
}
