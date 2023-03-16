import React from 'react'
import type { ICreatorData, IVideoData } from '../../../interfaces'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import VideoCard from '../../General/VideoCard'
import { useCreatorVideos } from '../../../hooks'

interface ProfileVideosProps {
  user?: ICreatorData
}

const ProfileVideos: React.FC<ProfileVideosProps> = ({ user }) => {
  const params = useParams()
  const creatorId = params.creatorId as string
  const { creatorVideos } = useCreatorVideos(creatorId)

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {creatorVideos.map((video: IVideoData) => (
          <VideoCard key={video.id} video={video} section='profile' />
        ))}
      </Grid>
    </Container>
  )
}

export default ProfileVideos
