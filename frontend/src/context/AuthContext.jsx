import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function getRole() {
  return sessionStorage.getItem('hc_role') || null
}
