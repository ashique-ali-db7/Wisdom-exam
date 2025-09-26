import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Context Providers
import { AuthProvider } from './contexts/AuthContext'
import { StudentProvider } from './contexts/StudentContext'
import { ExamProvider } from './contexts/ExamContext'
import { AdminProvider } from './contexts/AdminContext'

// Student Pages
import HomePage from './pages/student/HomePage'
import StudentLogin from './pages/student/StudentLogin'
import StudentManagement from './pages/student/StudentManagement'
import ExamDashboard from './pages/student/ExamDashboard'
import ExamInterface from './pages/student/ExamInterface'
import ResultsPage from './pages/student/ResultsPage'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import QuizManagement from './pages/admin/QuizManagement'
import QuestionBank from './pages/admin/QuestionBank'

// Components
import ProtectedRoute from './components/Layout/ProtectedRoute'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StudentProvider>
          <ExamProvider>
            <AdminProvider>
              <Router>
                <div className="min-h-screen bg-blue-50">
                  <Routes>
                    {/* Student Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/student-login" element={<StudentLogin />} />
                    <Route path="/students/:mobile" element={<StudentManagement />} />
                    <Route path="/student/:id/dashboard" element={<ExamDashboard />} />
                    <Route 
                      path="/exam/:id" 
                      element={
                        // <ProtectedRoute requireStudent>
                          <ExamInterface />
                        // </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/results/:examId" 
                      element={
                        <ProtectedRoute requireStudent>
                          <ResultsPage />
                        </ProtectedRoute>
                      } 
                    />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route 
                      path="/admin/dashboard" 
                      element={
                        <ProtectedRoute requireAdmin>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/quizzes" 
                      element={
                        <ProtectedRoute requireAdmin>
                          <QuizManagement />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/questions/:quizId" 
                      element={
                        <ProtectedRoute requireAdmin>
                          <QuestionBank />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </div>
              </Router>
            </AdminProvider>
          </ExamProvider>
        </StudentProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
