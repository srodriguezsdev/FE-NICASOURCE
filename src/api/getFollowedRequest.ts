import axios from 'axios'
import { followedEndpoint } from '../config/endpoints'

export const getFollowedRequest = async (creatorId: string, jwtToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.get(`${followedEndpoint}/${creatorId}`, { headers })
    const followed = response?.data
    return followed
  } catch (err) {
    console.error(err)
    throw new Error('failed post on getFollowedRequest')
  }
}
