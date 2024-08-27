import { config } from '@react-spring/web';
import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://localhost:3333",
    withCredentials: true,
})

// Axios.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }
// );

Axios.interceptors.request.use(config=> {
    const userLanguage = navigator.language || navigator.userLanguage;
    config.headers['Accept-Language'] = userLanguage;
    return config;
})

export default Axios;