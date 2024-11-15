import React, { useEffect } from 'react'
import SignupCard from '../components/SignupCard'
import LoginCard from '../components/LoginCard'
import { useSelector } from 'react-redux'

const AuthPage = () => {

  const authState = useSelector((state) => state?.authDetails?.authState)

  useEffect(()=> {
    console.log(authState,"authState")
  },[authState])

  return (
    <div>
      {authState === "login" ? <LoginCard /> : <SignupCard />}
    </div>
  )
}

export default AuthPage