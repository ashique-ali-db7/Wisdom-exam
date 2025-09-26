import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { LogOut, Home, BookOpen, HelpCircle, Users } from 'lucide-react'
import Button from '../UI/Button'

const AdminLayout = ({ children, title }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  const navigationItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { path: '/admin/quizzes', label: 'Quizzes', icon: BookOpen },
    { path: '/admin/students', label: 'Students', icon: Users }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              <p className="text-sm text-gray-600">Admin Panel</p>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="!border-red-300 !text-red-600 hover:!bg-red-50"
            >
              <LogOut size={16} className="mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <aside className="w-64 bg-white rounded-lg shadow-sm p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </aside>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
