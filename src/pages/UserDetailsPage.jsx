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
            } catch (error) {

                setError(error.message || 'Error fetching enrollments');
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

    const handleFetchUsers = async () => {
        try {
            const users = await getUsers();
            console.log('Users:', users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>User Details</h1>
            {user && (
                <div>
                    <p>User ID: {user._id}</p>
                    <p>Email: {user.email}</p>
                    <p>Name: {user.name}</p>
                    <p>Role: {user.role}</p>
                </div>
            )}

            <h1>Courses</h1>
            <button onClick={handleFetchUsers}>Fetch Users</button>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Duration</th>
                    <th>Instructor</th>
                    <th>Instructor Number</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course) => (
                    <tr key={course._id}>
                        <td>{course.title}</td>
                        <td>{course.duration}</td>
                        <td>{course.instructor}</td>
                        <td>{course.instructor_num}</td>
                        <td>
                            <button onClick={() => handleDetailsClick(course._id)}>Details</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h1>Enrolled Courses</h1>
            <table>
                <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Student Email</th>
                </tr>
                </thead>
                <tbody>
                {enrolledCourses.map((enrollment) => (
                    <tr key={enrollment.enrollmentId}>
                        <td>{enrollment.courseName}</td>
                        <td>{enrollment.studentEmail}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
