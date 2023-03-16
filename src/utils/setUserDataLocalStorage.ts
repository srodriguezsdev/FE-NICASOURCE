interface IResponseUserData {
  token: string
  creator_id: string
}

export const setUserDataToLocalStorage = async (responseUserData: IResponseUserData) => {
  try {
    localStorage.setItem('token', responseUserData.token)
    localStorage.setItem('creator_id', responseUserData.creator_id)
    return true
  } catch (err) {
    console.error(err)
    throw new Error('failed post on setUserDataToLocalStorage')
  }
}
