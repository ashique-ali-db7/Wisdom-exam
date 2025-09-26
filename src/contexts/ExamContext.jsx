import React, { createContext, useContext, useReducer } from 'react'
import { dummyData } from '../data/dummyData'

const ExamContext = createContext()

const initialState = {
  exams: dummyData.exams,
  questions: dummyData.questions,
  results: dummyData.results,
  currentExam: null,
  currentQuestions: [],
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: 0,
  isExamActive: false,
  examStartTime: null
}

function examReducer(state, action) {
  switch (action.type) {
    case 'START_EXAM':
      return {
        ...state,
        currentExam: action.payload.exam,
        currentQuestions: action.payload.questions,
        currentQuestionIndex: 0,
        answers: {},
        timeRemaining: action.payload.exam.duration * 60,
        isExamActive: true,
        examStartTime: new Date()
      }
    case 'END_EXAM':
      return {
        ...state,
        isExamActive: false,
        currentExam: null,
        currentQuestions: [],
        answers: {}
      }
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer
        }
      }
    case 'SET_CURRENT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: action.payload
      }
    case 'UPDATE_TIMER':
      return {
        ...state,
        timeRemaining: Math.max(0, state.timeRemaining - 1)
      }
    case 'ADD_RESULT':
      return {
        ...state,
        results: [...state.results, action.payload]
      }
    default:
      return state
  }
}

export function ExamProvider({ children }) {
  const [state, dispatch] = useReducer(examReducer, initialState)

  const getExamsByClass = (className) => {
    return state.exams.filter(exam => exam.class === className)
  }

  const getExamById = (id) => {
    return state.exams.find(exam => exam.id === parseInt(id))
  }

  const getQuestionsByExamId = (examId) => {
    return state.questions.filter(question => question.examId === parseInt(examId))
  }

  const getResultsByStudentId = (studentId) => {
    return state.results.filter(result => result.studentId === parseInt(studentId))
  }

  const startExam = (examId) => {
    const exam = getExamById(examId)
    const questions = getQuestionsByExamId(examId)
    dispatch({
      type: 'START_EXAM',
      payload: { exam, questions }
    })
  }

  const endExam = () => {
    dispatch({ type: 'END_EXAM' })
  }

  const setAnswer = (questionId, answer) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: { questionId, answer }
    })
  }

  const setCurrentQuestion = (index) => {
    dispatch({
      type: 'SET_CURRENT_QUESTION',
      payload: index
    })
  }

  const updateTimer = () => {
    dispatch({ type: 'UPDATE_TIMER' })
  }

  const submitExam = (studentId) => {
    const { currentExam, answers, examStartTime } = state

    // Calculate score
    let correctAnswers = 0
    let totalMarks = 0
    let scoredMarks = 0

    state.currentQuestions.forEach(question => {
      totalMarks += question.marks
      const answer = answers[question.id]

      if (question.type === 'mcq' && answer === question.correctAnswer) {
        correctAnswers++
        scoredMarks += question.marks
      } else if (question.type === 'text' && answer && answer.trim().length > 0) {
        // For text questions, assume 80% marks if answered
        scoredMarks += question.marks * 0.8
      }
    })

    const result = {
      id: Math.max(...state.results.map(r => r.id), 0) + 1,
      studentId: parseInt(studentId),
      examId: currentExam.id,
      score: Math.round((scoredMarks / totalMarks) * 100),
      totalMarks: totalMarks,
      scoredMarks: Math.round(scoredMarks),
      correctAnswers: correctAnswers,
      wrongAnswers: state.currentQuestions.length - correctAnswers,
      completedAt: new Date().toISOString(),
      timeTaken: Math.round((new Date() - examStartTime) / 1000 / 60)
    }

    dispatch({ type: 'ADD_RESULT', payload: result })
    dispatch({ type: 'END_EXAM' })

    return result
  }

  const value = {
    ...state,
    getExamsByClass,
    getExamById,
    getQuestionsByExamId,
    getResultsByStudentId,
    startExam,
    endExam,
    setAnswer,
    setCurrentQuestion,
    updateTimer,
    submitExam
  }

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>
}

export function useExam() {
  const context = useContext(ExamContext)
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider')
  }
  return context
}
