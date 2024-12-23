import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { deleteUser, getUsers, updateUser } from "../hooks/userHooks.js";
import { Edit, Trash2, Info } from "lucide-react"; // Import Lucide icons

function UsersPage() {
    const navigate = useNavigate();
    const redirect = '/login';
    const { state } = useContext(Store);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUserId, setEditingUserId] = useState('');
    const [editedUserData, setEditedUserData] = useState({ name: '', email: '', role: '', number: '' });

    useEffect(() => {
        if (!state.userInfo) {
            navigate(redirect);
        } else {
            fetchUsers();
        }
    }, [state.userInfo, navigate]);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            setError(error.message || 'Error fetching users');
            toast.error(error.message || 'Error fetching users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (user) => {
        setEditingUserId(user._id);
        setEditedUserData({ name: user.name, email: user.email, role: user.role, number: user.number });
    };

    const handleDelete = async (userId, userName) => {
        try {
            await deleteUser(userId);
            toast.success(`User "${userName}" has been deleted successfully!`);
            fetchUsers();
        } catch (error) {
            toast.error(error.message || 'Error deleting user');
        }
    };

    const handleSaveEdit = async () => {
        try {
            if (editingUserId) {
                await updateUser(editingUserId, editedUserData);
                toast.success('User details have been saved successfully!');
                setEditingUserId('');
                fetchUsers();
            }
        } catch (error) {
            toast.error(error.message || 'Error updating user');
        }
    };

    const handleCancelEdit = () => {
        setEditingUserId('');
        setEditedUserData({ name: '', email: '', role: '', number: '' });
        toast.info('Edit canceled');
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Users</h1>
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded mb-6 rounded-2xl">
                {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : error ? (
                    <div className="text-center py-4 text-red-500">Error: {error}</div>
                ) : (
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Number</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-100">
                                    {editingUserId === user._id ? (
                                        <>
                                            <td className="px-4 py-2 border">
                                                <input
                                                    onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
                                                    value={editedUserData.name}
                                                    type="text"
                                                    className="w-44 px-1 py-1 rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-2 border">
                                                <input
                                                    onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
                                                    value={editedUserData.email}
                                                    type="text"
                                                    className="w-full px-1 py-1 rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-2 border">
                                                <input
                                                    onChange={(e) => setEditedUserData({ ...editedUserData, role: e.target.value })}
                                                    value={editedUserData.role}
                                                    type="text"
                                                    className="w-20 px-1 py-1 rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    onChange={(e) => setEditedUserData({ ...editedUserData, number: e.target.value })}
                                                    value={editedUserData.number}
                                                    type="text"
                                                    className="w-28 px-1 py-1 rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={handleSaveEdit}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-4 py-2 border">{user.name}</td>
                                            <td className="px-4 py-2 border">{user.email}</td>
                                            <td className="px-4 py-2 border">{user.role}</td>
                                            <td className="px-4 py-2 border">{user.number}</td>
                                            <td className="px-4 py-2 border flex space-x-2 justify-center">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 flex items-center"
                                                >
                                                    <Edit className="mr-2" size={16} /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user._id, user.name)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 flex items-center"
                                                >
                                                    <Trash2 className="mr-2" size={16} /> Delete
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin/users/${user._id}`)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center"
                                                >
                                                    <Info className="mr-2" size={16} /> Details
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default UsersPage;
