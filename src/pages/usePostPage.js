import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useShowToastMessage from "../components/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../assets/axiosConfig";
import useUserPage from "./useUserPage";
import { setPosts } from "../redux/profileSlice";

const usePostPage = () => {

    const { pid } = useParams()
    const navigate = useNavigate()
    const { user, loading } = useUserPage()
    const showToast = useShowToastMessage()
    const dispatch = useDispatch()
    const allPost = useSelector((state) => state?.profile?.posts)
    const currentUser = useSelector((state) => state?.authDetails?.userDetails)


    const currentPost = allPost?.find((post) => post?._id === pid);

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axiosInstance(`/api/posts/${pid}`)
                if (res.data) {
                    dispatch(setPosts([res.data]))
                }
            } catch (error) {
                showToast("Error", error.message, "error")
            }
        }

        getPost()

    }, [pid, dispatch])


    const handleDeletePost = async () => {
        try {
            if (!window.confirm("Are you sure you want to delete this post ?")) return;

            const res = await axiosInstance.delete(`/api/posts/${currentPost?._id}`)

            if (res.data) {
                showToast("Success", "Post deleted", "success")
                navigate(`/${user?.username}`)
            }

        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }


    return { currentPost, loading, currentUser, allPost, handleDeletePost, user }
}

export default usePostPage