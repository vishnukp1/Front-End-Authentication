import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../Reducers/useReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setLogin } from '../Reducers/loginReducer';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputref = useRef();

  const loginPass = async (e) => {
    e.preventDefault();
    const setPassword = inputref.current.upassword.value;
    const setUsername = inputref.current.username.value;
    console.log(setUsername);
    console.log(setPassword);
    const items = {
      username: setUsername,
      password: setPassword,
    };

    try {
      const response = await axios.post(
        'https://authapidemo.pythonanywhere.com/api/v1/auth/login/',
        items
      );
      const data = response.data;
      console.log(response.data);

      if (data.token) {
        try {
          toast.success('SUCCESSFULLY LOGIN!');
          // Store the token in local storage
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);

          // Dispatch the token to Redux if needed
          dispatch(setToken(data.token));

          // Redirect to a different route upon successful login
          navigate('/dashboard'); // Replace with your desired route
        } catch (error) {
          console.error('Error in token:', error);
        }
      } else {
        alert('Email and Password did not match');
        localStorage.clear('token');
        dispatch(setToken(data.token));
        navigate('/company/login');
      }
    } catch (error) {
      console.error('Error getting customer data:', error);
    }
  };

  return (
    <div className="form-login">
      <form ref={inputref} onSubmit={loginPass}>
        <h3 style={{ marginTop: '1rem' }}>Sign In</h3>
        <div className="form-text" style={{ marginTop: '3rem' }}>
          <div className="mb-3 ">
            <label>Email address</label>
            <input type="text" className="form-control" name="username" />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" name="upassword" />
          </div>
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="form-btn">
            Submit
          </button>
          <ToastContainer />
        </div>

        <p className="forgot-password text-right">
          Forgot <a href="forgotPassword">password?</a>
        </p>
        <p className="forgot-password text-right">
          I didn't registered{' '}
          <h6 style={{ color: 'red' }} onClick={() => dispatch(setLogin())}>
            sign Up?
          </h6>
        </p>
      </form>
    </div>
  );
}

export default Login;
