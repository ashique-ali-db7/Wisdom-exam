import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Send, Clock, ChevronUp, ChevronDown, Play, Image as ImageIcon } from 'lucide-react'
import StudentLayout from '../../components/Layout/StudentLayout'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import Modal from '../../components/UI/Modal'
import { useExam } from '../../contexts/ExamContext'
import { useAuth } from '../../contexts/AuthContext'
import { useTimer } from '../../hooks/useTimer'

const ExamInterface = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getExamById, getQuestionsByExamId, submitExam } = useExam()
  const { currentStudent } = useAuth()

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showNavigation, setShowNavigation] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [mediaLoading, setMediaLoading] = useState(false)

  const exam = getExamById(parseInt(id))
  const questions = getQuestionsByExamId(parseInt(id))
  const currentQuestion = questions[currentQuestionIndex]

  const { timeRemaining, start, formatTime } = useTimer(
    exam?.duration * 60 || 3600,
    () => handleAutoSubmit()
  )

  useEffect(() => {
    if (exam) {
      start()
    }
  }, [exam, start])

  // Prevent body scroll when navigation is open
  useEffect(() => {
    if (showNavigation) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showNavigation])

  const handleAutoSubmit = () => {
    handleSubmitExam()
  }

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index)
    setShowNavigation(false) // Auto-collapse after selection
  }

  const handleSubmitExam = () => {
    if (currentStudent) {
      submitExam(currentStudent.id)
      navigate(`/results/${exam.id}`)
    }
  }

  const getAnsweredQuestions = () => {
    return Object.keys(answers).length
  }

  const isAnswered = (questionId) => {
    return answers.hasOwnProperty(questionId)
  }

  const canSubmit = () => {
    return getAnsweredQuestions() === questions.length
  }

  // Media Component for displaying images or videos
  const MediaContent = ({ question }) => {
    if (!question.hasImage && !question.hasVideo) return null

    return (
      <div className="mb-6">
        {question.hasVideo && question.videoUrl && (
          <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            <video
              className="w-full max-h-64 md:max-h-80 object-contain"
              controls
              preload="metadata"
              onLoadStart={() => setMediaLoading(true)}
              onCanPlay={() => setMediaLoading(false)}
              onError={() => setMediaLoading(false)}
            >
              <source src={question.videoUrl} type="video/mp4" />
              <source src={question.videoUrl} type="video/webm" />
              <source src={question.videoUrl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>

            {/* Video Loading State */}
            {mediaLoading && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2 mx-auto"></div>
                  <p className="text-sm">Loading video...</p>
                </div>
              </div>
            )}

            {/* Video Icon Overlay */}
            <div className="absolute top-3 right-3 bg-black bg-opacity-50 rounded-full p-2">
              <Play size={16} className="text-white" />
            </div>
          </div>
        )}

        {question.hasImage && question.imageUrl && (
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={question.imageUrl}
              alt={`Question ${currentQuestionIndex + 1} image`}
              className="w-full max-h-64 md:max-h-80 object-contain mx-auto"
              onLoad={() => setMediaLoading(false)}
              onError={() => {
                setMediaLoading(false)
                console.error('Image failed to load:', question.imageUrl)
              }}
              onLoadStart={() => setMediaLoading(true)}
            />

            {/* Image Loading State */}
            {mediaLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mb-2 mx-auto"></div>
                  <p className="text-sm">Loading image...</p>
                </div>
              </div>
            )}

            {/* Image Icon Overlay */}
            <div className="absolute top-3 right-3 bg-black bg-opacity-50 rounded-full p-2">
              <ImageIcon size={16} className="text-white" />
            </div>
          </div>
        )}

        {/* Media Error Fallback */}
        {((question.hasVideo && !question.videoUrl) || (question.hasImage && !question.imageUrl)) && (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <div className="text-gray-400 mb-2">
              {question.hasVideo ? <Play size={24} className="mx-auto" /> : <ImageIcon size={24} className="mx-auto" />}
            </div>
            <p className="text-sm text-gray-600">
              {question.hasVideo ? 'Video content not available' : 'Image content not available'}
            </p>
          </div>
        )}
      </div>
    )
  }

  if (!exam || !currentQuestion) {
    return (
      <StudentLayout title="Exam Not Found">
        <div className="text-center py-12">
          <p className="text-gray-600">Exam not found or no questions available.</p>
        </div>
      </StudentLayout>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative">
      {/* Exam Header - Clean without navigation button */}
      <div className="bg-white shadow-lg border-b-4 border-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              {/* Progress Bar */}
              <div className="md:hidden flex items-center">
                <ArrowLeft size={20} className="text-gray-400 mr-2" />
                <div className="w-24 h-1 bg-gray-200 rounded-full mr-2">
                  <div 
                    className="h-1 bg-primary-500 rounded-full transition-all duration-300"
                    style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {currentQuestionIndex + 1}/{questions.length}
                </span>
              </div>

              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-800">{exam.title}</h1>
                <p className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <Clock size={16} className="text-primary-500" />
              <span className="font-mono text-primary-600">{formatTime()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Desktop Question Navigation */}
        <div className="hidden md:block w-80 bg-white shadow-lg m-6 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Questions</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => handleQuestionJump(index)}
                className={`relative w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                  index === currentQuestionIndex
                    ? 'bg-primary-500 text-white'
                    : isAnswered(question.id)
                    ? 'bg-success-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
                {/* Media indicator */}
                {(question.hasVideo || question.hasImage) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full">
                    {question.hasVideo ? (
                      <Play size={8} className="text-white absolute inset-0 m-auto" />
                    ) : (
                      <ImageIcon size={8} className="text-white absolute inset-0 m-auto" />
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-success-500 rounded mr-2"></div>
              <span>Answered ({getAnsweredQuestions()})</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
              <span>Not Answered ({questions.length - getAnsweredQuestions()})</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
              <span>With Media ({questions.filter(q => q.hasVideo || q.hasImage).length})</span>
            </div>
          </div>
        </div>

        {/* Question Content - Add bottom padding for mobile navigation */}
        <div className="flex-1 p-6 pb-32 md:pb-6">
          <Card childFriendly className="border-2 border-primary-200 mb-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  Question {currentQuestionIndex + 1}
                  {/* Media indicator in question title */}
                  {currentQuestion.hasVideo && (
                    <div className="ml-2 flex items-center text-blue-600">
                      <Play size={16} className="mr-1" />
                      <span className="text-xs">Video</span>
                    </div>
                  )}
                  {currentQuestion.hasImage && (
                    <div className="ml-2 flex items-center text-blue-600">
                      <ImageIcon size={16} className="mr-1" />
                      <span className="text-xs">Image</span>
                    </div>
                  )}
                </h2>
                <span className="text-sm text-gray-600">
                  Marks: {currentQuestion.marks}
                </span>
              </div>

              {/* Media Content */}
              <MediaContent question={currentQuestion} />

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {currentQuestion.question}
              </p>

              {/* Answer Section */}
              {currentQuestion.type === 'mcq' ? (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        answers[currentQuestion.id] === index
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={index}
                        checked={answers[currentQuestion.id] === index}
                        onChange={() => handleAnswerChange(currentQuestion.id, index)}
                        className="mr-3 w-4 h-4 text-primary-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <textarea
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  placeholder="Write your answer here..."
                  className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
              )}
            </div>

            {/* Navigation Buttons - Always shown below question card */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="!border-gray-300"
              >
                <ArrowLeft size={16} className="mr-2" />
                Previous
              </Button>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSubmitModal(true)}
                  disabled={!canSubmit()}
                  className="!border-success-300 !text-success-700 hover:!bg-success-50"
                >
                  <Send size={16} className="mr-2" />
                  Submit Exam
                </Button>

                {currentQuestionIndex < questions.length - 1 && (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Only question navigation trigger */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Navigation Panel - Slides up when showNavigation is true */}
        <div className={`bg-white/95 backdrop-blur-md border-t border-gray-200 transition-all duration-300 ease-out ${
          showNavigation 
            ? 'translate-y-0' 
            : 'translate-y-full'
        }`}>
          {/* Handle Area */}
          <div 
            className="flex items-center justify-center py-3 cursor-pointer"
            onClick={() => setShowNavigation(!showNavigation)}
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-1 bg-gray-300 rounded-full mb-2"></div>
              <span className="text-xs text-gray-600 font-medium">Question Navigation</span>
              {showNavigation ? (
                <ChevronDown size={16} className="text-gray-500 mt-1" />
              ) : (
                <ChevronUp size={16} className="text-gray-500 mt-1" />
              )}
            </div>
          </div>

          {/* Question Grid */}
          <div className="px-4 pb-6 max-h-80 overflow-y-auto">
            <div className="grid grid-cols-5 gap-3 mb-4">
              {questions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => handleQuestionJump(index)}
                  className={`relative w-14 h-14 rounded-xl text-sm font-bold transition-all transform active:scale-95 ${
                    index === currentQuestionIndex
                      ? 'bg-primary-500 text-white shadow-lg scale-110'
                      : isAnswered(question.id)
                      ? 'bg-success-500 text-white shadow-md'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  {index + 1}
                  {/* Current question indicator */}
                  {index === currentQuestionIndex && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  )}
                  {/* Media indicator */}
                  {(question.hasVideo || question.hasImage) && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-400 rounded-full">
                      {question.hasVideo ? (
                        <Play size={8} className="text-white absolute inset-0 m-auto" />
                      ) : (
                        <ImageIcon size={8} className="text-white absolute inset-0 m-auto" />
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Progress Summary */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center justify-center p-2 bg-green-100 rounded-lg">
                <div className="w-3 h-3 bg-success-500 rounded-full mr-2"></div>
                <span className="text-green-800 font-medium">
                  Answered: {getAnsweredQuestions()}
                </span>
              </div>
              <div className="flex items-center justify-center p-2 bg-gray-100 rounded-lg">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-gray-800 font-medium">
                  Remaining: {questions.length - getAnsweredQuestions()}
                </span>
              </div>
            </div>
          </div>

          {/* Safe area for phones with home indicator */}
          <div className="h-safe-area-inset-bottom"></div>
        </div>

        {/* Fixed Bottom Bar - Only question navigation trigger */}
        <div className="bg-white border-t border-gray-200 shadow-lg">
          {/* Question Navigation Trigger */}
          <button
            onClick={() => setShowNavigation(!showNavigation)}
            className="w-full flex flex-col items-center px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-2 mb-1">
              {showNavigation ? (
                <ChevronDown size={18} className="text-primary-500" />
              ) : (
                <ChevronUp size={18} className="text-primary-500" />
              )}
              <span className="text-sm font-semibold text-primary-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              {/* Current question media indicator */}
              {currentQuestion.hasVideo && <Play size={14} className="text-blue-500" />}
              {currentQuestion.hasImage && <ImageIcon size={14} className="text-blue-500" />}
            </div>
            <div className="text-xs text-gray-500">
              {getAnsweredQuestions()} answered • Tap to navigate
            </div>
          </button>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Exam"
      >
        <div className="text-center">
          <p className="text-gray-700 mb-4">
            Are you sure you want to submit your exam? You have answered {getAnsweredQuestions()} out of {questions.length} questions.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            This action cannot be undone.
          </p>

          <div className="flex justify-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowSubmitModal(false)}
            >
              Continue Exam
            </Button>
            <Button
              onClick={handleSubmitExam}
              className="bg-gradient-primary"
            >
              Submit Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ExamInterface
