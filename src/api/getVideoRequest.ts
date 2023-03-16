import axios from 'axios'
import { videoEndpoint } from '../config/endpoints'

export const getVideoRequest = async (videoId: string, jwtToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.get(`${videoEndpoint}/${videoId}`, { headers })
    const video = response?.data
    return video
  } catch (err) {
    console.error(err)
    throw new Error('failed post on getVideoRequest')
  }
}
