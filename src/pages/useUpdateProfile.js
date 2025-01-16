import { useRef, useState } from "react";
import useShowToastMessage from "../components/useShowToast";
import axiosInstance from "../assets/axiosConfig";
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from "../redux/authSlice"

const useUpdateProfile = () => {
    const userData = useSelector((state) => state?.authDetails?.userDetails)

    const [imageUrl, setImageUrl] = useState("")

    const [profileData, setProfileData] = useState({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        bio: userData.bio,
        password: "",
    })

    const fileRef = useRef(null)
    const showToast = useShowToastMessage()
    const dispatach = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = { ...profileData, profilepic: imageUrl };
            const updateProfileRes = await axiosInstance.put(
                `api/users/update/${userData._id}`,
                payload
            );
            dispatach(setUserDetails(updateProfileRes.data.user))
            showToast("Success", "Profile updated successfully", "success")
        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error.message);
            showToast("Error", error, "error")
        }
    };

    const handleFileClick = () => {
        fileRef.current?.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()

            reader.onloadend = () => {
                setImageUrl(reader.result)
            }

            reader.readAsDataURL(file)
        } else {
            showToast("Invalid file type", "please select an image file", "error")
            setImageUrl("null")
        }
    }

    return { handleSubmit, profileData, setProfileData, handleFileClick, fileRef, handleImageChange, imageUrl, userData }
}

export default useUpdateProfile