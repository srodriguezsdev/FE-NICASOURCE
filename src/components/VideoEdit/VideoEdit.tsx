import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { updateVideoRequest } from '../../api'
import { AuthContext } from '../../auth/AuthContext'
import Header from '../General/Header'
import { useVideo } from '../../hooks'
import { useNavigate, useParams } from 'react-router'

const theme = createTheme()

const VideoEdit: React.FC = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const { videoId } = useParams()
  const { video } = useVideo(videoId as string)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const videoData = {
      url: data.get('url') as string,
      title: data.get('title') as string
    }
    if (user?.token !== undefined) await updateVideoRequest(videoData, videoId as string, user.token)
    navigate('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <Header title='Video Create' />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5">
            Editar Video
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  defaultValue={video.title}
                  label="Video title"
                  type="title"
                  id="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  defaultValue={video.url}
                  name="url"
                  label="Video URL"
                  type="url"
                  id="url"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default VideoEdit
