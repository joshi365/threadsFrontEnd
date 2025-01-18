import { useState, useEffect } from "react";
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

import axiosInstance from "../assets/axiosConfig";
import { useParams } from "react-router-dom";
import useShowToastMessage from "../components/useShowToast";

const UserPage = () => {

  const [user, setUser] = useState(null)
  const { username } = useParams()
  const showToast = useShowToastMessage()

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance?.get(`/api/users/profile/${username}`)
        if (res?.data?.error) {
          showToast("Error", res.data.error, "error")
          return
        }
        setUser(res.data)
      } catch (error) {
        console.log(error.message,"edadwawd")
        showToast("Error", "User not found", "error")
      }
    }
    getUser()
  }, [username])

  if(!user) return null


  return (
    <>
      <UserHeader user = {user} />
      <UserPost likes={69} replies={481} postImg={"/post.png"} postTitle={"Let's talk about threads."} />
    </>
  )
}

export default UserPage