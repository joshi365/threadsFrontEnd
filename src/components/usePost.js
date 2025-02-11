import { useEffect, useState } from "react";
import axiosInstance from "../assets/axiosConfig";
import useShowToastMessage from './useShowToast';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/profileSlice";

const usePost = (userName) => {

    const [user, setUser] = useState(null)
    const showToast = useShowToastMessage()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const allPost = useSelector((state) => state?.profile?.posts)

    useEffect(() => {
        const getUser = async () => {
            try {
                if (userName) {
                    const res = await axiosInstance.get("api/users/profile/" + userName)
                    if (res?.data) {
                        setUser(res?.data)
                    }
                }
            } catch (error) {
                showToast("Error", error.message, "error")
            }
        }
        getUser()
    }, [userName])

    const navigateTOProfile = (e) => {
        e.preventDefault(),
            navigate(`/${userName}`)
    }

    const handleDeletePost = async (e, post) => {
        try {
            e.preventDefault()
            if (!window.confirm("Are you sure you want to delete this post ?")) return;

            const res = await axiosInstance.delete(`/api/posts//${post._id}`)

            if (res.data) {
                showToast("Success", "Post deleted", "success")
                const newPosts = allPost?.filter((data) => data?._id !== post?._id)
                dispatch(setPosts(newPosts))
            }

        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return (
        { navigateTOProfile, user, handleDeletePost }
    )
}

export default usePost