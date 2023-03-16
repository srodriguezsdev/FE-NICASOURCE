import axios from 'axios'
import { videoEndpoint } from '../config/endpoints'

export const getLikedRequest = async (creatorId: number, jwtToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.get(`${videoEndpoint}/like/${creatorId}`, { headers })
    const liked = response?.data
    return liked
  } catch (err) {
    console.error(err)
    throw new Error('failed post on getLikedRequest')
  }
}
