import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const ProtectedRoute = ({ children, requireAdmin = false, requireStudent = false }) => {
  const { isAuthenticated, isAdmin, currentStudent } = useAuth()

  if (requireAdmin && (!isAuthenticated || !isAdmin)) {
    return <Navigate to="/admin" replace />
  }

  if (requireStudent && (!isAuthenticated || isAdmin || !currentStudent)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
