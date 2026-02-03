import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Palette,
  MessageSquare,
  Users,
  BarChart3,
  Heart,
  GraduationCap,
  Package
} from 'lucide-react'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/Sidebar'
import Logo from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

const menuLinks = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "Mesajlar",
    href: "/admin/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    label: "Ayarlar",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

const productLinks = [
  {
    label: "Health",
    href: "/admin/products/health",
    icon: <Heart className="h-5 w-5" />,
  },
  {
    label: "School",
    href: "/admin/products/school",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    label: "PIM",
    href: "/admin/products/pim",
    icon: <Package className="h-5 w-5" />,
  },
]

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = async () => {
    const token = localStorage.getItem('adminToken')
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  const isActive = (href) => {
    if (href === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-6">
          {/* Top Section */}
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Logo */}
            <div className="mb-8 px-1">
              {open ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <Logo size="small" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Admin</span>
                </motion.div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center">
                  <span className="text-white dark:text-gray-900 font-bold text-sm">C</span>
                </div>
              )}
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-1">
              <SidebarSectionTitle open={open} title="Menu" />
              {menuLinks.map((link) => (
                <SidebarLink
                  key={link.href}
                  link={{ ...link, active: isActive(link.href) }}
                />
              ))}
            </div>

            {/* Products */}
            <div className="flex flex-col gap-1 mt-6">
              <SidebarSectionTitle open={open} title="Ürünler" />
              {productLinks.map((link) => (
                <SidebarLink
                  key={link.href}
                  link={{ ...link, active: isActive(link.href) }}
                />
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 dark:border-white/10 pt-4">
            <SidebarLink
              link={{
                label: "Çıkış Yap",
                href: "#",
                icon: <LogOut className="h-5 w-5" />,
              }}
              onClick={handleLogout}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

function SidebarSectionTitle({ open, title }) {
  if (!open) return null

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-2"
    >
      {title}
    </motion.p>
  )
}
