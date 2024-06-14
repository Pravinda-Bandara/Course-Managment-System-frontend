import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';
import { getEnrollmentsByStudentId } from '../hooks/enrollmentHooks.js';
import {Store} from "../Store.jsx";


const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { state } = useContext(Store); // Use useContext to access the state
    const { userInfo } = state; // Destructure userInfo from state
    const studentId=state.userInfo._id

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiClient.get('api/courses/');
                setCourses(response.data);
            } catch (error) {
                setError(error.message || 'Error fetching courses');
            } finally {
                setIsLoading(false);
            }
        };

        const fetchEnrolledCourses = async () => {
            try {
                const enrollments = await getEnrollmentsByStudentId(userInfo._id);
                setEnrolledCourses(enrollments);
            } catch (error) {
                setEnrolledCourses([{courseName:'not yet Enrolled',enrollmentId:'0'}])
            } finally {
                setIsLoading(false);
            }
        };

        if (userInfo?._id) {
            fetchCourses();
            fetchEnrolledCourses();
        }
    }, [userInfo?._id]);

    const handleDetailsClick = (courseId) => {
        navigate(`/courses/${studentId}/${courseId}`);
    };




    if (isLoading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-6">

            <div className="flex space-x-32">

                <div className="w-3/4">
                    <h1 className="text-2xl font-bold mb-4">Courses</h1>
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Duration</th>
                                <th className="px-4 py-2 border">Instructor</th>
                                <th className="px-4 py-2 border">Instructor Number</th>
                                <th className="px-4 py-2 border">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {courses.map((course) => (
                                <tr key={course._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">{course.title}</td>
                                    <td className="px-4 py-2 border">{course.duration}</td>
                                    <td className="px-4 py-2 border">{course.instructor}</td>
                                    <td className="px-4 py-2 border">{course.instructor_num}</td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() => handleDetailsClick(course._id)}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-1/4">
                <h1 className="text-2xl font-bold mb-4">Enrolled Courses</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 border">Course Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {enrolledCourses.map((enrollment) => (
                                <tr key={enrollment.enrollmentId} className="hover:bg-gray-100 text-center">
                                    <td className="px-4 py-2 border">{enrollment.courseName}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
