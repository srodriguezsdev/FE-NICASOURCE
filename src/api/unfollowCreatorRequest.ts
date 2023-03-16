import axios from 'axios'
import { creatorEndpoint } from '../config/endpoints'

export const unfollowCreatorRequest = async (followId: number, jwtToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.delete(`${creatorEndpoint}/unfollow/${followId}`, { headers })
    const succcess = response?.data?.success
    return succcess
  } catch (err) {
    console.error(err)
    throw new Error('failed post on unfollowCreatorRequest')
  }
}
