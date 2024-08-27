import axios from "axios";

export const $authHost = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
const authInterceptor = config => {
    const token = localStorage.getItem('token');
    config.headers.authorization = token;
    return config;
}
$authHost.interceptors.request.use(authInterceptor);