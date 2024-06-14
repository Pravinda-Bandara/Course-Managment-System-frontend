import apiClient from "../apiClient.js";


export const getCourses = async () => {
    try {
        const response = await apiClient.get('api/courses/');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching courses');
    }
};

export const getCourseById = async (courseId) => {
    try {
        const response = await apiClient.get(`api/courses/${courseId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching course');
    }
};

export const deleteCourse = async (courseId) => {
    try {
        const response = await apiClient.delete(`api/courses/${courseId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting course');
    }
};

export const updateCourse = async (courseId, courseData) => {
    try {
        const response = await apiClient.patch(`api/courses/${courseId}`, courseData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating course');
    }
};

