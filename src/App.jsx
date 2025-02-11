import './App.css'
import { Container } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { useSelector } from "react-redux"
import LogoutButton from './components/LogoutButton';
import UpdateProfile from './pages/UpdateProfile'
import CreatePost from './components/CreatePost'

function App() {

  const loggedInUserDetails = useSelector((state) => state?.authDetails?.userDetails)
  const userLoggedIn = Object?.keys(loggedInUserDetails)?.length > 0;

  return (
    <>
      <Container maxW={"620px"}>
        <Header />
        <Routes>
          <Route path='/' element={userLoggedIn ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path='/auth' element={!userLoggedIn ? <AuthPage /> : <Navigate to="/" />} />
          <Route path='/update' element={userLoggedIn ? <UpdateProfile /> : <Navigate to="/auth" />} />
          <Route path='/:username' element={
            userLoggedIn ? (
              <>
                <UserPage />
                <CreatePost />
              </>
            ) : <UserPage />
          } />
          <Route path='/:username/post/:pid' element={<PostPage />} />
        </Routes>
        {userLoggedIn ? <LogoutButton /> : ""}
      </Container>
    </>
  )
}

export default App