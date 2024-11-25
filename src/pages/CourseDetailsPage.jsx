import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store.jsx";
import {
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../hooks/courseHooks.js";
import {
  disenrollFromCourse,
  enrollInCourse,
  getEnrollmentStatus,
} from "../hooks/enrollmentHooks.js";
import { Edit, Trash2, Save, X, CheckCircle, User } from "lucide-react"; // Import required icons
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS

const CourseDetailsPage = () => {
  const { studentId, courseId } = useParams();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const userID = studentId;

  const [enrolled, setEnrolled] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollmentStatusAndCourseDetails = async () => {
      try {
        const enrollmentData = await getEnrollmentStatus(userID, courseId);
        if (enrollmentData.enrolled) {
          setEnrolled(true);
          setEnrollmentId(enrollmentData.enrollmentId);
        }
        const courseData = await getCourseById(courseId);
        setCourseData(courseData);
      } catch (err) {
        setError(err.message);
        toast.error("Error fetching course details or enrollment status.");
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
      setEnrollmentId(enrollmentData._id);
      toast.success("Successfully enrolled in the course!");
    } catch (err) {
      console.error("Error enrolling:", err);
      setError(err.message);
      toast.error("Error enrolling in the course.");
    }
  };

  const handleDisenroll = async () => {
    try {
      await disenrollFromCourse(enrollmentId);
      setEnrolled(false);
      setEnrollmentId(null);
      toast.success("Successfully disenrolled from the course.");
    } catch (err) {
      console.error("Error disenrolling:", err);
      setError(err.message);
      toast.error("Error disenrolling from the course.");
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
      await updateCourse(courseId, courseData);
      setIsEditing(false);
      toast.success("Course updated successfully.");
    } catch (err) {
      console.error("Error updating course:", err);
      setError(err.message);
      toast.error("Error updating course.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCourse(courseId);
      navigate("/courses");
      toast.success("Course deleted successfully.");
    } catch (err) {
      console.error("Error deleting course:", err);
      setError(err.message);
      toast.error("Error deleting course.");
    }
  };

  if (loading)
    return <div className="text-center py-4 text-gray-500">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-white">
        Course Details
      </h1>
      <div className="bg-white shadow-md rounded-lg p-8">
        {courseData && (
          <div className="space-y-6">
            {isEditing ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="title"
                    value={courseData.title}
                    onChange={handleInputChange}
                    placeholder="Course Title"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    name="duration"
                    value={courseData.duration}
                    onChange={handleInputChange}
                    placeholder="Course Duration"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    name="instructor"
                    value={courseData.instructor}
                    onChange={handleInputChange}
                    placeholder="Instructor Name"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    name="instructor_num"
                    value={courseData.instructor_num}
                    onChange={handleInputChange}
                    placeholder="Instructor Contact"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  placeholder="Course Description"
                  className="w-full px-4 py-2 border rounded-md"
                ></textarea>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    <Save className="mr-2" /> Save Changes
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    <X className="mr-2" /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg text-gray-700">
                  <strong>Title:</strong> {courseData.title}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Description:</strong> {courseData.description}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Duration:</strong> {courseData.duration}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Instructor:</strong> {courseData.instructor}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Instructor Contact:</strong>{" "}
                  {courseData.instructor_num}
                </p>
              </>
            )}
          </div>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-between">
          {enrolled ? (
            <button
              onClick={handleDisenroll}
              className="flex items-center px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              <X className="mr-2" /> Disenroll
            </button>
          ) : (
            <button
              onClick={handleEnroll}
              className="flex items-center px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              <CheckCircle className="mr-2" /> Enroll
            </button>
          )}
          {userInfo.role === "admin" && (
            <div className="flex space-x-4">
              <button
                onClick={handleEditToggle}
                className="flex items-center px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                <Edit className="mr-2" />{" "}
                {isEditing ? "Cancel Edit" : "Edit Course"}
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <Trash2 className="mr-2" /> Delete Course
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                <User className="mr-2" /> Back to Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
