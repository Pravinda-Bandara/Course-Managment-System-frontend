import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { deleteUser, getUsers, updateUser } from "../hooks/userHooks.js";

function UsersPage() {
    const navigate = useNavigate();
    const redirect = '/login';
    const addNewUser = '/adduser';

    const { state, dispatch } = useContext(Store);

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
    };

    const handleLogOut = () => {
        dispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        navigate(redirect);
    };

    return (
        <div>
            <div>
                <div>
                    <div>
                        <h1>Users</h1>
                        <button type="button" onClick={() => navigate(addNewUser)}>
                            Add new user
                        </button>
                    </div>
                    <div>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>Error: {error}</div>
                        ) : (
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Number</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        {editingUserId === user._id ? (
                                            <>
                                                <td>
                                                    <input
                                                        onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
                                                        value={editedUserData.name}
                                                        type="text"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
                                                        value={editedUserData.email}
                                                        type="text"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(e) => setEditedUserData({ ...editedUserData, role: e.target.value })}
                                                        value={editedUserData.role}
                                                        type="text"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(e) => setEditedUserData({ ...editedUserData, number: e.target.value })}
                                                        value={editedUserData.number}
                                                        type="text"
                                                    />
                                                </td>
                                                <td>
                                                    <button onClick={handleSaveEdit}>Save</button>
                                                    <button onClick={handleCancelEdit}>Cancel</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td><input disabled value={user.name} type="text" /></td>
                                                <td><input disabled value={user.email} type="text" /></td>
                                                <td><input disabled value={user.role} type="text" /></td>
                                                <td><input disabled value={user.number} type="text" /></td>
                                                <td>
                                                    <button onClick={() => handleEdit(user)}>Edit</button>
                                                    <button onClick={() => handleDelete(user._id, user.name)}>Delete</button>
                                                    <button onClick={() => navigate(`/admin/users/${user._id}`)}>Details</button>
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
            </div>
            <div>
                <div>
                    <i></i>
                    <button type="button" onClick={handleLogOut}>
                        LogOut
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UsersPage;
