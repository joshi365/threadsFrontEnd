import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:5001",
})

//instance.defaults.headers.common["Authorization"] = "Auth From instance"

export default axiosInstance