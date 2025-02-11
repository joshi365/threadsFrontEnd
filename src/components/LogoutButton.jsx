import { Button } from "@chakra-ui/react";
import axiosInstance from "../assets/axiosConfig";
import useShowToastMessage from "./useShowToast";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/authSlice";

const LogoutButton = () => {


    const toast = useShowToastMessage()
    const disapatch = useDispatch()

    const handleLogout = async () => {
        try {
            const res = await axiosInstance.post("/api/users/logout")
            if(res.error){
                toast("Error", res?.data?.error, "error")
            }
            localStorage.removeItem("user-data")
            disapatch(setUserDetails({}))

        } catch (error) {
            toast("Error", error?.response?.data?.message, "error")
        }
    }

    return (
        <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
            Logout
        </Button>
    )

}

export default LogoutButton