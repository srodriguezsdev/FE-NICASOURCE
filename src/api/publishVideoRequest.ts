import axios from 'axios'
import { publishEndpoint } from '../config/endpoints'

export const publishVideoRequest = async (videoId: string, jwtToken: string, value: boolean = true) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }
    const response = await axios.patch(`${publishEndpoint}/${videoId}`, {
      published: value
    }, { headers })
    const success = response?.data.success
    return success
  } catch (err) {
    console.error(err)
    throw new Error('failed post on publishVideoRequest')
  }
}
