export interface ICreatorData {
  id?: number
  name?: string
  email?: string
  password?: string
  photo?: string
  token?: string
}

export interface IVideoData {
  id?: number
  url: string
  creator_id?: number
  published?: boolean
  title?: string
  creator?: ICreatorData
}

export interface ILikeData {
  id?: number
  creator_id: number
  video_id: number
  creator?: ICreatorData
  video?: IVideoData
}

export interface IFollowData {
  id?: number
  follower_creator_id: number
  followed_creator_id: number
  followed?: ICreatorData
}
