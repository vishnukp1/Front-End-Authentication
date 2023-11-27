import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleForgotPassword = async () => {
    if (!username) {
      toast.error('Please enter a valid username.');
      return;
    }

    try {
      const response = await axios.post(
        'https://authapidemo.pythonanywhere.com/api/v1/auth/request-reset-password/',
        { username }
      );

      console.log(response);

      if (response.status === 200) {
        toast.success('Password reset email sent successfully!');
        // If you want to show the reset password fields after a successful email, set the state here.
      } else {
        toast.error('Failed to send password reset email.');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error('Error sending password reset email.');
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please enter and confirm the new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.post(
        'https://authapidemo.pythonanywhere.com/api/v1/auth/request-reset-password/',
        { username, password: newPassword }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success('Password reset successful!');
      } else {
        toast.error('Failed to reset password.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Error resetting password.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h3>Forgot Password</h3>
      <div className="mb-3">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleForgotPassword}>
        Send Reset Email
      </button>

      {username && (
        <>
          <h3>Reset Password</h3>
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
          <button className="btn btn-primary" onClick={handleResetPassword}>
            Reset Password
          </button>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
