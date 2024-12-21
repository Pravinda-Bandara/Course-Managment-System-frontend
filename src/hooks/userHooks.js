import apiClient from "../apiClient.js";
import { toast } from "react-toastify";

const handleApiResponse = async (apiCall) => {
    try {
        const response = await apiCall();
        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'An error occurred');
    }
};

export const login = async ({ email, password }) => 
    handleApiResponse(() => apiClient.post('api/users/signin', { email, password }));

export const register = async ({ name, email, password, number }) => 
    handleApiResponse(() => apiClient.post('api/users/signup', { name, email, password, number }));

export const getUsers = async () => 
    handleApiResponse(() => apiClient.get('api/users/'));

export const getStudents = async () => 
    handleApiResponse(() => apiClient.get('api/users/students'));

export const getUserById = async (userId) => 
    handleApiResponse(() => apiClient.get(`api/users/${userId}`));

export const deleteUser = async (userId) => 
    handleApiResponse(() => apiClient.delete(`api/users/${userId}`));

export const updateUser = async (userId, updatedUserData) => 
    handleApiResponse(() => apiClient.patch(`api/users/${userId}`, updatedUserData));
