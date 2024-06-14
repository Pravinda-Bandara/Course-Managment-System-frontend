import apiClient from "../apiClient.js";

export const enrollStudent = async (studentId, courseId) => {
    try {
        const response = await apiClient.post(`api/enrollments`, {
            studentId,
            courseId,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error enrolling student');
    }
};
export const getEnrollmentsByStudentId = async (studentId) => {
    try {
        const response = await apiClient.get(`api/enrollments/${studentId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching enrollments');
    }
};



export const getEnrollmentStatus = async (studentId, courseId) => {
    try {
        const response = await apiClient.get(`api/enrollments/status`, {
            params: { studentId, courseId },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching enrollment status');
    }
};

export const getDetailedEnrollments = async (studentId) => {
    try {
        const response = await apiClient.get(`api/enrollments/detailed/${studentId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching detailed enrollments');
    }
};


export const enrollInCourse = async (studentId, courseId) => {
    try {
        const response = await apiClient.post('api/enrollments', {
            studentId,
            courseId,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error enrolling in course');
    }
};

export const disenrollFromCourse = async (enrollmentId) => {
    try {
        const response = await apiClient.delete(`api/enrollments/${enrollmentId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error disenrolling from course');
    }
};
