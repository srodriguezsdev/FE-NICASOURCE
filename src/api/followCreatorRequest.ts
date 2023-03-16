import axios from 'axios'
import { creatorEndpoint } from '../config/endpoints'

export const followCreatorRequest = async (creatorId: number, followedId: number, jwtToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.post(`${creatorEndpoint}/follow`, {
      follower_creator_id: creatorId,
      followed_creator_id: followedId
    }, { headers })
    const succcess = response?.data?.success
    return succcess
  } catch (err) {
    console.error(err)
    throw new Error('failed post on followCreatorRequest')
  }
}
