import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import Navbars from '../components/Navbars';
import "../styles/form.css"

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [PasswordForm, setpasswordForm] = useState(false);
  PasswordForm

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

      let data= response.data
      localStorage.setItem('uid', data.uid);
      localStorage.setItem('token', data.token);

      if (response.status === 200) {
        toast.success('Username found and create new password!');
        // If you want to show the reset password fields after a successful by username, set the state here.
        setpasswordForm(true)
      } else {
        toast.error('Failed to send password reset by username.');
      }
    } catch (error) {
      console.error('Error sending password reset by username:', error);
      toast.error('Error sending password reset username.');
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
  
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
    console.log(uid);
    console.log(token);
  
    if (!token) {
      toast.error('User is not authenticated. Redirecting to login...');
      // Redirect to the login page here or handle unauthorized access
      return;
    }
  
    try {
      const response = await axios.post(
        'https://authapidemo.pythonanywhere.com/api/v1/auth/reset-password/',
        {
       
          password: newPassword,
          token:token,
          uid:uid
        },{
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
      );
  
      let data = response.data;
      console.log(data);
  
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
    <div>
      <Navbars />
    <div className="forgot-password-container">
      <h3 className='text-center'>Forgot Password</h3>
      <div className="mb-3">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button className="btn-password"  onClick={handleForgotPassword}>
        Send Reset by username
      </button>

      {PasswordForm && (
        <>
          <h3 className='text-center'>Reset Password</h3>
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
          <button className="btn-password" onClick={handleResetPassword}>
            Reset Password
          </button>
        </>
      )}
      <ToastContainer />
    </div>
    <Footer />
    </div>
  );
};

export default ForgotPassword;
