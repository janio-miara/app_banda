// src/Providers/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { getItem, getItemObjetc } from '../utils/persistenceUtils'
import { defaultsHeadersAxios } from '../services/api'
import { TOKEN_KEY } from '../utils/constants'

interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  isAdmin: boolean
  user: any
  setIsAdmin: any
  setUser: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState({})
  useEffect(() => {
    setIsAdmin(getItemObjetc('app-band-user-config')?.role === 'admin')
    setUser(getItemObjetc('app-band-user-config'))
  }, [])
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isAdmin, user, setIsAdmin, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
