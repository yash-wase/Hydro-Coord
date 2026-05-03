import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import DashboardLayout from './components/layout/DashboardLayout'
import SectorPressure from './pages/SectorPressure'
import Tasks from './pages/Tasks'
import Alerts from './pages/Alerts'
import Verification from './pages/Verification'
import Requests from './pages/Requests'
import Tankers from './pages/Tankers'
import { getRole } from './context/AuthContext'
import './App.css'

function ProtectedRoute({ children, allow }) {
  const role = getRole()
  if (!role) return <Navigate to="/login" replace />
  if (allow && !allow.includes(role)) return <Navigate to="/dashboard" replace />
  return children
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={
          <ProtectedRoute allow={['admin', 'operator', 'public']}>
            <SectorPressure />
          </ProtectedRoute>
        } />
        <Route path="/tasks" element={
          <ProtectedRoute allow={['admin', 'operator']}>
            <Tasks />
          </ProtectedRoute>
        } />
        <Route path="/alerts" element={
          <ProtectedRoute allow={['admin']}>
            <Alerts />
          </ProtectedRoute>
        } />
        <Route path="/verification" element={
          <ProtectedRoute allow={['admin']}>
            <Verification />
          </ProtectedRoute>
        } />
        <Route path="/requests" element={
          <ProtectedRoute allow={['admin', 'public']}>
            <Requests />
          </ProtectedRoute>
        } />
        <Route path="/tankers" element={
          <ProtectedRoute allow={['admin', 'operator', 'public']}>
            <Tankers />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}

export default App
