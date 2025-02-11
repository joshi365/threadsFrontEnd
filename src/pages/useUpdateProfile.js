import { useRef, useState } from "react";
import useShowToastMessage from "../components/useShowToast";
import axiosInstance from "../assets/axiosConfig";
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from "../redux/authSlice"
import { useNavigate } from "react-router-dom";

const useUpdateProfile = () => {
    const userData = useSelector((state) => state?.authDetails?.userDetails)
    const [updating, setUpdating] = useState(false)
    const fileRef = useRef(null)
    const navigate = useNavigate()

    const [profileData, setProfileData] = useState({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        bio: userData.bio,
        password: "",
    })

    const showToast = useShowToastMessage()
    const dispatach = useDispatch()

    const handleSubmit = async (e, imageUrl) => {
        e.preventDefault();
        if (updating) return
        setUpdating(true)
        try {
            const payload = { ...profileData, profilepic: imageUrl };
            const updateProfileRes = await axiosInstance.put(
                `api/users/update/${userData._id}`,
                payload
            );
            dispatach(setUserDetails(updateProfileRes.data.user))
            showToast("Success", "Profile updated successfully", "success")
            navigate(`/${userData.username}`)
        } catch (error) {
            showToast("Error", error.response?.data?.message || error.message, "error");
        } finally {
            setUpdating(false)
        }
    };

    const handleFileClick = () => {
        fileRef.current?.click();
    };



    return { handleSubmit, profileData, setProfileData, userData, updating, fileRef, handleFileClick, navigate }
}

export default useUpdateProfile