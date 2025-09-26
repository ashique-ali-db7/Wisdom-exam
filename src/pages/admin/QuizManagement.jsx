import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Plus, Edit, Trash2, Eye, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/Layout/AdminLayout'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import Modal from '../../components/UI/Modal'
import { useAdmin } from '../../contexts/AdminContext'
import { quizValidationSchema } from '../../utils/validation'

const QuizManagement = () => {
  const navigate = useNavigate()
  const { quizzes, addQuiz, updateQuiz, deleteQuiz } = useAdmin()

  const [showForm, setShowForm] = useState(false)
  const [editingQuiz, setEditingQuiz] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(quizValidationSchema)
  })

  const onSubmit = async (data) => {
    try {
      const quizData = {
        ...data,
        helpdesk: data.helpdesk ? data.helpdesk.split(',').map(h => h.trim()).filter(h => h) : [],
        totalQuestions: 0, // Will be updated when questions are added
        status: 'active'
      }

      if (editingQuiz) {
        updateQuiz(editingQuiz.id, quizData)
      } else {
        addQuiz(quizData)
      }

      setShowForm(false)
      setEditingQuiz(null)
      reset()
    } catch (error) {
      console.error('Error saving quiz:', error)
    }
  }

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz)
    reset({
      ...quiz,
      helpdesk: quiz.helpdesk?.join(', ') || ''
    })
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingQuiz(null)
    reset({
      title: '',
      class: '5th',
      duration: 60,
      instructions: '',
      helpdesk: ''
    })
    setShowForm(true)
  }

  const handleDelete = (quiz) => {
    setDeleteConfirm(quiz)
  }

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteQuiz(deleteConfirm.id)
      setDeleteConfirm(null)
    }
  }

  return (
    <AdminLayout title="Quiz Management">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Quizzes</h2>
          <p className="text-gray-600">Create and manage exam quizzes</p>
        </div>
        <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
          <Plus size={20} className="mr-2" />
          Add New Quiz
        </Button>
      </div>

      {/* Quizzes List */}
      <div className="grid gap-6">
        {quizzes.length === 0 ? (
          <Card className="text-center py-12">
            <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Quizzes Found</h3>
            <p className="text-gray-600 mb-6">Create your first quiz to get started</p>
            <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={20} className="mr-2" />
              Create Quiz
            </Button>
          </Card>
        ) : (
          quizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 mr-3">{quiz.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      Class {quiz.class}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{quiz.instructions}</p>

                  <div className="flex items-center text-sm text-gray-500 space-x-6">
                    <span>Duration: {quiz.duration} minutes</span>
                    <span>Questions: {quiz.totalQuestions}</span>
                    {quiz.helpdesk && quiz.helpdesk.length > 0 && (
                      <span>Helpdesk: {quiz.helpdesk.join(', ')}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/admin/questions/${quiz.id}`)}
                    className="!border-blue-300 !text-blue-600 hover:!bg-blue-50"
                  >
                    <Eye size={14} className="mr-1" />
                    Questions
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(quiz)}
                    className="!border-gray-300"
                  >
                    <Edit size={14} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(quiz)}
                    className="!border-red-300 !text-red-600 hover:!bg-red-50"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Quiz Form Modal */}
      <Modal 
        isOpen={showForm} 
        onClose={() => setShowForm(false)}
        title={editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quiz Title *
            </label>
            <input
              {...register('title')}
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter quiz title"
            />
            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class *
              </label>
              <select
                {...register('class')}
                className={`input-field ${errors.class ? 'border-red-500' : ''}`}
              >
                <option value="5th">5th Standard</option>
                <option value="6th">6th Standard</option>
                <option value="7th">7th Standard</option>
              </select>
              {errors.class && <p className="text-xs text-red-600 mt-1">{errors.class.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes) *
              </label>
              <input
                {...register('duration')}
                type="number"
                min="15"
                max="180"
                className={`input-field ${errors.duration ? 'border-red-500' : ''}`}
                placeholder="60"
              />
              {errors.duration && <p className="text-xs text-red-600 mt-1">{errors.duration.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions *
            </label>
            <textarea
              {...register('instructions')}
              rows="4"
              className={`input-field ${errors.instructions ? 'border-red-500' : ''}`}
              placeholder="Enter detailed instructions for students..."
            />
            {errors.instructions && <p className="text-xs text-red-600 mt-1">{errors.instructions.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Helpdesk Numbers
            </label>
            <input
              {...register('helpdesk')}
              className="input-field"
              placeholder="Enter helpdesk numbers separated by commas (max 2)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: 9876543210, 9123456789 (Maximum 2 numbers)
            </p>
            {errors.helpdesk && <p className="text-xs text-red-600 mt-1">{errors.helpdesk.message}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              loading={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={!!deleteConfirm} 
        onClose={() => setDeleteConfirm(null)}
        title="Delete Quiz"
      >
        {deleteConfirm && (
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete "{deleteConfirm.title}"? This action cannot be undone.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              All questions associated with this quiz will also be deleted.
            </p>

            <div className="flex justify-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete Quiz
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  )
}

export default QuizManagement
