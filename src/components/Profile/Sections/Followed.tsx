import React from 'react'
import type { ICreatorData, IFollowData } from '../../../interfaces'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import UserCard from '../../General/UserCard'

interface FollowedProps {
  followed: IFollowData[]
}

const Followed: React.FC<FollowedProps> = ({ followed }) => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 6, marginTop: 2 }}>
      <Grid container spacing={4}>
        {followed.map((follow) => (
          <Container key={follow.id} sx={{ marginTop: '16px' }}>
            <UserCard creator={follow.followed as ICreatorData} />
          </Container>
        ))}
      </Grid>
    </Container>
  )
}

export default Followed
