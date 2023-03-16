import React from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from '../General/Header'
import VideoCard from '../General/VideoCard'
import { useVideo } from '../../hooks'

const theme = createTheme()

const VideoDetail: React.FC = () => {
  const { videoId } = useParams()
  const { video } = useVideo(videoId as string)

  return (
    <ThemeProvider theme={theme}>
      <Header title='Video Detail' />
      <main>
        <Container maxWidth="md">
          <VideoCard video={video} section='detail'/>
        </Container>
      </main>
    </ThemeProvider>
  )
}

export default VideoDetail
