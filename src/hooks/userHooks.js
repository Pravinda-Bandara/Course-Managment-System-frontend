import apiClient from "../apiClient.js";

export const login = async ({ email, password }) => {
    try {
        const response = await apiClient.post('api/users/signin', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error logging in');
    }
};

export const register = async ({ name, email, password, number }) => {
    try {
        const response = await apiClient.post('api/users/signup', { name, email, password, number });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error registering');
    }
};

export const getUsers = async () => {
    try {
        const response = await apiClient.get('api/users/');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching users');
    }
};

export const getStudents = async () => {
    try {
        const response = await apiClient.get('api/users/students');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching students');
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await apiClient.get(`api/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching user');
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await apiClient.delete(`api/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting user');
    }
};

export const updateUser = async (userId, updatedUserData) => {
    try {
        const response = await apiClient.patch(`api/users/${userId}`, updatedUserData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating user');
    }
};