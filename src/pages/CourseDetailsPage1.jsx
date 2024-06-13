import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { Store } from "../Store.jsx";
import apiClient from "../apiClient.js";

const CourseDetailsPage = () => {
    const { id } = useParams();
    const { state } = useContext(Store);
    const { userInfo } = state;
    const userID = userInfo._id;

    const [enrolled, setEnrolled] = useState(null);
    const [enrollmentId, setEnrollmentId] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnrollmentStatusAndCourseDetails = async () => {
            try {
                const enrollmentResponse = await apiClient.get(`api/enrollments/status?studentId=${userID}&courseId=${id}`);
                setEnrolled(enrollmentResponse.data.enrolled);
                setEnrollmentId(enrollmentResponse.data.enrollmentId); // Assuming the response contains the enrollmentId
                const courseResponse = await apiClient.get(`api/courses/${id}`);
                setCourseData(courseResponse.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollmentStatusAndCourseDetails();
    }, [id, userID]);

    const handleEnroll = async () => {
        try {
            const response = await apiClient.post(`api/enrollments`, {
                studentId: userID,
                courseId: id,
            });
            setEnrolled(true);
            setEnrollmentId(response.data._id); // Store the enrollment ID
        } catch (err) {
            console.error('Error enrolling:', err);
            setError(err.message);
        }
    };

    const handleDisenroll = async () => {
        try {
            await apiClient.delete(`api/enrollments/${enrollmentId}`);
            setEnrolled(false);
            setEnrollmentId(null);
        } catch (err) {
            console.error('Error disenrolling:', err);
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
                    <p>Title: {courseData.title}</p>
                    <p>Description: {courseData.description}</p>
                    <p>Duration: {courseData.duration}</p>
                    <p>Instructor: {courseData.instructor}</p>
                </>
            )}
            <p>Enrolled: {enrolled ? "Yes" : "No"}</p>
            {enrolled ? (
                <button onClick={handleDisenroll}>Disenroll</button>
            ) : (
                <button onClick={handleEnroll}>Enroll</button>
            )}
        </div>
    );
};

export default CourseDetailsPage;
