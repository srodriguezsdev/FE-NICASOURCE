import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'
import { AuthContext } from '../../auth/AuthContext'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const navigateHome = () => {
    navigate('/')
  }

  const navigateProfile = () => {
    navigate(`/profile/${user?.id as number}`)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={navigateHome}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {title}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={navigateProfile}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
