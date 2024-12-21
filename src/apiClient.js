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
        (response) => response,
        (error) => {
            if (error.response) {
                const { status } = error.response;

                switch (status) {
                    case 400:
                        console.error('Bad Request: Please verify the sent data.');
                        break;
                    case 401:
                        console.warn('Unauthorized: Your session has expired or the credentials are invalid.');
                        localStorage.removeItem('userInfo'); // Remove token if unauthorized
                        navigate('/login'); // Redirect to login page
                        break;
                    case 403:
                        console.warn('Forbidden: You do not have the required permissions.');
                        navigate('/unauthorized'); // Optional: Redirect to an unauthorized page
                        break;
/*                     case 404:
                        console.error('Not Found: The requested resource could not be found.');
                        navigate('/not-found'); // Optional: Redirect to a 404 page
                        break; */
                    case 500:
                        console.error('Internal Server Error: Please try again later.');
                        break;
                    default:
                        console.error(`Unexpected Error: ${error.response.data.message || 'An error occurred.'}`);
                        break;
                }
            } else {
                console.error('Network Error: Please check your connection.');
            }

            return Promise.reject(error);
        }
    );
};

export default apiClient;
