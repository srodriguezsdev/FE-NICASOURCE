import { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2'
import { AuthContext } from '../auth/AuthContext'
import { getCreatorRequest } from '../api'
import type { ICreatorData } from '../interfaces'

export const useCreator = (creatorId: string) => {
  const [creator, setCreator] = useState<ICreatorData>({
    name: '',
    photo: ''
  })
  const { user } = useContext(AuthContext)

  const getCreator = async () => {
    try {
      const creatorDB = await getCreatorRequest(creatorId, user?.token as string)
      setCreator(creatorDB)
    } catch (err) {
      void Swal.fire({
        title: 'Error',
        text: 'There was a problem getting creatir!',
        icon: 'error',
        confirmButtonText: 'Try again'
      })
      console.error(err)
    }
  }

  useEffect(() => {
    void getCreator()
  }, [])

  return { creator }
}
