import axios from 'axios'
import { dislikeEndpoint } from '../config/endpoints'

export const dislikeVideoRequest = async (interactionId: number, jwtToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.post(`${dislikeEndpoint}/${interactionId}`, {}, { headers })
    const success = response?.data.success
    return success
  } catch (err) {
    console.error(err)
    throw new Error('failed post on dislikeVideoRequest')
  }
}
