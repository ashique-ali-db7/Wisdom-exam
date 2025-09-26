import React, { createContext, useContext, useReducer } from 'react'
import { dummyData } from '../data/dummyData'

const StudentContext = createContext()

const initialState = {
  students: dummyData.students,
  loading: false,
  error: null
}

function studentReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [...state.students, action.payload],
        loading: false,
        error: null
      }
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        ),
        loading: false,
        error: null
      }
    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload),
        loading: false,
        error: null
      }
    default:
      return state
  }
}

export function StudentProvider({ children }) {
  const [state, dispatch] = useReducer(studentReducer, initialState)

  const getStudentsByMobile = (mobile) => {
    return state.students.filter(student => student.mobile === mobile)
  }

  const getStudentById = (id) => {
    return state.students.find(student => student.id === parseInt(id))
  }

  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: Math.max(...state.students.map(s => s.id)) + 1
    }
    dispatch({ type: 'ADD_STUDENT', payload: newStudent })
    return newStudent
  }

  const updateStudent = (id, updates) => {
    const updatedStudent = { ...getStudentById(id), ...updates }
    dispatch({ type: 'UPDATE_STUDENT', payload: updatedStudent })
    return updatedStudent
  }

  const deleteStudent = (id) => {
    dispatch({ type: 'DELETE_STUDENT', payload: id })
  }

  const value = {
    ...state,
    getStudentsByMobile,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
  }

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
}

export function useStudent() {
  const context = useContext(StudentContext)
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider')
  }
  return context
}
