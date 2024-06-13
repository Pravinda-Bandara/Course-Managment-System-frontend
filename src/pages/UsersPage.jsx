// Import the necessary modules
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../hooks/userHooks.js';
import { useDeleteUserMutation, useUpdateUserMutation } from '../hooks/userHooks.js'; // Import the delete and update mutation hooks

// Define the UsersPage component
function UsersPage() {
    // Initialize state and hooks
    const navigate = useNavigate();
    const { data: users, isLoading, error, refetch } = useGetUsersQuery();
    const { mutateAsync: deleteUser } = useDeleteUserMutation(); // Use the delete mutation hook
    const { mutateAsync: updateUser } = useUpdateUserMutation(); // Use the update mutation hook
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUserData, setEditedUserData] = useState({ name: '', email: '', role: '' });

    // Handle loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Handle delete user function
    async function handleDelete(userId) {
        try {
            await deleteUser(userId); // Call the delete mutation hook with the userId
            refetch(); // Refetch the users data
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    // Handle update user function
    async function handleUpdate(userId) {
        try {
            const response = await updateUser(userId, editedUserData); // Call the update mutation hook with userId and editedUserData
            setEditedUserData(response.user); // Update editedUserData with the response data
            setEditingUserId(null); // Reset editingUserId
            refetch(); // Refetch the users data
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }

    // Render the component
    return (
        <>
            <h1>Users</h1>
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
                {users.map(user => (
                    <tr key={user._id}>
                        <td>
                            {editingUserId === user._id ? (
                                <input
                                    type="text"
                                    value={editedUserData.name}
                                    onChange={e => setEditedUserData({ ...editedUserData, name: e.target.value })}
                                />
                            ) : (
                                user.name
                            )}
                        </td>
                        <td>
                            {editingUserId === user._id ? (
                                <input
                                    type="text"
                                    value={editedUserData.email}
                                    onChange={e => setEditedUserData({ ...editedUserData, email: e.target.value })}
                                />
                            ) : (
                                user.email
                            )}
                        </td>
                        <td>
                            {editingUserId === user._id ? (
                                <input
                                    type="text"
                                    value={editedUserData.role}
                                    onChange={e => setEditedUserData({ ...editedUserData, role: e.target.value })}
                                />
                            ) : (
                                user.role
                            )}
                        </td>
                        <td>{user.number}</td>
                        <td>
                            {editingUserId === user._id ? (
                                <>
                                    <button onClick={() => handleUpdate(user._id)}>Update</button>
                                    <button onClick={() => setEditingUserId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => setEditingUserId(user._id)}>Edit</button>
                                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default UsersPage;
