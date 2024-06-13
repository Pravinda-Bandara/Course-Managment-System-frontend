import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store.jsx";
import { useGetCourseByIdQuery } from "../hooks/courseHooks.js";

const CourseDetailsPage = () => {
    const { id } = useParams();
    const { state } = useContext(Store);
    const { userInfo } = state;
   console.log(userInfo.enrolledCourseIds.includes(id))

    const [enrolled, setEnrolled] = useState(userInfo.enrolledCourseIds.includes(id)); // Initialize to false or null



    // Fetch course details
    const { data: courseData, error: courseError, isLoading: courseLoading } = useGetCourseByIdQuery(id);

    const handleEnroll = () => {
        // Implement logic to enroll the user
        // You can use an API call or a mutation hook here
    };

    const handleDisenroll = () => {
        // Implement logic to disenroll the user
        // You can use an API call or a mutation hook here
    };

    // Render loading indicator while data is being fetched
    if (courseLoading) return <div>Loading...</div>;

    // Render error message if there's an error
    if (courseError) return <div>Error: {courseError.message}</div>;

    // Render course details and enrollment status once data is loaded
    return (
        <div>
            <h1>Course Details</h1>
            <p>Title: {courseData.title}</p>
            <p>Description: {courseData.description}</p>
            <p>Duration: {courseData.duration}</p>
            <p>Instructor: {courseData.instructor}</p>
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
