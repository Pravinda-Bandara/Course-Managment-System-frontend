import axios from 'axios';


const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5050/' : '/',
    headers: {
        'Content-type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            config.headers.authorization = `Bearer ${parsedUserInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to set up the response interceptor
export const setupInterceptors = (navigate) => {
    apiClient.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                localStorage.removeItem('userInfo'); // Optionally remove token from storage
                navigate('/login'); // Navigate to the login page
            }
            return Promise.reject(error);
        }
    );
};

export default apiClient;
