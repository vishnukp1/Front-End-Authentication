import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setLogin } from "../Reducers/loginReducer";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputref = useRef();
  const loginPass = async (e) => {
    e.preventDefault();
    const setUsername = inputref.current.username.value;
    const setPassword = inputref.current.upassword.value;
  
    // Check if username or password is empty
    if (!setUsername || !setPassword) {
      toast.error("Username and Password are required");
      return;
    }
  
    const items = {
      username: setUsername,
      password: setPassword,
    };
  
    try {
      const response = await axios.post(
        "https://authapidemo.pythonanywhere.com/api/v1/auth/login/",
        items
      );
      const data = response.data;
  
      if (data.token) {
        try {
          navigate("/usersList");
          toast.success("SUCCESSFULLY LOGIN!");
          // Store the token in local storage
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
        } catch (error) {
          console.error("Error in token:", error);
        }
      } else {
        toast.error("Username and Password did not match");
        localStorage.clear("token");
      }
    } catch (error) {
      console.error("Error getting customer data:", error);
    }
  };
  

  return (
    <div className="form-login">
      <form ref={inputref} onSubmit={loginPass}>
        <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Sign In</h3>
        <div className="form-text" style={{ marginTop: "1rem" }}>
          <div className="mb-3 ">
            <label>Username</label>
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

        <p className="forgot-password text-center mt-1">
          Forgot <a href="forgotPassword">password?</a>
        </p>
        <p className="forgot-password text-center mb-1">
          I didn't registered{" "}
          <h6 style={{ color: "red" }} onClick={() => dispatch(setLogin())}>
            sign Up?
          </h6>
        </p>
      </form>
    </div>
  );
}

export default Login;
