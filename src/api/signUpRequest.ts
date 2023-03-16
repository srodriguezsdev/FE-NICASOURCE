import axios from 'axios'
import { signUpEndpoint } from '../config/endpoints'
import type { ICreatorData } from '../interfaces'

export const signUpRequest = async (userData: ICreatorData) => {
  try {
    const headers = { 'Content-type': 'application/json' }
    const response = await axios.post(signUpEndpoint, userData, { headers })
    return response?.data
  } catch (err) {
    console.error(err)
    throw new Error('failed post on signUpRequest')
  }
}
