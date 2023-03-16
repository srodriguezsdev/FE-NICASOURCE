import { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2'
import { AuthContext } from '../auth/AuthContext'
import { getLikedRequest } from '../api'
import type { ILikeData } from '../interfaces'

export const useLikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState<ILikeData[]>([])
  const { user } = useContext(AuthContext)

  const getLikedVideos = async () => {
    try {
      const likedVideosDB = await getLikedRequest(user?.id as number, user?.token as string)
      setLikedVideos(likedVideosDB)
    } catch (err) {
      void Swal.fire({
        title: 'Error',
        text: 'There was a problem getting liked videos!',
        icon: 'error',
        confirmButtonText: 'Try again'
      })
      console.error(err)
    }
  }

  useEffect(() => {
    void getLikedVideos()
  }, [])

  return { likedVideos }
}
