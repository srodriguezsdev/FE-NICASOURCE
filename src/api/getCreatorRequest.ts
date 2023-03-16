import axios from 'axios'
import { creatorEndpoint } from '../config/endpoints'

export const getCreatorRequest = async (creatorId: string, jwtToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.get(`${creatorEndpoint}/${creatorId}`, { headers })
    const creator = response?.data
    return creator
  } catch (err) {
    console.error(err)
    throw new Error('failed post on getCreatorRequest')
  }
}
