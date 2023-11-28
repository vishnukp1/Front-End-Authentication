import React from "react";
import "../styles/Login.css";
import { useDispatch } from "react-redux";
import { setSignup } from "../Reducers/loginReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://authapidemo.pythonanywhere.com/api/v1/auth/register/",
          values
        );
        let data = response.data;
        console.log(response);
        navigate("/usersList");
        // Handle success, navigate, show messages, etc.
      } catch (error) {
        console.error("Error fetching customer data:", error);
        // Handle the error, show an error message, etc.
      }
    },
  });

  return (
    <div className="form-signup">
      <form onSubmit={formik.handleSubmit}>
        <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Sign Up</h3>
        <div className="form-text">
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="error">{formik.errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="form-btn">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-center mt-2">
          Already registered{" "}
          <h6 style={{ color: "red" }} onClick={() => dispatch(setSignup())}>
            sign in?
          </h6>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
