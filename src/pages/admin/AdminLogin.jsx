import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { Shield, ArrowRight, Home } from 'lucide-react'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import { adminLoginSchema } from '../../utils/validation'
import { useAuth } from '../../contexts/AuthContext'
import { dummyData } from '../../data/dummyData'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { loginAdmin } = useAuth()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(adminLoginSchema)
  })

  const onSubmit = async (data) => {
    try {
      // Validate credentials against dummy data
      if (
        data.email === dummyData.adminCredentials.email && 
        data.password === dummyData.adminCredentials.password
      ) {
        loginAdmin({ email: data.email })
        navigate('/admin/dashboard')
      } else {
        setError('email', { message: 'Invalid email or password' })
        setError('password', { message: 'Invalid email or password' })
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('email', { message: 'Login failed. Please try again.' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="admin-interface border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h2>
            <p className="text-gray-600">Access the administration panel</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="Enter your password"
                className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              loading={isSubmitting}
              className="w-full bg-gray-800 hover:bg-gray-900"
            >
              Login to Admin Panel
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center justify-center"
            >
              <Home size={16} className="mr-1" />
              Back to Student Portal
            </button>
          </div>
        </Card>

        {/* Test Credentials */}
        <Card className="mt-6 bg-gray-100 border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2">Test Credentials:</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Email:</strong> admin@examplatform.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AdminLogin
