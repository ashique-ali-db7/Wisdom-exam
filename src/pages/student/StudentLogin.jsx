import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { Phone, ArrowRight } from 'lucide-react'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import { mobileValidationSchema } from '../../utils/validation'
import { useAuth } from '../../contexts/AuthContext'

const StudentLogin = () => {
  const navigate = useNavigate()
  const { setMobile } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(mobileValidationSchema)
  })

  const onSubmit = async (data) => {
    try {
      setMobile(data.mobile)
      navigate(`/students/${data.mobile}`)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card childFriendly className="border-4 border-primary-200">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Student Login</h2>
            <p className="text-gray-600">Enter your mobile number to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                {...register('mobile')}
                type="tel"
                placeholder="Enter 10-digit mobile number"
                className={`input-field ${errors.mobile ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.mobile && (
                <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              loading={isSubmitting}
              className="w-full bg-gradient-primary"
            >
              Continue to Students
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </Card>

        {/* Test Info */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Test Numbers:</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• 9876543210 (3 students)</p>
            <p>• 9123456789 (1 student)</p>
            <p>• 9988776655 (1 student)</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default StudentLogin
