import React, { useState, useEffect, useContext } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import apiClient from '../apiClient';
import { getEnrollmentsByStudentId } from '../hooks/enrollmentHooks.js';
import { Store } from "../Store.jsx";

import {getUserById, getUsers} from "../hooks/userHooks.js";

export function UserDetailsPage() {
    const { studentId } = useParams();
    const navigate=useNavigate()
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { state } = useContext(Store); // Use useContext to access the state
    const { userInfo } = state; // Destructure userInfo from state

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(studentId);
                setUser(userData);
            } catch (err) {
                setError(err.message || 'Error fetching user');
            } finally {
                setIsLoading(false);
            }
        };

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
                const enrollments = await getEnrollmentsByStudentId(studentId);
                setEnrolledCourses(enrollments);
                console.log(enrollments)
            } catch (error) {
                setEnrolledCourses([{courseName:'not yet Enrolled',enrollmentId:'0'}])

            } finally {
                setIsLoading(false);
            }
        };

        if (userInfo?._id) {
            fetchUser();
            fetchCourses();
            fetchEnrolledCourses();
        }
    }, [studentId, userInfo?._id]);

    const handleDetailsClick = (courseId) => {
        navigate(`/courses/${studentId}/${courseId}`);
    };



    if (isLoading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">User Details</h1>
            {user && (
                <div className="mb-6">
                    <p><span className="font-bold">User ID:</span> {user._id}</p>
                    <p><span className="font-bold">Email:</span> {user.email}</p>
                    <p><span className="font-bold">Name:</span> {user.name}</p>
                    <p><span className="font-bold">Role:</span> {user.role}</p>
                </div>
            )}

            <h1 className="text-3xl font-bold mb-4">Courses</h1>

            <div className="flex gap-40">
                <div className="w-3/5">
                    <table className="min-w-full bg-white border">
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
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="w-2/5">
                    <h1 className="text-3xl font-bold mb-4">Enrolled Courses</h1>
                    <table className="min-w-full bg-white border">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 border">Course Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {enrolledCourses.map((enrollment) => (
                            <tr key={enrollment.enrollmentId} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border">{enrollment.courseName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
