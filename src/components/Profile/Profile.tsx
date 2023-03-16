import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Avatar, Box, Typography, Select, MenuItem } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import Header from '../General/Header'
import type { ICreatorData } from '../../interfaces'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ProfileVideos from './Sections/ProfileVideos'
import Liked from './Sections/LikedVideos'
import Followed from './Sections/Followed'
import { AuthContext } from '../../auth/AuthContext'
import { removeUserDataFromLocalStorage } from '../../utils/removeUserDataLocalStorage'
import { followCreatorRequest, unfollowCreatorRequest } from '../../api'
import { useFollowed, useCreator } from '../../hooks'

interface ProfileProps {
  name?: string
  email?: string
  photoUrl?: string
}

type sectionType = 'profile-videos' | 'liked' | 'followed'

const Profile: React.FC<ProfileProps> = () => {
  const [section, setSection] = useState<sectionType>('profile-videos')
  const params = useParams()
  const creatorId = params.creatorId as string
  const navigate = useNavigate()
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const [isPersonalProfile, setIsPersonalProfile] = useState<boolean>(true)
  const { user } = useContext(AuthContext)
  const { creator } = useCreator(creatorId)
  const { followed } = useFollowed()

  useEffect(() => {
    setIsPersonalProfile(user?.id === parseInt(creatorId))
  }, [user, creatorId])

  const handleSectionChange = (e: SelectChangeEvent) => {
    setSection(e.target.value as sectionType)
  }

  const logOut = () => {
    void removeUserDataFromLocalStorage({
      creator_id: user?.id?.toString() as string,
      token: user?.token as string
    })
    navigate('/signin')
  }

  const followCreator = useCallback(async () => {
    if (user?.id !== undefined && creatorId !== undefined && user?.token !== undefined) await followCreatorRequest(user?.id, parseInt(creatorId), user?.token)
    setIsFollowed(true)
  }, [creatorId, user])

  const unfollowCreator = useCallback(async () => {
    const followId = followed.find(follow => follow.followed_creator_id === parseInt(creatorId))?.id
    if (followId !== undefined && user?.token !== undefined) await unfollowCreatorRequest(followId, user?.token)
    setIsFollowed(false)
  }, [followed, user, creatorId])

  const renderSection = (section: sectionType, user: ICreatorData) => {
    if (section === 'liked') return <Liked user={user} />
    if (section === 'followed') return <Followed followed={followed} />
    return <ProfileVideos user={user} />
  }

  return (
    <>
      <Header title='Profile' />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, gap: 2 }}>
          <Avatar sx={{ width: 96, height: 96 }} src={creator.photo} alt={`${creator.name as string} photo`} />
          <Typography variant="h6">{creator.name}</Typography>
          <Typography variant="body1">{creator.email}</Typography>
          {
            !isPersonalProfile &&
            <>
              {
                !isFollowed
                  ? <Button color="primary" onClick={followCreator}>
                    Follow
                  </Button>
                  : <Button color="primary" onClick={unfollowCreator}>
                    Unollow
                  </Button>
              }
            </>
          }
        </Box>
        {
          isPersonalProfile &&
          <>
            <Button color="primary" onClick={logOut}>
              Log Out
            </Button>
            <Select
              id="section-select"
              value={section}
              label="Age"
              onChange={handleSectionChange}
              sx={{ width: '80%' }}
            >
              <MenuItem value='profile-videos'>Videos</MenuItem>
              <MenuItem value='liked'>Liked Videos</MenuItem>
              <MenuItem value='followed'>Followed</MenuItem>
            </Select>
          </>
        }
        {renderSection(section, user as ICreatorData)}
      </Container>
    </>
  )
}

export default Profile
