import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5001",
    withCredentials: true,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getCookie("jwt");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) {
            return value;
        }
    }
    return null;
}


export default axiosInstance