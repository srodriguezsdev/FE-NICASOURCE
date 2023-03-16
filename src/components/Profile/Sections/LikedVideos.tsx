import React from 'react'
import type { ICreatorData, ILikeData, IVideoData } from '../../../interfaces'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import VideoCard from '../../General/VideoCard'
import { useLikedVideos } from '../../../hooks'

interface LikedVideosProps {
  user?: ICreatorData
}

const LikedVideos: React.FC<LikedVideosProps> = ({ user }) => {
  const { likedVideos } = useLikedVideos()
  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {likedVideos.map((like: ILikeData) => (
          <VideoCard key={like.id} video={like.video as IVideoData} section='profile' />
        ))}
      </Grid>
    </Container>
  )
}

export default LikedVideos
