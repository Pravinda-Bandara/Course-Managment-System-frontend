import axios from 'axios';

const apiClient = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development' ? 'http://localhost:5050/' : '/',
    headers: {
        'Content-type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        if (localStorage.getItem('userInfo')) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            console.log(userInfo.token)
            config.headers.authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
