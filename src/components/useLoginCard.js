import { useState } from "react"
import axiosInstance from "../assets/axiosConfig"
import useShowToastMessage from "./useShowToast"
import { useDispatch } from "react-redux"
import { setUserDetails } from "../redux/authSlice"

const useLoginCard = () => {
    const [loginInput, setLoginInput] = useState({ username: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)
    const toast = useShowToastMessage()
    const dispatach = useDispatch()

    const handleLogin = async () => {
        try {
            const loginResponse = await axiosInstance.post("/api/users/login", loginInput)
            localStorage.setItem("user-data", JSON.stringify(loginResponse.data));
            dispatach(setUserDetails(loginResponse.data))
        } catch (error) {
            console.log(error, "errorrr")
            toast("Error", error?.response?.data?.message, "error")
        }
    }

    return { loginInput, setLoginInput, handleLogin, showPassword, setShowPassword }

}

export default useLoginCard