import axios from "axios";

// https://reqres.in/api

export const axiosInstance = axios.create({
    baseURL: "https://run.mocky.io/v3/4149e89b-6796-4143-bcb9-bde04a8da71d",
});

axiosInstance.interceptors.request.use((config) => {
    const authInfo = localStorage.getItem("authInfo");
    if (authInfo) {
        const { token } = JSON.parse(authInfo);
        config.headers["tapToken"] = token;
    }
    return config;
});
