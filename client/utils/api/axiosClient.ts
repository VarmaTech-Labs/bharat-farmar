import axios from "axios"


const axiosClient = axios.create({
    baseURL: "http://192.168.31.121:8080",
})

export default axiosClient;
