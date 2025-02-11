// hooks/useAction.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useShowToastMessage from "./useShowToast";
import axiosInstance from "../assets/axiosConfig";
import { useDisclosure } from "@chakra-ui/react";
import { setPosts } from "../redux/profileSlice";

const useAction = (post) => {
    const currentUser = useSelector((state) => state?.authDetails?.userDetails);
    const [liked, setLiked] = useState(
        post?.likes?.includes(currentUser?._id));
    const showToast = useShowToastMessage();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [reply, setReply] = useState("")
    const [isReplying, setIsReplying] = useState(false)
    const allPost = useSelector((state) => state?.profile?.posts)
    const dispatch = useDispatch()

    const handleLikeAndUnlike = async () => {
        setIsReplying(true)
        if (!currentUser) {
            return showToast("Error", "You must be logged in to like the post", "error");
        }
        try {
            const res = await axiosInstance.put("/api/posts/like/" + post?._id);

            if (res.data) {
                if (!liked) {
                    const updatedPosts = allPost?.map((p) => {
                        if (p._id === post._id) {
                            return { ...p, likes: [...p.likes, currentUser?._id] }
                        } return p
                    })
                    dispatch(setPosts(updatedPosts))
                } else {
                    const updatedPosts = allPost?.map((p) => {
                        if (p._id === post._id) {
                            return { ...p, likes: p.likes.filter((id) => id !== currentUser?._id) }
                        } return p
                    })
                    dispatch(setPosts(updatedPosts))
                }
                setLiked(!liked);
            }
        } catch (error) {
            console.log(error, "Error liking/unliking post");
            showToast("Error", "Something went wrong", "error");
        } finally {
            setIsReplying(false)
        }
    };


    const handleReply = async () => {
        if (!currentUser) {
            return showToast("Error", "You must be logged in to like the post", "error");
        }

        try {
            const res = await axiosInstance.put("/api/posts/reply/" + post._id, { text: reply });

            if (res.data) {
                const updatedPosts = allPost?.map((p) => {
                    if (p._id === post._id) {
                        return { ...p, replies: [...p.replies, res.data] }
                    } return p
                })
                dispatch(setPosts(updatedPosts))
                showToast("Success", "Reply posted successfully", "success");
            }
            onClose()
        } catch (error) {
            console.log(error, "Error liking/unliking post");
            showToast("Error", "Something went wrong", "error");
        }
    };

    return {
        liked,
        post,
        handleLikeAndUnlike,
        isOpen,
        onOpen,
        onClose,
        reply,
        setReply,
        handleReply,
        isReplying
    };
};

export default useAction;