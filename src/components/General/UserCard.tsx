import React from 'react'
import { useNavigate } from 'react-router'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import type { ICreatorData } from '../../interfaces'

interface UserCardProps {
  creator: ICreatorData
}

const UserCard: React.FC<UserCardProps> = ({ creator }) => {
  const navigate = useNavigate()
  const navigateUser = () => {
    navigate(`/profile/${creator?.id as number}`)
  }
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', padding: 0 }} onClick={navigateUser}>
      <Avatar alt={creator?.name} src={creator?.photo} style={{ marginRight: 8 }} />
      <Typography variant="h6">{creator?.name}</Typography>
    </Container>
  )
}

export default UserCard
