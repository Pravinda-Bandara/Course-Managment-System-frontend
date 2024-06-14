import {useNavigate, useParams} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store.jsx";
import {  getCourseById, updateCourse, deleteCourse } from "../hooks/courseHooks.js";
import {disenrollFromCourse, enrollInCourse, getEnrollmentStatus} from "../hooks/enrollmentHooks.js";

const CourseDetailsPage = () => {
    const { studentId, courseId } = useParams();
    const { state } = useContext(Store);
    const { userInfo } = state;
    const userID = studentId;

    const [enrolled, setEnrolled] = useState(false);
    const [enrollmentId, setEnrollmentId] = useState(null); // Initialize enrollment ID state
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEnrollmentStatusAndCourseDetails = async () => {
            try {
                const enrollmentData = await getEnrollmentStatus(userID, courseId);
                if (enrollmentData.enrolled) {
                    setEnrolled(true);
                    setEnrollmentId(enrollmentData.enrollmentId); // Store the enrollment ID if already enrolled
                }
                const courseData = await getCourseById(courseId);
                setCourseData(courseData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollmentStatusAndCourseDetails();
    }, [courseId, userID]);

    const handleEnroll = async () => {
        try {
            const enrollmentData = await enrollInCourse(userID, courseId);
            setEnrolled(true);
            setEnrollmentId(enrollmentData._id); // Store the enrollment ID
        } catch (err) {
            console.error('Error enrolling:', err);
            setError(err.message);
        }
    };

    const handleDisenroll = async () => {
        try {
            await disenrollFromCourse(enrollmentId); // Use stored enrollment ID to disenroll
            setEnrolled(false);
            setEnrollmentId(null); // Reset enrollment ID state after disenrollment
        } catch (err) {
            console.error('Error disenrolling:', err);
            setError(err.message);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            console.log(courseData+"before")
            await updateCourse(courseId, courseData);
            setIsEditing(false);
            console.log('Course updated:', courseData);
        } catch (err) {
            console.error('Error updating course:', err);
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCourse(courseId);
            console.log('Course deleted');
            navigate('/courses')

        } catch (err) {
            console.error('Error deleting course:', err);
            setError(err.message);
        }
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-4">Course Details</h1>
            {courseData && (
                <>
                    {isEditing ? (
                        <div className="space-y-4 mb-4">
                            <input
                                type="text"
                                name="title"
                                value={courseData.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                            <textarea
                                name="description"
                                value={courseData.description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="number"
                                name="duration"
                                value={courseData.duration}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="instructor"
                                value={courseData.instructor}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="instructor_num"
                                value={courseData.instructor_num}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 mb-4">
                            <p className="text-lg"><strong>Title:</strong> {courseData.title}</p>
                            <p className="text-lg"><strong>Description:</strong> {courseData.description}</p>
                            <p className="text-lg"><strong>Duration:</strong> {courseData.duration}</p>
                            <p className="text-lg"><strong>Instructor:</strong> {courseData.instructor}</p>
                            <p className="text-lg"><strong>Instructor Number:</strong> {courseData.instructor_num}</p>
                        </div>
                    )}
                </>
            )}
            <p className="text-lg mb-4"><strong>Enrolled:</strong> {enrolled ? "Yes" : "No"}</p>
            {enrolled ? (
                <button
                    onClick={handleDisenroll}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mb-4"
                >
                    Disenroll
                </button>
            ) : (
                <button
                    onClick={handleEnroll}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mb-4"
                >
                    Enroll
                </button>
            )}
            {userInfo.role === 'admin' && (
                <div className="space-x-4">
                    <button
                        onClick={handleEditToggle}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default CourseDetailsPage;
