import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { setLogin } from "../Reducers/loginReducer";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  upassword: Yup.string().required("Password is required"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async ({ username, upassword, rememberMe }, { setSubmitting }) => {
    // Explicitly define the 'items' object
    const items = {
      username: username,
      password: upassword,
      rememberMe: rememberMe,
    };

    try {
      const response = await axios.post(
        "https://authapidemo.pythonanywhere.com/api/v1/auth/login/",
        items
      );

      const data = response.data;

      if (data.token) {
        navigate("/usersList");
        toast.success("SUCCESSFULLY LOGIN!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
      } else {
        toast.error("Username and Password did not match");
        localStorage.clear("token");
      }
    } catch (error) {
      console.error("Error getting customer data:", error);
      toast.error("Username and Password did not match");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-login">
      <Formik
        initialValues={{
          username: "",
          upassword: "",
          rememberMe: false,
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Sign In</h3>
            <div className="form-text" style={{ marginTop: "1rem" }}>
              <div className="mb-3 ">
                <label>Username</label>
                <Field type="text" className="form-control" name="username" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <Field type="password" className="form-control" name="upassword" />
                <ErrorMessage name="upassword" component="div" className="error" />
              </div>
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <Field
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                  name="rememberMe"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="form-btn" disabled={isSubmitting}>
                Submit
              </button>
              <ToastContainer />
            </div>

            <p className="forgot-password text-center mt-1">
              Forgot <a href="forgotPassword">password?</a>
            </p>
            <p className="forgot-password text-center mb-1">
              I didn't register{" "}
              <h6 style={{ color: "red" }} onClick={() => dispatch(setLogin())}>
                sign Up?
              </h6>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
