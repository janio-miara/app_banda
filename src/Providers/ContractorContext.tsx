import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import api from '../services/api'

interface IContractorContextType {
  contractors: any[]
  listContract: any
}

const ContractorContext = createContext<IContractorContextType | undefined>(undefined)

export const ContractorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contractors, setContractors] = useState([])

  const listContract = async () => {
    try {
      const { data } = await api.get('contractors')
      setContractors(data)
    } catch (e: any) {
      console.error('Failed to load events. Please try again later.')
    }
  }

  useEffect(() => {
    listContract()
  }, [])

  return <ContractorContext.Provider value={{ contractors, listContract }}>{children}</ContractorContext.Provider>
}

export const useContractor = (): IContractorContextType => {
  const context = useContext(ContractorContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
