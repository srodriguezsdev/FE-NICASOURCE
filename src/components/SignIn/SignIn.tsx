import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Swal from 'sweetalert2'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { signInRequest } from '../../api'
import { setUserDataToLocalStorage } from '../../utils/setUserDataLocalStorage'
import type { ICreatorData } from '../../interfaces'

const theme = createTheme()

const SignIn: React.FC = () => {
  const navigate = useNavigate()

  const validateUserData = (userData: ICreatorData): boolean => {
    if (userData.email !== undefined || userData.password !== undefined) return false
    return true
  }

  const handleSubmitSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const data = new FormData(event.currentTarget)
      const userData = {
        email: data.get('email') as string,
        password: data.get('password') as string
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
        const responseUserData = await signInRequest(userData)
        void setUserDataToLocalStorage(responseUserData)
        navigate('/')
      }
    } catch (err) {
      console.error(err)
      void Swal.fire({
        title: 'Error',
        text: 'There was a problem signing in!',
        icon: 'error',
        confirmButtonText: 'Try again'
      })
    }
  }

  const navigateSignUp = () => { navigate('/signup') }

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmitSignIn} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Typography sx={{ cursor: 'pointer' }} onClick={navigateSignUp} color='blue' align='center'>
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignIn
