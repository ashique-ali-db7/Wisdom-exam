import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Plus, Edit, User, Calendar, BookOpen } from 'lucide-react'
import StudentLayout from '../../components/Layout/StudentLayout'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import Modal from '../../components/UI/Modal'
import { useStudent } from '../../contexts/StudentContext'
import { useAuth } from '../../contexts/AuthContext'
import { studentValidationSchema } from '../../utils/validation'

const StudentManagement = () => {
  const { mobile } = useParams()
  const navigate = useNavigate()
  const { getStudentsByMobile, addStudent, updateStudent } = useStudent()
  const { setCurrentStudent } = useAuth()

  const [showForm, setShowForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  const students = getStudentsByMobile(mobile)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(studentValidationSchema)
  })

  const onSubmit = async (data) => {
    try {
      const studentData = { ...data, mobile }

      if (editingStudent) {
        updateStudent(editingStudent.id, studentData)
      } else {
        addStudent(studentData)
      }

      setShowForm(false)
      setEditingStudent(null)
      reset()
    } catch (error) {
      console.error('Error saving student:', error)
    }
  }

  const handleEdit = (student) => {
    setEditingStudent(student)
    reset(student)
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingStudent(null)
    reset({
      name: '',
      dob: '',
      class: '5th',
      fatherName: '',
      jilla: '',
      madrasaName: '',
      place: '',
      whatsappNumber: mobile
    })
    setShowForm(true)
  }

  const handleSelectStudent = (student) => {
    setCurrentStudent(student)
    navigate(`/student/${student.id}/dashboard`)
  }

  return (
    <StudentLayout 
      title="Select Student" 
      showBackButton 
      backPath="/student-login"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Students for {mobile}</h2>
            <p className="text-gray-600">Select a student or add a new one</p>
          </div>
          <Button onClick={handleAddNew} className="bg-gradient-secondary">
            <Plus size={20} className="mr-2" />
            Add New Student
          </Button>
        </div>

        {students.length === 0 ? (
          <Card childFriendly className="text-center py-12">
            <User size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Students Found</h3>
            <p className="text-gray-600 mb-6">Add your first student to get started</p>
            <Button onClick={handleAddNew} className="bg-gradient-primary">
              <Plus size={20} className="mr-2" />
              Add Student
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {students.map((student) => (
              <Card key={student.id} childFriendly className="border-2 border-primary-100 hover:border-primary-300 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                      <p className="text-sm text-gray-600">Class {student.class}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(student)}
                    className="!border-gray-300"
                  >
                    <Edit size={14} />
                  </Button>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <User size={14} className="mr-2" />
                    Father: {student.fatherName}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={14} className="mr-2" />
                    DOB: {new Date(student.dob).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen size={14} className="mr-2" />
                    {student.madrasaName || 'No Madrasa'}
                  </div>
                </div>

                <Button 
                  onClick={() => handleSelectStudent(student)}
                  className="w-full bg-gradient-primary"
                >
                  Select Student
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Student Form Modal */}
        <Modal 
          isOpen={showForm} 
          onClose={() => setShowForm(false)}
          title={editingStudent ? 'Edit Student' : 'Add New Student'}
          className="max-w-2xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  {...register('name')}
                  className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Student's full name"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  {...register('dob')}
                  type="date"
                  className={`input-field ${errors.dob ? 'border-red-500' : ''}`}
                />
                {errors.dob && <p className="text-xs text-red-600 mt-1">{errors.dob.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name *
                </label>
                <input
                  {...register('fatherName')}
                  className={`input-field ${errors.fatherName ? 'border-red-500' : ''}`}
                  placeholder="Father's full name"
                />
                {errors.fatherName && <p className="text-xs text-red-600 mt-1">{errors.fatherName.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jilla/District *
                </label>
                <input
                  {...register('jilla')}
                  className={`input-field ${errors.jilla ? 'border-red-500' : ''}`}
                  placeholder="District name"
                />
                {errors.jilla && <p className="text-xs text-red-600 mt-1">{errors.jilla.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place *
                </label>
                <input
                  {...register('place')}
                  className={`input-field ${errors.place ? 'border-red-500' : ''}`}
                  placeholder="City/Town name"
                />
                {errors.place && <p className="text-xs text-red-600 mt-1">{errors.place.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Madrasa Name
                </label>
                <input
                  {...register('madrasaName')}
                  className="input-field"
                  placeholder="Madrasa name (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number *
                </label>
                <input
                  {...register('whatsappNumber')}
                  className={`input-field ${errors.whatsappNumber ? 'border-red-500' : ''}`}
                  placeholder="10-digit WhatsApp number"
                />
                {errors.whatsappNumber && <p className="text-xs text-red-600 mt-1">{errors.whatsappNumber.message}</p>}
              </div>
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
                className="bg-gradient-primary"
              >
                {editingStudent ? 'Update Student' : 'Add Student'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </StudentLayout>
  )
}

export default StudentManagement
