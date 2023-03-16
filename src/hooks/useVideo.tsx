import { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2'
import { AuthContext } from '../auth/AuthContext'
import { getVideoRequest } from '../api'
import type { IVideoData } from '../interfaces'

export const useVideo = (videoId: string) => {
  const [video, setVideo] = useState<IVideoData>({
    url: ''
  })
  const { user } = useContext(AuthContext)

  const getVideo = async () => {
    try {
      const videoDB = await getVideoRequest(videoId, user?.token as string)
      setVideo(videoDB)
    } catch (err) {
      console.error(err)
      void Swal.fire({
        title: 'Error',
        text: 'There was a problem getting video!',
        icon: 'error',
        confirmButtonText: 'Try again'
      })
    }
  }

  useEffect(() => {
    void getVideo()
  }, [])

  return { video }
}
