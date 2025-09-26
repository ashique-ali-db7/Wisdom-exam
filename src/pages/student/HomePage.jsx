import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, BookOpen, ShoppingBag, GraduationCap } from 'lucide-react'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import { dummyData } from '../../data/dummyData'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <GraduationCap size={32} className="text-primary-500" />
              <h1 className="text-3xl font-bold text-gradient">Kids Exam Platform</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin')}
              className="!border-gray-300"
            >
              Admin Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Welcome to Your 
              <span className="text-gradient block">Learning Journey!</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Take exciting exams, learn Islamic studies, and track your progress 
              in a fun and engaging environment designed just for you!
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/student-login')}
              className="bg-gradient-primary text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Play size={24} className="mr-2" />
              Enter Exam Portal
            </Button>
          </div>

          {/* Floating Icons */}
          <div className="relative mt-16">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-8 opacity-20">
                <BookOpen size={48} className="text-primary-500 animate-float" />
                <GraduationCap size={48} className="text-secondary-500 animate-pulse" />
                <Play size={48} className="text-success-500 animate-bounce-slow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Available Programs</h3>
            <p className="text-lg text-gray-600">Choose from our carefully designed Islamic education programs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dummyData.programs.map((program) => (
              <Card key={program.id} childFriendly className="text-center border-2 border-primary-100 hover:border-primary-300 transition-all duration-200">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={24} className="text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{program.title}</h4>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="text-sm text-primary-600 font-medium">
                  Class: {program.class} | Duration: {program.duration}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Educational Books</h3>
            <p className="text-lg text-gray-600">Discover our collection of Islamic educational books</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dummyData.books.map((book) => (
              <Card key={book.id} childFriendly className="border-2 border-secondary-100 hover:border-secondary-300 transition-all duration-200">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag size={24} className="text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h4>
                <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                <p className="text-gray-600 mb-4">{book.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-secondary-600">{book.price}</span>
                  <span className="text-sm text-gray-500">Class: {book.class}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Start Learning?</h3>
          <p className="text-xl text-blue-100 mb-8">Join thousands of students on their Islamic education journey</p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/student-login')}
            className="shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200"
          >
            <Play size={24} className="mr-2" />
            Start Your Exam Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 Kids Exam Platform. Empowering young minds through Islamic education.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
