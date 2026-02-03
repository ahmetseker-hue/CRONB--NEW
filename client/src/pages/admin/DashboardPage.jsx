import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mail,
  Building,
  Calendar,
  RefreshCw,
  Inbox,
  TrendingUp,
  Users,
  Eye
} from 'lucide-react'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [data, setData] = useState({ contacts: [], stats: { total: 0, today: 0 } })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchMessages = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('adminToken')

    if (!token) {
      navigate('/admin/login')
      return
    }

    try {
      const response = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
        return
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError('Mesajlar yüklenemedi!')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6 md:p-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Hoş geldiniz! İşte genel bakış.
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 rounded-xl transition-colors"
        >
          <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Yenile</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard
          icon={<Inbox size={24} />}
          label="Toplam Mesaj"
          value={data.stats.total}
          color="blue"
        />
        <StatCard
          icon={<TrendingUp size={24} />}
          label="Bugün"
          value={data.stats.today}
          color="green"
        />
        <StatCard
          icon={<Users size={24} />}
          label="Kullanıcılar"
          value="-"
          color="purple"
        />
        <StatCard
          icon={<Eye size={24} />}
          label="Ziyaretçi"
          value="-"
          color="orange"
        />
      </div>

      {/* Recent Messages */}
      <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
        <div className="p-5 md:p-6 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Son Mesajlar
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {data.contacts.length} mesaj
          </span>
        </div>

        {error && (
          <div className="p-6 text-red-500 dark:text-red-400">{error}</div>
        )}

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400">
            <RefreshCw size={32} className="animate-spin mx-auto mb-4" />
            Yükleniyor...
          </div>
        ) : data.contacts.length === 0 ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400">
            <Inbox size={48} className="mx-auto mb-4 opacity-50" />
            Henüz mesaj yok
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-white/5">
            {data.contacts.slice(0, 5).map((contact) => (
              <div key={contact.id} className="p-5 md:p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 font-medium">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-gray-900 dark:text-white font-medium">{contact.name}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Mail size={14} />
                            {contact.email}
                          </span>
                          {contact.company && (
                            <span className="flex items-center gap-1">
                              <Building size={14} />
                              {contact.company}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">{contact.message}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">
                    <Calendar size={14} />
                    {formatDate(contact.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }) {
  const colors = {
    blue: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
  }

  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-5 md:p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{label}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  )
}
