import React from 'react'
import Router from './Router'
import AuthProvider from './auth/AuthProvider'

function App () {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
