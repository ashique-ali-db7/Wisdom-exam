import React, { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const initialState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false,
  currentStudent: null,
  mobile: null
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_STUDENT':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        currentStudent: action.payload.student,
        mobile: action.payload.mobile,
        isAdmin: false
      }
    case 'LOGIN_ADMIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        isAdmin: true,
        currentStudent: null,
        mobile: null
      }
    case 'LOGOUT':
      return initialState
    case 'SET_CURRENT_STUDENT':
      return {
        ...state,
        currentStudent: action.payload
      }
    case 'SET_MOBILE':
      return {
        ...state,
        mobile: action.payload
      }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const loginStudent = (mobile, student) => {
    dispatch({
      type: 'LOGIN_STUDENT',
      payload: { user: { mobile }, student, mobile }
    })
  }

  const loginAdmin = (user) => {
    dispatch({
      type: 'LOGIN_ADMIN',
      payload: { user }
    })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const setCurrentStudent = (student) => {
    dispatch({
      type: 'SET_CURRENT_STUDENT',
      payload: student
    })
  }

  const setMobile = (mobile) => {
    dispatch({
      type: 'SET_MOBILE',
      payload: mobile
    })
  }

  const value = {
    ...state,
    loginStudent,
    loginAdmin,
    logout,
    setCurrentStudent,
    setMobile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
