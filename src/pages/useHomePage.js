import useShowToastMessage from "../components/useShowToast";
import { useEffect, useState } from "react";
import axiosInstance from "../assets/axiosConfig";

const useHomePage = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const showToast = useShowToastMessage()

    useEffect(() => {
        const getFeeds = async () => {
            try {
                const res = await axiosInstance.get('/api/posts/feed');
                if (res.data) {
                    setPosts(res.data.feedPosts)
                }
            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setLoading(false)
            }
        }
        getFeeds()
    }, [])


    return { posts, loading }
}

export default useHomePage