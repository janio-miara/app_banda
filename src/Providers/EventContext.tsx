import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import api from '../services/api'

interface IEventContextType {
  events: any
  loading: boolean
  error: string
  listEvent: any
}

const EventContext = createContext<IEventContextType | undefined>(undefined)

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const listEvent = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await api.get('eventos')
      setEvents(data)
    } catch (e: any) {
      setError('Failed to load events. Please try again later.')
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    listEvent()
  }, [])

  return <EventContext.Provider value={{ events, loading, error, listEvent }}>{children}</EventContext.Provider>
}

export const useEvent = (): IEventContextType => {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
