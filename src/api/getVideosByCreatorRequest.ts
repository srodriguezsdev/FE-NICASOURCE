import axios from 'axios'
import { videoEndpoint } from '../config/endpoints'

export const getVideosByCreatorRequest = async (creatorId: string, jwtToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.get(`${videoEndpoint}/creator/${creatorId}`, { headers })
    const videos = response?.data
    return videos
  } catch (err) {
    console.error(err)
    throw new Error('failed post on getVideosByCreatorRequest')
  }
}
