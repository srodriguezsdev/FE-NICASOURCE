import axios from 'axios'
import { signInEndpoint } from '../config/endpoints'
import type { ICreatorData } from '../interfaces'

export const signInRequest = async (userData: ICreatorData) => {
  try {
    const headers = { 'Content-type': 'application/json' }
    const response = await axios.post(signInEndpoint, userData, { headers })
    return response?.data
  } catch (err) {
    console.error(err)
    throw new Error('failed post on signInRequest')
  }
}
