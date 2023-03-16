import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
const Profile = React.lazy(async () => await import('./components/Profile/Profile'))
const SignIn = React.lazy(async () => await import('./components/SignIn/SignIn'))
const SignUp = React.lazy(async () => await import('./components/SignUp/SignUp'))
const VideoDetail = React.lazy(async () => await import('./components/VideoDetail/VideoDetail'))
const VideoCreate = React.lazy(async () => await import('./components/VideoCreate/VideoCreate'))
const Videos = React.lazy(async () => await import('./components/Videos/Videos'))
const Loader = React.lazy(async () => await import('./components/General/Loader'))

const Router = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Videos />} />
          <Route path='/profile/:creatorId' element={<Profile />} />
          <Route path='/detail/:videoId' element={<VideoDetail />} />
          <Route path='/create' element={<VideoCreate />} />
          <Route path='/edit/:videoId' element={<VideoCreate />} />
        </Route>
      </Routes>
    </React.Suspense>
  )
}
export default Router
