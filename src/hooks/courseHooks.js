import apiClient from "../apiClient.js";
import handleApiResponse from "../utils/ApiResponseUtil.js"


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
