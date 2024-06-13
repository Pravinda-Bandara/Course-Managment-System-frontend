import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store.jsx";
import { useGetEnrollmentStatusQuery } from "../hooks/enrollmentHooks.js";

const CourseDetailsPage = () => {
    const { id } = useParams();
    const { state } = useContext(Store);
    const { userInfo } = state;

    const { data, error, isLoading } = useGetEnrollmentStatusQuery(userInfo._id, id);
    const [enrolled, setEnrolled] = useState(false); // Initialize to false or null

    // Update the enrolled state when data is loaded
    useEffect(() => {
        if (data) {
            setEnrolled(data.enrolled);
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Pravinda</h1>
            <h1>Course Details</h1>
            <p>Enrolled: {enrolled ? "Yes" : "No"}</p>
            {/* Uncomment and use below code when you have course details data */}
            {/* <p>Title: {data.title}</p>
            <p>Description: {data.description}</p>
            <p>Duration: {data.duration}</p>
            <p>Instructor: {data.instructor}</p> */}
        </div>
    );
};

export default CourseDetailsPage;
