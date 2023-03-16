import axios from 'axios'
import { videoEndpoint } from '../config/endpoints'

export const getVideosRequest = async (jwtToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.get(videoEndpoint, { headers })
    const videos = response?.data
    return videos
  } catch (err) {
    console.error(err)
    throw new Error('failed post on getVideosRequest')
  }
}
