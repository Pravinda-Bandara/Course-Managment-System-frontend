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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Course Details</h1>
            {courseData && (
                <>
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                name="title"
                                value={courseData.title}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="description"
                                value={courseData.description}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="duration"
                                value={courseData.duration}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="instructor"
                                value={courseData.instructor}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="instructor_num"
                                value={courseData.instructor_num}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleSave}>Save</button>
                        </>
                    ) : (
                        <>
                            <p>Title: {courseData.title}</p>
                            <p>Description: {courseData.description}</p>
                            <p>Duration: {courseData.duration}</p>
                            <p>Instructor: {courseData.instructor}</p>
                            <p>Instructor Number: {courseData.instructor_num}</p>
                        </>
                    )}
                </>
            )}
            <p>Enrolled: {enrolled ? "Yes" : "No"}</p>
            {enrolled ? (
                <button onClick={handleDisenroll}>Disenroll</button>
            ) : (
                <button onClick={handleEnroll}>Enroll</button>
            )}
            {userInfo.role === 'admin' && (
                <>
                    <button onClick={handleEditToggle}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default CourseDetailsPage;
