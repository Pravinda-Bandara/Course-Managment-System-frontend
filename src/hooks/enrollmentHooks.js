import apiClient from "../apiClient.js";

const handleApiResponse = async (apiCall) => {
    try {
        const response = await apiCall();
        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred');
    }
};

export const enrollStudent = async (studentId, courseId) => 
    handleApiResponse(() => apiClient.post('api/enrollments', { studentId, courseId }));

export const getEnrollmentsByStudentId = async (studentId) => 
    handleApiResponse(() => apiClient.get(`api/enrollments/${studentId}`));

export const getEnrollmentStatus = async (studentId, courseId) => 
    handleApiResponse(() => apiClient.get('api/enrollments/status', { params: { studentId, courseId } }));

export const getDetailedEnrollments = async (studentId) => 
    handleApiResponse(() => apiClient.get(`api/enrollments/detailed/${studentId}`));

export const enrollInCourse = async (studentId, courseId) => 
    handleApiResponse(() => apiClient.post('api/enrollments', { studentId, courseId }));

export const disenrollFromCourse = async (enrollmentId) => 
    handleApiResponse(() => apiClient.delete(`api/enrollments/${enrollmentId}`));
