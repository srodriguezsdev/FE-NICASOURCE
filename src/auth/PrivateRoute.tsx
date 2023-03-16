import React, { useCallback, useEffect, useContext, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Loader from '../components/General/Loader'
import { AuthContext } from './AuthContext'
import { getCreatorRequest } from '../api'

const PrivateRoute: React.FC = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const authenticateCreator = useCallback(async () => {
    setIsLoading(true)
    const jwtToken = localStorage.getItem('token') as string
    const creatorId = localStorage.getItem('creator_id') as string
    try {
      if (jwtToken !== undefined && creatorId !== undefined) {
        const creatorDB = await getCreatorRequest(creatorId, jwtToken)
        setUser({
          ...creatorDB,
          token: jwtToken,
          id: parseInt(creatorId)
        })
        setIsLoading(false)
      } else {
        navigate('/signin')
      }
    } catch (err) {
      console.error(err)
      navigate('/signin')
      setIsLoading(false)
    }
  }, [navigate, setUser])

  useEffect(() => {
    void authenticateCreator()
  }, [authenticateCreator])

  return (
    isLoading ? <Loader /> : <Outlet />
  )
}
export default PrivateRoute
