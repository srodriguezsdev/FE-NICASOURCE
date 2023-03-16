import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { signUpRequest } from '../../api'
import { setUserDataToLocalStorage } from '../../utils/setUserDataLocalStorage'
import type { ICreatorData } from '../../interfaces'
import Swal from 'sweetalert2'

const theme = createTheme()

const SignUp: React.FC = () => {
  const navigate = useNavigate()

  const validateUserData = (userData: ICreatorData): boolean => {
    if (userData.name === undefined || userData.email === undefined || userData.password === undefined) return false
    return true
  }

  const handleSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const data = new FormData(event.currentTarget)
      const userData = {
        name: data.get('name') as string,
        email: data.get('email') as string,
        password: data.get('password') as string,
        photo: data.get('photo') as string
      }
      const isValid = validateUserData(userData)
      if (!isValid) {
        void Swal.fire({
          title: 'Warning',
          text: 'Required fields must not be empty',
          icon: 'warning',
          confirmButtonText: 'Try again'
        })
      } else {
        const responseUserData = await signUpRequest(userData)
        void setUserDataToLocalStorage(responseUserData)
        navigate('/')
      }
    } catch (err) {
      console.error(err)
      void Swal.fire({
        title: 'Error',
        text: 'There was a problem signing up!',
        icon: 'error',
        confirmButtonText: 'Try again'
      })
    }
  }

  const navigateSignUp = () => { navigate('/signin') }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmitSignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="photo"
                  label="Photo URL"
                  type="photo"
                  id="photo"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Typography sx={{ cursor: 'pointer' }} onClick={navigateSignUp} color='blue' align='center' >
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignUp
