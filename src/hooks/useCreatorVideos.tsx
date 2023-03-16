import { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2'
import { AuthContext } from '../auth/AuthContext'
import { getVideosByCreatorRequest } from '../api'
import type { IVideoData } from '../interfaces'

export const useCreatorVideos = (creatorId: string) => {
  const [creatorVideos, setCreatorVideos] = useState<IVideoData[]>([])
  const { user } = useContext(AuthContext)

  const getCreatorVideos = async () => {
    try {
      const videosDB = await getVideosByCreatorRequest(creatorId, user?.token as string)
      setCreatorVideos(videosDB)
    } catch (err) {
      console.error(err)
      void Swal.fire({
        title: 'Error',
        text: 'There was a getting videos!',
        icon: 'error',
        confirmButtonText: 'Try again'
      })
    }
  }

  useEffect(() => {
    void getCreatorVideos()
  }, [])

  return { creatorVideos }
}
