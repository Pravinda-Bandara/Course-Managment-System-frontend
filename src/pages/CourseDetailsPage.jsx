import {useNavigate, useParams} from "react-router-dom";
import {useGetCourseByIdQuery} from "../hooks/courseHooks.js";
import {useContext, useEffect, useState} from "react";
import {Store} from "../Store.jsx";
import {useDeleteEnrollmentMutation, useEnrollMutation} from "../hooks/enrollmentHooks.js";
import {toast} from "react-toastify";

const CourseDetailsPage = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetCourseByIdQuery(id);
    const [enrollmentId, setEnrollmentId] = useState(null);
    const { state } = useContext(Store); // Assuming you store user info in a context
    const { userInfo } = state;
    const navigate = useNavigate();

    const { mutateAsync: enroll } = useEnrollMutation();
    const { mutateAsync: disenroll } = useDeleteEnrollmentMutation();

    useEffect(() => {
        // Optionally, fetch current enrollment status and ID if needed
        // This example assumes that initial enrollment state is not known
    }, []);

    const handleEnroll = async () => {
        if (!userInfo) {
            toast.error('Please log in to enroll.');
            return;
        }

        try {
            const data = await enroll({ studentId: userInfo._id, courseId: id });
            setEnrollmentId(data._id); // Save the enrollment ID for future use
            toast.success('Enrolled successfully!');
        } catch (err) {
            toast.error(`Enrollment failed: ${err.message}`, {
                autoClose: 1000
            });
        }
    };

    const handleDisenroll = async () => {
        if (!userInfo) {
            toast.error('Please log in to disenroll.');
            return;
        }

        if (!enrollmentId) {
            toast.error('Enrollment ID not found.');
            return;
        }

        try {
            await disenroll(enrollmentId);
            setEnrollmentId(null); // Clear the enrollment ID
            toast.success('Disenrolled successfully!');
        } catch (err) {
            toast.error(`Disenrollment failed: ${err.message}`, {
                autoClose: 1000
            });
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Course Details</h1>
            <p>Title: {data.title}</p>
            <p>Description: {data.description}</p>
            <p>Duration: {data.duration}</p>
            <p>Instructor: {data.instructor}</p>
            {enrollmentId ? (
                <button onClick={handleDisenroll}>Disenroll</button>
            ) : (
                <button onClick={handleEnroll}>Enroll</button>
            )}
        </div>
    );
};

export default CourseDetailsPage;
