export const BACKEND_SERVICE = process.env.REACT_APP_BACKEND_URL as string

export const creatorEndpoint = `${BACKEND_SERVICE}/creator`
export const signInEndpoint = `${BACKEND_SERVICE}/creator/signIn`
export const signUpEndpoint = `${BACKEND_SERVICE}/creator/signUp`

export const followedEndpoint = `${BACKEND_SERVICE}/creator/followed`
export const followEndpoint = `${BACKEND_SERVICE}/creator/follow`
export const unfollowEndpoint = `${BACKEND_SERVICE}/creator/unfollow`

export const videoEndpoint = `${BACKEND_SERVICE}/video`
export const publishEndpoint = `${BACKEND_SERVICE}/video/publish`

export const likeEndpoint = `${BACKEND_SERVICE}/video/like`
export const dislikeEndpoint = `${BACKEND_SERVICE}/video/dislike`
