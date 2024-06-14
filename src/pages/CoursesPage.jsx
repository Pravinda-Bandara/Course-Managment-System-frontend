import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEnrollmentsByStudentId } from '../hooks/enrollmentHooks.js';
import { Store } from "../Store.jsx";
import { getDetailedEnrollments } from "../hooks/enrollmentHooks.js";
import TableHeader from "../components/TableHeader.jsx";
import TableRow from "../components/TableRow.jsx";


const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { state } = useContext(Store);
    const { userInfo } = state;
    const studentId = state.userInfo._id

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getDetailedEnrollments(userInfo._id);
                setCourses(response);
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
                setEnrolledCourses([{ courseName: 'not yet Enrolled', enrollmentId: '0' }])
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
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Courses</h1>
                        {userInfo && <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            Add New Course
                        </button>}
                    </div>
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white border border-gray-200">
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
                                        course.enrolled ? 'Yes' : 'No',
                                        <button
                                            onClick={() => handleDetailsClick(course._id)}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                                        >
                                            Details
                                        </button>
                                    ]}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-1/4">
                    <h1 className="text-2xl font-bold mb-4">Enrolled Courses</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <TableHeader columns={['Course Name']} />
                            <tbody>
                            {enrolledCourses.map((enrollment) => (
                                <TableRow
                                    key={enrollment.enrollmentId}
                                    rowData={[enrollment.courseName]}
                                />
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
