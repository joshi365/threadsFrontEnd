import axiosInstance from "../assets/axiosConfig";
import { useParams } from "react-router-dom";
import useShowToastMessage from "../components/useShowToast";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../redux/profileSlice"


const useUserPage = () => {

    const toast = useToast()
    const dispatch = useDispatch()
    const { username } = useParams()
    const showToast = useShowToastMessage()
    const currentUser = useSelector((state) => state?.authDetails?.userDetails)

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [following, setFollowing] = useState(null)
    const [fetchingPost, setFetchingPost] = useState(false)

    const copyUrl = () => {
        const currentUrl = window.location.href
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast({
                title: 'Done',
                description: "Profile link copied.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
    }

    useEffect(() => {
        if (user && currentUser) {
            setFollowing(user?.followers?.includes(currentUser._id));
        }
    }, [user, currentUser]);

    useEffect(() => {

        if (!username) return;

        const getUser = async () => {
            setLoading(true)
            try {
                const res = await axiosInstance?.get(`/api/users/profile/${username}`)
                if (res?.data?.error) {
                    showToast("Error", res.data.error, "error")
                    return
                }
                setUser(res.data)
            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setLoading(false)
            }
        }

        const getPosts = async () => {
            setFetchingPost(true)
            try {
                const res = await axiosInstance.get(`/api/posts/user/${username}`)
                if (res.data) {
                    dispatch(setPosts(res.data))
                }
            } catch (error) {
                showToast("Error", error.message, "error")
                setPosts([])
            } finally {
                setFetchingPost(false)
            }
        }
        getUser()
        getPosts()
    }, [username])


    const followUnFollowUser = async () => {
        if (updating) return
        setUpdating(true)
        try {
            const res = await axiosInstance?.post(`api/users/follow/${user._id}`)
            if (res.error) {
                showToast("Error", res.error.message, "error")
                return
            }
            if (following) {
                user.followers.pop()
            } else {
                user.followers.push(currentUser._id)
            }

            setFollowing(!following)
        } catch (error) {
            showToast("Error", "error", "error")
            console.log(error)
        } finally {
            setUpdating(false)
        }
    }


    return { user, currentUser, copyUrl, following, followUnFollowUser, updating, loading, fetchingPost }
}

export default useUserPage