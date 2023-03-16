import React from 'react'
import { useNavigate } from 'react-router'
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from '../General/Header'
import AddIcon from '@mui/icons-material/AddAPhoto'
import VideoCard from '../General/VideoCard'
import { useVideos } from '../../hooks'
import type { IVideoData } from '../../interfaces'

const theme = createTheme()

const Videos: React.FC = () => {
  const { videos } = useVideos()
  const navigate = useNavigate()

  const navigateCreateVideo = () => {
    navigate('/create')
  }

  return (
    <ThemeProvider theme={theme}>
      <Header title='Videos' />
      <main>
        <Container maxWidth="md">
          {
            videos.length === 0 &&
            <Typography align='center' marginTop={16}>
              No videos available 😞
            </Typography>
          }
          <Grid container spacing={4}>
            {videos.map((video: IVideoData) => (
              <VideoCard key={video.id} video={video} section='videos' />
            ))}
          </Grid>
        </Container>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
            position: 'fixed',
            bottom: 30,
            right: 30
          }}
        >
          <Fab color="primary" aria-label="add" onClick={navigateCreateVideo}>
            <AddIcon />
          </Fab>
        </Box>
      </main>
      <footer>
        <Container maxWidth="lg" sx={{ margin: '32px 0' }}>
          <Typography variant="h6" align="center" gutterBottom>
            NICASOURCE Videos App
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Made by Santiago Rodríguez Salinas
          </Typography>
        </Container>
      </footer>
    </ThemeProvider>
  )
}

export default Videos
