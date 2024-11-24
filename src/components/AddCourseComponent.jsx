import { useState } from 'react';

const AddCourseModal = ({ isOpen, onClose, onSave }) => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        duration: '',
        instructor: '',
        instructor_num: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSave = () => {
        onSave(courseData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-700 flex justify-center items-center bg-opacity-60">
            <div className="bg-white p-6 rounded shadow-lg w-1/3 rounded-2xl ">
                <h2 className="text-xl font-bold mb-4">Add New Course</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={courseData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={courseData.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded resize-y"
                            rows="4"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Duration</label>
                        <input
                            type="text"
                            name="duration"
                            value={courseData.duration}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Instructor</label>
                        <input
                            type="text"
                            name="instructor"
                            value={courseData.instructor}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Instructor Number</label>
                        <input
                            type="text"
                            name="instructor_num"
                            value={courseData.instructor_num}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                </form>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCourseModal;
