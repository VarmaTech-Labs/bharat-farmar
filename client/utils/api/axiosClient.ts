import axios from "axios"


const axiosClient = axios.create({
    baseURL: "http://192.168.45.137:8080",
})

export default axiosClient;
