import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth`
})

export const googleAuth = (code:any) => 
    api.get(`/google?code=${code}`, {
        withCredentials: true, // Must be set for saving cookies!
    })