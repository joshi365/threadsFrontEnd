import { useState } from 'react'
import axiosInstance from '../assets/axiosConfig'
import { setUserDetails } from '../redux/authSlice'
import { useDispatch } from 'react-redux'
import useShowToastMessage from './useShowToast'

const useSignupCard = () => {
    const [showPassword, setShowPassword] = useState(false)

    const disapatch = useDispatch()

    const toast = useShowToastMessage()

    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })

    const handleSignUp = async () => {
        try {
            const response = await axiosInstance.post("/api/users/signup", inputs);
            localStorage.setItem("user-data", JSON.stringify(response.data));
            disapatch(setUserDetails(response.data))

        } catch (error) {
            toast("Error", error?.response?.data?.message, "error")

        }
    }

    return { showPassword, setShowPassword, setInputs, handleSignUp, inputs }

}

export default useSignupCard

