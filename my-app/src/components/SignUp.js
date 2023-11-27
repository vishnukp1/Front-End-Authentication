import React, {  useRef} from 'react'
import "../styles/Login.css"
import { useDispatch } from 'react-redux';
import { setLogin, setSignup } from '../Reducers/loginReducer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from "../Reducers/useReducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'react-toastify/dist/ReactToastify.css';

function SignUp () {
  
  const navigate = useNavigate();
  const inputref = useRef(null);
  const submithandle = async () => {
    try{
    const userFirstName = inputref.current.name.value;
  
    const userPassword = inputref.current.password.value;
    const userEmail = inputref.current.username.value;
  
    // setemail([
    //   ...email,
    //   { userFirstName, userLastName, userEmail, userPassword },
    // ]);
  
    const item = {
     name: userFirstName,
    
     username:userEmail,
      password: userPassword,
    
   
    };

    const response =await axios
      .post(`https://authapidemo.pythonanywhere.com/api/v1/auth/register/`, item)
     
      console.log(response);
     
     
      
 
  }catch(error)  {
        console.error("Error fetching customer data:", error);
        // Handle the error, show an error message, etc.
      };
   


  };

  console.log(inputref);
  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
  }

  const dispatch = useDispatch()
    return (
      <div className='form-logout'>
      <form ref={inputref} onSubmit={handleSubmit}>
        <h3  style={{marginTop:"1rem"}}>Sign Up</h3>
        <div className='form-text'>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
          name='name'
          />
        </div>
     
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            name='username'
            
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name='password'
            
          />
         
          </div>
         
        </div>
        <div className="d-grid">
          <button type="submit" className="form-btn" onClick={submithandle}>
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <h6 style={{color:'red'}} onClick={()=>dispatch(setSignup())}>sign in?</h6>
        </p>
      </form>
      </div>
    )
  }


export default SignUp;