import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Check if the token is present in the local storage
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login or handle unauthorized access
      console.log('User is not authenticated. Redirecting to login...');
      // You may use a routing library or perform other actions to redirect the user to the login page
    }
  }, []);

  const handleChangePassword = async () => {
    try {
      // Validate old password
      if (!oldPassword) {
        toast.error('Please enter your old password.');
        return;
      }

      // Add logic here to check if the new password and confirm password match
      if (newPassword !== confirmPassword) {
        toast.error('New password and confirm password do not match.');
        return;
      }

      // Get the token from the local storage
      const token = localStorage.getItem('token');
      const currentUsername = localStorage.getItem('username');

      // Validate old password by attempting to log in
      const loginResponse = await axios.post(
        'https://authapidemo.pythonanywhere.com/api/v1/auth/login/',
        {
          username: currentUsername, // Provide the current username
          password: oldPassword,
        }
      );

      console.log("okkk",loginResponse);
      if (loginResponse.status === 200) {
        // Old password is correct, proceed to change the password
        const changePasswordResponse = await axios.post(
            'https://authapidemo.pythonanywhere.com/api/v1/auth/change-password/',
            {
                old_password:oldPassword,
              new_password: newPassword,
            },
            {
              headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          
          
console.log("new password",changePasswordResponse);
        if (changePasswordResponse.status === 200) {
          toast.success('Password changed successfully!');
        } else {
          toast.error('Failed to change password.');
        }
      } else {
        // Old password is not correct
        toast.error('Old password is incorrect.');
      }
    } catch (error) {
      console.error('Error changing password:');
     
    }
  };

  return (
    <div className="change-password-container">
      <h3>Change Password</h3>
      <div className="mb-3">
        <label>Old Password</label>
        <input
          type="password"
          className="form-control"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>New Password</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Confirm Password</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleChangePassword}>
        Change Password
      </button>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
