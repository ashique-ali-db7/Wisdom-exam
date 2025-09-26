import { useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useExamProgress(examId, totalQuestions) {
  const [examData, setExamData] = useLocalStorage(`exam_${examId}`, {
    answers: {},
    currentQuestion: 0,
    startTime: null,
    isStarted: false
  })

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const answeredCount = Object.keys(examData.answers).length
    setProgress((answeredCount / totalQuestions) * 100)
  }, [examData.answers, totalQuestions])

  const startExam = () => {
    setExamData(prev => ({
      ...prev,
      startTime: new Date().toISOString(),
      isStarted: true
    }))
  }

  const saveAnswer = (questionId, answer) => {
    setExamData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }))
  }

  const setCurrentQuestion = (questionIndex) => {
    setExamData(prev => ({
      ...prev,
      currentQuestion: questionIndex
    }))
  }

  const clearExamData = () => {
    setExamData({
      answers: {},
      currentQuestion: 0,
      startTime: null,
      isStarted: false
    })
  }

  const isQuestionAnswered = (questionId) => {
    return examData.answers.hasOwnProperty(questionId)
  }

  const getAllAnswers = () => examData.answers

  const getAnswerForQuestion = (questionId) => examData.answers[questionId]

  const isExamComplete = () => {
    return Object.keys(examData.answers).length === totalQuestions
  }

  return {
    examData,
    progress,
    startExam,
    saveAnswer,
    setCurrentQuestion,
    clearExamData,
    isQuestionAnswered,
    getAllAnswers,
    getAnswerForQuestion,
    isExamComplete
  }
}
