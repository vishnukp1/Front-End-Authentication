import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://authapidemo.pythonanywhere.com/api/v1/users/',
          {
            headers: { 'Authorization': `Token ${token}` },
          }
        );

       

       const data=response.data.results
       setUsers(data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized access. Redirecting to login...');
          // Redirect to the login page here
        } else {
          console.error('Error fetching users:', error);
          toast.error('Error fetching users. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-list-container">
      <h3>Users List (Admin)</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>ID:</strong> {user.id}, <strong>Username:</strong> {user.username},{' '}
              <strong>Name:</strong> {user.name}
            </li>
          ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
};

export default UsersList;
