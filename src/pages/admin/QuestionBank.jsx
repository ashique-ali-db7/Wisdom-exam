import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Plus, Edit, Trash2, FileText, Image, Volume2 } from 'lucide-react'
import AdminLayout from '../../components/Layout/AdminLayout'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import Modal from '../../components/UI/Modal'
import { useAdmin } from '../../contexts/AdminContext'
import { questionValidationSchema } from '../../utils/validation'

const QuestionBank = () => {
  const { quizId } = useParams()
  const { quizzes, getQuestionsByQuizId, addQuestion, updateQuestion, deleteQuestion } = useAdmin()

  const [showForm, setShowForm] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const quiz = quizzes.find(q => q.id === parseInt(quizId))
  const questions = getQuestionsByQuizId(quizId)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(questionValidationSchema)
  })

  const questionType = watch('type')

  const onSubmit = async (data) => {
    try {
      const questionData = {
        ...data,
        examId: parseInt(quizId),
        hasImage: false,
        hasAudio: false,
        hasVideo: false
      }

      if (editingQuestion) {
        updateQuestion(editingQuestion.id, questionData)
      } else {
        addQuestion(questionData)
      }

      setShowForm(false)
      setEditingQuestion(null)
      reset()
    } catch (error) {
      console.error('Error saving question:', error)
    }
  }

  const handleEdit = (question) => {
    setEditingQuestion(question)
    reset({
      ...question,
      options: question.options || ['', '', '', '']
    })
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingQuestion(null)
    reset({
      type: 'mcq',
      question: '',
      marks: 2,
      negativeMarks: 0,
      options: ['', '', '', ''],
      correctAnswer: 0
    })
    setShowForm(true)
  }

  const handleDelete = (question) => {
    setDeleteConfirm(question)
  }

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteQuestion(deleteConfirm.id)
      setDeleteConfirm(null)
    }
  }

  if (!quiz) {
    return (
      <AdminLayout title="Quiz Not Found">
        <div className="text-center py-12">
          <p className="text-gray-600">Quiz not found.</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={`Questions - ${quiz.title}`}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{quiz.title}</h2>
            <p className="text-gray-600">Class {quiz.class} • {questions.length} questions</p>
          </div>
          <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
            <Plus size={20} className="mr-2" />
            Add Question
          </Button>
        </div>

        {/* Quiz Info */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-blue-600">Duration</p>
              <p className="text-lg font-semibold text-blue-800">{quiz.duration} minutes</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600">Questions</p>
              <p className="text-lg font-semibold text-blue-800">{questions.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600">Total Marks</p>
              <p className="text-lg font-semibold text-blue-800">
                {questions.reduce((sum, q) => sum + q.marks, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.length === 0 ? (
          <Card className="text-center py-12">
            <FileText size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Questions Added</h3>
            <p className="text-gray-600 mb-6">Add questions to complete this quiz</p>
            <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
              <Plus size={20} className="mr-2" />
              Add First Question
            </Button>
          </Card>
        ) : (
          questions.map((question, index) => (
            <Card key={question.id} className="hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      question.type === 'mcq' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {question.type.toUpperCase()}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">Marks: {question.marks}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(question)}
                    className="!border-gray-300"
                  >
                    <Edit size={14} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(question)}
                    className="!border-red-300 !text-red-600 hover:!bg-red-50"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-800 font-medium mb-3">{question.question}</p>

                {question.type === 'mcq' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div 
                        key={optIndex}
                        className={`p-3 rounded-lg border ${
                          optIndex === question.correctAnswer 
                            ? 'border-green-300 bg-green-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <span className="text-sm">
                          {String.fromCharCode(65 + optIndex)}. {option}
                          {optIndex === question.correctAnswer && (
                            <span className="ml-2 text-green-600 font-medium">(Correct)</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'text' && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">Text answer expected</p>
                  </div>
                )}
              </div>

              {/* Media indicators */}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {question.hasImage && (
                  <span className="flex items-center">
                    <Image size={14} className="mr-1" />
                    Image
                  </span>
                )}
                {question.hasAudio && (
                  <span className="flex items-center">
                    <Volume2 size={14} className="mr-1" />
                    Audio
                  </span>
                )}
                {question.negativeMarks > 0 && (
                  <span className="text-red-600">Negative: -{question.negativeMarks}</span>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Question Form Modal */}
      <Modal 
        isOpen={showForm} 
        onClose={() => setShowForm(false)}
        title={editingQuestion ? 'Edit Question' : 'Add New Question'}
        className="max-w-3xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Type *
              </label>
              <select
                {...register('type')}
                className={`input-field ${errors.type ? 'border-red-500' : ''}`}
              >
                <option value="mcq">Multiple Choice (MCQ)</option>
                <option value="text">Text Answer</option>
              </select>
              {errors.type && <p className="text-xs text-red-600 mt-1">{errors.type.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marks *
                </label>
                <input
                  {...register('marks')}
                  type="number"
                  min="1"
                  max="10"
                  className={`input-field ${errors.marks ? 'border-red-500' : ''}`}
                />
                {errors.marks && <p className="text-xs text-red-600 mt-1">{errors.marks.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Negative Marks
                </label>
                <input
                  {...register('negativeMarks')}
                  type="number"
                  min="0"
                  max="5"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question *
            </label>
            <textarea
              {...register('question')}
              rows="3"
              className={`input-field ${errors.question ? 'border-red-500' : ''}`}
              placeholder="Enter the question text..."
            />
            {errors.question && <p className="text-xs text-red-600 mt-1">{errors.question.message}</p>}
          </div>

          {questionType === 'mcq' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer Options *
                </label>
                <div className="space-y-2">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      {...register(`options.${index}`)}
                      className={`input-field ${errors.options?.[index] ? 'border-red-500' : ''}`}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    />
                  ))}
                </div>
                {errors.options && <p className="text-xs text-red-600 mt-1">Please fill all options</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correct Answer *
                </label>
                <select
                  {...register('correctAnswer')}
                  className={`input-field ${errors.correctAnswer ? 'border-red-500' : ''}`}
                >
                  <option value={0}>Option A</option>
                  <option value={1}>Option B</option>
                  <option value={2}>Option C</option>
                  <option value={3}>Option D</option>
                </select>
                {errors.correctAnswer && <p className="text-xs text-red-600 mt-1">{errors.correctAnswer.message}</p>}
              </div>
            </>
          )}

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
              className="bg-green-600 hover:bg-green-700"
            >
              {editingQuestion ? 'Update Question' : 'Add Question'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={!!deleteConfirm} 
        onClose={() => setDeleteConfirm(null)}
        title="Delete Question"
      >
        {deleteConfirm && (
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this question? This action cannot be undone.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6 text-left">
              <p className="text-sm text-gray-800 font-medium">
                {deleteConfirm.question.substring(0, 100)}...
              </p>
            </div>

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
                Delete Question
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  )
}

export default QuestionBank
