import axios from 'axios'
import { videoEndpoint } from '../config/endpoints'
import type { IVideoData } from '../interfaces'

export const updateVideoRequest = async (videoData: IVideoData, videoId: string, jwtToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.patch(`${videoEndpoint}/${videoId}`, videoData, { headers })
    const success = response?.data?.success
    return success
  } catch (err) {
    console.error(err)
    throw new Error('failed post on updateVideoRequest')
  }
}
