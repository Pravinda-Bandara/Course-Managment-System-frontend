import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { getDetailedEnrollments, getEnrollmentsByStudentId } from '../hooks/enrollmentHooks.js';
import { Store } from "../Store.jsx";
import { getUserById } from "../hooks/userHooks.js";
import TableHeader from "../components/TableHeader.jsx";
import TableRow from "../components/TableRow.jsx";

export function UserDetailsPage() {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { state } = useContext(Store);
    const { userInfo } = state;

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
                const response = await getDetailedEnrollments(studentId);
                setCourses(response);
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
                console.log(enrollments);
            } catch (error) {
                setEnrolledCourses([{ courseName: 'Not yet Enrolled', enrollmentId: '0' }]);
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
            <h1 className="text-3xl font-bold mb-6 text-white">User Details</h1>
            {user && (
                <div className="mb-6 text-white">
                    <p><span className="font-bold">User ID:</span> {user._id}</p>
                    <p><span className="font-bold">Email:</span> {user.email}</p>
                    <p><span className="font-bold">Name:</span> {user.name}</p>
                    <p><span className="font-bold">Role:</span> {user.role}</p>
                </div>
            )}

            <h1 className="text-3xl font-bold mb-4 text-white">Courses</h1>

            <div className="flex gap-40">
                <div className="w-3/5">
                    <table className="min-w-full bg-white border opacity-80 ">
                        <TableHeader columns={['Name', 'Duration', 'Instructor', 'Instructor Number', 'Enrolled', 'Action']} />
                        <tbody>
                        {courses.map((course) => (
                            <TableRow
                                key={course._id}
                                rowData={[
                                    course.title,
                                    course.duration,
                                    course.instructor,
                                    course.instructor_num,
                                    <span className={course.enrolled ? 'text-green-500' : 'text-red-500'}>
                                            {course.enrolled ? 'Yes' : 'No'}
                                        </span>,
                                    <button
                                        onClick={() => handleDetailsClick(course._id)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    >
                                        Details
                                    </button>
                                ]}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="w-2/5">
                    <h1 className="text-3xl font-bold mb-4 text-white">Enrolled Courses</h1>
                    <table className="min-w-full bg-white border opacity-90 ">
                        <TableHeader columns={['Course Name']} />
                        <tbody>
                        {enrolledCourses.map((enrollment) => (
                            <TableRow key={enrollment.enrollmentId} rowData={[enrollment.courseName]} />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
