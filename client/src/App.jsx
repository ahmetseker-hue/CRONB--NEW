import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './components/layout/Layout'
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import SettingsPage from './pages/admin/SettingsPage'
import AdminLayout from './components/layout/AdminLayout'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with layout */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        {/* Admin login - no layout */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin routes with sidebar layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
