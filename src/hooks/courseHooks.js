import apiClient from "../apiClient.js";

const handleApiResponse = async (apiCall) => {
    try {
        const response = await apiCall();
        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'An error occurred');
    }
};

export const getCourses = async () => 
    handleApiResponse(() => apiClient.get('api/courses/'));

export const getCourseById = async (courseId) => 
    handleApiResponse(() => apiClient.get(`api/courses/${courseId}`));

export const deleteCourse = async (courseId) => 
    handleApiResponse(() => apiClient.delete(`api/courses/${courseId}`));

export const updateCourse = async (courseId, courseData) => 
    handleApiResponse(() => apiClient.patch(`api/courses/${courseId}`, courseData));

export const addCourse = async (courseData) => 
    handleApiResponse(() => apiClient.post('api/courses/', courseData));
