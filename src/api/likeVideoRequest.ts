import axios from 'axios'
import { likeEndpoint } from '../config/endpoints'

export const likeVideoRequest = async (videoId: string, creatorId: string, jwtToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.post(likeEndpoint, {
      creator_id: creatorId,
      video_id: videoId
    }, { headers })
    const success = response?.data.success
    return success
  } catch (err) {
    console.error(err)
    throw new Error('failed post on likeVideoRequest')
  }
}
