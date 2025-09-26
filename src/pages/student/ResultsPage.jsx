import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Trophy, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'
import StudentLayout from '../../components/Layout/StudentLayout'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import { useExam } from '../../contexts/ExamContext'
import { useAuth } from '../../contexts/AuthContext'

const ResultsPage = () => {
  const { examId } = useParams()
  const navigate = useNavigate()
  const { getExamById, getResultsByStudentId } = useExam()
  const { currentStudent } = useAuth()

  const exam = getExamById(parseInt(examId))
  const results = getResultsByStudentId(currentStudent?.id)
  const result = results.find(r => r.examId === parseInt(examId))

  const handleBackToDashboard = () => {
    navigate(`/student/${currentStudent.id}/dashboard`)
  }

  if (!result || !exam) {
    return (
      <StudentLayout title="Result Not Found">
        <div className="text-center py-12">
          <p className="text-gray-600">Result not found.</p>
          <Button onClick={handleBackToDashboard} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </StudentLayout>
    )
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success-600'
    if (score >= 60) return 'text-secondary-600'
    return 'text-red-600'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-success-100 border-success-200'
    if (score >= 60) return 'bg-secondary-100 border-secondary-200'
    return 'bg-red-100 border-red-200'
  }

  const getGrade = (score) => {
    if (score >= 90) return 'A+'
    if (score >= 80) return 'A'
    if (score >= 70) return 'B+'
    if (score >= 60) return 'B'
    if (score >= 50) return 'C'
    return 'D'
  }

  const getPerformanceText = (score) => {
    if (score >= 80) return 'Excellent! Keep up the great work!'
    if (score >= 60) return 'Good job! You can do even better!'
    return 'Keep practicing. You will improve!'
  }

  return (
    <StudentLayout 
      title="Exam Results"
      showBackButton
      backPath={`/student/${currentStudent.id}/dashboard`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Result Header */}
        <Card childFriendly className={`mb-8 border-4 ${getScoreBg(result.score)}`}>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
              <Trophy size={32} className="text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">{exam.title}</h2>
            <p className="text-gray-600 mb-6">Class {exam.class} • {currentStudent.name}</p>

            <div className="flex justify-center items-center space-x-8 mb-6">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(result.score)} mb-1`}>
                  {result.score}%
                </div>
                <div className="text-sm text-gray-600">Score</div>
              </div>

              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(result.score)} mb-1`}>
                  {getGrade(result.score)}
                </div>
                <div className="text-sm text-gray-600">Grade</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700 mb-1">
                  {result.timeTaken}m
                </div>
                <div className="text-sm text-gray-600">Time Taken</div>
              </div>
            </div>

            <p className={`text-lg font-medium ${getScoreColor(result.score)}`}>
              {getPerformanceText(result.score)}
            </p>
          </div>
        </Card>

        {/* Detailed Results */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Score Breakdown */}
          <Card childFriendly className="border-2 border-primary-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Trophy size={20} className="mr-2 text-primary-500" />
              Score Breakdown
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-success-50 rounded-lg">
                <span className="flex items-center text-success-700">
                  <CheckCircle size={16} className="mr-2" />
                  Correct Answers
                </span>
                <span className="font-semibold text-success-700">{result.correctAnswers}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="flex items-center text-red-700">
                  <XCircle size={16} className="mr-2" />
                  Wrong Answers
                </span>
                <span className="font-semibold text-red-700">{result.wrongAnswers}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Total Questions</span>
                <span className="font-semibold text-gray-700">{result.correctAnswers + result.wrongAnswers}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg">
                <span className="text-primary-700">Marks Obtained</span>
                <span className="font-semibold text-primary-700">{result.scoredMarks} / {result.totalMarks}</span>
              </div>
            </div>
          </Card>

          {/* Performance Analysis */}
          <Card childFriendly className="border-2 border-secondary-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Clock size={20} className="mr-2 text-secondary-500" />
              Performance Analysis
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Time Management</h4>
                <p className="text-sm text-blue-700">
                  You completed the exam in {result.timeTaken} minutes out of {exam.duration} minutes allocated.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">Accuracy Rate</h4>
                <p className="text-sm text-purple-700">
                  Your accuracy rate is {Math.round((result.correctAnswers / (result.correctAnswers + result.wrongAnswers)) * 100)}%. 
                  {result.correctAnswers / (result.correctAnswers + result.wrongAnswers) >= 0.8 
                    ? ' Excellent accuracy!' 
                    : ' Focus on understanding questions better.'}
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Next Steps</h4>
                <p className="text-sm text-green-700">
                  {result.score >= 80 
                    ? 'Youre doing great! Try more advanced topics.' 
                    : 'Review the topics covered in this exam and practice more questions.'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <Button 
            variant="outline" 
            onClick={handleBackToDashboard}
            className="!border-primary-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>

          <Button 
            onClick={() => window.print()}
            variant="secondary"
          >
            Print Result
          </Button>
        </div>
      </div>
    </StudentLayout>
  )
}

export default ResultsPage
