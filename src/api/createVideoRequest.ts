import axios from 'axios'
import { videoEndpoint } from '../config/endpoints'
import type { IVideoData } from '../interfaces'

export const createVideoRequest = async (videoData: IVideoData, jwtToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.post(videoEndpoint, videoData, { headers })
    const success = response?.data?.success
    return success
  } catch (err) {
    console.error(err)
    throw new Error('failed post on createVideoRequest')
  }
}
