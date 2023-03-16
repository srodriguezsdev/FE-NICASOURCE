import React, { useState } from 'react'
import { AuthContext } from './AuthContext'

interface Props {
  children: React.ReactNode
}

function AuthProvider ({ children }: Props) {
  const [user, setUser] = useState<{ name: string, email: string } | null>(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
