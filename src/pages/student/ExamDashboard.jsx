import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Play, Trophy, Clock, FileText, Award } from 'lucide-react'
import StudentLayout from '../../components/Layout/StudentLayout'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import Modal from '../../components/UI/Modal'
import { useStudent } from '../../contexts/StudentContext'
import { useExam } from '../../contexts/ExamContext'
import { useState } from 'react'

const ExamDashboard = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getStudentById } = useStudent()
  const { getExamsByClass, getResultsByStudentId } = useExam()

  const [showInstructions, setShowInstructions] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)

  const student = getStudentById(id)
  const availableExams = getExamsByClass(student?.class)
  const results = getResultsByStudentId(parseInt(id))

  const completedExamIds = results.map(result => result.examId)
  const pendingExams = availableExams.filter(exam => !completedExamIds.includes(exam.id))
  const completedExams = availableExams.filter(exam => completedExamIds.includes(exam.id))

  const handleStartExam = (exam) => {
    setSelectedExam(exam)
    setShowInstructions(true)
  }

  const confirmStartExam = () => {
    console.log("dddddddd")
    navigate(`/exam/${selectedExam.id}`)
    setShowInstructions(false)
    setSelectedExam(null)
  }

  const viewResult = (examId) => {
    navigate(`/results/${examId}`)
  }

  if (!student) {
    return (
      <StudentLayout title="Student Not Found">
        <div className="text-center py-12">
          <p className="text-gray-600">Student not found. Please go back and try again.</p>
        </div>
      </StudentLayout>
    )
  }

  return (
    <StudentLayout 
      title={`${student.name}'s Dashboard`}
      showBackButton 
      backPath={`/students/${student.mobile}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Student Info */}
        <Card childFriendly className="mb-8 border-2 border-primary-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <Award size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
              <p className="text-gray-600">Class {student.class} • {student.place}, {student.jilla}</p>
              {student.madrasaName && (
                <p className="text-sm text-gray-500">{student.madrasaName}</p>
              )}
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pending Exams */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Clock size={20} className="mr-2 text-secondary-500" />
              Available Exams ({pendingExams.length})
            </h3>

            {pendingExams.length === 0 ? (
              <Card className="text-center py-8">
                <FileText size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No pending exams available</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingExams.map((exam) => (
                  <Card key={exam.id} childFriendly className="border-2 border-secondary-100 hover:border-secondary-300 transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">{exam.title}</h4>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {exam.duration} mins
                          </span>
                          <span className="flex items-center">
                            <FileText size={14} className="mr-1" />
                            {exam.totalQuestions} questions
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full">
                        Class {exam.class}
                      </span>
                    </div>

                    <Button 
                      onClick={() => handleStartExam(exam)}
                      className="w-full bg-gradient-secondary"
                    >
                      <Play size={16} className="mr-2" />
                      Start Exam
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Completed Exams */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Trophy size={20} className="mr-2 text-success-500" />
              Results Published ({results.length})
            </h3>

            {results.length === 0 ? (
              <Card className="text-center py-8">
                <Trophy size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No completed exams yet</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {results.map((result) => {
                  const exam = availableExams.find(e => e.id === result.examId)
                  return (
                    <Card key={result.id} childFriendly className="border-2 border-success-100 hover:border-success-300 transition-all duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-1">{exam?.title}</h4>
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <span>Score: <strong className="text-success-600">{result.score}%</strong></span>
                            <span>Time: {result.timeTaken} mins</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          result.score >= 80 ? 'bg-success-100 text-success-700' :
                          result.score >= 60 ? 'bg-secondary-100 text-secondary-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {result.score >= 80 ? 'Excellent' : result.score >= 60 ? 'Good' : 'Needs Improvement'}
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        onClick={() => viewResult(result.examId)}
                        className="w-full !border-success-300 !text-success-700 hover:!bg-success-50"
                      >
                        <Trophy size={16} className="mr-2" />
                        View Result
                      </Button>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Instructions Modal */}
        <Modal 
          isOpen={showInstructions} 
          onClose={() => setShowInstructions(false)}
          title="Exam Instructions"
          className="max-w-2xl"
        >
          {selectedExam && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">{selectedExam.title}</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>Duration: {selectedExam.duration} minutes</p>
                  <p>Total Questions: {selectedExam.totalQuestions}</p>
                  <p>Class: {selectedExam.class}</p>
                </div>
              </div>

              <div className="prose prose-sm">
                <p className="text-gray-700">{selectedExam.instructions}</p>
              </div>

              {selectedExam.helpdesk && selectedExam.helpdesk.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-800 mb-2">Need Help?</h5>
                  <div className="text-sm text-gray-600">
                    Contact: {selectedExam.helpdesk.join(', ')}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowInstructions(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={confirmStartExam}
                  className="bg-gradient-primary"
                >
                  Start Exam Now
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </StudentLayout>
  )
}

export default ExamDashboard
