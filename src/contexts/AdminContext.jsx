import React, { createContext, useContext, useReducer } from 'react'
import { dummyData } from '../data/dummyData'

const AdminContext = createContext()

const initialState = {
  quizzes: dummyData.exams,
  questions: dummyData.questions,
  students: dummyData.students,
  results: dummyData.results,
  stats: {
    totalQuizzes: dummyData.exams.length,
    totalStudents: dummyData.students.length,
    totalQuestions: dummyData.questions.length,
    completedExams: dummyData.results.length
  }
}

function adminReducer(state, action) {
  switch (action.type) {
    case 'ADD_QUIZ':
      const newQuiz = {
        ...action.payload,
        id: Math.max(...state.quizzes.map(q => q.id)) + 1
      }
      return {
        ...state,
        quizzes: [...state.quizzes, newQuiz],
        stats: {
          ...state.stats,
          totalQuizzes: state.stats.totalQuizzes + 1
        }
      }
    case 'UPDATE_QUIZ':
      return {
        ...state,
        quizzes: state.quizzes.map(quiz =>
          quiz.id === action.payload.id ? action.payload : quiz
        )
      }
    case 'DELETE_QUIZ':
      return {
        ...state,
        quizzes: state.quizzes.filter(quiz => quiz.id !== action.payload),
        stats: {
          ...state.stats,
          totalQuizzes: state.stats.totalQuizzes - 1
        }
      }
    case 'ADD_QUESTION':
      const newQuestion = {
        ...action.payload,
        id: Math.max(...state.questions.map(q => q.id)) + 1
      }
      return {
        ...state,
        questions: [...state.questions, newQuestion],
        stats: {
          ...state.stats,
          totalQuestions: state.stats.totalQuestions + 1
        }
      }
    case 'UPDATE_QUESTION':
      return {
        ...state,
        questions: state.questions.map(question =>
          question.id === action.payload.id ? action.payload : question
        )
      }
    case 'DELETE_QUESTION':
      return {
        ...state,
        questions: state.questions.filter(question => question.id !== action.payload),
        stats: {
          ...state.stats,
          totalQuestions: state.stats.totalQuestions - 1
        }
      }
    default:
      return state
  }
}

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState)

  const addQuiz = (quizData) => {
    dispatch({ type: 'ADD_QUIZ', payload: quizData })
  }

  const updateQuiz = (id, updates) => {
    const updatedQuiz = { ...state.quizzes.find(q => q.id === id), ...updates }
    dispatch({ type: 'UPDATE_QUIZ', payload: updatedQuiz })
  }

  const deleteQuiz = (id) => {
    dispatch({ type: 'DELETE_QUIZ', payload: id })
  }

  const getQuestionsByQuizId = (quizId) => {
    return state.questions.filter(question => question.examId === parseInt(quizId))
  }

  const addQuestion = (questionData) => {
    dispatch({ type: 'ADD_QUESTION', payload: questionData })
  }

  const updateQuestion = (id, updates) => {
    const updatedQuestion = { ...state.questions.find(q => q.id === id), ...updates }
    dispatch({ type: 'UPDATE_QUESTION', payload: updatedQuestion })
  }

  const deleteQuestion = (id) => {
    dispatch({ type: 'DELETE_QUESTION', payload: id })
  }

  const value = {
    ...state,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    getQuestionsByQuizId,
    addQuestion,
    updateQuestion,
    deleteQuestion
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
