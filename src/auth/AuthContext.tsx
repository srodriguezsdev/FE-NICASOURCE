import { createContext } from 'react'
import type { ICreatorData } from '../interfaces'

interface AuthContextType {
  user: ICreatorData | null
  setUser: (user: { name: string, email: string } | null) => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => { }
})
