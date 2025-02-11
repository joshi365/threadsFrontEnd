import { useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import axiosInstance from '../assets/axiosConfig';
import { useDispatch, useSelector } from "react-redux"
import useShowToastMessage from "./useShowToast";
import { setPosts } from "../redux/profileSlice";

const useCreatePost = () => {

  const MAX_CHAR = 500
  const dispatch = useDispatch()
  const allPost = useSelector((state) => state?.profile?.posts)

  const loggedInUserDetails = useSelector((state) => state?.authDetails?.userDetails)
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [postText, setPostText] = useState("")
  const imageRef = useRef(null)
  const showToast = useShowToastMessage()

  const handleTextChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR)
      setPostText(truncatedText)
      setRemainingChar(0)
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length)
    }
  }

  const handleCreatePost = async (img) => {
    setLoading(true)
    let payload = {
      postedBy: loggedInUserDetails?._id,
      text: postText,
      img: img
    }
    try {
      const res = await axiosInstance.post("/api/posts/create", payload)
      if (res.data) {
        const newPost = res?.data?.newPost
        let allNewPost = [newPost, ...allPost]
        dispatch(setPosts(allNewPost))
        showToast("Success", "Post created successfully", "success")
      }
      onClose()
      setPostText("")
    } catch (error) {
      showToast("Error", error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    { isOpen, onOpen, onClose, handleTextChange, postText, setPostText, imageRef, remainingChar, MAX_CHAR, handleCreatePost, loading, loggedInUserDetails }
  )
}

export default useCreatePost