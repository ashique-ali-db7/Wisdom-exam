import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { LogOut, Home } from 'lucide-react'
import Button from '../UI/Button'

const StudentLayout = ({ children, title, showBackButton = false, backPath = '/' }) => {
  const { currentStudent, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleBack = () => {
    navigate(backPath)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow-lg border-b-4 border-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              {showBackButton && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleBack}
                  className="!border-primary-300"
                >
                  <Home size={16} className="mr-1" />
                  Back
                </Button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                {currentStudent && (
                  <p className="text-sm text-gray-600">
                    Welcome, {currentStudent.name} - Class {currentStudent.class}
                  </p>
                )}
              </div>
            </div>

            {currentStudent && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="!border-red-300 !text-red-600 hover:!bg-red-50"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default StudentLayout
