import React from 'react'
import { AuthProvider } from './AuthContext'
import { ContractorProvider } from './ContractorContext'
import { EventProvider } from './EventContext'

const Providers = ({ children }: any) => {
  return (
    <AuthProvider>
      <EventProvider>
        <ContractorProvider>{children}</ContractorProvider>
      </EventProvider>
    </AuthProvider>
  )
}

export default Providers
