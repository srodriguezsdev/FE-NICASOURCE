interface IResponseUserData {
  token: string
  creator_id: string
}

export const removeUserDataFromLocalStorage = async (responseUserData: IResponseUserData) => {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('creator_id')
    return true
  } catch (err) {
    console.error(err)
    throw new Error('failed post on setUserDataToLocalStorage')
  }
}
