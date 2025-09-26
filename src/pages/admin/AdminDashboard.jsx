import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Users, FileText, TrendingUp, Plus, Eye } from 'lucide-react'
import AdminLayout from '../../components/Layout/AdminLayout'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import { useAdmin } from '../../contexts/AdminContext'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { stats, quizzes, results } = useAdmin()

  const recentQuizzes = quizzes.slice(-5)
  const recentResults = results.slice(-5)

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Total Quizzes</p>
              <p className="text-2xl font-bold text-blue-800">{stats.totalQuizzes}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Total Students</p>
              <p className="text-2xl font-bold text-green-800">{stats.totalStudents}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-600">Total Questions</p>
              <p className="text-2xl font-bold text-yellow-800">{stats.totalQuestions}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Completed Exams</p>
              <p className="text-2xl font-bold text-purple-800">{stats.completedExams}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Quizzes */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Quizzes</h3>
            <Button 
              size="sm" 
              onClick={() => navigate('/admin/quizzes')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={16} className="mr-1" />
              Add Quiz
            </Button>
          </div>

          <div className="space-y-4">
            {recentQuizzes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No quizzes created yet</p>
            ) : (
              recentQuizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">{quiz.title}</h4>
                    <p className="text-sm text-gray-600">
                      Class {quiz.class} • {quiz.duration} mins • {quiz.totalQuestions} questions
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/admin/questions/${quiz.id}`)}
                    className="!border-gray-300"
                  >
                    <Eye size={14} className="mr-1" />
                    View
                  </Button>
                </div>
              ))
            )}
          </div>

          {recentQuizzes.length > 0 && (
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin/quizzes')}
                className="!border-blue-300 !text-blue-600 hover:!bg-blue-50"
              >
                View All Quizzes
              </Button>
            </div>
          )}
        </Card>

        {/* Recent Results */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Results</h3>
          </div>

          <div className="space-y-4">
            {recentResults.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No exam results yet</p>
            ) : (
              recentResults.map((result) => {
                const quiz = quizzes.find(q => q.id === result.examId)
                return (
                  <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">{quiz?.title}</h4>
                      <p className="text-sm text-gray-600">
                        Student ID: {result.studentId} • Score: {result.score}%
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      result.score >= 80 ? 'bg-green-100 text-green-700' :
                      result.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {result.score >= 80 ? 'Excellent' : result.score >= 60 ? 'Good' : 'Needs Improvement'}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={() => navigate('/admin/quizzes')}
            className="bg-blue-600 hover:bg-blue-700 h-16"
          >
            <BookOpen size={20} className="mr-2" />
            Manage Quizzes
          </Button>

          <Button 
            onClick={() => navigate('/admin/quizzes')}
            variant="outline"
            className="!border-green-300 !text-green-700 hover:!bg-green-50 h-16"
          >
            <Plus size={20} className="mr-2" />
            Create New Quiz
          </Button>

          <Button 
            onClick={() => navigate('/admin/dashboard')}
            variant="outline"
            className="!border-purple-300 !text-purple-700 hover:!bg-purple-50 h-16"
          >
            <TrendingUp size={20} className="mr-2" />
            View Analytics
          </Button>
        </div>
      </Card>
    </AdminLayout>
  )
}

export default AdminDashboard
