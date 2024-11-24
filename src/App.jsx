import { useState } from 'react'
import './App.css'
import { Container } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { store } from './redux/store'
import { Provider } from "react-redux"

function App() {

  return (
    <>
      <Container maxW={"620px"}>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/:username' element={<UserPage />} />
            <Route path='/:username/post/:pid' element={<PostPage />} />
          </Routes>
        </Provider>
      </Container>
    </>
  )
}

export default App