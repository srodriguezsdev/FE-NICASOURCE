import { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2'
import { AuthContext } from '../auth/AuthContext'
import { getFollowedRequest } from '../api'
import type { IFollowData } from '../interfaces'

export const useFollowed = () => {
  const [followed, setFollowed] = useState<IFollowData[]>([])
  const { user } = useContext(AuthContext)

  const getFollowed = async () => {
    try {
      const followedDB = await getFollowedRequest(user?.id?.toString() as string, user?.token as string)
      setFollowed(followedDB)
    } catch (err) {
      void Swal.fire({
        title: 'Error',
        text: 'There was a problem getting followed!',
        icon: 'error',
        confirmButtonText: 'Try again'
      })
      console.error(err)
    }
  }

  useEffect(() => {
    void getFollowed()
  }, [])

  return { followed }
}
