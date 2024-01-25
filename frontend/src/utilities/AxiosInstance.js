import axios from 'axios';
const AxiosInstance = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/api',  // Set your base URL
        headers: {
            'Content-Type': 'application/json',
        },
    });
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export default AxiosInstance;
