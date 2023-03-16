import { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2'
import { AuthContext } from '../auth/AuthContext'
import { getVideosRequest } from '../api'
import type { IVideoData } from '../interfaces'

export const useVideos = () => {
  const [videos, setVideos] = useState<IVideoData[]>([])
  const { user } = useContext(AuthContext)

  const getVideos = async () => {
    try {
      const videosDB = await getVideosRequest(user?.token as string)
      setVideos(videosDB)
    } catch (err) {
      console.error(err)
      void Swal.fire({
        title: 'Error',
        text: 'There was a problem getting videos!',
        icon: 'error',
        confirmButtonText: 'Try again'
      })
    }
  }

  useEffect(() => {
    void getVideos()
  }, [])

  return { videos }
}
