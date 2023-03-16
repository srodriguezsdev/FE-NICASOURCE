import React, { useContext, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import { AuthContext } from '../../auth/AuthContext'
import type { IVideoData, ICreatorData, ILikeData } from '../../interfaces'
import { publishVideoRequest, likeVideoRequest, dislikeVideoRequest, getVideoRequest } from '../../api'
import { useLikedVideos } from '../../hooks'
import UserCard from './UserCard'

interface VideoCardProps {
  video: IVideoData
  section: 'videos' | 'detail' | 'profile'
}

const VideoCard: React.FC<VideoCardProps> = ({ video, section = 'videos' }) => {
  const { user } = useContext(AuthContext)
  const videoIdString = video.id?.toString() as string
  const userIdString = user?.id?.toString() as string
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [videoCreator, setVideoCreator] = useState<ICreatorData>({
    photo: '',
    name: ''
  })
  const [interactionId, setInteractionId] = useState<number>()
  const { likedVideos } = useLikedVideos()

  const setCreatorInComponent = useCallback(async (id: string) => {
    const videoDB = await getVideoRequest(id, user?.id?.toString() as string)
    setVideoCreator(videoDB.creator)
  }, [])

  const setInteractionIdInComponent = useCallback(async () => {
    const interactionId = likedVideos.find((like: ILikeData) => like.video_id === video?.id)?.id
    if (interactionId !== undefined) {
      setIsLiked(true)
      setInteractionId(interactionId)
    }
  }, [likedVideos, video])

  const likeVideo = useCallback(async () => {
    if (videoIdString !== undefined && userIdString !== undefined && user?.token !== undefined) await likeVideoRequest(videoIdString, userIdString, user?.token)
    setIsLiked(true)
  }, [videoIdString, userIdString, user])

  const dislikeVideo = useCallback(async () => {
    if (videoIdString !== undefined && userIdString !== undefined && user?.token !== undefined) await dislikeVideoRequest(interactionId as number, user?.token)
    setIsLiked(false)
  }, [interactionId, user])

  const publishVideo = useCallback(async () => {
    if (videoIdString !== undefined && user?.token !== undefined) {
      await publishVideoRequest(videoIdString, user?.token, true)
      navigate('/')
    }
  }, [videoIdString, user, navigate])

  const unpublishVideo = useCallback(async () => {
    if (videoIdString !== undefined && user?.token !== undefined) {
      await publishVideoRequest(videoIdString, user?.token, false)
      navigate('/')
    }
  }, [videoIdString, user, navigate])

  const navigateDetail = useCallback(() => {
    navigate(`/detail/${video.id as number}`)
  }, [video, navigate])

  const navigateEdit = useCallback(() => {
    navigate(`/edit/${video.id as number}`)
  }, [video, navigate])

  useEffect(() => {
    void setInteractionIdInComponent()
  }, [setInteractionIdInComponent])

  useEffect(() => {
    if (video.creator == null && video?.id !== undefined) {
      void setCreatorInComponent(video.id?.toString())
    } else {
      setVideoCreator(video.creator as ICreatorData)
    }
  }, [video, setCreatorInComponent])

  return (
    <Grid item key={video.id} xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '0 8px', marginTop: '16px' }}
      >
        <Typography variant='h5' align='center'>
          {video.title}
        </Typography>
        <CardMedia
          component="iframe"
          image={video.url}
        />
        <CardContent>
          <UserCard creator={videoCreator} />
        </CardContent>
        <CardActions
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {!isLiked
            ? <Button color="primary" onClick={likeVideo}>
                Like
            </Button>
            : <Button color="primary" onClick={dislikeVideo}>
                Dislike
            </Button>
          }
          {section !== 'detail' &&
              <Button color="primary" onClick={navigateDetail}>
                  View
              </Button>
          }
          {user?.id === video.creator_id &&
          <>
            {!(video.published ?? false)
              ? <Button color="primary" onClick={publishVideo}>
                  Publish
              </Button>
              : <Button color="primary" onClick={unpublishVideo}>
                  Unublish
              </Button>
            }
            <Button color="primary" onClick={navigateEdit}>
                Edit
            </Button>
          </>
          }
        </CardActions>
      </Card>
    </Grid >
  )
}

export default VideoCard
