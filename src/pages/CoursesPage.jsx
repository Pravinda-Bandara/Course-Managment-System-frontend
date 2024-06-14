import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';
import { getUsers } from '../hooks/userHooks.js';
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
                setError(error.message || 'Error fetching enrollments');
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
        <>
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
        </>
    );
};

export default CoursesPage;
